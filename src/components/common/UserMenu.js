import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import TransitionsModal from "./PopUp";

const styles = theme => ({
  menuButton: {
    marginLeft: theme.spacing(2)
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
});

class UserMenu extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    if (this.props.isLoggedIn) {
      this.setState({
        anchorEl: event.currentTarget
      });
    }
  };

  logInAction = () => {
    if (this.props.isLoggedIn) {
      this.props.action();
    }
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.isLoggedIn ? (
            <AccountCircleIcon color="action" fontSize="large" />
          ) : (
            <a
              className={classes.link}
              href="https://github.com/login/oauth/authorize?client_id=e8b244bda58bacfbcc88&redirect_uri=http://localhost:3000/user/signin/callback"
            >
              <FormattedMessage id="userMenu.signIn" />
            </a>
          )}
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <TransitionsModal data={"YourProfile"} onClick={this.handleClose} />
          <TransitionsModal data={"Help"} onClick={this.handleClose} />
          <MenuItem onClick={this.logInAction}>
            <FormattedMessage id="userMenu.signOut" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(UserMenu);
