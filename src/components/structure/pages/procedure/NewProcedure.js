import React, { Component } from "react";
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

class ProcedureAdd extends Component {
  constructor() {
    super();
    this.state = {
      selectedTasks: [],
      name: ""
    };
  }

  componentDidMount() {
    this.props.getPossibleTasks();
  }

  applyTask = id => {
    this.setState({
      selectedTasks: [
        ...this.state.selectedTasks,
        {
          name: this.props.possible.find(item => item.id === id).name,
          id: randomInt(10000000, 99999999),
          settings: this.props.possible.find(item => item.id === id).settings
        }
      ]
    });
  };

  createProcedure = () => {
    if (!this.props.roles.includes("user")) return;
    const newProcedure = {
      name: this.state.name || `Procedure-${randomInt(10000000, 99999999)}`,
      id: randomInt(10000000, 99999999),
      schedule: [],
      tasks: this.state.selectedTasks
    };
    this.props.newProcedureCreate(this.props.userId, newProcedure);
  };

  removeTask = id => {
    this.setState({
      selectedTasks: this.state.selectedTasks.filter(item => item.id !== id)
    });
  };

  nameChange = name => {
    this.setState({ name });
  };

  itemCreation = (data, action) => {
    return data.map((item, i) => {
      return <Item name={item.name} id={item.id} key={i} action={action} />;
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <ProcedurePage>
        <Heading
          size="big"
          heading={<FormattedMessage id="procedure.newProcedure" />}
        />
        <Grid className={classes.gridStyle}>
          <Input
            label={<FormattedMessage id="label.procedureName" />}
            value={this.state.name}
            clickAction={this.nameChange}
            className="input"
            labelClassName="label"
          />
          <Button
            looks={
              this.props.roles.includes("user")
                ? "applyBtn"
                : "applyBtnDisabled"
            }
            linkTo={
              this.props.roles.includes("user")
                ? ProceduresPath()
                : newProcedurePath()
            }
            btnAction={this.createProcedure}
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
            {this.itemCreation(this.props.possible, this.applyTask)}
          </ProcedureList>
          <ProcedureList
            isHeading={<FormattedMessage id="procedure.selectedTasks" />}
            className="smallList"
            background="middle_left"
          >
            {this.itemCreation(this.state.selectedTasks, this.removeTask)}
          </ProcedureList>
        </Grid>
      </ProcedurePage>
    );
  }
}

const mapStateToProps = store => {
  return {
    possible: store.tasks.possible,
    userId: store.procedures.userId,
    roles: store.app.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newProcedureCreate: (userId, newProcedure) =>
      dispatch(newProcedureCreate(userId, newProcedure)),
    getPossibleTasks: () => dispatch(getPossibleTasks())
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProcedureAdd)
);
