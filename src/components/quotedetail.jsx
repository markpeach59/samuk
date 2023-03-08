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

      forks: forky.forks,

      valve: forky.valve,

      sideshift: forky.sideshift,
      forkpositioner: forky.forkpositioner,

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
          <Grid item xs={6}>
            <h2>{this.state.model}</h2>
            {this.state.imgName && this.state.imgName.length > 0 ? (
              <ForkliftImg imgName={this.state.imgName} />
            ) : null}
            <br />
            <ConditionalWrapper
              condition={this.state.capacity}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Lift Capacity " + this.state.capacity + "Kg"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.engtype}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              <br /> {this.state.engtype}
              <br />
              {this.state.powertrain ? this.state.powertrain : null}
              <br />
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.masttype}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Mast Type - " + this.state.masttype}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.mastsize}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Mast Height : " + this.state.mastsize}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.forks}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Fork Length - " + this.state.forks}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.valve}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.valve + " Valve"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.fork2d}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Fork Size - " + this.state.fork2d}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.sideshift}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Side Shift - " + this.state.sideshift}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.forkpositioner}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Sideshifting Fork Positioner"}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.sideleverhydraulic}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Side Lever Hydraulic"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.coldstoreprot}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Cold Store Protection"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.tyre}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Tyre Type - " + this.state.tyre}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.aircon}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Air Con"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.heater}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Heater"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.reargrab}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Rear Grab Handle"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.battery}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Battery - " + this.state.battery}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.charger}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Charger - " + this.state.charger}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.bfs}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"BFS"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.trolley}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Trolley"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.blinkey}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Blinkey"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.sideextractionbattery}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Side Extraction Battery"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.armguard}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Arm Guard"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.platform}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Platform"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.loadbackrest}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Load Back Rest"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.steering}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Electric Steering"}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.seat}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Seat Type - " + this.state.seat}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.cabin}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Cabin Type " + this.state.cabin}
            </ConditionalWrapper>
            <br />
            {this.state.engtype !== "Warehouse" ? (
              <React.Fragment>
                Price Includes :
                <br />
                ISO Safety System
                <br />
                Full LED Road Lighting
                <br />
                Amber Beacon, Safety Blue Spot
                <br />
                Reverse Alarm
                <br />
              </React.Fragment>
            ) : null}
            <br />
            <strong>
              Quote Price : £{this.state.price + parseInt(this.state.markup)}
            </strong>
            <OrderCreate onOrderCreate={this.handleCreateOrder} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default QuoteDetail;
