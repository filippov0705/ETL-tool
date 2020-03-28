import React from "react";

import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    minWidth: 80,
    width: 170
  }
});

const Search = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <TextField
        label="Search"
        id="outlined-size-small"
        defaultValue=""
        variant="outlined"
        size="small"
        onChange={event => {
            props.action(event.target.value)
        }}
      />
    </div>
  );
};

export default withStyles(styles)(Search);
