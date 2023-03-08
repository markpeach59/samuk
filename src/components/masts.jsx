import React from "react";

import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

const Masts = props => {
  const {
    masts,

    selectedMast,
    onMastSizeSel,
    selectedMastSize
  } = props;

  var aa = "";
  if (selectedMastSize) {
    aa = selectedMast + " " + selectedMastSize.mastlength;
    //console.log("AYA", aa);
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {masts.map(mast => (
          <Grid item xs={4} key={mast._id}>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">{mast.masttype}</FormLabel>

                <RadioGroup aria-label="mastsize" name="mastsize" row={false}>
                  {mast.mastsizes.map(mastsize => {
                    return mastsize.closedheight ? (
                      <FormControlLabel
                        key={mastsize._id}
                        value={mastsize.mastlength}
                        control={<Radio color="primary" />}
                        label={
                          mastsize.mastlength +
                          "mm,  " +
                          mastsize.closedheight +
                          "mm"
                        }
                        onChange={() => onMastSizeSel(mastsize, mast.masttype)}
                        checked={
                          aa === mast.masttype + " " + mastsize.mastlength
                        }
                      />
                    ) : (
                      <FormControlLabel
                        key={mastsize._id}
                        value={mastsize.mastlength}
                        control={<Radio color="primary" />}
                        label={mastsize.mastlength + "mm"}
                        onChange={() => onMastSizeSel(mastsize, mast.masttype)}
                        checked={
                          aa === mast.masttype + " " + mastsize.mastlength
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Masts;
