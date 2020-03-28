import React, { useState } from "react";
import { Link } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PlayCircleFilledWhiteRoundedIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ListIcon from "@material-ui/icons/List";

import Button from "./Button";

import {
  editProcedureUrl,
  procedureScheduleUrl,
  procedureInfoUrl,
  ProceduresPath
} from "../../utils/BuildPaths";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  itemName: {
    alignItems: "center",
    justifyContent: "space-around",
    paddingRight: "15px",
    backgroundColor: "#f4f4f4",
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  menu: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#f4f4f4",
    [theme.breakpoints.up("xs")]: {
      display: "flex"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  btn: {
    backgroundColor: "#f4f4f4",
    border: "none"
  },
  icon: {
    marginTop: "5px",
    cursor: "pointer"
  },
  menuItems: {
    [theme.breakpoints.up("xs")]: {
      display: "flex"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  link: {
    color: "black"
  },
  hidden: {
    display: "none"
  },
  confirmation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "15px",
    backgroundColor: "#f4f4f4"
  },
  confirmIcon: {
    [theme.breakpoints.up("xs")]: {
      margin: 5
    },
    [theme.breakpoints.up("sm")]: {
      margin: 10
    }
  },
  rotate: {
    animation: "rotation 2s infinite linear"
  }
});

const ItemButtons = props => {
  const { classes } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [action, setAction] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const btnsColor = props.disabled ? "disabled" : "inherit";

  const runBtnClick = () => {
    if (props.disabled) return;
    if (action) return;
    setAction(true);
    setTimeout(() => {
      setAction(false);
    }, 1000);
    props.procedureRun(props.id);
  };

  const deleteBtnClick = () => {
    if (props.disabled) return;
    setDeleteConfirm(false);
    props.procedureDelete(props.id);
  };

  return (
    <React.Fragment>
      <Grid
        item
        xs={5}
        sm={4}
        md={4}
        className={deleteConfirm ? classes.confirmation : classes.hidden}
      >
        <Button
          looks={"btn"}
          linkTo={ProceduresPath()}
          btnAction={deleteBtnClick}
        >
          <CheckIcon color="primary" className={classes.confirmIcon} />
        </Button>
        <Button
          looks={"btn"}
          linkTo={ProceduresPath()}
          btnAction={() => {
            setDeleteConfirm(false);
          }}
        >
          <CloseIcon className={classes.confirmIcon} />
        </Button>
      </Grid>
      <Grid
        item
        xs={2}
        sm={4}
        md={4}
        className={deleteConfirm ? classes.hidden : classes.itemName}
      >
        <Button
          looks={"btn"}
          linkTo={ProceduresPath()}
          btnAction={() => {
            setDeleteConfirm(true);
          }}
        >
          <DeleteIcon color={btnsColor} className={classes.icon} />
        </Button>
        <Button looks={"btn"} linkTo={procedureScheduleUrl(props.id)}>
          <ScheduleRoundedIcon className={classes.icon} />
        </Button>
        <Button looks={"btn"} linkTo={editProcedureUrl(props.id)}>
          <EditRoundedIcon className={classes.icon} />
        </Button>
        <Button looks={"btn"} linkTo={procedureInfoUrl(props.id)}>
          <ListIcon className={classes.icon} />
        </Button>
        <Button looks={"btn"} linkTo={ProceduresPath()} btnAction={runBtnClick}>
          <PlayCircleFilledWhiteRoundedIcon
            color={btnsColor}
            className={action ? classes.hidden : classes.icon}
          />
          <RotateRightIcon
            className={
              action ? `${classes.icon} ${classes.rotate}` : classes.hidden
            }
          />
        </Button>
      </Grid>
      <Grid item xs={5} className={classes.menu}>
        <IconButton
          edge="start"
          className={deleteConfirm ? classes.hidden : classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menuItems}
      >
        <MenuItem
          onClick={() => {
            setDeleteConfirm(true);
            setAnchorEl(null);
          }}
        >
          <DeleteIcon color={btnsColor} className={classes.icon} />
        </MenuItem>
        <Link className={classes.link} to={procedureScheduleUrl(props.id)}>
          <MenuItem>
            <ScheduleRoundedIcon className={classes.icon} />
          </MenuItem>
        </Link>
        <Link className={classes.link} to={editProcedureUrl(props.id)}>
          <MenuItem>
            <EditRoundedIcon className={classes.icon} />
          </MenuItem>
        </Link>
        <Link className={classes.link} to={procedureInfoUrl(props.id)}>
          <MenuItem>
            <ListIcon className={classes.icon} />
          </MenuItem>
        </Link>
        <MenuItem onClick={runBtnClick}>
          <PlayCircleFilledWhiteRoundedIcon
            color={btnsColor}
            className={action ? classes.hidden : classes.icon}
          />
          <RotateRightIcon
            className={
              action ? `${classes.icon} ${classes.rotate}` : classes.hidden
            }
          />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default withStyles(styles)(ItemButtons);
