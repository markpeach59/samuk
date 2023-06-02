import React, { Component } from "react";

import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import ToggleSwitch from "./toggleswitch";

import auth from "../services/authService";
import { getDealerDetail } from "../services/dealerService";

import EnginesFilter from "./enginesfilter";
import CapacityFilter from "./capacityfilter";
import ResetFilters from "./resetfilters";



import { getForklifts, getRestrictedForklifts } from "../services/forkliftsService";
import { getEngTypes} from "../services/fakeEngTypeFilterService";
import { getCapacityFilters } from "../services/fakeCapacityFilterService";

import "typeface-roboto";

class Forklifts extends Component {
  state = {
    forklifts: [],
    loading: true,
    restricted: false

  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    //console.log('User is ', user);

    let isrestricted = false;
    
    //localStorage.removeItem("restricted");
    const test = localStorage.getItem("restricted");
    if (test) isrestricted = true;

    if (user.dealerId){
      const { data: dealery } = await getDealerDetail(user.dealerId);

      //console.log("Dealer ", dealery);
      //getting this here as Filter values are set local in the code and not on MongoDB
      if (dealery.isRestricted) {
        isrestricted = true;
      }
    }

    if (isrestricted){
      localStorage.setItem("restricted", "true");
      const { data: forklifts2 } = await getRestrictedForklifts();
      //console.log("Forklifts2 Returned", forklifts2);
      this.setState({
        forklifts:forklifts2,
        engTypesFilter: getEngTypes(isrestricted),
        capacityFilter: getCapacityFilters(),
        loading: false,
        restricted:true
      });

    }
else{

    const { data: forklifts } = await getForklifts();
    //console.log("Forklifts Returned", forklifts);
    this.setState({
      forklifts,
      engTypesFilter: getEngTypes(isrestricted),
      capacityFilter: getCapacityFilters(),
      loading: false,
    });
  }
  }

  toggleTheme = async () => {

    //console.log("Hello World", this.state.restricted );
  
    
    const now = !this.state.restricted;
    const isrestricted = now;
    

    
    if (now){
      localStorage.setItem("restricted", "true");
      const { data: forklifts2 } = await getRestrictedForklifts();
      //console.log("Forklifts2 Returned", forklifts2);
      this.setState({
        forklifts:forklifts2,
        engTypesFilter: getEngTypes(isrestricted),
        capacityFilter: getCapacityFilters(),
        loading: false,
        restricted:now
      });

    } else {
      localStorage.removeItem("restricted");
      const { data: forklifts2 } = await getForklifts();
      //console.log("Forklifts Returned", forklifts2);

      this.setState({
        forklifts:forklifts2,
        engTypesFilter: getEngTypes(isrestricted),
        capacityFilter: getCapacityFilters(),
        loading: false,
        restricted:now
      });

    }



  


    //this.setState ({restricted:now});
  
    
  }

  handleResetFilters = () => {
    //console.log("Been Reset");

    this.setState({
      selectedEngine: undefined,
      selectedCapacityFilter: undefined,
    });
  };

  handleCapFilter = (capfilter) => {
    this.setState({ selectedCapacityFilter: capfilter });
  };

  handleEngineSel = (engine) => {
    //console.log("ZZ", engine.name);
    this.setState({ selectedEngine: engine });
    //console.log("ZZZ", this.state.selectedEngine.name);
  };

  filterModels(models) {
    /* filter for capacity - then engtype */

    const mseng = this.state.selectedEngine
      ? models.filter((m) => m.engType === this.state.selectedEngine.name)
      : models;

    // this is hardcoding tolerances for the capacity filter to pick up immediate cap values
    var catchment = 100;
    if (this.state.selectedCapacityFilter)
      if (this.state.selectedCapacityFilter.capFilter > 1500) catchment = 100;

    const mscap = this.state.selectedCapacityFilter
      ? mseng.filter(
          //m => m.capacity === this.state.selectedCapacityFilter.capFilter
          (m) =>
            m.capacity <= this.state.selectedCapacityFilter.capFilter &&
            m.capacity > this.state.selectedCapacityFilter.capFilter - catchment
        )
      : mseng;

    return mscap;
  }

  filterEng(forklifts) {
    var g = [];

    if (!this.state.selectedEngine) {
      if (!this.state.selectedCapacityFilter) return forklifts;
    }

    /* if any filters set - need to create a filtered clone */
    /* filter values.models within each range */

    Object.entries(forklifts).map(
      ([key, values]) =>
        (g[key] = {
          range: values.range,
          models: this.filterModels(values.models),
        })
    );
    //console.log("TTT", this.state.selectedEngine, " ", g);

    /* remove any ranges that have zero models meeting the criteria */
    const tt = g.filter((x) => x.models.length > 0);

    return tt;
  }

  render() {
    const t = this.filterEng(this.state.forklifts);
    //console.log("LL", t);

    const { length: count } = this.state.forklifts;
    /*
    Object.entries(this.state.forklifts).map(([key, values]) =>
      values.models.map(v => console.log(v.modelName, v.engType, v.capacity))
    );*/

    // until we get data from the REST API - we in Loading State
    if (this.state.loading === true) return <p> Loading ...</p>;

    if (count === 0) return <p>There are no forklifts in the database</p>;

    return (
      <React.Fragment>
        <Grid>
        {this.state.user &&
                  (this.state.user.isAdmin || this.state.user.isMaximGB) && (
                    <React.Fragment >
                    <ToggleSwitch onToggle={this.toggleTheme}/>
                    </React.Fragment>
                  )} 

                  {this.state.user && (this.state.user.isAdmin || this.state.user.isMaximGB) && 
                  (!this.state.restricted) && (
                    "Normal Pricing"
                  )} 
                  {this.state.user && (this.state.user.isAdmin || this.state.user.isMaximGB) && 
                  (this.state.restricted) && (
                    "Restricted Pricing"
                  )}     
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {Object.entries(t).map(([key, values]) => (
              <React.Fragment key={key}>
                <Typography variant="h6">{values.range} Range</Typography>

                {values.models.map((g) => (
                  <div key={g._id}>
                    <Link to={{ pathname: "/forkliftdetail/" + g.model }}>
                      <Button>{g.model}</Button>
                    </Link>{" "}
                    {g.capacity} {g.engType}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </Grid>
          <Grid item xs={6}>
            <ResetFilters onResetFilters={this.handleResetFilters} />

            <EnginesFilter
              engines={this.state.engTypesFilter}
              onEngineSel={this.handleEngineSel}
              selectedEngine={this.state.selectedEngine}
            />

            <CapacityFilter
              capacityfilters={this.state.capacityFilter}
              onCapacityFilterSel={this.handleCapFilter}
              selectedCapacityFilter={this.state.selectedCapacityFilter}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Forklifts;
