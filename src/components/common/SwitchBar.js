import React, { useState, useEffect } from "react";

import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  switchWrapper: {
    marginBottom: 10
  }
});

const SwitchBar = props => {
  const { classes } = props;
  const [state, setState] = useState({
    checkedA: true,
    checkedB: props.state === "true" || props.state === true
  });


  const handleChange = name => event => {
    props.changeUserActiveness(props.id, event.target.checked);
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div className={classes.switchWrapper}>
      <span>Inactive</span>
      <Switch
        disabled={props.isDisabled}
        checked={state.checkedB}
        onChange={handleChange("checkedB")}
        value="checkedB"
        color="primary"
      />
      <span>Active</span>
    </div>
  );
};

export default withStyles(styles)(SwitchBar);
