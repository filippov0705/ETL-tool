import React, { useState } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "./Button";

import { UsersPath } from "../../utils/BuildPaths";

const styles = theme => ({
  btns: {
    flexGrow: 2,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  hidden: {
    display: "none"
  },
  icon: {
    [theme.breakpoints.up("xs")]: {
      margin: 5
    },
    [theme.breakpoints.up("sm")]: {
      margin: 15
    }
  },
  confirmBtn: {
    [theme.breakpoints.up("xs")]: {
      margin: 0
    },
    [theme.breakpoints.up("sm")]: {
      margin: 10
    }
  }
});

const UserButtons = props => {
  const {
    classes,
    item,
    toggleItemAppearance,
    openedItems,
    isDisabled
  } = props;
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <React.Fragment>
      <Grid
        item
        xs={5}
        sm={4}
        md={4}
        className={deleteConfirm ? classes.btns : classes.hidden}
      >
        <Button
          looks="btn"
          linkTo={UsersPath()}
          btnAction={() => {
            setDeleteConfirm(false);
            props.deleteUser(item.id);
          }}
        >
          <CheckIcon color="primary" className={classes.confirmBtn} />
        </Button>
        <Button
          looks="btn"
          linkTo={UsersPath()}
          btnAction={() => {
            setDeleteConfirm(false);
          }}
        >
          <CloseIcon className={classes.confirmBtn} />
        </Button>
      </Grid>
      <Grid
        item
        xs={5}
        sm={4}
        md={4}
        className={deleteConfirm ? classes.hidden : classes.btns}
      >
        <EditIcon
          className={
            openedItems.includes(item.id) ? classes.hidden : classes.icon
          }
          onClick={() => toggleItemAppearance(item.id)}
        />
        <CheckIcon
          color="primary"
          className={
            openedItems.includes(item.id) ? classes.icon : classes.hidden
          }
          onClick={() => toggleItemAppearance(item.id)}
        />
        <DeleteIcon
          color={isDisabled ? "disabled" : "inherit"}
          className={classes.icon}
          onClick={
            isDisabled
              ? null
              : () => {
                  setDeleteConfirm(true);
                }
          }
        />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserButtons);
