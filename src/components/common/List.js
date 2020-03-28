import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import mainTheme from "../../style/theme";

const styles = () => ({
  list: {
    height: "665px",
    backgroundColor: "white",
    margin: "20px",
    border: "1px solid gray",
    borderRadius: "7px",
    overflow: "auto"
  },
  smallList: {
    ...mainTheme.tasks,
  },
  data: {
    minHeight: "620px",
    backgroundColor: "white",
    margin: "20px",
    border: "1px solid gray",
    borderRadius: "7px",
    overflow: "auto"
  },
  listStyle: {
    ...mainTheme.listStyle,
  }
});

const List = props => {
  const { classes } = props;
  return (
    <Grid item className={classes[props.className]}>
      {props.addBtn}
      {props.children}
    </Grid>
  );
};

export default withStyles(styles)(List);
