import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

const Valves = props => {
  const { valves, onValveSel, selectedValve } = props;

  var aa = "";
  if (selectedValve) {
    aa = selectedValve.valvetype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Valves</FormLabel>

        <RadioGroup aria-label="valves" name="valves" row={true}>
          {valves.map(valve => (
            <FormControlLabel
              key={valve._id}
              value={valve.valvetype}
              control={<Radio color="primary" />}
              label={valve.valvetype}
              onChange={() => onValveSel(valve)}
              checked={aa === valve.valvetype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Valves;
