import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import AutocompleteField from "./AutocompleteField";

const styles = () => ({
  grid: {
    display: "flex",
      paddingTop: 20,
      paddingLeft: 10
  }
});

const UserFilter = props => {
  const { classes } = props;

  return (
    <Grid container className={classes.grid}>
      <AutocompleteField data={props.data} action={props.action} />
    </Grid>
  );
};

export default withStyles(styles)(UserFilter);
