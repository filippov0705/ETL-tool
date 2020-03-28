import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";

import Page from "../../../common/Page";
import ProcedureList from "../../../common/ProcedureList";
import Item from "../../../common/Item";
import UsersFilter from "../../../common/UsersFilter";

import ItemSettingsBar from "../../../common/ItemSettingsBar";

import {
  changeUserActiveness,
  changeUserName,
  deleteUser,
  getUsers,
  getRolesTypes,
} from "../../../../action/UsersPageAction";

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

const Users = props => {
  const { classes } = props;
  const [openedItems, setOpenedItems] = useState([]);

  useEffect(() => {
    props.getUsers();
    props.getRolesTypes();
  }, []);

  const deleteUser = id => {
    props.deleteUser(id);
  };

  const itemCreation = () => {
    return props.existingUsers.map((item, i) => {
      return (
        <Item name={item.login} needBtns={true} id={item.id} key={item.id}>
          <ItemSettingsBar
            openedItems={openedItems}
            toggleItemAppearance={toggleItemAppearance}
            key={i}
            item={item}
            id={item.id}
            isActive={item.isActive}
            name={item.name}
            rolesTypes={props.rolesTypes}
            userLogin={props.userLogin}
            changeUserName={props.changeUserName}
            changeUserActiveness={props.changeUserActiveness}
            deleteUser={deleteUser}
          />
        </Item>
      );
    });
  };

  const toggleItemAppearance = id => {
    if (openedItems.includes(id)) {
      setOpenedItems(openedItems.filter(item => item !== id));
    } else {
      setOpenedItems([...openedItems, id]);
    }
  };

  return (
    <Page>
      <UsersFilter data={props.existingUsers.map(item => item.login)} action={props.getUsers} />
      <ProcedureList
        isFullPageWidth={true}
        data={props.existingUsers}
        className="borderlessListStyle"
      >
        <div className={classes.itemWrapper}>{itemCreation()}</div>
      </ProcedureList>
    </Page>
  );
};

const mapStateToProps = store => {
  return {
    existingUsers: store.users.existingUsers,
    rolesTypes: store.users.rolesTypes,
    userLogin: store.app.userLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: filteredUser => dispatch(getUsers(filteredUser)),
    getRolesTypes: () => dispatch(getRolesTypes()),
    changeUserActiveness: (id, state) =>
      dispatch(changeUserActiveness(id, state)),
    deleteUser: id => dispatch(deleteUser(id)),
    changeUserName: (id, newName) => dispatch(changeUserName(id, newName)),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Users)
);
