import React from "react";

import Button from "./Button";

import { procedureScheduleUrl } from "../../utils/BuildPaths";

import {DAYS_OF_THE_WEEK, DAYS_OF_THE_WEEK_ABBREVIATED, PERIODICALLY} from "../../constants/constants";

const DaysOfTheWeekBtns = props => {
  const createButtons = () => {

    return DAYS_OF_THE_WEEK_ABBREVIATED.map((item, i) => {
      const notAbbreviatedValue = DAYS_OF_THE_WEEK[DAYS_OF_THE_WEEK_ABBREVIATED.indexOf(item)];

      return (
        <Button
          key={i}
          btnAction={() => props.dateChange({ [notAbbreviatedValue]: !props.date[notAbbreviatedValue] })}
          linkTo={procedureScheduleUrl(props.id)}
          looks={props.date[notAbbreviatedValue] ? "sceduleBtnActive" : "sceduleBtn"}
        >
          {item}
        </Button>
      );
    });
  };

  return (
    <React.Fragment>
      {props.periodicity === PERIODICALLY ? createButtons() : null}
    </React.Fragment>
  );
};

export default DaysOfTheWeekBtns;
