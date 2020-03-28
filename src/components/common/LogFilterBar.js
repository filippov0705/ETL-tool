import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import RadioBtn from "./Radio";
import AutocompleteField from "./AutocompleteField";

import { FROM_EARLIEST } from "../../constants/constants";

const styles = () => ({
  radioBtnWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  filterWrapper: {
    marginBottom: 40
  }
});

const LogFilterBar = props => {
  const { classes } = props;

  const changeRadioValue = value => {
    props.changeRadioValue(value);
  };

  return (
    <Grid container className={classes.filterWrapper}>
      <Grid item xs={12} md={6} className={classes.radioBtnWrapper}>
        <RadioBtn
          radio={props.radioBtnValue}
          radioBtnClick={changeRadioValue}
          values={[FROM_EARLIEST, "From the latest"]}
          label="Display logs"
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.radioBtnWrapper}>
        <AutocompleteField
          data={props.allProceduresNames}
          action={props.changeDesiredProcedure}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(LogFilterBar);
