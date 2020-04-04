import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { newProcedurePath } from "../../../../utils/BuildPaths";

import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormattedMessage } from "react-intl";

import Page from "../../../common/Page";
import ProcedureList from "../../../common/ProcedureList";
import Button from "../../../common/Button";
import Search from "../../../common/Search";
import Item from "../../../common/Item";
import ItemButtons from "../../../common/ItemButtons";

import {
  getProceduresHeads,
  procedureRun,
  procedureDelete
} from "../../../../action/ProceduresActions";

const styles = theme => ({
  tooltipText: {
    fontSize: 18,
    lineHeight: 1.4
  },
  addBtnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    position: "relative"
  },
  arrow: {
    position: "absolute",
    top: 54,
    right: 15,
    width: 0,
    height: 0,
    zIndex: 9,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "10px solid rgba(97, 97, 97, 0.9)",
    [theme.breakpoints.up("xs")]: {
      top: 64
    },
    [theme.breakpoints.up("sm")]: {
      top: 54
    }
  },
  hidden: {
    display: "none"
  },
  search: {
    display: "flex",
    alignItems: "center"
  }
});

const Procedures = props => {
  const { classes } = props;
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    props.getProceduresHeads(filterValue);
  }, []);

  if (!props.list) return null;
  const isTooltipOpen = !props.list.length && !filterValue && !!props.list;

  const changeFilterValue = value => {
    setFilterValue(value);
    props.getProceduresHeads(value);
  };

  const itemCreation = data => {
    return data.map(item => {
      return (
        <Item name={item.name} id={item.id} key={item.id} needBtns={true}>
          <ItemButtons
            procedureRun={props.procedureRun}
            procedureDelete={props.procedureDelete}
            id={item.id}
            disabled={!props.roles.includes("user")}
          />
        </Item>
      );
    });
  };

  return (
    <Page>
      <ProcedureList
        isFullPageWidth={true}
        isHeading={false}
        className="listStyle"
        addBtn={
          <Grid container>
            <Grid item className={classes.search} xs={10}>
              <Search action={changeFilterValue} />
            </Grid>
            <Grid className={classes.addBtnWrapper} item xs={2}>
              <div className={isTooltipOpen ? classes.arrow : classes.hidden} />
              <Tooltip
                title={
                  <span className={classes.tooltipText}>
                    <FormattedMessage id="procedure.noProceduresTooltip" />
                  </span>
                }
                placement="bottom"
                open={isTooltipOpen}
              >
                <div>
                  <Button looks="addBtn" linkTo={newProcedurePath()}>
                    <AddIcon />
                  </Button>
                </div>
              </Tooltip>
            </Grid>
          </Grid>
        }
      >
        {itemCreation(props.list)}
      </ProcedureList>
    </Page>
  );
};

const mapStateToProps = store => {
  return {
    list: store.procedures.list,
    roles: store.app.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProceduresHeads: filterValue =>
      dispatch(getProceduresHeads(filterValue)),
    procedureRun: (procedureId) =>
      dispatch(procedureRun(procedureId)),
    procedureDelete: (procedureId) =>
      dispatch(procedureDelete(procedureId))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Procedures)
);
