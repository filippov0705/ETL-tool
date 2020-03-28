import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  bigGrid: {
    height: 70,
    display: "flex",
    alignItems: "center",
  },
  grid: {
    height: 40,
    display: "flex",
    alignItems: "center"
  },
  itemBorder: {
    border: "2px solid white",
    borderBottom: "2px solid rgba(94, 92, 92, 0.225)",
    margin: "0 auto",
    marginTop: 5,
    marginBottom: 5,
    cursor: "pointer",
    width: "99%",
    position: "relative",
    transition: "0.2s",
    "&:hover": {
      border: "2px solid red"
    }
  },
  gridSpan: {
    marginLeft: "10px",
    marginTop: "2px",
    marginBottom: "2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 22
  },
  link: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "black"
  },
  success: {
    backgroundColor: "#dcf5e5",
  },
  warning: {
    backgroundColor: "#f5f1dc"
  },
  error: {
    backgroundColor: "#f5e4dc"
  },
  gray: {
    backgroundColor: "#f4f4f4"
  }

});

const Item = props => {
  const { classes } = props;

  const itemClick = () => {
    if (props.action) props.action(props.id);
  };

  const labelClick = () => {
    if (props.labelAction) props.labelAction(props.id);
  };

  return (
    <Grid container className={classes.itemBorder} onClick={itemClick}>
      <Grid
        item
        xs={props.needBtns ? 7 : 12}
        sm={props.needBtns ? 8 : 12}
        md={props.needBtns ? 8 : 12}
        className={props.needBtns ? `${classes.bigGrid} ${classes[props.specificColor || "gray"]}` : classes.grid}
        onClick={labelClick}
      >
        <span data-id={props.id} className={classes.gridSpan}>
          {props.name.substr(0, 50)}
        </span>
      </Grid>
      {props.children}
    </Grid>
  );
};

export default withStyles(styles)(Item);
