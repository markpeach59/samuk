import React, { Component } from "react";
import auth from "../services/authService";
import { getDealerDetail } from "../services/dealerService";

import Grid from "@material-ui/core/Grid";

import Masts from "./masts";
import Forks from "./forks";
import SideShifts from "./sideshifts";
import Forkpositioners from "./forkpositioner";
import Tyres from "./tyres";
import Seats from "./seats";
import Cabins from "./cabins";
import Valves from "./valves";
import ResetOptions from "./resetoptions";
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

import Rollers from "./rollers";
import Pincode from "./pincode";
import Displaywithcamera from "./displaywithcamera";
import Liftybutton from "./liftybutton";

import Controller from "./controller";

import Safetybluespot from "./safetybluespot";

import Upsweptexhausts from "./upsweptexhaust";

import Trolley from "./trolley";
import Blinkey from "./blinkey";
import Sideextractionbatterys from "./sideextractionbattery";

import Loadbackrests from "./loadbackrest";
import Steerings from "./steering";

import Batterycompartments from "./batterycompartment";


import Batterys from "./battery";
import Chargers from "./charger";
import Sparebatteries from "./sparebatteries";
import Engines from "./engines";

import Chassis from "./chassis";

import QuoteSave from "./quotesave";
import Offer from "./offer";
import Markup from "./markup";

import { getForkliftDetail } from "../services/forkliftDetailService";
import { savequote } from "../services/quotesService";

import Offertext from "./offertext";

import "typeface-roboto";

class ForkliftDetail extends Component {
  state = {};

  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });


    let restricted = false;

    if (user.dealerId){
      const { data: dealery } = await getDealerDetail(user.dealerId);

      //console.log("Dealer ", dealery);
      //getting this here as Filter values are set local in the code and not on MongoDB
      if (dealery.isRestricted) {
        restricted = true;
      }
    }
    console.log('User is restricted');

    const handle = this.props.match.params.modelName;
    //console.log("Params", handle);
    const { data: forky } = await getForkliftDetail(handle);
    console.log("Detail", forky);

    let initialbaseprice = forky.basePrice;
    if (restricted && forky.basePriceR ) initialbaseprice = forky.basePriceR;


    this.setState({
      model: forky.model,
      imgName: forky.imgName,
      engType: forky.engType,
      powertrain: forky.powertrain,
      iengine: forky.powertrain,

      liftcapacity: forky.capacity,

      modeldescription: forky.modeldescription,
      loadcenter: forky.loadcenter,
      defaulttyre: forky.defaulttyre,

      engines: forky.engines,

      chassis:forky.chassis,


      masts: forky.masts,
      valves: forky.valves,
      forks: forky.forks,
      sideshifts: forky.sideshift,
      forkpositioners: forky.forkpositioner,
      tyres: forky.tyres,

      seatrequired: forky.seatrequired,

      seats: forky.seat,
      coldstoreprots: forky.coldstoreprot,
      cabins: forky.cabin,

      upsweptexhausts: forky.upsweptexhaust,

      reargrabs: forky.reargrab,
      sideleverhydraulics: forky.sideleverhydraulic,
      platforms: forky.platform,
      armguards: forky.armguard,

      pincodes: forky.pincode,

      defaultroller:forky.defaultroller,
      rollers:forky.rollers,
      displaywithcameras:forky.displaywithcamera,
      liftybuttons:forky.liftybutton,

      controllers: forky.controllers,

      steerings: forky.steering,
      loadbackrests: forky.loadbackrest,
      fork2ds: forky.forks2d,

      heaters: forky.heater,
      aircons: forky.aircon,

      batterycompartments: forky.batterycompartment,

      batterys: forky.batteries,
      spares:forky.spares,

      defaultbattery:forky.defaultbattery,
      defaultcharger:forky.defaultcharger,

      optionalbatteries: forky.optionalbatteries,

      bfss: forky.bfs,

      safetybluespots:forky.safetybluespot,

      trolleys: forky.trolley,
      blinkeys: forky.blinkey,
      sideextractionbatterys: forky.sideextractionbattery,

      totalprice: initialbaseprice,
      baseprice: initialbaseprice,

      offer:forky.offer,
      saving:0,

      markup: 0,
      batteryconstraint: false,
    });

    
  }

  handleResetOptions = () => {
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

      selectedChassis: undefined,

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
      selectedSpare: undefined,

      selectedArmguard: undefined,
      selectedPlatform: undefined,

      selectedPincode: undefined,
      selectedRoller: undefined,
      selectedDisplaywithcamera: undefined,
      selectedLiftybutton: undefined,

      selectedController: undefined,

      selectedLoadbackrest: undefined,
      selectedSteering: undefined,

      selectedFork2d: undefined,
      selectedBfs: undefined,

      selectedSafetybluespot: undefined,

      selectedTrolley: undefined,
      selectedBlinkey: undefined,

      selectedSideextractionbattery: undefined,

      totalprice: this.state.baseprice,
      offer: this.state.offer,

      batteryconstraint: false,
    });
  };

  handleQuoteSave = async () => {
    const quote = {};

    quote.userid = this.state.user._id;
    quote.model = this.state.model;
    quote.price = this.state.totalprice;
    quote.markup = this.state.markup;

    quote.offer = this.state.offer;

    if (this.state.offer){

      if (this.state.defaultbattery) quote.saving = Math.round(quote.price * .10);
      // now override if an optional choice has been made
      if (this.state.selectedBattery) quote.saving = Math.round(quote.price * .15);
      
      quote.offerprice = quote.price - quote.saving;

    }


    quote.capacity = this.state.liftcapacity;
    quote.engtype = this.state.engType;
    quote.powertrain = this.state.powertrain;
    quote.baseprice = this.state.basePrice;

    quote.modeldescription = this.state.modeldescription;

    if (this.state.selectedEngine)
      quote.powertrain = this.state.selectedEngine.enginetype;


    // chassis, etc

    if (this.state.imgName) quote.imgname = this.state.imgName;

    if (this.state.selectedMast) quote.masttype = this.state.selectedMast;

    if (this.state.selectedMastSize){
      quote.mastsize = this.state.selectedMastSize.mastlength;
      quote.closedheight = this.state.selectedMastSize.closedheight;
      quote.freeliftheight = this.state.selectedMastSize.freeliftheight;

    }

    if (this.state.selectedValve)
      quote.valve = this.state.selectedValve.valvetype;

    if (this.state.selectedFork)
      quote.forks = this.state.selectedFork.forklength;
    if (this.state.selectedSideShift)
      quote.sideshift = this.state.selectedSideShift.sideshifttype;

    if (this.state.selectedForkpositioner) quote.forkpositioner = true;

    if (this.state.defaulttyre) quote.tyre = this.state.defaulttyre;

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

    if (this.state.defaultbattery)
      quote.battery = this.state.defaultbattery;
      // now override if an optional choice has been made
    if (this.state.selectedBattery)
      quote.battery = this.state.selectedBattery.batterytype;
    
    if (this.state.defaultcharger)
      quote.charger = this.state.defaultcharger;
      // now overide if optional

    if (this.state.selectedCharger)
      quote.charger = this.state.selectedCharger.chargertype;

    if (this.state.selectedSpare)
      quote.spare = this.state.selectedSpare.sparetype;

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

    if (this.state.selectedRoller) quote.roller = this.state.selectedRoller.rollertype;

    if (this.state.defaultroller && this.state.selectedRoller === undefined ) quote.roller = this.state.defaultroller;


    if (this.state.selectedDisplaywithcamera) quote.displaywithcamera = true;
    if (this.state.selectedLiftybutton) quote.liftybutton = true;
    if (this.state.selectedPincode) quote.pincode = this.state.selectedPincode.pincodetype;
    if (this.state.selectedController) quote.controller = this.state.selectedController.controllertype;

    if (this.state.selectedSafetybluespot) quote.safetybluespot = true;

    //console.log("Quote", quote);//being sent
    try {
      const x = await savequote(quote);
      //console.log("quote was", x);//recived back
      window.location = "/quotes/" + x.data._id; // goto quote display
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

  handleChassisSel = (chassis) => {
    const oldprice = this.state.selectedChassis
      ? this.state.selectedChassis.price
      : 0;

      const oldprice1 = this.state.selectedBattery
      ? this.state.selectedBattery.price
      : 0;

      const oldprice2 = this.state.selectedCharger
      ? this.state.selectedCharger.price
      : 0;

    const newprice = this.state.totalprice + chassis.price - oldprice - oldprice1 - oldprice2;

    console.log( "Chassis Selected", chassis );

    this.setState({
      selectedChassis: chassis,
      powertrain: chassis.label,
      batterys: chassis.batteries,
      chargers: undefined,
      selectedBattery: undefined,
      selectedCharger: undefined,
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
    const oldssprice = this.state.selectedSideShift
      ? this.state.selectedSideShift.price
      : 0;
      
     const oldfpprice = this.state.selectedForkpositioner
      ? this.state.selectedForkpositioner.price
      : 0;
      
      // price with latest sideshift - no FP selection enforced
      const newprice = this.state.totalprice + sideshift.price - oldssprice - oldfpprice;

    // now if we need to consider any valves that are available
  if ((this.state.valves !==undefined) && this.state.valves.length > 0 ){
    
    if(!this.state.selectedValve){
      //console.log("Adding first Valve")

      const adjustedprice = newprice + this.state.valves[0].price;
      this.setState({ selectedSideShift: sideshift, 
      	selectedForkpositioner: undefined,
        selectedValve: this.state.valves[0],
        totalprice: adjustedprice });

    } else {
      //console.log("Valve is already selected")
      this.setState({ selectedSideShift: sideshift, 
        selectedForkpositioner: undefined,
        totalprice: newprice });

    }
  } else {
    //console.log("No Valves are available")
    this.setState({ selectedSideShift: sideshift, 
      totalprice: newprice });


  }
  };


  handleForkpositionerSel = (forkpositioner) => {
  
    const oldssprice = this.state.selectedSideShift
       ? this.state.selectedSideShift.price
       : 0;
       
      const oldfpprice = this.state.selectedForkpositioner
       ? this.state.selectedForkpositioner.price
       : 0;
      
       // price with latest FP - no sideshift selection enforced
       const newprice = this.state.totalprice + forkpositioner.price - oldssprice - oldfpprice;
      
       // we are assuming valves are available if forkpositioner is an option
      if(!this.state.selectedValve){
        console.log("Adding 3rd+4th Valve");
        const adjustedprice = newprice + this.state.valves[1].price;
        this.setState({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[1],
          totalprice: adjustedprice
        });
      }
      else if (this.state.selectedValve === this.state.valves[0]){
        console.log("upgrade 3rd to 3rd+4th Valve");
        const oldvalveprice = this.state.valves[0].price;
        const adjustedprice = newprice + this.state.valves[1].price - oldvalveprice;
        this.setState({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[1],
          totalprice: adjustedprice
        });

      } else {
        console.log("3rd+4th Valve already selected")
        this.setState({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          totalprice: newprice,
        });

      }

 
    
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

  handleRollerSel = (roller) => {
    const oldprice = this.state.selectedRoller ? this.state.selectedRoller.price : 0;
    const newprice = this.state.totalprice + roller.price - oldprice;

    this.setState({ selectedRoller: roller, totalprice: newprice });
  };

  handlePincodeSel = (pincode) => {
    const oldprice = this.state.selectedPincode ? this.state.selectedPincode.price : 0;
    const newprice = this.state.totalprice + pincode.price - oldprice;

    this.setState({ selectedPincode: pincode, totalprice: newprice });
  };

  handleLiftybuttonSel = (liftybutton) => {
    const oldprice = this.state.selectedLiftybutton ? this.state.selectedLiftybutton.price : 0;
    const newprice = this.state.totalprice + liftybutton.price - oldprice;

    this.setState({ selectedLiftybutton: liftybutton, totalprice: newprice });
  };

  handleDisplaywithcameraSel = (displaywithcamera) => {
    const oldprice = this.state.selectedDisplaywithcamera ? this.state.selectedDisplaywithcamera.price : 0;
    const newprice = this.state.totalprice + displaywithcamera.price - oldprice;

    this.setState({ selectedDisplaywithcamera: displaywithcamera, totalprice: newprice });
  };

  handleControllerSel = (controller) => {
    const oldprice = this.state.selectedController
      ? this.state.selectedController.price
      : 0;
    const newprice = this.state.totalprice + controller.price - oldprice;

    this.setState({ selectedController: controller, totalprice: newprice });
  };

  handleSafetybluespotSel = (safetybluespot) => {
    const oldprice = this.state.selectedSafetybluespot ? this.state.selectedSafetybluespot.price : 0;
    const newprice = this.state.totalprice + safetybluespot.price - oldprice;

    this.setState({ selectedSafetybluespot: safetybluespot, totalprice: newprice });
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

  handleSpareSel = (spare) => {
    
    const newprice = this.state.totalprice + spare.price

    if (!this.state.selectedBattery){
      const battery = this.state.batterys[0];
      const newprice = this.state.totalprice + spare.price + battery.price;

      this.setState({ selectedSpare: spare, selectedBattery: battery, totalprice: newprice });
    }
    else{
      const newprice = this.state.totalprice + spare.price;

      this.setState({ selectedSpare: spare, totalprice: newprice });

    }


    this.setState({ selectedSpare: spare, totalprice: newprice });
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

    //console.log("modeldescription", this.state.modeldescription);
   
    return (
      <React.Fragment>
    
          {this.state.offer ? <div>
          <Offertext />
</div>: null}
       

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h2>{this.state.model}</h2>
            {this.state.imgName && this.state.imgName.length > 0 ? (
              <ForkliftImg imgName={this.state.imgName} />
            ) : null}

            
            <br /> {this.state.engType}<br />
            
            <ConditionalWrapper
              condition={this.state.powertrain}
              wrapper={(children) => (
                <React.Fragment>
                  {children}<br />
                </React.Fragment>
              )}
            >
              {this.state.powertrain}
            </ConditionalWrapper>

  
             
            Capacity : {this.state.liftcapacity}Kg 
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

            {this.state.modeldescription ? this.state.modeldescription.map(item => {return (<ConditionalWrapper key={item._id} condition={item.description} wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />      
                </React.Fragment>
              )}>{item.description}</ConditionalWrapper>)}): null}


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
              {this.state.selectedMast}
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
                ? this.state.selectedMastSize.mastlength + "mm"
                : null}

              {this.state.selectedMastSize &&
              this.state.selectedMastSize.closedheight
                ? " , " + this.state.selectedMastSize.closedheight + "mm Closed"
                : null}

              {this.state.selectedMastSize &&
              this.state.selectedMastSize.freeliftheight
                ? " , " + this.state.selectedMastSize.freeliftheight + "mm Free Lift"
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
                ? this.state.selectedValve.valvetype + " Valve"
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
                ? this.state.selectedFork.forklength + "mm Forks"
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
                ? this.state.selectedFork2d.forklength + "mm Forks"
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
                ? this.state.selectedSideShift.sideshifttype + " Side Shift"
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
              condition={this.state.selectedController}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedController
                ? this.state.selectedController.controllertype + "Controller"
                : null}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.defaultroller}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {(this.state.defaultroller && !this.state.selectedRoller )? this.state.defaultroller + " Roller": null}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.selectedRoller}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedRoller? this.state.selectedRoller.rollertype + " Roller": null}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.selectedLiftybutton}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                </React.Fragment>
              )}
            >
              {"2 Sided Lifty Button, "}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.selectedDisplaywithcamera}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedDisplaywithcamera ? "Display with camera" : null}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.selectedPincode}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedPincode ? "Pincode" : null}
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
              {this.state.selectedArmguard ? "Arm Guard" : null}
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
              {this.state.selectedPlatform ? "Platform " : null}
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
              condition={this.state.defaulttyre && !this.state.selectedTyre}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.defaulttyre  + " Tyres"}
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
                ? this.state.selectedTyre.tyretype
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
                ? this.state.selectedBatterycompartment.batterycompartmenttype + " Battery Compartment"
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
                ? this.state.selectedBattery.batterytype + " Battery"
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
                ? this.state.selectedCharger.chargertype + " Charger"
                : null}
            </ConditionalWrapper>


            <ConditionalWrapper
              condition={this.state.selectedSpare}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedSpare
                ? this.state.selectedSpare.sparetype + " Spare Battery"
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
              {this.state.selectedBfs ? "BFS" : null}
            </ConditionalWrapper>
            
            <ConditionalWrapper
              condition={this.state.selectedSafetybluespot}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedSafetybluespot ? "Safety Blue Spot" : null}
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
              {this.state.selectedTrolley ? "Trolley" : null}
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
              {this.state.selectedBlinkey ? "Blinkey" : null}
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
                ? "Side Extraction Battery"
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
              {this.state.selectedLoadbackrest ? "Load Backrest" : null}
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
                ? this.state.selectedSeat.seattype + " Seat"
                : null}
            </ConditionalWrapper>

           

            <ConditionalWrapper
              condition={this.state.cabins !== undefined && this.state.cabins.length > 0}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedCabin
                ? this.state.selectedCabin.cabinoption
                : "Plastic top cover"}
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

            <br /><br />
            {this.state.engType !== "Warehouse" ? (
              <React.Fragment>
                OPS Safety System
                <br />
                Amber Beacon
                <br />
                Reverse Alarm
                <br />
              </React.Fragment>
            ) : null}
            

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

            {this.state.engType !== "Warehouse" ? (
              <React.Fragment>
                Full LED Lighting
                <br />
              </React.Fragment>
            ) : null}

<ConditionalWrapper
              condition={this.state.defaultbattery &&! this.state.selectedBattery}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.defaultbattery ? this.state.defaultbattery + " Battery": null}
            </ConditionalWrapper>


<ConditionalWrapper
              condition={this.state.defaultcharger}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.defaultcharger ? this.state.defaultcharger + " Charger": null}
            </ConditionalWrapper>
            <br />
            
{typeof this.state.modeldescription !== 'undefined' && this.state.modeldescription.length > 0 && this.state.modeldescription[0].description === "Sit-on Reach" ? (
              <React.Fragment>
                Note for Mast sizes above 9m please call for details
                <br />
              </React.Fragment>
            ) : null}



<br />
            {( !this.state.selectedSeat && this.state.seatrequired ) ? (
              <React.Fragment>
                Please select a Seat Option
              </React.Fragment>
            ) : null}

<br /><br />

            <strong>
              Quote Price : £
              {this.state.totalprice + parseInt(this.state.markup)}
            </strong>

            <Offer price={this.state.totalprice} offeron={this.state.offer} bigger={this.state.selectedBattery} />
            <QuoteSave onQuoteSave={this.handleQuoteSave} />

            <Markup currentMarkup={this.state.markup} onMarkup={this.handleMarkup} />

          </Grid>
          <Grid item xs={8}>
            
            <ResetOptions onResetOptions={this.handleResetOptions} />

            {this.state.chassis && this.state.chassis.length > 0 ? (
              <Chassis
                chassis={this.state.chassis}
                selectedChassis={this.state.selectedChassis}
                onChassisSel={this.handleChassisSel}
              />
            ) : null}
        

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
                selectedForkpositioner={this.state.selectedForkpositioner}
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

            {this.state.controllers && this.state.controllers.length > 0 ? (
              <Controller
                controllers={this.state.controllers}
                selectedController={this.state.selectedController}
                onControllerSel={this.handleControllerSel}
              />
            ) : null}

            {this.state.tyres && this.state.tyres.length > 0 ? (
              <Tyres
                tyres={this.state.tyres}
                selectedTyre={this.state.selectedTyre}
                onTyreSel={this.handleTyreSel}
              />
            ) : null}

            {this.state.safetybluespots && this.state.safetybluespots.length > 0 ? (
              <Safetybluespot
                safetybluespots={this.state.safetybluespots}
                selectedSafetybluespot={this.state.selectedSafetybluespot}
                onSafetybluespotSel={this.handleSafetybluespotSel}
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

{this.state.rollers && this.state.rollers.length > 0 ? (
              <Rollers
                rollers={this.state.rollers}
                selectedRoller={this.state.selectedRoller}
                onRollerSel={this.handleRollerSel}
              />
            ) : null}

{this.state.liftybuttons && this.state.liftybuttons.length > 0 ? (
              <Liftybutton
                liftybuttons={this.state.liftybuttons}
                selectedLiftybutton={this.state.selectedLiftybutton}
                onLiftybuttonSel={this.handleLiftybuttonSel}
              />
            ) : null}

{this.state.displaywithcameras && this.state.displaywithcameras.length > 0 ? (
              <Displaywithcamera
                displaywithcameras={this.state.displaywithcameras}
                selectedDisplaywithcamera={this.state.selectedDisplaywithcamera}
                onDisplaywithcameraSel={this.handleDisplaywithcameraSel}
              />
            ) : null}


            {this.state.pincodes && this.state.pincodes.length > 0 ? (
              <Pincode
                pincodes={this.state.pincodes}
                selectedPincode={this.state.selectedPincode}
                onPincodeSel={this.handlePincodeSel}
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

            {this.state.spares && this.state.spares.length > 0 ? (
              <Sparebatteries
                spares={this.state.spares}
                selectedSpare={this.state.selectedSpare}
                onSpareSel={this.handleSpareSel}
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
