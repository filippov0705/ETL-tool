import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Grid from "@material-ui/core/Grid";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import withStyles from "@material-ui/core/styles/withStyles";

import Item from "../../../common/Item";
import InfoButtons from "../../../common/InfoButtons";
import ProcedurePage from "./ProcedurePage";
import ProcedureList from "../../../common/ProcedureList";
import Tabs from "../../../common/Tabs";
import Heading from "../../../common/Heading";

import {
  getTargetProcedure,
  changeTaskSettings,
  procedureRun
} from "../../../../action/ProceduresActions";
import history from "../../../../history";
import {USER} from "../../../../constants/constants";

const styles = theme => ({
  hidden: {
    display: "none"
  },
  grid: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    [theme.breakpoints.up("xs")]: {
      justifyContent: "center"
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between"
    }
  },
  chevron: {
    position: "absolute",
    right: 10,
    top: 5,
    display: "flex"
  },
  message: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: 14,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: 16,
      alignItems: "center"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 28
    }
  }
});

class InfoProcedure extends Component {
  constructor() {
    super();
    this.state = {
      settings: "",
      timerId: null,
      openedItems: []
    };
  }

  componentDidMount() {
    this.props.getTargetProcedure(
      this.props.userId,
      this.props.match.params.id
    );
  }

  getItemField = (attributeToChange, i, item) => {
    return (
      <InfoButtons
        isdisabled={!this.props.roles.includes("user")}
        key={i}
        id={item.id}
        changeTaskSettings={this.changeTaskSettings}
        value={item.settings || ""}
        changeItemSettings={this.changeItemSettings}
        attributeToChange={attributeToChange}
        tooltipText={<FormattedMessage id={`info.${item}`} />}
      />
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

  changeTaskSettings = (id, value) => {
    this.props.changeTaskSettings(
      this.props.userId,
      this.props.match.params.id,
      id,
      value
    );
  };

  getItemSettingsBar = item => {
    const { classes } = this.props;
    if (!item.settings || !Object.keys(item.settings).length) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid item xs={1} className={classes.chevron}>
          {this.state.openedItems.includes(item.id) ? (
            <KeyboardArrowUpIcon
              onClick={() => {
                this.toggleItemAppearance(item.id);
              }}
            />
          ) : (
            <KeyboardArrowDownIcon
              onClick={() => {
                this.toggleItemAppearance(item.id);
              }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          className={
            this.state.openedItems.includes(item.id)
              ? classes.grid
              : classes.hidden
          }
        >
          {Object.keys(item.settings).map((value, i) => {
            return this.getItemField(value, i, item);
          })}
        </Grid>
      </React.Fragment>
    );
  };

  toggleItemAppearance = id => {
    if (this.state.openedItems.includes(id)) {
      this.setState({
        openedItems: this.state.openedItems.filter(item => item !== id)
      });
    } else {
      this.setState({ openedItems: [...this.state.openedItems, id] });
    }
  };

  itemCreation = classes => {
    if (!this.props.targetProcedure.tasks.length) {
      return (
        <div className={classes.message}>
          <span>Selected procedure does not contain tasks.</span>
          <span>Add tasks to procedure on details page</span>
        </div>
      );
    }

    return this.props.targetProcedure.tasks.map((item, i) => {
      return (
        <Item
          name={item.name}
          id={item.id}
          key={i}
          labelAction={this.toggleItemAppearance}
        >
          {this.getItemSettingsBar(item)}
        </Item>
      );
    });
  };

  render() {
    const { classes } = this.props;

    if (!this.props.targetProcedure) return null;

    return (
      <ProcedurePage>
        <Heading
          heading={this.props.targetProcedure.name}
          size="big"
          background="pageLabel"
        />
        <Tabs
          data={"info"}
          id={this.props.match.params.id}
          deleteProcedure={this.deleteProcedure}
          procedureRun={this.procedureRun}
          isDisabled={!this.props.roles.includes(USER)}
        />
        <ProcedureList
          isFullPageWidth={true}
          data={this.props.targetProcedure.tasks}
          className="listStyle"
          needBtns={true}
        >
          {this.itemCreation(classes)}
        </ProcedureList>
      </ProcedurePage>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTargetProcedure: (userId, procedureId) =>
      dispatch(getTargetProcedure(userId, procedureId)),
    changeTaskSettings: (userId, procedureId, taskId, newSettings) =>
      dispatch(changeTaskSettings(userId, procedureId, taskId, newSettings)),
    procedureRun: (userId, procedureId) =>
      dispatch(procedureRun(userId, procedureId))
  };
};

const mapStateToProps = store => {
  return {
    targetProcedure: store.procedures.targetProcedure,
    userId: store.procedures.userId,
    roles: store.app.roles
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(InfoProcedure)
);
