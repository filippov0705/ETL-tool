import React, { Component, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import randomInt from "random-int";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Input from "../../../common/Input";
import Item from "../../../common/Item";
import Button from "../../../common/Button";
import ProcedurePage from "./ProcedurePage";
import Heading from "../../../common/Heading";
import ProcedureList from "../../../common/ProcedureList";

import {newProcedurePath, ProceduresPath} from "../../../../utils/BuildPaths";

import { newProcedureCreate } from "../../../../action/ProceduresActions";
import { getPossibleTasks } from "../../../../action/TasksAction";

const styles = theme => ({
  gridStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column-reverse"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  gridTasks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  }
});

const ProcedureAdd = props => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [name, setName] = useState("");
  const { classes } = props;

  useEffect(() => {
    props.getPossibleTasks();
  }, []);

  const applyTask = id => {
    setSelectedTasks([...selectedTasks,
      {
        name: props.possible.find(item => item.id === id).name,
        id: randomInt(10000000, 99999999),
        settings: props.possible.find(item => item.id === id).settings
      }]);
  };

  const createProcedure = () => {
    if (!props.roles.includes("user")) return;
    const newProcedure = {
      name: name || `Procedure-${randomInt(10000000, 99999999)}`,
      id: randomInt(10000000, 99999999),
      schedule: [],
      tasks: selectedTasks
    };
    props.newProcedureCreate(newProcedure);
  };

  const removeTask = id => setSelectedTasks(selectedTasks.filter(item => item.id !== id));

  const nameChange = name => setName(name);

  const itemCreation = (data, action) => {
    return data.map((item, i) => {
      return <Item name={item.name} id={item.id} key={i} action={action} />;
    });
  };

  return (
      <ProcedurePage>
        <Heading
            size="big"
            heading={<FormattedMessage id="procedure.newProcedure" />}
        />
        <Grid className={classes.gridStyle}>
          <Input
              label={<FormattedMessage id="label.procedureName" />}
              value={name}
              clickAction={nameChange}
              className="input"
              labelClassName="label"
          />
          <Button
              looks={
                props.roles.includes("user")
                    ? "applyBtn"
                    : "applyBtnDisabled"
              }
              linkTo={
                props.roles.includes("user")
                    ? ProceduresPath()
                    : newProcedurePath()
              }
              btnAction={createProcedure}
          >
            <span>{<FormattedMessage id="procedure.save" />}</span>
          </Button>
        </Grid>
        <Grid className={classes.gridTasks}>
          <ProcedureList
              isHeading={<FormattedMessage id="procedure.availableTasks" />}
              className="smallList"
              background="middle_left"
          >
            {itemCreation(props.possible, applyTask)}
          </ProcedureList>
          <ProcedureList
              isHeading={<FormattedMessage id="procedure.selectedTasks" />}
              className="smallList"
              background="middle_left"
          >
            {itemCreation(selectedTasks, removeTask)}
          </ProcedureList>
        </Grid>
      </ProcedurePage>
  );

};

const mapStateToProps = store => {
  return {
    possible: store.tasks.possible,
    roles: store.app.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newProcedureCreate: newProcedure =>
      dispatch(newProcedureCreate(newProcedure)),
    getPossibleTasks: () => dispatch(getPossibleTasks())
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProcedureAdd)
);
