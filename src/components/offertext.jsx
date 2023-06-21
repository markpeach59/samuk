import React, { Component } from "react";


import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

const Offertext = props =>  {
  const {model } = props;

  console.log("MOdel on Offer", model);

  if ( model === 'FBAX50-YWL'){
    return (<React.Fragment>

      <Typography variant="h6">Current Offer : 3% off this AX Range trunk</Typography>
      <br />
      <br />
              </React.Fragment>)};

 
    return (
        <React.Fragment>

<Typography variant="h6">Current Offer : 10% off this AX Range trunk with standard battery - 
15% off this AX Range trunk with a bigger battery
</Typography>
<br />
<br />
        </React.Fragment>

    );
    }


export default Offertext;
