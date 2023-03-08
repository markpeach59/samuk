import React, { Component } from "react";
import auth from "../services/authService";

import Grid from "@material-ui/core/Grid";

import Masts from "./masts";
import Forks from "./forks";
import SideShifts from "./sideshifts";
import Forkpositioners from "./forkpositioner";
import Tyres from "./tyres";
import Seats from "./seats";
import Cabins from "./cabins";
import Valves from "./valves";
import ResetFilters from "./resetfilters";
import ForkliftImg from "./forkliftimg";

import ColdStoreProts from "./coldstoreprot";
import Heaters from "./heater";
import Aircons from "./aircon";
import Reargrabs from "./reargrab";
import Sideleverhydraulics from "./sideleverhydraulic";

import Platforms from "./platform";
import Armguards from "./armguard";
import Fork2ds from "./fork2d";
import Bfs from "./bfs";

import Upsweptexhausts from "./upsweptexhaust";

import Trolley from "./trolley";
import Blinkey from "./blinkey";
import Sideextractionbatterys from "./sideextractionbattery";

import Loadbackrests from "./loadbackrest";
import Steerings from "./steering";

import Batterycompartments from "./batterycompartment";


import Batterys from "./battery";
import Chargers from "./charger";
import Engines from "./engines";

import QuoteSave from "./quotesave";

import Markup from "./markup";

import { getForkliftDetail } from "../services/forkliftDetailService";
import { savequote } from "../services/quotesService";

import "typeface-roboto";

class ForkliftDetail extends Component {
  state = {};

  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });

    const handle = this.props.match.params.modelName;
    //console.log("Params", handle);
    const { data: forky } = await getForkliftDetail(handle);
    //console.log("Detail", forky);

    this.setState({
      model: forky.model,
      imgName: forky.imgName,
      engType: forky.engType,
      powertrain: forky.powertrain,
      iengine: forky.powertrain,

      liftcapacity: forky.capacity,

      engines: forky.engines,
      masts: forky.masts,
      valves: forky.valves,
      forks: forky.forks,
      sideshifts: forky.sideshift,
      forkpositioners: forky.forkpositioner,
      tyres: forky.tyres,
      seats: forky.seat,
      coldstoreprots: forky.coldstoreprot,
      cabins: forky.cabin,

      upsweptexhausts: forky.upsweptexhaust,

      reargrabs: forky.reargrab,
      sideleverhydraulics: forky.sideleverhydraulic,
      platforms: forky.platform,
      armguards: forky.armguard,

      steerings: forky.steering,
      loadbackrests: forky.loadbackrest,
      fork2ds: forky.forks2d,

      heaters: forky.heater,
      aircons: forky.aircon,

      batterycompartments: forky.batterycompartment,

      batterys: forky.batteries,
      bfss: forky.bfs,
      trolleys: forky.trolley,
      blinkeys: forky.blinkey,
      sideextractionbatterys: forky.sideextractionbattery,

      totalprice: forky.basePrice,
      baseprice: forky.basePrice,
      markup: 0,
      batteryconstraint: false,
    });
  }

  handleResetFilters = () => {
    //console.log("Been Reset");

    this.setState({
      powertrain: this.state.iengine,
      selectedEngine: undefined,
      selectedMast: undefined,
      selectedMastSize: undefined,
      selectedValve: undefined,
      selectedFork: undefined,
      selectedSideShift: undefined,
      selectedForkpositioner: undefined,

      selectedTyre: undefined,
      selectedColdStoreProt: undefined,
      selectedSeat: undefined,
      selectedCabin: undefined,

      selectedUpsweptexhaust: undefined,

      selectedAircon: undefined,
      selectedHeater: undefined,
      selectedReargrab: undefined,
      selectedSideleverhydraulic: undefined,

      selectedBatterycompartment: undefined,

      selectedBattery: undefined,
      selectedCharger: undefined,

      selectedArmguard: undefined,
      selectedPlatform: undefined,

      selectedLoadbackrest: undefined,
      selectedSteering: undefined,

      selectedFork2d: undefined,
      selectedBfs: undefined,
      selectedTrolley: undefined,
      selectedBlinkey: undefined,

      selectedSideextractionbattery: undefined,

      totalprice: this.state.baseprice,
      batteryconstraint: false,
    });
  };

  handleQuoteSave = async () => {
    const quote = {};

    quote.userid = this.state.user._id;
    quote.model = this.state.model;
    quote.price = this.state.totalprice;
    quote.markup = this.state.markup;

    quote.capacity = this.state.liftcapacity;
    quote.engtype = this.state.engType;
    quote.powertrain = this.state.powertrain;
    quote.baseprice = this.state.basePrice;

    if (this.state.selectedEngine)
      quote.powertrain = this.state.selectedEngine.enginetype;

    if (this.state.imgName) quote.imgname = this.state.imgName;

    if (this.state.selectedMast) quote.masttype = this.state.selectedMast;

    if (this.state.selectedMastSize)
      quote.mastsize = this.state.selectedMastSize.mastlength;

    if (this.state.selectedValve)
      quote.valve = this.state.selectedValve.valvetype;

    if (this.state.selectedFork)
      quote.forks = this.state.selectedFork.forklength;
    if (this.state.selectedSideShift)
      quote.sideshift = this.state.selectedSideShift.sideshifttype;

    if (this.state.selectedForkpositioner) quote.forkpositioner = true;

    if (this.state.selectedTyre) quote.tyre = this.state.selectedTyre.tyretype;

    if (this.state.selectedUpsweptexhaust) quote.upsweptexhaust = true;

    if (this.state.selectedColdStoreProt) quote.coldstoreprot = true;
    if (this.state.selectedSeat) quote.seat = this.state.selectedSeat.seattype;
    if (this.state.selectedCabin)
      quote.cabin = this.state.selectedCabin.cabinoption;

    if (this.state.selectedAircon) quote.aircon = true;
    if (this.state.selectedHeater) quote.heater = true;
    if (this.state.selectedReargrab) quote.reargrab = true;
    if (this.state.selectedSideleverhydraulic) quote.sideleverhydraulic = true;

    if (this.state.selectedBatterycompartment) quote.batterycompartment = this.state.selectedBatterycompartment.batterycompartmenttype;

    if (this.state.selectedBattery)
      quote.battery = this.state.selectedBattery.batterytype;
    if (this.state.selectedCharger)
      quote.charger = this.state.selectedCharger.chargertype;

    if (this.state.selectedSideextractionbattery)
      quote.sideextractionbattery = true;

    if (this.state.selectedBlinkey) quote.blinkey = true;
    if (this.state.selectedTrolley) quote.manualtrolley = true;

    if (this.state.selectedArmguard) quote.armguard = true;
    if (this.state.selectedPlatform) quote.platform = true;

    if (this.state.selectedLoadbackrest) quote.loadbackrest = true;
    if (this.state.selectedSteering) quote.steering = true;

    if (this.state.selectedFork2d)
      quote.fork2d = this.state.selectedFork2d.forklength;

    if (this.state.selectedBfs) quote.bfs = true;

    //console.log("Quote", quote);
    try {
      const x = await savequote(quote);
      //console.log("quote was", x);
      window.location = "/quotes/" + x.data._id;
    } catch (error) {
      console.log("did not save quote");
    }
  };

  handleMarkup = (markup) => {
    console.log("Markup - ", markup);
    this.setState({ markup });
  };

  handleEngineSel = (engine) => {
    const oldprice = this.state.selectedEngine
      ? this.state.selectedEngine.price
      : 0;
    const newprice = this.state.totalprice + engine.price - oldprice;

    this.setState({
      selectedEngine: engine,
      powertrain: engine.enginetype,
      totalprice: newprice,
    });
  };

  handleMastSel = (mast) => {
    this.setState({ selectedMast: mast });
  };

  handleMastSizeSel = (mastsize, masttype) => {
    const oldprice = this.state.selectedMastSize
      ? this.state.selectedMastSize.price
      : 0;
    const newprice = this.state.totalprice + mastsize.price - oldprice;

    this.setState({
      selectedMastSize: mastsize,
      selectedMast: masttype,
      totalprice: newprice,
    });

    //console.log("VVV", mastsize);
  };

  handleForkSel = (fork) => {
    const oldprice = this.state.selectedFork
      ? this.state.selectedFork.price
      : 0;
    const newprice = this.state.totalprice + fork.price - oldprice;

    this.setState({ selectedFork: fork, totalprice: newprice });
  };

  handleFork2dSel = (fork2d) => {
    const oldprice = this.state.selectedFork2d
      ? this.state.selectedFork2d.price
      : 0;
    const newprice = this.state.totalprice + fork2d.price - oldprice;

    this.setState({ selectedFork2d: fork2d, totalprice: newprice });
  };

  handleSideShiftSel = (sideshift) => {
    const oldprice = this.state.selectedSideShift
      ? this.state.selectedSideShift.price
      : 0;
    const newprice = this.state.totalprice + sideshift.price - oldprice;

    this.setState({ selectedSideShift: sideshift, totalprice: newprice });
  };

  handleForkpositionerSel = (forkpositioner) => {
    const oldprice = this.state.selectedForkpositioner
      ? this.state.selectedForkpositioner.price
      : 0;
    const newprice = this.state.totalprice + forkpositioner.price - oldprice;

    this.setState({
      selectedForkpositioner: forkpositioner,
      totalprice: newprice,
    });
  };

  handleValveSel = (valve) => {
    const oldprice = this.state.selectedValve
      ? this.state.selectedValve.price
      : 0;
    const newprice = this.state.totalprice + valve.price - oldprice;

    this.setState({ selectedValve: valve, totalprice: newprice });
  };

  handleReargrabSel = (reargrab) => {
    const oldprice = this.state.selectedReargrab
      ? this.state.selectedReargrab.price
      : 0;
    const newprice = this.state.totalprice + reargrab.price - oldprice;

    this.setState({ selectedReargrab: reargrab, totalprice: newprice });
  };

  handleSideleverhydraulicSel = (sideleverhydraulic) => {
    const oldprice = this.state.selectedSideleverhydraulic
      ? this.state.selectedSideleverhydraulic.price
      : 0;
    const newprice =
      this.state.totalprice + sideleverhydraulic.price - oldprice;

    this.setState({
      selectedSideleverhydraulic: sideleverhydraulic,
      totalprice: newprice,
    });
  };

  handlePlatformSel = (platform) => {
    const oldprice = this.state.selectedPlatform
      ? this.state.selectedPlatform.price
      : 0;
    const newprice = this.state.totalprice + platform.price - oldprice;

    this.setState({ selectedPlatform: platform, totalprice: newprice });
  };

  handleArmguardSel = (armguard) => {
    const oldprice = this.state.selectedArmguard
      ? this.state.selectedArmguard.price
      : 0;
    const newprice = this.state.totalprice + armguard.price - oldprice;

    this.setState({ selectedArmguard: armguard, totalprice: newprice });
  };

  handleBfsSel = (bfs) => {
    const oldprice = this.state.selectedBfs ? this.state.selectedBfs.price : 0;
    const newprice = this.state.totalprice + bfs.price - oldprice;

    this.setState({ selectedBfs: bfs, totalprice: newprice });
  };

  handleTrolleySel = (trolley) => {
    const oldprice = this.state.selectedTrolley
      ? this.state.selectedTrolley.price
      : 0;
    const newprice = this.state.totalprice + trolley.price - oldprice;

    this.setState({ selectedTrolley: trolley, totalprice: newprice });
  };

  handleBlinkeySel = (blinkey) => {
    const oldprice = this.state.selectedBlinkey
      ? this.state.selectedBlinkey.price
      : 0;
    const newprice = this.state.totalprice + blinkey.price - oldprice;

    this.setState({ selectedBlinkey: blinkey, totalprice: newprice });
  };

  handleLoadbackrestSel = (loadbackrest) => {
    const oldprice = this.state.selectedLoadbackrest
      ? this.state.selectedLoadbackrest.price
      : 0;
    const newprice = this.state.totalprice + loadbackrest.price - oldprice;

    this.setState({ selectedLoadbackrest: loadbackrest, totalprice: newprice });
  };

  handleSteeringSel = (steering) => {
    const oldprice = this.state.selectedSteering
      ? this.state.selectedSteering.price
      : 0;
    const newprice = this.state.totalprice + steering.price - oldprice;

    this.setState({ selectedSteering: steering, totalprice: newprice });
  };

  handleTyreSel = (tyre) => {
    const oldprice = this.state.selectedTyre
      ? this.state.selectedTyre.price
      : 0;
    const newprice = this.state.totalprice + tyre.price - oldprice;

    this.setState({ selectedTyre: tyre, totalprice: newprice });
  };

  handleUpsweptexhaustSel = (upsweptexhaust) => {
    const oldprice = this.state.selectedUpsweptexhaust
      ? this.state.selectedUpsweptexhaust.price
      : 0;
    const newprice = this.state.totalprice + upsweptexhaust.price - oldprice;

    this.setState({ selectedUpsweptexhaust: upsweptexhaust, totalprice: newprice });
  };

  handleBatterycompartmentSel = (batterycompartment) => {
    const oldprice = this.state.selectedBatterycompartment
    ? this.state.selectedBatterycompartment.price
    : 0;


    console.log("__", batterycompartment);
 var constraint = false;
 var newprice;
 
 if( batterycompartment.batterycompartmenttype !== "Standard"){
    constraint=true;

    console.log("___", constraint)

    if (this.state.selectedBattery && this.state.selectedBattery.batterytype === "48V 625 A/H"){
          
    newprice =
      this.state.totalprice + batterycompartment.price - oldprice;
      
      console.log('Battery Selection State -', this.state.selectedBattery.batterytype );
      console.log('Compartment - ', batterycompartment.batterycompartmenttype);

      this.setState({ 
        selectedBatterycompartment: batterycompartment, 
        totalprice: newprice,
        batteryconstraint: constraint,
      });
      
     } else {

      const oldprice1 = this.state.selectedBattery
    ? this.state.selectedBattery.price
    : 0;
     
    const oldprice2 = this.state.selectedCharger
    ? this.state.selectedCharger.price
    : 0;

     newprice =
      this.state.totalprice + batterycompartment.price - oldprice - oldprice1 - oldprice2;


      console.log('Battery must be ', this.state.batterys[0].batterytype );
      
      const adjustedprice = newprice + this.state.batterys[0].price;

      this.setState({ 
        selectedBatterycompartment: batterycompartment, 
        selectedBattery: this.state.batterys[0],
        selectedCharger: undefined,
        chargers: this.state.batterys[0].chargers, 
        totalprice: adjustedprice,
        batteryconstraint: constraint,
      });

    

  }


      } else {

    

      console.log('Standard');

      newprice =
      this.state.totalprice + batterycompartment.price - oldprice;
      

      this.setState({ 
        selectedBatterycompartment: batterycompartment, 
        totalprice: newprice,
        batteryconstraint: constraint,
      });
      

  }
  
  
  };

  handleBatterySel = (battery) => {
    const oldprice = this.state.selectedBattery
      ? this.state.selectedBattery.price
      : 0;

    const oldprice2 = this.state.selectedCharger
      ? this.state.selectedCharger.price
      : 0;
    const newprice =
      this.state.totalprice + battery.price - oldprice - oldprice2;

    this.setState({
      selectedBattery: battery,
      selectedCharger: undefined,
      chargers: battery.chargers,
      totalprice: newprice,
    });
  };

  handleChargerSel = (charger) => {
    const oldprice = this.state.selectedCharger
      ? this.state.selectedCharger.price
      : 0;
    const newprice = this.state.totalprice + charger.price - oldprice;

    this.setState({ selectedCharger: charger, totalprice: newprice });
  };

  handleSideextractionbatterySel = (sideextractionbattery) => {
    const oldprice = this.state.selectedSideextractionbattery
      ? this.state.selectedSideextractionbattery.price
      : 0;
    const newprice =
      this.state.totalprice + sideextractionbattery.price - oldprice;

    this.setState({
      selectedSideextractionbattery: sideextractionbattery,
      totalprice: newprice,
    });
  };

  handleSeatSel = (seat) => {
    const oldprice = this.state.selectedSeat
      ? this.state.selectedSeat.price
      : 0;
    const newprice = this.state.totalprice + seat.price - oldprice;

    this.setState({ selectedSeat: seat, totalprice: newprice });
  };

  handleCabinSel = (cabin) => {
    const oldprice = this.state.selectedCabin
      ? this.state.selectedCabin.price
      : 0;
    const newprice = this.state.totalprice + cabin.price - oldprice;

    this.setState({ selectedCabin: cabin, totalprice: newprice });
  };

  handleColdStoreProtSel = (coldstoreprot) => {
    const oldprice = this.state.selectedColdStoreProt
      ? this.state.selectedColdStoreProt.price
      : 0;
    const newprice = this.state.totalprice + coldstoreprot.price - oldprice;

    this.setState({
      selectedColdStoreProt: coldstoreprot,
      totalprice: newprice,
    });
  };

  handleHeaterSel = (heater) => {
    const oldprice = this.state.selectedHeater
      ? this.state.selectedHeater.price
      : 0;
    const newprice = this.state.totalprice + heater.price - oldprice;

    this.setState({ selectedHeater: heater, totalprice: newprice });
  };

  handleAirconSel = (aircon) => {
    const oldprice = this.state.selectedAircon
      ? this.state.selectedAircon.price
      : 0;
    const newprice = this.state.totalprice + aircon.price - oldprice;

    this.setState({ selectedAircon: aircon, totalprice: newprice });
  };

  render() {
    const ConditionalWrapper = ({ condition, wrapper, children }) =>
      condition ? wrapper(children) : null;

    //console.log("CC", this.state.selectedMastSize);
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h2>{this.state.model}</h2>
            {this.state.imgName && this.state.imgName.length > 0 ? (
              <ForkliftImg imgName={this.state.imgName} />
            ) : null}
            <h2>{this.state.rangeCat}</h2>
            {this.state.model} {this.state.rangeCat} {this.state.engType}{" "}
            forklift
            <br />
            {this.state.liftcapacity}Kg
            <br /> {this.state.engType}
            <br />
            {this.state.powertrain ? this.state.powertrain : null}
            <br />
            <ConditionalWrapper
              condition={this.state.selectedMast}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {"Mast Type - " + this.state.selectedMast}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedMastSize}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedMastSize
                ? "Mast Size " + this.state.selectedMastSize.mastlength + "mm"
                : null}

              {this.state.selectedMastSize &&
              this.state.selectedMastSize.closedheight
                ? " , " + this.state.selectedMastSize.closedheight + "mm"
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedValve}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedValve
                ? "Valve - " + this.state.selectedValve.valvetype
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedFork}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedFork
                ? "Fork Length - " + this.state.selectedFork.forklength
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedFork2d}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedFork2d
                ? "Fork Length - " + this.state.selectedFork2d.forklength
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedSideShift}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedSideShift
                ? "Side Shift - " + this.state.selectedSideShift.sideshifttype
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedForkpositioner}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedForkpositioner
                ? "Sideshifting Fork Positioner "
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedSideleverhydraulic}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              Side Lever Hydraulics
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedColdStoreProt}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedColdStoreProt
                ? "Cold Store Protection"
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedReargrab}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedReargrab
                ? "Rear Grab Handle with Horn "
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedArmguard}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedArmguard ? "with Arm Guard" : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedPlatform}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedPlatform ? "with Platform " : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedSteering}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedSteering ? "Electronic Steering " : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedTyre}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedTyre
                ? "Tyre - " + this.state.selectedTyre.tyretype
                : null}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.selectedUpsweptexhaust}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedUpsweptexhaust
                ? "Upswept Exhaust"
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedBatterycompartment}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedBatterycompartment
                ? "Battery Compartment - " + this.state.selectedBatterycompartment.batterycompartmenttype
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedBattery}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedBattery
                ? "Battery - " + this.state.selectedBattery.batterytype
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedCharger}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedCharger
                ? "Charger - " + this.state.selectedCharger.chargertype
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedBfs}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedBfs ? "with BFS" : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedTrolley}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedTrolley ? "with Trolley" : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedBlinkey}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedBlinkey ? "with Blinkey" : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedSideextractionbattery}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedSideextractionbattery
                ? "with Side Extraction Battery"
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedLoadbackrest}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedLoadbackrest ? "with Load Backrest" : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedSeat}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedSeat
                ? "Seat - " + this.state.selectedSeat.seattype
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedCabin}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedCabin
                ? "Cabin - " + this.state.selectedCabin.cabinoption
                : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedHeater}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedHeater ? "Heater" : null}
            </ConditionalWrapper>
            <ConditionalWrapper
              condition={this.state.selectedAircon}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedAircon ? "Aircon " : null}
            </ConditionalWrapper>
            <br />
            {this.state.engType === "Electric" ? (
              <React.Fragment>
                Rear Grab Handle with Horn
                <br />
              </React.Fragment>
            ) : null}

             
            {(this.state.engType === "Diesel" && this.state.liftcapacity < 6000 ) ? (
              <React.Fragment>
                Rear Grab Handle with Horn
                <br />
              </React.Fragment>
            ) : null}

            {(this.state.engType === "Diesel" ) ? (
              <React.Fragment>
                Upswept Exhaust
                <br />
              </React.Fragment>
            ) : null}

            {this.state.engType === "LPG" ? (
              <React.Fragment>
                Rear Grab Handle with Horn
                <br />
              </React.Fragment>
            ) : null}

            {this.state.engType === "LPG" ? (
              <React.Fragment>
                Upswept Exhaust
                <br />
              </React.Fragment>
            ) : null}

            <br />
            {this.state.engType !== "Warehouse" ? (
              <React.Fragment>
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
              Quote Price : £
              {this.state.totalprice + parseInt(this.state.markup)}
            </strong>
            <QuoteSave onQuoteSave={this.handleQuoteSave} />
          </Grid>
          <Grid item xs={8}>
            <Markup onMarkup={this.handleMarkup} />
            <ResetFilters onResetFilters={this.handleResetFilters} />

            {this.state.engines && this.state.engines.length > 0 ? (
              <Engines
                engines={this.state.engines}
                selectedEngine={this.state.selectedEngine}
                onEngineSel={this.handleEngineSel}
              />
            ) : null}

            {this.state.masts && this.state.masts.length > 0 ? (
              <Masts
                masts={this.state.masts}
                selectedMast={this.state.selectedMast}
                onMastSel={this.handleMastSel}
                onMastSizeSel={this.handleMastSizeSel}
                selectedMastSize={this.state.selectedMastSize}
              />
            ) : null}

            {this.state.valves && this.state.valves.length > 0 ? (
              <Valves
                valves={this.state.valves}
                selectedValve={this.state.selectedValve}
                onValveSel={this.handleValveSel}
              />
            ) : null}

            {this.state.forks && this.state.forks.length > 0 ? (
              <Forks
                forks={this.state.forks}
                selectedFork={this.state.selectedFork}
                onForkSel={this.handleForkSel}
              />
            ) : null}

            {this.state.fork2ds && this.state.fork2ds.length > 0 ? (
              <Fork2ds
                fork2ds={this.state.fork2ds}
                selectedFork2d={this.state.selectedFork2d}
                onFork2dSel={this.handleFork2dSel}
              />
            ) : null}

            {this.state.sideshifts && this.state.sideshifts.length > 0 ? (
              <SideShifts
                sideshifts={this.state.sideshifts}
                selectedSideShift={this.state.selectedSideShift}
                onSideShiftSel={this.handleSideShiftSel}
              />
            ) : null}

            {this.state.forkpositioners &&
            this.state.forkpositioners.length > 0 ? (
              <Forkpositioners
                forkpositioners={this.state.forkpositioners}
                selectedForkpositioner={this.state.selectedForkpositioner}
                onForkpositionerSel={this.handleForkpositionerSel}
              />
            ) : null}

            {this.state.tyres && this.state.tyres.length > 0 ? (
              <Tyres
                tyres={this.state.tyres}
                selectedTyre={this.state.selectedTyre}
                onTyreSel={this.handleTyreSel}
              />
            ) : null}

            {this.state.upsweptexhausts && this.state.upsweptexhausts.length > 0 ? (
              <Upsweptexhausts
                upsweptexhausts={this.state.upsweptexhausts}
                selectedUpsweptexhaust={this.state.selectedUpsweptexhaust}
                onUpsweptexhaustSel={this.handleUpsweptexhaustSel}
              />
            ) : null}

            {this.state.coldstoreprots &&
            this.state.coldstoreprots.length > 0 ? (
              <ColdStoreProts
                coldstoreprots={this.state.coldstoreprots}
                selectedColdStoreProt={this.state.selectedColdStoreProt}
                onColdStoreProtSel={this.handleColdStoreProtSel}
              />
            ) : null}

            {this.state.reargrabs && this.state.reargrabs.length > 0 ? (
              <Reargrabs
                reargrabs={this.state.reargrabs}
                selectedReargrab={this.state.selectedReargrab}
                onReargrabSel={this.handleReargrabSel}
              />
            ) : null}

            {this.state.platforms && this.state.platforms.length > 0 ? (
              <Platforms
                platforms={this.state.platforms}
                selectedPlatform={this.state.selectedPlatform}
                onPlatformSel={this.handlePlatformSel}
              />
            ) : null}

            {this.state.armguards && this.state.armguards.length > 0 ? (
              <Armguards
                armguards={this.state.armguards}
                selectedArmguard={this.state.selectedArmguard}
                onArmguardSel={this.handleArmguardSel}
              />
            ) : null}

            {this.state.sideleverhydraulics &&
            this.state.sideleverhydraulics.length > 0 ? (
              <Sideleverhydraulics
                sideleverhydraulics={this.state.sideleverhydraulics}
                selectedSideleverhydraulic={
                  this.state.selectedSideleverhydraulic
                }
                onSideleverhydraulicSel={this.handleSideleverhydraulicSel}
              />
            ) : null}

            {this.state.steerings && this.state.steerings.length > 0 ? (
              <Steerings
                steerings={this.state.steerings}
                selectedSteering={this.state.selectedSteering}
                onSteeringSel={this.handleSteeringSel}
              />
            ) : null}

            {this.state.loadbackrests && this.state.loadbackrests.length > 0 ? (
              <Loadbackrests
                loadbackrests={this.state.loadbackrests}
                selectedLoadbackrest={this.state.selectedLoadbackrest}
                onLoadbackrestSel={this.handleLoadbackrestSel}
              />
            ) : null}

            {this.state.seats && this.state.seats.length > 0 ? (
              <Seats
                seats={this.state.seats}
                selectedSeat={this.state.selectedSeat}
                onSeatSel={this.handleSeatSel}
              />
            ) : null}

            {this.state.batterycompartments && this.state.batterycompartments.length > 0 ? (
              <Batterycompartments
                batterycompartments={this.state.batterycompartments}
                selectedBatterycompartment={this.state.selectedBatterycompartment}
                onBatterycompartmentSel={this.handleBatterycompartmentSel}
              />
            ) : null}


            
            {this.state.batterys && this.state.batterys.length > 0 ? (
              <Batterys
                batterys={this.state.batterys}
                selectedBattery={this.state.selectedBattery}
                onBatterySel={this.handleBatterySel}
                batteryConstraint = {this.state.batteryconstraint}
              />
            ) : null}

            
            {this.state.chargers && this.state.chargers.length > 0 ? (
              <Chargers
                chargers={this.state.chargers}
                selectedCharger={this.state.selectedCharger}
                onChargerSel={this.handleChargerSel}
              />
            ) : null}

            {this.state.bfss && this.state.bfss.length > 0 ? (
              <Bfs
                bfss={this.state.bfss}
                selectedBfs={this.state.selectedBfs}
                onBfsSel={this.handleBfsSel}
              />
            ) : null}

            {this.state.trolleys && this.state.trolleys.length > 0 ? (
              <Trolley
                trolleys={this.state.trolleys}
                selectedTrolley={this.state.selectedTrolley}
                onTrolleySel={this.handleTrolleySel}
              />
            ) : null}

            {this.state.blinkeys && this.state.blinkeys.length > 0 ? (
              <Blinkey
                blinkeys={this.state.blinkeys}
                selectedBlinkey={this.state.selectedBlinkey}
                onBlinkeySel={this.handleBlinkeySel}
              />
            ) : null}

            {this.state.sideextractionbatterys &&
            this.state.sideextractionbatterys.length > 0 ? (
              <Sideextractionbatterys
                sideextractionbatterys={this.state.sideextractionbatterys}
                selectedSideextractionbattery={
                  this.state.selectedSideextractionbattery
                }
                onSideextractionbatterySel={this.handleSideextractionbatterySel}
              />
            ) : null}

            {this.state.cabins && this.state.cabins.length > 0 ? (
              <Cabins
                cabins={this.state.cabins}
                selectedCabin={this.state.selectedCabin}
                onCabinSel={this.handleCabinSel}
              />
            ) : null}

            {this.state.heaters && this.state.heaters.length > 0 ? (
              <Heaters
                heaters={this.state.heaters}
                selectedHeater={this.state.selectedHeater}
                onHeaterSel={this.handleHeaterSel}
              />
            ) : null}

            {this.state.aircons && this.state.aircons.length > 0 ? (
              <Aircons
                aircons={this.state.aircons}
                selectedAircon={this.state.selectedAircon}
                onAirconSel={this.handleAirconSel}
              />
            ) : null}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ForkliftDetail;
