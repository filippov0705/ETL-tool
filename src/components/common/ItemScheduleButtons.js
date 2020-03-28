import React, { useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "./Button";

import { procedureScheduleUrl } from "../../utils/BuildPaths";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const styles = () => ({
  itemName: {
    height: 70,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    paddingRight: "15px",
    justifyContent: "flex-end",
    backgroundColor: "#f4f4f4"
  },
  hidden: {
    display: "none"
  },
  button: {
    cursor: "pointer"
  }
});

const ItemScheduleButtons = props => {
  const { classes, isDisabled } = props;
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const itemRemoveAction = () => {
    if (isDisabled) return;
    setDeleteConfirm(false);
    props.removeBtnAction(props.id);
  };

  const itemEditAction = () => {
    if (isDisabled) return;
    props.editBtnAction(props.id);
  };

  return (
    <Grid item xs={5} sm={4} md={4} className={classes.itemName}>
      <div className={deleteConfirm ? "" : classes.hidden}>
        <Button
          looks={"btn"}
          linkTo={procedureScheduleUrl(props.procedureId)}
          btnAction={itemRemoveAction}
        >
          <CheckIcon color="primary" />
        </Button>
        <Button
          looks={"btn"}
          linkTo={procedureScheduleUrl(props.procedureId)}
          btnAction={() => {
            setDeleteConfirm(false);
          }}
        >
          <CloseIcon />
        </Button>
      </div>
      <div className={deleteConfirm ? classes.hidden : ""}>
        <Button
          linkTo={procedureScheduleUrl(props.procedureId)}
          looks={"itemEdit"}
          btnAction={itemEditAction}
        >
          <EditIcon
            color={isDisabled ? "disabled" : "inherit"}
            className={classes.button}
          />
        </Button>
        <Button
          linkTo={procedureScheduleUrl(props.procedureId)}
          looks={"itemRemove"}
          btnAction={() => {
            setDeleteConfirm(true);
          }}
        >
          <DeleteIcon
            color={isDisabled ? "disabled" : "inherit"}
            className={classes.button}
          />
        </Button>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(ItemScheduleButtons);
