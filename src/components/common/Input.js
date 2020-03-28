import React from "react";
import { FormattedMessage } from "react-intl";

import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  input: {
    marginLeft: "10px",
    height: "30px",
    borderRadius: "5px",
    width: "220px"
  },
  inner: {
    width: 160,
    borderRadius: 5,
    marginRight: 5
  },
  innerLabel: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  labelSpan: {
    marginLeft: "20px"
  }
});

const Input = props => {
  const { classes } = props;

  const inputTextChange = event => {
    props.clickAction(event.target.value, props.id);
  };

  return (
    <label className={classes[props.labelClassName]}>
      <span className={classes.labelSpan}>{props.label}</span>
      <Tooltip title={<FormattedMessage id="procedure.signRestriction" />}>
        <input
          className={classes[props.className]}
          onChange={inputTextChange}
          value={props.value}
          onBlur={props.blurAction}
        />
      </Tooltip>
    </label>
  );
};

export default withStyles(styles)(Input);
