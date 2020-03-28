import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  contentWrapper: {
    borderTop: "2px solid rgba(94, 92, 92, 0.225)",
    paddingLeft: 10
  },
  hidden: {
    display: "none"
  },
  status: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 10
  },
  time: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  success: {
    color: "#039900"
  },
  warning: {
    color: "#bd7106"
  },
  error: {
    color: "#bd0606"
  }
});

const TaskLogs = props => {
  const { classes } = props;

  const createDiscription = description => {
    return description.map((item, i) => {
      return (
        <Grid item key={i} xs={12} className={classes.time}>
          {item}
        </Grid>
      );
    });
  };

  const createLogsContent = data => {
    return data.map((item, i) => {
      return (
        <Grid
          key={i}
          container
          className={props.isOpen ? classes.contentWrapper : classes.hidden}
        >
          <Grid item xs={8}>
            <Grid item xs={12}>
              {item.task_log_name}
            </Grid>
            <Grid item xs={12} className={classes.time}>
              {item.execution_time}
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.status}>
            <span className={classes[item.status.toLowerCase()]}>
              {item.status}
            </span>
          </Grid>
          {item.description ? createDiscription(item.description) : null}
        </Grid>
      );
    });
  };

  return createLogsContent(props.taskLogs);
};

export default withStyles(styles)(TaskLogs);
