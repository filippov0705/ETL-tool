import React, { useState, useEffect } from "react";
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

const InfoProcedure = props => {
  const [openedItems, setOpenedItems] = useState([]);
  const { classes } = props;


  useEffect(() => {
    props.getTargetProcedure(
        props.match.params.id
    );
  }, []);

  if (!props.targetProcedure) return null;

  const getItemField = (attributeToChange, i, item) => {
    return (
        <InfoButtons
            isdisabled={!props.roles.includes("user")}
            key={i}
            id={item.id}
            changeTaskSettings={changeTaskSettings}
            value={item.settings || ""}
            attributeToChange={attributeToChange}
            tooltipText={<FormattedMessage id={`info.${item}`} />}
        />
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

  const changeTaskSettings = (id, value) => {
    props.changeTaskSettings(
        props.match.params.id,
        id,
        value
    );
  };

  const getItemSettingsBar = item => {
    if (!item.settings || !Object.keys(item.settings).length) {
      return null;
    }

    return (
        <React.Fragment>
          <Grid item xs={1} className={classes.chevron}>
            {openedItems.includes(item.id) ? (
                <KeyboardArrowUpIcon
                    onClick={() => {
                      toggleItemAppearance(item.id);
                    }}
                />
            ) : (
                <KeyboardArrowDownIcon
                    onClick={() => {
                      toggleItemAppearance(item.id);
                    }}
                />
            )}
          </Grid>
          <Grid
              item
              xs={12}
              className={
                openedItems.includes(item.id)
                    ? classes.grid
                    : classes.hidden
              }
          >
            {Object.keys(item.settings).map((value, i) => getItemField(value, i, item))}
          </Grid>
        </React.Fragment>
    );
  };

  const toggleItemAppearance = id => {
    if (openedItems.includes(id)) {
        setOpenedItems(openedItems.filter(item => item !== id));
    } else {
      setOpenedItems([...openedItems, id] );
    }
  };

  const itemCreation = () => {
    if (!props.targetProcedure.tasks.length) {
      return (
          <div className={classes.message}>
            <span>Selected procedure does not contain tasks.</span>
            <span>Add tasks to procedure on details page</span>
          </div>
      );
    }

    return props.targetProcedure.tasks.map((item, i) => {
      return (
          <Item
              name={item.name}
              id={item.id}
              key={i}
              labelAction={toggleItemAppearance}
          >
            {getItemSettingsBar(item)}
          </Item>
      );
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
            data="info"
            id={props.match.params.id}
            deleteProcedure={deleteProcedure}
            procedureRun={procedureRun}
            isDisabled={!props.roles.includes(USER)}
        />
        <ProcedureList
            isFullPageWidth
            data={props.targetProcedure.tasks}
            className="listStyle"
            needBtns
        >
          {itemCreation()}
        </ProcedureList>
      </ProcedurePage>
  );

};

const mapDispatchToProps = dispatch => {
  return {
    getTargetProcedure: procedureId =>
      dispatch(getTargetProcedure(procedureId)),
    changeTaskSettings: (procedureId, taskId, newSettings) =>
      dispatch(changeTaskSettings(procedureId, taskId, newSettings)),
    procedureRun: procedureId =>
      dispatch(procedureRun(procedureId))
  };
};

const mapStateToProps = store => {
  return {
    targetProcedure: store.procedures.targetProcedure,
    roles: store.app.roles
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(InfoProcedure)
);
