import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";

import ForkliftImg from "./forkliftimg";
import {
  getQuoteDetail,
  createOrderFromQuote,
} from "../services/quotesService";

import OrderCreate from "./ordercreate";

import "typeface-roboto";

class QuoteDetail extends Component {
  state = {};

  async componentDidMount() {
    const handle = this.props.match.params._id;
    //console.log("Params", handle);
    const { data: forky } = await getQuoteDetail(handle);
    //console.log("Detail", forky);

    this.setState({
      model: forky.model,

      price: forky.price,
      markup: forky.markup,

      capacity: forky.capacity,
      engtype: forky.engtype,
      powertrain: forky.powertrain,
      imgName: forky.imgname,
      masttype: forky.masttype,
      mastsize: forky.mastsize,
      closedheight: forky.closedheight,
      freeliftheight: forky.freeliftheight,

      forks: forky.forks,

      valve: forky.valve,

      sideshift: forky.sideshift,
      forkpositioner: forky.forkpositioner,

      pincode:forky.pincode,
      displaywithcamera: forky.displaywithcamera,
      liftybutton: forky.liftybutton,
      roller: forky.roller,
      controller: forky.controller,
      safetybluespot: forky.safetybluespot,

      tyre: forky.tyre,
      coldstoreprot: forky.coldstoreprot,
      seat: forky.seat,
      cabin: forky.cabin,

      aircon: forky.aircon,
      heater: forky.heater,
      reargrab: forky.reargrab,
      sideleverhydraulic: forky.sideleverhydraulic,
      battery: forky.battery,
      charger: forky.charger,

      armguard: forky.armguard,
      platform: forky.platform,

      loadbackrest: forky.loadbackrest,
      steering: forky.steering,

      fork2d: forky.fork2d,
      bfs: forky.bfs,

      trolley: forky.manualtrolley,
      blinkey: forky.blinkey,
      sideextractionbattery: forky.sideextractionbattery,
    });
  }

  handleCreateOrder = async () => {
    // _id of Quote Object
    const handle = this.props.match.params._id;

    //console.log("Order Id", handle);

    try {
      await createOrderFromQuote(handle);

      // go to specific order page
      window.location = "/orders/" + handle;
    } catch (error) {
      console.log("did not create order", handle);
    }
  };

  render() {
    const ConditionalWrapper = ({ condition, wrapper, children }) =>
      condition ? wrapper(children) : null;
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <h2>{this.state.model}</h2>
            {this.state.imgName && this.state.imgName.length > 0 ? (
              <ForkliftImg imgName={this.state.imgName} />
            ) : null}

            
            <br /> 
            
            {this.state.engType ? (this.state.engType + " "):null} 
            
            <ConditionalWrapper
              condition={this.state.powertrain}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.powertrain + " "}
            </ConditionalWrapper>

  
             
            Capacity : {this.state.capacity}Kg 
          <ConditionalWrapper
              condition={this.state.loadcenter}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.loadcenter
                ? " @" + this.state.loadcenter + "mm LC"
                : null}
            </ConditionalWrapper>

<br />
            <ConditionalWrapper
              condition={this.state.masttype}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.masttype + " "}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.mastsize}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.mastsize + "mm"}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.closedheight}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"," +this.state.closedheight + "mm Closed"}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.freeliftheight}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"," + this.state.freeliftheight + "mm Free Lift"}
            </ConditionalWrapper>



            <ConditionalWrapper
              condition={this.state.valve || this.state.forks || this.state.fork2d || this.state.sideshift || this.state.forkpositioner}
              wrapper={(children) => (
                <React.Fragment>
                  <br />
                </React.Fragment>
              )}
            >
            </ConditionalWrapper>


<ConditionalWrapper
              condition={this.state.valve}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.valve + " Valve" + ", "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.forks}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.forks + "mm Forks, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.fork2d}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.fork2d + "mm Forks, "}
            </ConditionalWrapper>

          

            
            <ConditionalWrapper
              condition={this.state.sideshift}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.sideshift + " Side Shift, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.forkpositioner}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Sideshifting Fork Positioner, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.sideleverhydraulic}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Side Lever Hydraulic, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.controller}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.controller + " Controller, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.pincode}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Pincode, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.displaywithcamera}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Display with Camera, "}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.liftybutton}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"2 Sided Lifty Button, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.roller}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.roller + " Roller, "}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.coldstoreprot}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Cold Store Protection, "}
            </ConditionalWrapper>



            <ConditionalWrapper
              condition={this.state.tyre}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.tyre + " Tyres"}
            </ConditionalWrapper>
            
            
          <br />

            <ConditionalWrapper
              condition={this.state.battery}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.battery + " Battery, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.charger}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.charger + " Charger, "}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.bfs}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"BFS, "}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.trolley}
              wrapper={(children) => (
                <React.Fragment>
                  {children}

                </React.Fragment>
              )}
            >
              {"Trolley, "}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.blinkey}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
 
                </React.Fragment>
              )}
            >
              {"Blinkey, "}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.sideextractionbattery}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Side Extraction Battery, "}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.armguard}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Arm Guard, "}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.platform}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
              
                </React.Fragment>
              )}
            >
              {"Platform, "}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.loadbackrest}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Load Backrest, "}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.steering}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Electric Steering, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.safetybluespot || this.state.seat || this.state.cabin || this.state.aircon || this.state.heater}
              wrapper={(children) => (
                <React.Fragment>
                  <br />
                </React.Fragment>
              )}
            >
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.safetybluespot}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  
                </React.Fragment>
              )}
            >
              {"Safety Blue Spot, "}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.seat}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.seat + " Seat, "}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.cabin}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {this.state.cabin + ", "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.aircon}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Air Con, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.heater}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"Heater, "}
            </ConditionalWrapper>

            
            <br />

            {this.state.engType !== "Warehouse" ? (
              <React.Fragment>
                OPS Safety System, Amber Beacon, Reverse Alarm
              </React.Fragment>
            ) : null}
            

            {this.state.engType === "Electric" ? (
              <React.Fragment>
                , Rear Grab Handle with Horn
              </React.Fragment>
            ) : null}

             
            {(this.state.engType === "Diesel" && this.state.liftcapacity < 6000 ) ? (
              <React.Fragment>
                , Rear Grab Handle with Horn
              </React.Fragment>
            ) : null}

            {(this.state.engType === "Diesel" ) ? (
              <React.Fragment>
                , Upswept Exhaust
              </React.Fragment>
            ) : null}

            {this.state.engType === "LPG" ? (
              <React.Fragment>
                , Rear Grab Handle with Horn
              </React.Fragment>
            ) : null}

            {this.state.engType === "LPG" ? (
              <React.Fragment>
                , Upswept Exhaust
              </React.Fragment>
            ) : null}

            {this.state.engType !== "Warehouse" ? (
              <React.Fragment>
                , Full LED Lighting
              </React.Fragment>
            ) : null}
<br />
            <br />
            <strong>
              Quote Price : £{this.state.price + parseInt(this.state.markup)}
            </strong>
<br />

            <OrderCreate onOrderCreate={this.handleCreateOrder} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default QuoteDetail;
