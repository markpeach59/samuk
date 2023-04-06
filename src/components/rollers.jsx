import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

const Rollers = props => {
  const { rollers, onRollerSel, selectedRoller } = props;

  var aa = "";
  if (selectedRoller) {
    aa = selectedRoller.rolleroption;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Rollers</FormLabel>

        <RadioGroup aria-label="rollers" name="rollers" row={true}>
          {rollers.map(roller => (
            <FormControlLabel
              key={roller._id}
              value={roller.rolleroption}
              control={<Radio color="primary" />}
              label={roller.rolleroption}
              onChange={() => onRollerSel(roller)}
              checked={aa === roller.rolleroption}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Rollers;