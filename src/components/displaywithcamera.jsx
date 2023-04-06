import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

const Displaywithcamera = props => {
  const { displaywithcameras, onDisplaywithcameraSel, selectedDisplaywithcamera } = props;

  var aa = "";
  if (selectedDisplaywithcamera) {
    aa = selectedDisplaywithcamera.displaywithcameraoption;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Displaywithcameras</FormLabel>

        <RadioGroup aria-label="displaywithcameras" name="displaywithcameras" row={true}>
          {displaywithcameras.map(displaywithcamera => (
            <FormControlLabel
              key={displaywithcamera._id}
              value={displaywithcamera.displaywithcameraoption}
              control={<Radio color="primary" />}
              label={displaywithcamera.displaywithcameraoption}
              onChange={() => onDisplaywithcameraSel(displaywithcamera)}
              checked={aa === displaywithcamera.displaywithcameraoption}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Displaywithcamera;
