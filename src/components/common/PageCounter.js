import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import { LOGS_LIST_VALUES, LOGS_ON_PAGE } from "../../constants/constants";

const styles = () => ({
  pageCounter: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 16,
    marginLeft: "auto"
  },
  span: {
    marginRight: 10,
    cursor: "pointer"
  },
  spanActive: {
    marginRight: 10,
    cursor: "pointer",
    color: "red"
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    width: 90
  },
  label: {
    textAlign: "center",
    color: "gray",
    fontSize: 12,
    marginRight: 10
  },
  numbers: {
    display: "flex",
    justifyContent: "center"
  }
});

const PageCounter = props => {
  const { classes } = props;

  const createContent = () => {
    return LOGS_LIST_VALUES.map((item, i) => {
      return (
        <span
          className={
            props.currentValue === item ? classes.spanActive : classes.span
          }
          key={i}
          onClick={() => props.action(item)}
        >
          {item}
        </span>
      );
    });
  };

  return (
    <Grid item sm={12} xs={12} md={2} className={classes.pageCounter}>
      <div className={classes.contentWrapper}>
        <span className={classes.label}>{LOGS_ON_PAGE}</span>
        <div className={classes.numbers}>{createContent()}</div>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(PageCounter);
