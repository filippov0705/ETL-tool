import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TaskLogs from "./TaskLogs";

const styles = () => ({
  statusBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    justifySelf: "flex-end",
    fontSize: 20,
    paddingRight: 10
  },
  executionTime: {
    padding: "0 0 10px 10px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
    success: {
        backgroundColor: "#dcf5e5",
    },
    warning: {
      backgroundColor: "#f5f1dc"
    },
    error: {
      backgroundColor: "#f5e4dc"
    }
});

const LogContent = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid
        item
        xs={5}
        sm={4}
        md={4}
        className={`${classes.statusBar} ${classes[props.runStatus.toLowerCase()]}`}
        onClick={() => props.action(props.id)}
      >
        {props.runStatus}
      </Grid>
      <Grid
        item
        xs={12}
        className={`${classes.executionTime} ${classes[props.runStatus.toLowerCase()]}`}
        onClick={() => props.action(props.id)}
      >
        {props.executionTime}
      </Grid>
      <TaskLogs taskLogs={props.pageLogs} isOpen={props.isOpen} runStatus={props.runStatus.toLowerCase()} />
    </React.Fragment>
  );
};

export default withStyles(styles)(LogContent);
