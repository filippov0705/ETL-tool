import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import PageCounter from "./PageCounter";
import PageSwitcher from "./PageSwitcher";
import LogFilterBar from "./LogFilterBar";

const styles = () => ({
  paginationWrapper: {
    display: "flex",
    justifyContent: "center",
    position: "relative"
  },
  fiddenBox: {
    marginRight: "auto"
  }
});

const LogFilter = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <LogFilterBar
        radioBtnValue={props.radioBtnValue}
        changeRadioValue={props.changeRadioValue}
        allProceduresNames={props.allProceduresNames}
        changeDesiredProcedure={props.changeDesiredProcedure}
      />
      <Grid container className={classes.paginationWrapper}>
        <Grid item xs={12} sm={12} md={3} className={classes.fiddenBox} />
        <PageSwitcher
          currentPage={props.currentPage}
          pageTotalNumber={props.pageTotalNumber}
          action={props.changePage}
        />
        <PageCounter
          action={props.changeNumberOfLogs}
          currentValue={props.numberOfLogs}
        />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(LogFilter);
