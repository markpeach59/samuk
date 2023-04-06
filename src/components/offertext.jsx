import React, { Component } from "react";
import auth from "../services/authService";
import { getDealerDetail } from "../services/dealerService";

import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

class Offertext extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <React.Fragment>

<Typography variant="h6">Current Offer : 10% off all AX Range trunks with standard battery - 
15% off all AX Range trunks with bigger battery
</Typography>
<br />
<br />
        </React.Fragment>

    );
    }
}

export default Offertext;
