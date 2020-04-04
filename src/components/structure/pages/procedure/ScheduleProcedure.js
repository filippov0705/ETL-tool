import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import randomInt from "random-int";

import withStyles from "@material-ui/core/styles/withStyles";

import Item from "../../../common/Item";
import ItemScheduleButtons from "../../../common/ItemScheduleButtons";
import Heading from "../../../common/Heading";
import ProcedureList from "../../../common/ProcedureList";
import ProcedurePage from "./ProcedurePage";
import SchedulesEdit from "../../../common/SchedulesEdit";
import Tabs from "../../../common/Tabs";

import {
  DAYS_OF_THE_WEEK,
  DAYS_OF_THE_WEEK_ABBREVIATED,
  SINGLE,
  SCHEDULE,
  USER
} from "../../../../constants/constants";

import {
  addNewSchedule,
  removeSchedule,
  editSchedule,
  getTargetProcedure,
  procedureRun
} from "../../../../action/ProceduresActions";
import history from "../../../../history";

const styles = () => ({
  itemWrapper: {
    margin: "0 10px"
  }
});

const ScheduleProcedure = props => {
  const defaultDate = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    year: null,
    month: null,
    day: null,
  };

  const defaultTime = {
    hour: null,
    minute: null,
  };

  const [radio, setRadio] = useState("Manual");
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState({...defaultDate});
  const [time, setTime] = useState(defaultTime);
  const [editScheduleId, setEditScheduleId] = useState(undefined);
  const { classes } = props;

  useEffect(() => {
    props.getTargetProcedure(
        props.match.params.id
    );
  }, []);

  const dateChange = value => setDate({ ...date, ...value });

  const timeChange = time => {
    setTime(time);
    if (date.length || !edit) applySchedule(time);
  };

  const reformScheduleData = value => {
    const ScheduleData = {
      schedule_id: randomInt(10000000, 99999999),
      ...date,
      ...value,
      periodicity: radio
    };

    return ScheduleData;
  };

  const applySchedule = value => {
    if (!props.roles.includes(USER)) return;
    if (edit || date.length === 0) return;
    const scheduleData = reformScheduleData(value);
    props.addNewSchedule(props.match.params.id, scheduleData);

    setDate(defaultDate);
    setTime(defaultTime);
  };

  const radioBtnClick = newRadio => {
    setRadio(newRadio);
    setDate(defaultDate);
  };

  const editBtnAction = id => {
    if (!edit) setEdit(true);

    const targetSchedule = props.targetProcedure.schedule.find(
        item => item.schedule_id === id
    );

    setDate({
      monday: targetSchedule.monday,
      tuesday: targetSchedule.tuesday,
      wednesday: targetSchedule.wednesday,
      thursday: targetSchedule.thursday,
      friday: targetSchedule.friday,
      saturday: targetSchedule.saturday,
      sunday: targetSchedule.sunday,
      year: targetSchedule.year,
      month: targetSchedule.month,
      day: targetSchedule.day });

    setTime({
      hour: targetSchedule.hour,
      minute: targetSchedule.minute,
    });

    setRadio(targetSchedule.periodicity);
    setEditScheduleId(id);
  };

  const removeBtnAction = id => {
    props.removeSchedule(
        props.match.params.id,
        id
    );
    if (edit) {
      setEdit(false);
      setDate(defaultDate);
      setTime(defaultTime);
    }
  };

  const editSchedule = () => {
    if (date.length === 0) {
      setEdit(false);
      setDate(defaultDate);
      setTime(defaultTime);
      return;
    }

    const newSchedule = reformScheduleData(time);
    props.editSchedule(
        props.match.params.id,
        editScheduleId,
        newSchedule
    );
    setEdit(false);
    setDate(defaultDate);
    setTime(defaultTime);
  };

  const formatNumber = number => {
    if (`${number}`.length === 1) {
      return `0${number}`;
    }
    return number;
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

  const createScheduleName = schedule => {
    if (schedule.periodicity === SINGLE) {
      return `Runs only on ${schedule.year}-${formatNumber(
          schedule.month
      )}-${formatNumber(schedule.day)} at ${formatNumber(
          schedule.hour
      )}:${formatNumber(schedule.minute)}`;
    } else {
      let DaysOfTheWeekNamePart = "";
      DAYS_OF_THE_WEEK.forEach((item, i) => {
        if (schedule[item]) {
          DaysOfTheWeekNamePart += ` ${DAYS_OF_THE_WEEK_ABBREVIATED[i]}`;
        }
      });
      return `Runs every ${DaysOfTheWeekNamePart} at ${formatNumber(
          schedule.hour
      )}:${formatNumber(schedule.minute)}`;
    }
  };

  const procedureRun = () => {
    props.procedureRun(props.match.params.id);
  };

  const addNamesToSchedulesInData = procedureSchedule => {
    return procedureSchedule.map(item => {

      item.name = createScheduleName(item);
      item.id = item.schedule_id;
      return item;
    });
  };

  const itemCreation = data => {
    return data.map((item, i) => {
      return (
          <Item name={item.name} id={item.id} key={i} needBtns>
            <ItemScheduleButtons
                removeBtnAction={removeBtnAction}
                editBtnAction={editBtnAction}
                id={item.id}
                procedureId={props.match.params.id}
                isDisabled={!props.roles.includes(USER)}
            />
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
            data={SCHEDULE}
            id={props.match.params.id}
            deleteProcedure={deleteProcedure}
            procedureRun={procedureRun}
            isDisabled={!props.roles.includes(USER)}
        />
        <SchedulesEdit
            isEdit={edit}
            id={props.match.params.id}
            radioBtnClick={radioBtnClick}
            dateChange={dateChange}
            date={date}
            time={time}
            radio={radio}
            timeChange={timeChange}
            editSchedule={editSchedule}
            isDisabled={!props.roles.includes(USER)}
        />
        <ProcedureList
            isFullPageWidth
            isHeading={<FormattedMessage id="schedule.Schedules" />}
            headingStyle="middle_left"
            background="emphasized"
            needBtns
        >
          <div className={classes.itemWrapper}>
            {itemCreation(
                addNamesToSchedulesInData(
                    props.targetProcedure.schedule
                )
            )}
          </div>
        </ProcedureList>
      </ProcedurePage>
  );
};

ScheduleProcedure.defaultProps = {
  targetProcedure: {
    name: '',
    schedule: [],
  },
};

const mapStateToProps = store => {
  return {
    targetProcedure: store.procedures.targetProcedure,
    roles: store.app.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSchedule: (procedureId, newSchedule) =>
      dispatch(addNewSchedule(procedureId, newSchedule)),
    removeSchedule: (procedureId, scheduleId) =>
      dispatch(removeSchedule(procedureId, scheduleId)),
    editSchedule: (procedureId, scheduleId, editableSchedule) =>
      dispatch(editSchedule(procedureId, scheduleId, editableSchedule)),
    getTargetProcedure: (procedureId) =>
      dispatch(getTargetProcedure(procedureId)),
    procedureRun: (procedureId) =>
      dispatch(procedureRun(procedureId))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ScheduleProcedure)
);
