import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import UserButtons from "./UsersButtons";
import SwitchBar from "./SwitchBar";
import TextFieldBar from "./TextFieldBar";
import ChipInputField from "./ChipInputField";

const styles = () => ({
  hidden: {
    display: "none"
  },
  grid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "0 10px 5px 10px"
  }
});

const ItemSettingsBar = props => {
  const {
    item,
    classes,
    openedItems,
    toggleItemAppearance,
    rolesTypes
  } = props;
  const isDisabled = props.userLogin === item.login;

  const addRole = (id, role) => {
    fetch(`http://localhost:3001/api/users/roles`, {
      method: "PATCH",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, role })
    });
  };

  const deleteRole = (userId, role) => {
    fetch(`http://localhost:3001/api/users/${userId}/roles/${role}`, {
      method: "DELETE",
      credentials: "include"
    });
  };

  return (
    <React.Fragment>
      <UserButtons
        item={item}
        toggleItemAppearance={toggleItemAppearance}
        openedItems={openedItems}
        isDisabled={isDisabled}
        deleteUser={props.deleteUser}
      />
      <Grid
        item
        xs={12}
        className={
          openedItems.includes(item.id) ? classes.grid : classes.hidden
        }
      >
        <SwitchBar
          id={props.id}
          state={props.isActive}
          changeUserActiveness={props.changeUserActiveness}
          isDisabled={isDisabled}
        />
        <TextFieldBar
          value={props.name}
          id={props.id}
          action={props.changeUserName}
        />
        <ChipInputField
          isDisabled={isDisabled}
          deleteRole={deleteRole}
          addRole={addRole}
          id={item.id}
          role={item.role}
          rolesTypes={rolesTypes}
          user={props.userLogin}
        />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(ItemSettingsBar);
