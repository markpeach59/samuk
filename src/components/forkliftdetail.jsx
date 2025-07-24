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

import Halolight from "./halolight";
import Safetybluespot from "./safetybluespot";

import Upsweptexhausts from "./upsweptexhaust";

import Precleaners from "./precleaner";
import Heavydutyairfilters from "./heavydutyairfilter";

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

import Voltage from "./voltage";
import Chassis from "./chassis";

import QuoteSave from "./quotesave";
import Offer from "./offer";
import Markup from "./markup";

import { getForkliftDetail } from "../services/forkliftDetailService";
import { savequote } from "../services/quotesService";

import Offertext from "./offertext";


import Typography from "@material-ui/core/Typography";

import "typeface-roboto";

class ForkliftDetail extends Component {
  state = {};

  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });

    
    //console.log('User is restricted');

    const handle = this.props.match.params.modelName;
    //console.log("Params", handle);
    const { data: forky } = await getForkliftDetail(handle);
    //console.log("Detail", forky);

    let initialbaseprice = forky.basePrice;

    let percentageOff = forky.percentOffBase;
    if (percentageOff){
        initialbaseprice = initialbaseprice - Math.floor(initialbaseprice * percentageOff / 100);
    }


    let initialChassis = forky.chassis;
    

    this.setState({
      model: forky.model,
      imgName: forky.imgName,
      engType: forky.engType,
      powertrain: forky.powertrain,
      iengine: forky.powertrain,

      liftcapacity: forky.capacity,

      modeldescription: forky.modeldescription,
      series:forky.series,
     
      loadcenter: forky.loadcenter,
      defaulttyre: forky.defaulttyre,

      engines: forky.engines,

      chassisrequired: forky.chassisrequired,
      voltagerequired: forky.voltagerequired,
      voltage:forky.voltage,

      chassis:initialChassis,

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

      halolights:forky.halolight,
      upsweptexhausts: forky.upsweptexhaust,
      precleaners: forky.precleaner,
      heavydutyairfilters: forky.heavydutyairfilter,

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
      chargers:forky.chargers,
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

      percentOffBase: forky.percentOffBase,

      offer:forky.offer,
      saving:0,

      // New discount-related state
      hasDiscount: false,
      discountedPrice: null,
      discountPercentage: 0,
      discountAmount: 0,

      markup: 0,
      batteryconstraint: false,
    }, () => {
      // Calculate initial discount after state is set
      const discountData = this.calculateDiscount(initialbaseprice);
      this.setState({
        hasDiscount: discountData.hasDiscount,
        discountedPrice: discountData.discountedPrice,
        discountPercentage: discountData.percentage,
        discountAmount: discountData.amount,
      });
    });

    
  }

  // Centralized discount calculation method
  calculateDiscount = (price, stateOverrides = {}) => {
    const currentState = { ...this.state, ...stateOverrides };
    
    let percentage = 0;
    let hasDiscount = false;
    
    // Check all discount conditions
    if (currentState.offer) {
      hasDiscount = true;
      if (currentState.model === 'FBAX50-YWL') {
        percentage = 0.03;
      } else if (currentState.selectedBattery) {
        percentage = 0.15;
      } else {
        percentage = 0.10;
      }
    }
    
    if (currentState.selectedVoltage?.label[0] === 'S') {
      hasDiscount = true;
      percentage = 0.15;
    }
    
    if (currentState.selectedVoltage?.label[0] === 'H') {
      hasDiscount = true;
      percentage = 0.10;
    }
    
    if (currentState.modeldescription?.[0]?.description === 'AA Series') {
      hasDiscount = true;
      percentage = 0.025;
    }
    
    if (currentState.selectedChassis?.label === 'Lithium Version') {
      hasDiscount = true;
      percentage = 0.03;
    }
    
    // IMPORTANT: Entry Level voltage overrides all discounts
    if (currentState.selectedVoltage?.label[0] === 'L') {
      hasDiscount = false;
      percentage = 0;
    }
    
    const amount = hasDiscount ? Math.round(price * percentage) : 0;
    const discountedPrice = hasDiscount ? price - amount : null;
    
    return { 
      hasDiscount, 
      percentage, 
      amount, 
      discountedPrice 
    };
  };

  // Helper method to update state with discount calculation
  updateStateWithDiscount = (newState, newPrice, stateOverrides = {}) => {
    const discountData = this.calculateDiscount(newPrice, stateOverrides);
    this.setState({
      ...newState,
      totalprice: newPrice,
      hasDiscount: discountData.hasDiscount,
      discountedPrice: discountData.discountedPrice,
      discountPercentage: discountData.percentage,
      discountAmount: discountData.amount,
    });
  };

  handleResetOptions = () => {
    //console.log("Been Reset");

    let dbatt = this.state.defaultbattery;
    let dcharg = this.state.defaultcharger;

    console.log( 'VR ', this.state.voltagerequired);
    if (this.state.voltagerequired){
      dbatt = undefined;
      dcharg = undefined;
    }

    this.setState({
      powertrain: this.state.iengine,
      selectedEngine: undefined,
      selectedMast: undefined,
      selectedMastSize: undefined,
      selectedValve: undefined,
      selectedFork: undefined,
      selectedSideShift: undefined,
      selectedForkpositioner: undefined,

      selectedVoltage: undefined,

      selectedChassis: undefined,
      batterys: undefined,
      chargers: undefined,

      selectedTyre: undefined,
      selectedColdStoreProt: undefined,
      selectedSeat: undefined,
      selectedCabin: undefined,

      selectedHalolight: undefined,
      selectedUpsweptexhaust: undefined,
      selectedPrecleaner: undefined,
      selectedHeavydutyairfilter: undefined,

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

      // Reset discount-related state
      hasDiscount: false,
      discountedPrice: null,
      discountPercentage: 0,
      discountAmount: 0,

      batteryconstraint: false,

      defaultbattery: dbatt,
      defaultcharger: dcharg,

    });
  };

  handleQuoteSave = async () => {
    const quote = {};

    quote.userid = this.state.user._id;
    quote.model = this.state.model;
    quote.price = this.state.totalprice;
    quote.markup = this.state.markup;

    quote.offer = this.state.offer;

    // Store all discount-related data
    quote.hasDiscount = this.state.hasDiscount;
    quote.discountPercentage = this.state.discountPercentage;
    quote.discountAmount = this.state.discountAmount;
    quote.discountedPrice = this.state.discountedPrice;

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

    if (this.state.selectedHalolight) quote.halolight = true;
    if (this.state.selectedUpsweptexhaust) quote.upsweptexhaust = true;
    if (this.state.selectedPrecleaner) quote.precleaner = true;
    if (this.state.selectedHeavydutyairfilter) quote.heavydutyairfilter = true;

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

    this.updateStateWithDiscount({
      selectedEngine: engine,
      powertrain: engine.enginetype,
    }, newprice, {
      selectedEngine: engine,
    });
  };

  handleVoltageSel = (voltage) => {

    let baseprice = this.state.selectedVoltage
    ? this.state.selectedVoltage.price
    : 0;

    let newbaseprice = voltage.price;
    
    

    console.log( 'Prices ', newbaseprice,' ', baseprice);


      const oldprice = this.state.selectedBattery
      ? this.state.selectedBattery.price
      : 0;


    const newprice = this.state.totalprice + newbaseprice - baseprice - oldprice;

    console.log( "Voltage Selected", voltage );

    this.updateStateWithDiscount({
      selectedVoltage: voltage,
      defaultbattery: voltage.defaultbattery,
      batterys: voltage.batteries,
      selectedBattery: undefined,
    }, newprice, {
      selectedVoltage: voltage,
      selectedBattery: undefined,
    });
  };

  handleChassisSel = (chassis) => {


    // old price cannot be a const 
    let oldprice = this.state.selectedChassis
      ? this.state.selectedChassis.price
      : 0;

      let percentageOff = this.state.percentOffBase;
      if (percentageOff && oldprice > 0 ){
        //console.log('Percentage Off', percentageOff);
        oldprice = oldprice - Math.floor(oldprice * percentageOff / 100);
      }


      const oldprice1 = this.state.selectedBattery
      ? this.state.selectedBattery.price
      : 0;

      const oldprice2 = this.state.selectedCharger
      ? this.state.selectedCharger.price
      : 0;

    
    let chassisprice = chassis.price;
    
    if (percentageOff){
        chassisprice = chassisprice - Math.floor(chassisprice * percentageOff / 100);
    }
    
    
    const newprice = this.state.totalprice + chassisprice - oldprice - oldprice1 - oldprice2;

    console.log( "Chassis Selected", chassis );

    this.updateStateWithDiscount({
      selectedChassis: chassis,
      powertrain: chassis.label,
      batterys: chassis.batteries,
      chargers: undefined,
      selectedBattery: undefined,
      selectedCharger: undefined,
    }, newprice, {
      selectedChassis: chassis,
      selectedBattery: undefined,
      selectedCharger: undefined,
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

    this.updateStateWithDiscount({
      selectedMastSize: mastsize,
      selectedMast: masttype,
    }, newprice, {
      selectedMastSize: mastsize,
      selectedMast: masttype,
    });

    //console.log("VVV", mastsize);
  };

  handleForkSel = (fork) => {
    const oldprice = this.state.selectedFork
      ? this.state.selectedFork.price
      : 0;
    const newprice = this.state.totalprice + fork.price - oldprice;

    this.updateStateWithDiscount({ selectedFork: fork }, newprice, { selectedFork: fork });
  };

  handleFork2dSel = (fork2d) => {
    const oldprice = this.state.selectedFork2d
      ? this.state.selectedFork2d.price
      : 0;
    const newprice = this.state.totalprice + fork2d.price - oldprice;

    this.updateStateWithDiscount({ selectedFork2d: fork2d }, newprice, { selectedFork2d: fork2d });
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
      this.updateStateWithDiscount({ 
        selectedSideShift: sideshift, 
        selectedForkpositioner: undefined,
        selectedValve: this.state.valves[0],
      }, adjustedprice, { 
        selectedSideShift: sideshift, 
        selectedForkpositioner: undefined,
        selectedValve: this.state.valves[0],
      });

    } else {
      //console.log("Valve is already selected")
      this.updateStateWithDiscount({ 
        selectedSideShift: sideshift, 
        selectedForkpositioner: undefined,
      }, newprice, { 
        selectedSideShift: sideshift, 
        selectedForkpositioner: undefined,
      });

    }
  } else {
    //console.log("No Valves are available")
    this.updateStateWithDiscount({ 
      selectedSideShift: sideshift, 
    }, newprice, { 
      selectedSideShift: sideshift, 
    });

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
      
       if (this.state.valves === undefined || this.state.valves.length === 0){
        //console.log("No Valves are available")
        this.updateStateWithDiscount({ 
          selectedSideShift: undefined, 
          selectedForkpositioner: forkpositioner,
        }, newprice, { 
          selectedSideShift: undefined, 
          selectedForkpositioner: forkpositioner,
        });
        return;}

        if (this.state.valves.length === 1 && this.state.selectedValve === undefined){
console.log("Adding 3rd+4th Valve - only choice of valves");
        const adjustedprice = newprice + this.state.valves[0].price;
        this.updateStateWithDiscount({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[0],
        }, adjustedprice, {
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[0],
        });
return

        }


        if (this.state.valves.length === 1 && this.state.selectedValve === this.state.valves[0]){
console.log(" 3rd+4th Valve - already choosen");
        
        this.updateStateWithDiscount({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
        }, newprice, {
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
        });
return

        }

       // we are assuming valves are available if forkpositioner is an option
      if(!this.state.selectedValve){
        console.log("Adding 3rd+4th Valve");
        const adjustedprice = newprice + this.state.valves[1].price
        this.updateStateWithDiscount({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[1],
        }, adjustedprice, {
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[1],
        });
      }
      else if (this.state.selectedValve === this.state.valves[0]){
        console.log("upgrade 3rd to 3rd+4th Valve");
        const oldvalveprice = this.state.valves[0].price;
        const adjustedprice = newprice + this.state.valves[1].price - oldvalveprice;
        this.updateStateWithDiscount({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[1],
        }, adjustedprice, {
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
          selectedValve: this.state.valves[1],
        });

      } else {
        console.log("3rd+4th Valve already selected")
        this.updateStateWithDiscount({
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
        }, newprice, {
          selectedSideShift: undefined,
          selectedForkpositioner: forkpositioner,
        });

      }

 
    
  };

  handleValveSel = (valve) => {
    const oldprice = this.state.selectedValve
      ? this.state.selectedValve.price
      : 0;
    const newprice = this.state.totalprice + valve.price - oldprice;

    this.updateStateWithDiscount({ selectedValve: valve }, newprice, { selectedValve: valve });
  };

  handleReargrabSel = (reargrab) => {
    const oldprice = this.state.selectedReargrab
      ? this.state.selectedReargrab.price
      : 0;
    const newprice = this.state.totalprice + reargrab.price - oldprice;

    this.updateStateWithDiscount({ selectedReargrab: reargrab }, newprice, { selectedReargrab: reargrab });
  };

  handleSideleverhydraulicSel = (sideleverhydraulic) => {
    const oldprice = this.state.selectedSideleverhydraulic
      ? this.state.selectedSideleverhydraulic.price
      : 0;
    const newprice =
      this.state.totalprice + sideleverhydraulic.price - oldprice;

    this.updateStateWithDiscount({
      selectedSideleverhydraulic: sideleverhydraulic,
    }, newprice, { selectedSideleverhydraulic: sideleverhydraulic });
  };

  handlePlatformSel = (platform) => {
    const oldprice = this.state.selectedPlatform
      ? this.state.selectedPlatform.price
      : 0;
    const newprice = this.state.totalprice + platform.price - oldprice;

    this.updateStateWithDiscount({ selectedPlatform: platform }, newprice, { selectedPlatform: platform });
  };

  handleArmguardSel = (armguard) => {
    const oldprice = this.state.selectedArmguard
      ? this.state.selectedArmguard.price
      : 0;
    const newprice = this.state.totalprice + armguard.price - oldprice;

    this.updateStateWithDiscount({ selectedArmguard: armguard }, newprice, { selectedArmguard: armguard });
  };

  handleBfsSel = (bfs) => {
    const oldprice = this.state.selectedBfs ? this.state.selectedBfs.price : 0;
    const newprice = this.state.totalprice + bfs.price - oldprice;

    this.updateStateWithDiscount({ selectedBfs: bfs }, newprice, { selectedBfs: bfs });
  };

  handleRollerSel = (roller) => {
    const oldprice = this.state.selectedRoller ? this.state.selectedRoller.price : 0;
    const newprice = this.state.totalprice + roller.price - oldprice;

    this.updateStateWithDiscount({ selectedRoller: roller }, newprice, { selectedRoller: roller });
  };

  handlePincodeSel = (pincode) => {
    const oldprice = this.state.selectedPincode ? this.state.selectedPincode.price : 0;
    const newprice = this.state.totalprice + pincode.price - oldprice;

    this.updateStateWithDiscount({ selectedPincode: pincode }, newprice, { selectedPincode: pincode });
  };

  handleLiftybuttonSel = (liftybutton) => {
    const oldprice = this.state.selectedLiftybutton ? this.state.selectedLiftybutton.price : 0;
    const newprice = this.state.totalprice + liftybutton.price - oldprice;

    this.updateStateWithDiscount({ selectedLiftybutton: liftybutton }, newprice, { selectedLiftybutton: liftybutton });
  };

  handleDisplaywithcameraSel = (displaywithcamera) => {
    const oldprice = this.state.selectedDisplaywithcamera ? this.state.selectedDisplaywithcamera.price : 0;
    const newprice = this.state.totalprice + displaywithcamera.price - oldprice;

    this.updateStateWithDiscount({ selectedDisplaywithcamera: displaywithcamera }, newprice, { selectedDisplaywithcamera: displaywithcamera });
  };

  handleControllerSel = (controller) => {
    const oldprice = this.state.selectedController
      ? this.state.selectedController.price
      : 0;
    const newprice = this.state.totalprice + controller.price - oldprice;

    this.updateStateWithDiscount({ selectedController: controller }, newprice, { selectedController: controller });
  };

  handleSafetybluespotSel = (safetybluespot) => {
    const oldprice = this.state.selectedSafetybluespot ? this.state.selectedSafetybluespot.price : 0;
    const newprice = this.state.totalprice + safetybluespot.price - oldprice;

    this.updateStateWithDiscount({ selectedSafetybluespot: safetybluespot }, newprice, { selectedSafetybluespot: safetybluespot });
  };


  handleTrolleySel = (trolley) => {
    const oldprice = this.state.selectedTrolley
      ? this.state.selectedTrolley.price
      : 0;
    const newprice = this.state.totalprice + trolley.price - oldprice;

    this.updateStateWithDiscount({ selectedTrolley: trolley }, newprice, { selectedTrolley: trolley });
  };

  handleBlinkeySel = (blinkey) => {
    const oldprice = this.state.selectedBlinkey
      ? this.state.selectedBlinkey.price
      : 0;
    const newprice = this.state.totalprice + blinkey.price - oldprice;

    this.updateStateWithDiscount({ selectedBlinkey: blinkey }, newprice, { selectedBlinkey: blinkey });
  };

  handleLoadbackrestSel = (loadbackrest) => {
    const oldprice = this.state.selectedLoadbackrest
      ? this.state.selectedLoadbackrest.price
      : 0;
    const newprice = this.state.totalprice + loadbackrest.price - oldprice;

    this.updateStateWithDiscount({ selectedLoadbackrest: loadbackrest }, newprice, { selectedLoadbackrest: loadbackrest });
  };

  handleSteeringSel = (steering) => {
    const oldprice = this.state.selectedSteering
      ? this.state.selectedSteering.price
      : 0;
    const newprice = this.state.totalprice + steering.price - oldprice;

    this.updateStateWithDiscount({ selectedSteering: steering }, newprice, { selectedSteering: steering });
  };

  handleTyreSel = (tyre) => {
    const oldprice = this.state.selectedTyre
      ? this.state.selectedTyre.price
      : 0;
    const newprice = this.state.totalprice + tyre.price - oldprice;

    this.updateStateWithDiscount({ selectedTyre: tyre }, newprice, { selectedTyre: tyre });
  };

  handleHalolight = (halolight) => {
    const oldprice = this.state.selectedHalolight
      ? this.state.selectedHalolight.price
      : 0;
    const newprice = this.state.totalprice + halolight.price - oldprice;

    this.updateStateWithDiscount({ selectedHalolight: halolight }, newprice, { selectedHalolight: halolight });
  };

  handleUpsweptexhaustSel = (upsweptexhaust) => {
    const oldprice = this.state.selectedUpsweptexhaust
      ? this.state.selectedUpsweptexhaust.price
      : 0;
    const newprice = this.state.totalprice + upsweptexhaust.price - oldprice;

    this.updateStateWithDiscount({ selectedUpsweptexhaust: upsweptexhaust }, newprice, { selectedUpsweptexhaust: upsweptexhaust });
  };

  handlePrecleanerSel = (precleaner) => {
    const oldprice = this.state.selectedPrecleaner
      ? this.state.selectedPrecleaner.price
      : 0;
    const newprice = this.state.totalprice + precleaner.price - oldprice;

    this.updateStateWithDiscount({ selectedPrecleaner: precleaner }, newprice, { selectedPrecleaner: precleaner });
  };

  handleHeavydutyairfilterSel = (heavydutyairfilter) => {
    const oldprice = this.state.selectedHeavydutyairfilter
      ? this.state.selectedHeavydutyairfilter.price
      : 0;
    const newprice = this.state.totalprice + heavydutyairfilter.price - oldprice;

    this.updateStateWithDiscount({ selectedHeavydutyairfilter: heavydutyairfilter }, newprice, { selectedHeavydutyairfilter: heavydutyairfilter });
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

      this.updateStateWithDiscount({ 
        selectedBatterycompartment: batterycompartment, 
        batteryconstraint: constraint,
      }, newprice, { 
        selectedBatterycompartment: batterycompartment, 
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

      this.updateStateWithDiscount({ 
        selectedBatterycompartment: batterycompartment, 
        selectedBattery: this.state.batterys[0],
        selectedCharger: undefined,
        chargers: this.state.batterys[0].chargers, 
        batteryconstraint: constraint,
      }, adjustedprice, { 
        selectedBatterycompartment: batterycompartment, 
        selectedBattery: this.state.batterys[0],
      });

    

  }


      } else {

    

      console.log('Standard');

      newprice =
      this.state.totalprice + batterycompartment.price - oldprice;
      

      this.updateStateWithDiscount({ 
        selectedBatterycompartment: batterycompartment, 
        batteryconstraint: constraint,
      }, newprice, { 
        selectedBatterycompartment: batterycompartment, 
      });
      

  }
  
  
  };

  handleBatterySel = (battery) => {
    const oldprice = this.state.selectedBattery
      ? this.state.selectedBattery.price
      : 0;

    const newprice =
      this.state.totalprice + battery.price - oldprice;

    this.updateStateWithDiscount({
      selectedBattery: battery,
    }, newprice, { selectedBattery: battery });

/*
    this.setState({
      selectedBattery: battery,
      selectedCharger: undefined,
      chargers: battery.chargers,
      totalprice: newprice,
    });
*/
  };

  handleChargerSel = (charger) => {
    const oldprice = this.state.selectedCharger
      ? this.state.selectedCharger.price
      : 0;
    const newprice = this.state.totalprice + charger.price - oldprice;

    this.updateStateWithDiscount({ selectedCharger: charger }, newprice, { selectedCharger: charger });
  };

  handleSpareSel = (spare) => {
    
    // calc new price here - but repeated calc below - this line not needed
    const newprice = this.state.totalprice + spare.price

    // if optional battery upgrade exists - but not selected - select this as well as spare
    if (this.state.batterys !== undefined && this.state.batterys.length > 0 && !this.state.selectedBattery){
      const battery = this.state.batterys[0];
      const newprice = this.state.totalprice + spare.price + battery.price;

      this.updateStateWithDiscount({ selectedSpare: spare, selectedBattery: battery }, newprice, { selectedSpare: spare, selectedBattery: battery });
    }
    else{
      const newprice = this.state.totalprice + spare.price;

      this.updateStateWithDiscount({ selectedSpare: spare }, newprice, { selectedSpare: spare });

    }
  };

  handleSideextractionbatterySel = (sideextractionbattery) => {
    const oldprice = this.state.selectedSideextractionbattery
      ? this.state.selectedSideextractionbattery.price
      : 0;
    const newprice =
      this.state.totalprice + sideextractionbattery.price - oldprice;

    this.updateStateWithDiscount({
      selectedSideextractionbattery: sideextractionbattery,
    }, newprice, { selectedSideextractionbattery: sideextractionbattery });
  };

  handleSeatSel = (seat) => {
    const oldprice = this.state.selectedSeat
      ? this.state.selectedSeat.price
      : 0;
    const newprice = this.state.totalprice + seat.price - oldprice;

    this.updateStateWithDiscount({ selectedSeat: seat }, newprice, { selectedSeat: seat });
  };

  handleCabinSel = (cabin) => {
    const oldprice = this.state.selectedCabin
      ? this.state.selectedCabin.price
      : 0;
    const newprice = this.state.totalprice + cabin.price - oldprice;

    this.updateStateWithDiscount({ selectedCabin: cabin }, newprice, { selectedCabin: cabin });
  };

  handleColdStoreProtSel = (coldstoreprot) => {
    const oldprice = this.state.selectedColdStoreProt
      ? this.state.selectedColdStoreProt.price
      : 0;
    const newprice = this.state.totalprice + coldstoreprot.price - oldprice;

    this.updateStateWithDiscount({
      selectedColdStoreProt: coldstoreprot,
    }, newprice, { selectedColdStoreProt: coldstoreprot });
  };

  handleHeaterSel = (heater) => {
    const oldprice = this.state.selectedHeater
      ? this.state.selectedHeater.price
      : 0;
    const newprice = this.state.totalprice + heater.price - oldprice;

    this.updateStateWithDiscount({ selectedHeater: heater }, newprice, { selectedHeater: heater });
  };

  handleAirconSel = (aircon) => {
    const oldprice = this.state.selectedAircon
      ? this.state.selectedAircon.price
      : 0;
    const newprice = this.state.totalprice + aircon.price - oldprice;

    this.updateStateWithDiscount({ selectedAircon: aircon }, newprice, { selectedAircon: aircon });
  };

  

  render() {
    const ConditionalWrapper = ({ condition, wrapper, children }) =>
      condition ? wrapper(children) : null;

     if (this.state.modeldescription && this.state.modeldescription[0].description==='Available - POA')
        return ( <React.Fragment><h2>{this.state.model}</h2><h3>Available - POA</h3></React.Fragment>);
   
    return (
      <React.Fragment>
    
          {this.state.offer ? <div>
          <Offertext model={this.state.model}/>
</div>: null}

{( this.state.modeldescription && this.state.modeldescription[0].description==='AX Series' )? <div>
          <Offertext model={this.state.model}/>
</div>: null}

{( this.state.modeldescription && this.state.modeldescription[0].description==='AA Series' ) ? (
            <Offertext model={'AA'} />
            ): null}


{( this.state.engType && this.state.engType==='Reach' ) ? (
             <Offertext model={'Reach'} />
             ): null}


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

            {( this.state.voltagerequired && !this.state.selectedVoltage ) ? (
              <React.Fragment>
                 <Typography style={{color: 'red'}}>Please select Entry Level, Standard or Heavy Duty Battery Model</Typography>
              </React.Fragment>
            ) : null}
  
             
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


            
            {this.state.model ==='FDTA25' && !this.state.selectedEngine ? <React.Fragment>
                  M Series
                  <br />      
                </React.Fragment>:null }

            {this.state.model === 'FDTA25' && this.state.selectedEngine ? <React.Fragment>
                  A Series
                  <br />      
                </React.Fragment>:null }

                {this.state.model === 'FDTA30' && !this.state.selectedEngine ? <React.Fragment>
                  M Series
                  <br />      
                </React.Fragment>:null }

            {this.state.model === 'FDTA30' && this.state.selectedEngine ? <React.Fragment>
                  A Series
                  <br />      
                </React.Fragment>:null }

                {this.state.model === 'FDTA35' && !this.state.selectedEngine ? <React.Fragment>
                  M Series
                  <br />      
                </React.Fragment>:null }

            {this.state.model === 'FDTA35' && this.state.selectedEngine ? <React.Fragment>
                  A Series
                  <br />      
                </React.Fragment>:null }


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


         {this.state.model === 'FDTA80'  ? <React.Fragment>
                  Upswept Exhaust
                  <br />      
                </React.Fragment>:null }

         {this.state.model === 'FDTA100'  ? <React.Fragment>
                  Upswept Exhaust
                  <br />      
                </React.Fragment>:null }



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
              condition={this.state.selectedPrecleaner}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedPrecleaner
                ? "Pre Cleaner"
                : null}
            </ConditionalWrapper>

            <ConditionalWrapper
              condition={this.state.selectedHeavydutyairfilter}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedHeavydutyairfilter
                ? "Heavy Duty Air Filter"
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
              condition={this.state.selectedHalolight}
              wrapper={(children) => (
                <React.Fragment>
                  {children}
                  <br />
                </React.Fragment>
              )}
            >
              {this.state.selectedHalolight ? "Halo Light" : null}
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
    :  (this.state.model === "FDTA80" || this.state.model === "FDTA100")
      ? "Closed Roof"
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
              </React.Fragment>
            ) : null}

             
            {(this.state.engType === "Diesel" && this.state.liftcapacity < 6000 ) ? (
              <React.Fragment>
              </React.Fragment>
            ) : null}

            {(this.state.engType === "Diesel" ) ? (
              <React.Fragment>
              </React.Fragment>
            ) : null}
            {this.state.engType === "LPG" ? (
              <React.Fragment>
              </React.Fragment>
            ) : null}

            {this.state.engType === "LPG" ? (
              <React.Fragment>
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
              condition={this.state.defaultcharger &&! this.state.selectedCharger}
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
                <Typography style={{color: 'red'}}>Please select a Seat Option</Typography>
              </React.Fragment>
            ) : null}

<br /><br />
{!(this.state.voltagerequired && !this.state.selectedVoltage )?(
            <strong>
              Quote Price : £
              {this.state.totalprice + parseInt(this.state.markup)}
            </strong>
):null}

            {this.state.hasDiscount ? (
              <Offer 
                hasDiscount={this.state.hasDiscount}
                discountedPrice={this.state.discountedPrice}
                discountAmount={this.state.discountAmount}
                discountPercentage={this.state.discountPercentage}
              />
            ) : null}
            
<br />

<br /><strong>

30 Day terms : £{Math.ceil((this.state.hasDiscount ? this.state.discountedPrice : this.state.totalprice) * 1.005) + parseInt(this.state.markup)}
<br />60 Day terms : £{Math.ceil((this.state.hasDiscount ? this.state.discountedPrice : this.state.totalprice) * 1.01) + parseInt(this.state.markup)}
<br />90 Day terms : £{Math.ceil((this.state.hasDiscount ? this.state.discountedPrice : this.state.totalprice) * 1.015) + parseInt(this.state.markup)}
</strong>
            <br />
<br /><br />

            
            <QuoteSave onQuoteSave={this.handleQuoteSave} forklift={this.state}/>
            <Markup currentMarkup={this.state.markup} onMarkup={this.handleMarkup} />

          </Grid>
          <Grid item xs={8}>
            
            <ResetOptions onResetOptions={this.handleResetOptions} />


            {this.state.voltage && this.state.voltage.length > 0 ? (
              <Voltage
              voltages={this.state.voltage}
              selectedVoltage={this.state.selectedVoltage}
              onVoltageSel={this.handleVoltageSel}
            />
            ) : null}


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

            {this.state.halolights && this.state.halolights.length > 0 ? (
              <Halolight
                halolights={this.state.halolights}
                selectedHalolight={this.state.selectedHalolight}
                onHalolightSel={this.handleHalolight}
              />
            ) : null}   


            {this.state.safetybluespots && this.state.safetybluespots.length > 0 ? (
              <Safetybluespot
                safetybluespots={this.state.safetybluespots}
                selectedSafetybluespot={this.state.selectedSafetybluespot}
                onSafetybluespotSel={this.handleSafetybluespotSel}
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
                selectedUpsweptexhaust={this.state.selectedUpsweptexhaust}
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


            {this.state.upsweptexhausts && this.state.upsweptexhausts.length > 0 ? (
              <Upsweptexhausts
                upsweptexhausts={this.state.upsweptexhausts}
                selectedUpsweptexhaust={this.state.selectedUpsweptexhaust}
                onUpsweptexhaustSel={this.handleUpsweptexhaustSel}
                selectedCabin ={this.state.selectedCabin}
              />
            ) : null} 

            {this.state.precleaners && this.state.precleaners.length > 0 ? (
              <Precleaners
                precleaners={this.state.precleaners}
                selectedPrecleaner={this.state.selectedPrecleaner}
                onPrecleanerSel={this.handlePrecleanerSel}
              />
            ) : null}

            {this.state.heavydutyairfilters && this.state.heavydutyairfilters.length > 0 ? (
              <Heavydutyairfilters
              heavydutyairfilters={this.state.heavydutyairfilters}
                selectedHeavydutyairfilter={this.state.selectedHeavydutyairfilter}
                onHeavydutyairfilterSel={this.handleHeavydutyairfilterSel}
              />
            ) : null}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ForkliftDetail;
