import React, { Component } from "react";
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

class EditProcedure extends Component {
  constructor() {
    super();
    this.state = {
      selectedTasks: [],
      name: "",
      timerId: null
    };
  }

  componentDidMount() {
    this.props.getTargetProcedure(
      this.props.userId,
      this.props.match.params.id
    );
    this.props.getPossibleTasks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.targetProcedure !== prevProps.targetProcedure) {
      this.setState({ name: this.props.targetProcedure.name });
    }
  }

  nameChange = value => {
    if (!this.props.roles.includes(USER)) return;
    if (this.state.timerId) clearTimeout(this.state.timerId);
    const name = value.substr(0, 35);
    this.setState({ name });
    this.procedureNameChange();
  };

  procedureNameChange = () => {
    const timerId = setTimeout(() => {
      this.props.editProcedureName(
        this.props.userId,
        this.props.match.params.id,
        this.state.name || `Procedure-${randomInt(10000000, 99999999)}`
      );
    }, 5000);
    this.setState({ timerId });
  };

  blurAction = () => {
    if (!this.props.roles.includes(USER)) return;
    if (this.state.timerId) clearTimeout(this.state.timerId);

    this.props.editProcedureName(
      this.props.userId,
      this.props.match.params.id,
      this.state.name || `Procedure-${randomInt(10000000, 99999999)}`
    );
  };

  deleteProcedure = () => {
    fetch(
      `http://localhost:3001/api/procedures/${this.props.match.params.id}`,
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

  procedureRun = () => {
    this.props.procedureRun(null, this.props.match.params.id);
  };

  applyTask = id => {
    if (!this.props.roles.includes(USER)) return;
    this.props.addTask(this.props.userId, this.props.match.params.id, {
      name: this.props.possible.find(item => item.id === id).name,
      id: randomInt(10000000, 99999999),
      settings: this.props.possible.find(item => item.id === id).settings,
      order: this.props.targetProcedure.tasks.length
    });
  };

  removeTask = id => {
    if (!this.props.roles.includes(USER)) return;
    this.props.removeTask(this.props.userId, this.props.match.params.id, id);
  };

  itemCreation = (data, action) => {
    return data.map((item, i) => {
      return <Item name={item.name} id={item.id} key={i} action={action} />;
    });
  };

  render() {
    if (!this.props.targetProcedure) return null;
    const { classes } = this.props;

    return (
      <ProcedurePage>
        <Heading
          heading={this.props.targetProcedure.name}
          size="big"
          background="pageLabel"
        />
        <Tabs
          data="edit"
          id={this.props.match.params.id}
          deleteProcedure={this.deleteProcedure}
          procedureRun={this.procedureRun}
          isDisabled={!this.props.roles.includes(USER)}
        />
        <Grid container className={classes.input}>
          <Input
            label="Change procedure name: "
            value={this.state.name}
            clickAction={this.nameChange}
            blurAction={this.blurAction}
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
            {this.itemCreation(this.props.possible, this.applyTask)}
          </ProcedureList>
          <ProcedureList
            isHeading="Chosen tasks"
            className="smallList"
            background="middle_left"
          >
            {this.itemCreation(
              this.props.targetProcedure.tasks,
              this.removeTask
            )}
          </ProcedureList>
        </Grid>
      </ProcedurePage>
    );
  }
}

const mapStateToProps = store => {
  return {
    targetProcedure: store.procedures.targetProcedure,
    userId: store.procedures.userId,
    possible: store.tasks.possible,
    roles: store.app.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: (userId, procedureId, newTask) =>
      dispatch(addTask(userId, procedureId, newTask)),
    removeTask: (userId, procedureId, taskId) =>
      dispatch(removeTask(userId, procedureId, taskId)),
    editProcedureName: (userId, procedureId, newName) =>
      dispatch(editProcedureName(userId, procedureId, newName)),
    getTargetProcedure: (userId, procedureId) =>
      dispatch(getTargetProcedure(userId, procedureId)),
    getPossibleTasks: () => dispatch(getPossibleTasks()),
    procedureRun: (userId, procedureId) =>
      dispatch(procedureRun(userId, procedureId))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(EditProcedure)
);
