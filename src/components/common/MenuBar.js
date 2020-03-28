import React from "react";

import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";

const styles = theme => ({
  menuBtn: {
    [theme.breakpoints.up("xs")]: {
      flexGrow: 2,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  menuStyle: {
    [theme.breakpoints.up("xs")]: {
      display: "flex"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

const MenuBar = props => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.menuBtn}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        className={classes.menuStyle}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            props.toggleItemAppearance(props.id);
            handleClose();
          }}
        >
          Edit user
        </MenuItem>
        {!props.isDisabled ? (
          <MenuItem onClick={handleClose}>Delete user</MenuItem>
        ) : null}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(MenuBar);
