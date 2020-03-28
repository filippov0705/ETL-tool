import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import AppBar from "@material-ui/core/AppBar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import withStyles from "@material-ui/core/styles/withStyles";

import UserMenu from "./UserMenu";

import {
  mainPath,
  ProceduresPath,
  UsersPath,
  LogsPath
} from "../../utils/BuildPaths";

import mainTheme from "../../style/theme";

const styles = theme => ({
  header: {
    ...mainTheme.header
  },
  toolbar: {
    padding: 0
  },
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  link: {
    textDecoration: "none",
    color: "black",
    display: "flex"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  grow: {
    flexGrow: "5"
  },
  headerButton: {
    ...mainTheme.headerButton,
    textTransform: "none"
  },
  active: {
    color: "red"
  }
});

const SearchAppBar = props => {
  const { classes } = props;

  const [anchorEl, changeAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, changeMobileMoreAnchorEl] = useState(null);

  const handleMenuClose = () => {
    changeAnchorEl(null);
    changeMobileMoreAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={() => changeMobileMoreAnchorEl(null)}
      className={classes.root}
    >
      <Link to={mainPath()} className={classes.link}>
        <MenuItem
          className={
            props.location === "/"
              ? `${classes.headerButton} ${classes.active}`
              : classes.headerButton
          }
        >
          <FormattedMessage id="navigation.mainPage" />
        </MenuItem>
      </Link>
      {props.isLoggedIn && props.isActive ? (
        <Link to={ProceduresPath()} className={classes.link}>
          <MenuItem
            className={
              props.location.includes("Procedures")
                ? `${classes.headerButton} ${classes.active}`
                : classes.headerButton
            }
          >
            <FormattedMessage id="navigation.procedures" />
          </MenuItem>
        </Link>
      ) : null}
      {props.isLoggedIn && props.isActive ? (
        <Link to={LogsPath()} className={classes.link}>
          <MenuItem
            className={
              props.location.includes("Logs")
                ? `${classes.headerButton} ${classes.active}`
                : classes.headerButton
            }
          >
            <FormattedMessage id="navigation.logsPage" />
          </MenuItem>
        </Link>
      ) : null}
      {props.isAdmin && props.isActive ? (
        <Link to={UsersPath()} className={classes.link}>
          <MenuItem
            className={
              props.location === "/Users/"
                ? `${classes.headerButton} ${classes.active}`
                : classes.headerButton
            }
          >
            <FormattedMessage id="navigation.usersPage" />
          </MenuItem>
        </Link>
      ) : null}
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={event => mobileMoreAnchorEl(event.target)}
              color="inherit"
            >
              <MoreIcon color="action" />
            </IconButton>
          </div>
          <div className={classes.sectionDesktop}>
            <Link to={mainPath()} className={classes.link}>
              <Button
                className={
                  props.location === "/"
                    ? `${classes.headerButton} ${classes.active}`
                    : classes.headerButton
                }
              >
                <HomeIcon />
              </Button>
            </Link>
            {props.isLoggedIn && props.isActive ? (
              <Link to={ProceduresPath()} className={classes.link}>
                <Button
                  className={
                    props.location.includes("Procedures")
                      ? `${classes.headerButton} ${classes.active}`
                      : classes.headerButton
                  }
                >
                  <FormattedMessage id="navigation.procedures" />
                </Button>
              </Link>
            ) : null}
            {props.isLoggedIn && props.isActive ? (
              <Link to={LogsPath()} className={classes.link}>
                <Button
                  className={
                    props.location.includes("Logs")
                      ? `${classes.headerButton} ${classes.active}`
                      : classes.headerButton
                  }
                >
                  <FormattedMessage id="navigation.logsPage" />
                </Button>
              </Link>
            ) : null}
            {props.isAdmin && props.isActive ? (
              <Link to={UsersPath()} className={classes.link}>
                <Button
                  className={
                    props.location === "/Users/"
                      ? `${classes.headerButton} ${classes.active}`
                      : classes.headerButton
                  }
                >
                  <FormattedMessage id="navigation.usersPage" />
                </Button>
              </Link>
            ) : null}
            <IconButton
              className={classes.root}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={event => changeAnchorEl(event.target)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.grow} />
          <UserMenu
            userName={props.userName}
            isLoggedIn={props.isLoggedIn}
            action={props.action}
          />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
};

export default withStyles(styles)(SearchAppBar);
