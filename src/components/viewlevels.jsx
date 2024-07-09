import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from "@material-ui/core/Snackbar";


import "typeface-roboto";


const Viewlevels = (props) => {
   
  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onDialogOpen = () => {

    setDialogOpen(true);

  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  

  const onSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <React.Fragment>
      <Button onClick={() => onDialogOpen()}>View Voltage Type Options</Button>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Available Options</DialogTitle>
        <DialogContent><br />
        Entry Level 76.8V Battery gives 2.5 to 3 hours run time<br /><br />
        Standard 115V Battery gives 4.5 to 5 hours run time<br /><br />
        Heavy Duty 153V Battery gives 6 to 6.5 hours run time<br />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={onSnackbarClose}
        autoHideDuration={4000}
      />
    </React.Fragment>
  );
};

export default Viewlevels;