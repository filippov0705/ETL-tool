import React, { Component } from "react";
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

class ScheduleProcedure extends Component {
  constructor() {
    super();
    this.state = {
      radio: "Manual",
      edit: false,
      date: [],
      time: []
    };
  }

  componentDidMount() {
    this.props.getTargetProcedure(
      this.props.userId,
      this.props.match.params.id
    );
  }

  dateChange = value => {
    if (this.state.radio === SINGLE) {
      return this.setState({ date: value });
    }
    if (!this.state.date.includes(value)) {
      this.setState({ date: [...this.state.date, value] });
    } else {
      this.setState({ date: this.state.date.filter(item => item !== value) });
    }
  };

  timeChange = time => {
    this.setState({ time });
    if (this.state.date.length || !this.state.edit) this.applySchedule(time);
  };

  reformScheduleData = value => {
    const ScheduleData = {
      schedule_id: randomInt(10000000, 99999999),
      monday: false,
      tuesday: false,
      wednsday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      year: null,
      month: null,
      day: null,
      hour: value[0],
      minute: value[1],
      periodicity: this.state.radio
    };
    if (this.state.radio === SINGLE) {
      [
        ScheduleData.year,
        ScheduleData.month,
        ScheduleData.day
      ] = this.state.date;
    } else {
      DAYS_OF_THE_WEEK_ABBREVIATED.forEach((item, i) => {
        if (this.state.date.includes(item))
          ScheduleData[DAYS_OF_THE_WEEK[i]] = true;
      });
    }
    return ScheduleData;
  };

  applySchedule = value => {
    if (!this.props.roles.includes(USER)) return;
    if (this.state.edit || this.state.date.length === 0) return;
    const scheduleData = this.reformScheduleData(value);
    this.props.addNewSchedule(this.props.match.params.id, scheduleData);

    this.setState({ date: [], time: [] });
  };

  radioBtnClick = radio => {
    this.setState({ radio, date: [] });
  };

  editBtnAction = id => {
    if (!this.state.edit) this.setState({ edit: true });
    const targetSchedule = this.props.targetProcedure.schedule.find(
      item => item.schedule_id === id
    );

    const normalizedSchedule = this.normalizeSchedule(targetSchedule);
    this.setState({
      radio: targetSchedule.periodicity,
      date: [
        ...normalizedSchedule.value.slice(
          0,
          normalizedSchedule.value.length - 2
        )
      ],
      time: [
        ...normalizedSchedule.value.slice(normalizedSchedule.value.length - 2)
      ],
      editScheduleId: id
    });
  };

  removeBtnAction = id => {
    this.props.removeSchedule(
      this.props.userId,
      this.props.match.params.id,
      id
    );
    if (this.state.edit) this.setState({ edit: false, date: [], time: [] });
  };

  editSchedule = () => {
    if (this.state.date.length === 0)
      return this.setState({ edit: false, date: [], time: [] });
    const newSchedule = this.reformScheduleData(this.state.time);
    this.props.editSchedule(
      this.props.match.params.id,
      this.state.editScheduleId,
      newSchedule
    );
    this.setState({ edit: false, date: [], time: [] });
  };

  formatNumber = number => {
    if (`${number}`.length === 1) {
      return `0${number}`;
    }
    return number;
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

  createScheduleName = schedule => {
    if (schedule.periodicity === SINGLE) {
      return `Runs only on ${schedule.year}-${this.formatNumber(
        schedule.month
      )}-${this.formatNumber(schedule.day)} at ${this.formatNumber(
        schedule.hour
      )}:${this.formatNumber(schedule.minute)}`;
    } else {
      let DaysOfTheWeekNamePart = "";
      DAYS_OF_THE_WEEK.forEach((item, i) => {
        if (schedule[item]) {
          DaysOfTheWeekNamePart += ` ${DAYS_OF_THE_WEEK_ABBREVIATED[i]}`;
        }
      });
      return `Runs every ${DaysOfTheWeekNamePart} at ${this.formatNumber(
        schedule.hour
      )}:${this.formatNumber(schedule.minute)}`;
    }
  };

  normalizeSchedule = schedule => {
    const normalizedSchedule = {
      periodisity: schedule.periodicity,
      id: schedule.schedule_id
    };
    if (schedule.periodicity === SINGLE) {
      normalizedSchedule.value = [
        schedule.year,
        schedule.month,
        schedule.day,
        schedule.hour,
        schedule.minute
      ];
    } else {
      normalizedSchedule.value = [];
      DAYS_OF_THE_WEEK.forEach((day, i) => {
        if (schedule[day]) {
          normalizedSchedule.value.push(DAYS_OF_THE_WEEK_ABBREVIATED[i]);
        }
      });
      normalizedSchedule.value.push(schedule.hour, schedule.minute);
    }
    return normalizedSchedule;
  };

  procedureRun = () => {
    this.props.procedureRun(null, this.props.match.params.id);
  };

  addNamesToSchedulesInData = procedureSchedule => {
    return procedureSchedule.map(item => {
      const normalizedSchedule = this.normalizeSchedule(item);
      normalizedSchedule.name = this.createScheduleName(item);
      return normalizedSchedule;
    });
  };

  itemCreation = data => {
    return data.map((item, i) => {
      return (
        <Item name={item.name} id={item.id} key={i} needBtns={true}>
          <ItemScheduleButtons
            removeBtnAction={this.removeBtnAction}
            editBtnAction={this.editBtnAction}
            id={item.id}
            procedureId={this.props.match.params.id}
            isDisabled={!this.props.roles.includes(USER)}
          />
        </Item>
      );
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
          data={SCHEDULE}
          id={this.props.match.params.id}
          deleteProcedure={this.deleteProcedure}
          procedureRun={this.procedureRun}
          isDisabled={!this.props.roles.includes(USER)}
        />
        <SchedulesEdit
          isEdit={this.state.edit}
          id={this.props.match.params.id}
          radio={this.state.radio}
          radioBtnClick={this.radioBtnClick}
          dateChange={this.dateChange}
          date={this.state.date}
          time={this.state.time}
          state={this.state}
          timeChange={this.timeChange}
          editSchedule={this.editSchedule}
          isDisabled={!this.props.roles.includes(USER)}
        />
        <ProcedureList
          isFullPageWidth={true}
          isHeading={<FormattedMessage id="schedule.Schedules" />}
          headingStyle="middle_left"
          background="emphasized"
          needBtns={true}
        >
          <div className={classes.itemWrapper}>
            {this.itemCreation(
              this.addNamesToSchedulesInData(
                this.props.targetProcedure.schedule
              )
            )}
          </div>
        </ProcedureList>
      </ProcedurePage>
    );
  }
}

const mapStateToProps = store => {
  return {
    targetProcedure: store.procedures.targetProcedure,
    userId: store.procedures.userId,
    roles: store.app.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSchedule: (procedureId, newSchedule) =>
      dispatch(addNewSchedule(procedureId, newSchedule)),
    removeSchedule: (userId, procedureId, scheduleId) =>
      dispatch(removeSchedule(userId, procedureId, scheduleId)),
    editSchedule: (procedureId, scheduleId, editableSchedule) =>
      dispatch(editSchedule(procedureId, scheduleId, editableSchedule)),
    getTargetProcedure: (userId, procedureId) =>
      dispatch(getTargetProcedure(userId, procedureId)),
    procedureRun: (userId, procedureId) =>
      dispatch(procedureRun(userId, procedureId))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ScheduleProcedure)
);
