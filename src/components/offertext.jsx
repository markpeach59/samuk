import React, { Component } from "react";


import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

const Offertext = props =>  {
  const {model } = props;

  console.log("MOdel on Offer", model);

  if ( model === 'AA'){
    return (<React.Fragment>

      <Typography variant="h6">Current Offer : 2.5% off AA Range trunks</Typography>
      <br />
      <br />
    </React.Fragment>)};

if ( model === 'Reach'){
  return (<React.Fragment>

    <Typography variant="h6">Current Offer : 3% off Lithium Powered Reach trunks</Typography>
    <br />
    <br />
  </React.Fragment>)};
  

  if ( model === 'FBAX50-YWL'){
    return (<React.Fragment>

      <Typography variant="h6">Current Offer : 3% off this AX Range trunk</Typography>
      <br />
      <br />
              </React.Fragment>)};

 
    return (
        <React.Fragment>

<Typography variant="h6">Current Offer : 10% off the standard AX Range trunk with standard battery - 
15% off the standard AX Range trunk with a bigger batter
</Typography>
<br />
<br />
        </React.Fragment>

    );
    }


export default Offertext;
