import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import randomInt from "random-int";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import Heading from "../../../common/Heading";
import Item from "../../../common/Item";
import Input from "../../../common/Input";
import ProcedureList from "../../../common/ProcedureList";
import ProcedurePage from "./ProcedurePage";
import Tabs from "../../../common/Tabs";

import {
  addTask,
  editProcedureName,
  removeTask,
  getTargetProcedure,
  procedureRun
} from "../../../../action/ProceduresActions";
import { getPossibleTasks } from "../../../../action/TasksAction";

import { USER } from "../../../../constants/constants";
import history from "../../../../history";

const styles = theme => ({
  gridDisplay: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  input: {
    margin: "30px 0",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  }
});

const EditProcedure = props => {
  const [name, setName] = useState("");
  const [timerId, setTimerId] = useState(null)
  const { classes, targetProcedure, getTargetProcedure } = props;

  useEffect(() => {
    getTargetProcedure(
        props.match.params.id
    );
    props.getPossibleTasks();
  }, []);

  useEffect(() => {
    setName(targetProcedure.name);
  }, [props.targetProcedure.name]);

  const nameChange = value => {
    if (!props.roles.includes(USER)) return;
    if (timerId) clearTimeout(timerId);
    const name = value.substr(0, 35);
    setName(name);
    procedureNameChange();
  };

  const procedureNameChange = () => {
    const timerId = setTimeout(() => {
      props.editProcedureName(
          props.match.params.id,
          name || `Procedure-${randomInt(10000000, 99999999)}`
      );
    }, 5000);
    setTimerId(timerId);
  };

  const blurAction = () => {
    if (!props.roles.includes(USER)) return;
    if (timerId) clearTimeout(timerId);

    props.editProcedureName(
        props.match.params.id,
        name || `Procedure-${randomInt(10000000, 99999999)}`
    );
  };

  const deleteProcedure = () => {
    fetch(
        `http://localhost:3001/api/procedures/${props.match.params.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }
    ).then(() => {
      history.replace("/Procedures/");
    });
  };

  const procedureRun = () => {
    props.procedureRun(props.match.params.id);
  };

  const applyTask = id => {
    if (!props.roles.includes(USER)) return;
    props.addTask(props.match.params.id, {
      name: props.possible.find(item => item.id === id).name,
      id: randomInt(10000000, 99999999),
      settings: props.possible.find(item => item.id === id).settings,
      order: props.targetProcedure.tasks.length
    });
  };

  const removeTask = id => {
    if (!props.roles.includes(USER)) return;
    props.removeTask(props.match.params.id, id);
  };

  const itemCreation = (data, action) => {
    return data.map((item, i) => {
      return <Item name={item.name} id={item.id} key={i} action={action} />;
    });
  };

  return (
      <ProcedurePage>
        <Heading
            heading={props.targetProcedure.name}
            size="big"
            background="pageLabel"
        />
        <Tabs
            data="edit"
            id={props.match.params.id}
            deleteProcedure={deleteProcedure}
            procedureRun={procedureRun}
            isDisabled={!props.roles.includes(USER)}
        />
        <Grid container className={classes.input}>
          <Input
              label="Change procedure name: "
              value={name}
              clickAction={nameChange}
              blurAction={blurAction}
              className="input"
              labelClassName="label"
          />
        </Grid>
        <Grid className={classes.gridDisplay}>
          <ProcedureList
              className="smallList"
              isHeading="Available tasks"
              background="middle_left"
          >
            {itemCreation(props.possible, applyTask)}
          </ProcedureList>
          <ProcedureList
              isHeading="Chosen tasks"
              className="smallList"
              background="middle_left"
          >
            {itemCreation(
                props.targetProcedure.tasks,
                removeTask
            )}
          </ProcedureList>
        </Grid>
      </ProcedurePage>
  );
};

EditProcedure.defaultProps = {
  targetProcedure: {
    name: '',
    tasks: [],
  },
};

const mapStateToProps = store => {
  return {
    targetProcedure: store.procedures.targetProcedure,
    possible: store.tasks.possible,
    roles: store.app.roles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: (procedureId, newTask) =>
      dispatch(addTask(procedureId, newTask)),
    removeTask: (procedureId, taskId) =>
      dispatch(removeTask(procedureId, taskId)),
    editProcedureName: (procedureId, newName) =>
      dispatch(editProcedureName(procedureId, newName)),
    getTargetProcedure: (procedureId) =>
      dispatch(getTargetProcedure(procedureId)),
    getPossibleTasks: () => dispatch(getPossibleTasks()),
    procedureRun: (procedureId) =>
      dispatch(procedureRun(procedureId))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(EditProcedure)
);
