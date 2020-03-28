import React, { useState } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import {
  procedureInfoUrl,
  procedureScheduleUrl,
  editProcedureUrl
} from "../../utils/BuildPaths";

import mainTheme from "../../style/theme";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ListIcon from '@material-ui/icons/List';

const styles = theme => ({
  hidden: {
    display: "none"
  },
  deleteLabel: {
    fontSize: 16,
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "box"
    }
  },
  deleteTab: {
    backgroundColor: "white",
    height: "50px",
    borderRadius: "7px",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "baseline",
    display: "flex",
    marginLeft: "auto",
    border: "1px solid black"
  },
  confirmationBtnsWrapper: {
    width: "30%",
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.up("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "30%"
    }
  },
  tabsWrapper: {
    height: "60px",
    alignItems: "flex-end",
    ...mainTheme.mainBackground
  },
  tab: {
    ...mainTheme.tabUnactive,
    ...mainTheme.tabStyle,
    color: "white"
  },
  activeTab: {
    ...mainTheme.tabActive,
    ...mainTheme.tabStyle,
    color: "black",
    cursor: "auto"
  },
  link: {
    marginLeft: "3px",
    textDecoration: "none",
    [theme.breakpoints.up("xs")]: {
      width: "50px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "15%"
    }
  },
  span: {
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "box"
    }
  },
  icon: {
    [theme.breakpoints.up("xs")]: {
      display: "box"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },

  rotate: {
    animation: "rotation 2s infinite linear"
  },
  button: {
    cursor: "pointer"
  }
});

const Tabs = props => {
  const { classes } = props;
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [action, setAction] = useState(false);
  const btnColor = props.isDisabled ? "disabled" : "inherit";

  const runProcedure = () => {
    if (props.isDisabled) return;
    if (action) return;
    setAction(true);
    setTimeout(() => {
      setAction(false);
    }, 1000);
    props.procedureRun();
  };

  return (
    <Grid container className={classes.tabsWrapper}>
      <Link to={editProcedureUrl(props.id)} className={classes.link}>
        <Grid
          item
          xs={12}
          className={props.data === "edit" ? classes.activeTab : classes.tab}
        >
          <span className={classes.span}>Details</span>
          <EditRoundedIcon className={classes.icon} />
        </Grid>
      </Link>
      <Link to={procedureInfoUrl(props.id)} className={classes.link}>
        <Grid
          item
          xs={12}
          className={props.data === "info" ? classes.activeTab : classes.tab}
        >
          <span className={classes.span}>Tasks</span>
          <ListIcon className={classes.icon} />
        </Grid>
      </Link>
      <Link to={procedureScheduleUrl(props.id)} className={classes.link}>
        <Grid
          item
          xs={12}
          className={
            props.data === "schedule" ? classes.activeTab : classes.tab
          }
        >
          <span className={classes.span}>Schedules</span>
          <ScheduleRoundedIcon className={classes.icon} />
        </Grid>
      </Link>

      <Grid item xs={3} sm={5} md={3} className={classes.deleteTab}>
        <span className={deleteConfirm ? classes.deleteLabel : classes.hidden}>
          Delete procedure?
        </span>
        <DeleteIcon
          color={btnColor}
          className={deleteConfirm ? classes.hidden : classes.button}
          onClick={() => {
            if (props.isDisabled) return;
            setDeleteConfirm(true);
          }}
        />
        <PlayCircleFilledWhiteRoundedIcon
          className={
            deleteConfirm
              ? classes.hidden
              : action
              ? classes.hidden
              : classes.button
          }
          color={btnColor}
          onClick={runProcedure}
        />
        <RotateRightIcon
          className={
            deleteConfirm
              ? classes.hidden
              : action
              ? `${classes.button} ${classes.rotate}`
              : classes.hidden
          }
        />
        <div
          className={
            deleteConfirm ? classes.confirmationBtnsWrapper : classes.hidden
          }
        >
          <CheckIcon
            className={classes.button}
            color="primary"
            onClick={props.deleteProcedure}
          />
          <CloseIcon
            className={classes.button}
            onClick={() => {
              setDeleteConfirm(false);
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Tabs);
