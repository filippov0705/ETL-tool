import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  inputWrapper: {
    height: 80,
    width: 260,
    display: "flex",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 10
  }
});

const InfoButtons = props => {
  const [value, setValue] = useState(
    props.value[props.attributeToChange] || ""
  );
  const { classes } = props;

  const getLabelWithUpperCaseLetter = () => {
    return (
      <span>
        {`${props.attributeToChange[0].toUpperCase()}${props.attributeToChange.slice(
          1
        )}`}
      </span>
    );
  };

  const inputValueChange = event => {
    if (props.isdisabled) return;
    setValue(event.target.value);
    props.changeTaskSettings(props.id, {
      parameter: props.attributeToChange,
      newValue: event.target.value
    });
  };

  return (
    <div className={classes.inputWrapper}>
      <Tooltip
        title={<FormattedMessage id={`info.${props.attributeToChange}`} />}
        arrow
      >
        <TextField
          label={getLabelWithUpperCaseLetter()}
          type={props.attributeToChange === "password" ? "password" : ""}
          value={value}
          variant="outlined"
          onChange={inputValueChange}
        />
      </Tooltip>
    </div>
  );
};

export default withStyles(styles)(InfoButtons);
