import React, { useState, useEffect } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  success: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#4caf50"
    }
  },
  warning: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#ff9800"
    }
  },
  error: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#f44336"
    }
  }
});

const PositionedSnackbar = props => {
  const { classes } = props;
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center"
  });

  const [logId, setLogId] = useState(null);
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    if (
      logId !== props.snackMessage.procedureLogId &&
      Object.keys(props.snackMessage).length
    ) {
      setLogId(props.snackMessage.procedureLogId);
      setState({ open: true, vertical: "top", horizontal: "right" });
    }
  });

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      className={
        classes[
          props.snackMessage.status
            ? props.snackMessage.status.toLowerCase()
            : ""
        ]
      }
      autoHideDuration={2000}
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={open}
      onClose={handleClose}
      message={`${props.snackMessage.procedureName}: ${props.snackMessage.status}`}
    />
  );
};

export default withStyles(styles)(PositionedSnackbar);
