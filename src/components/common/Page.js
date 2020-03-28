import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  main: {
    marginTop: "65px",
    fontSize: 18
  }
});

const Main = props => {
  const { classes } = props;

  return <main className={classes.main}>{props.children}</main>;
};

export default withStyles(styles)(Main);
