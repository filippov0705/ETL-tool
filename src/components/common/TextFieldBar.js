import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import randomInt from "random-int";

const TextFieldBar = props => {
  const [value, setValue] = useState(props.value);

  const blurAction = event => {
    if (!event.target.value) {
      setValue(props.value);
    }
  };

  const valueChange = event => {
    setValue(event.target.value);
    props.action(
      props.id,
      event.target.value || `User-${randomInt(10000000, 99999999)}`
    );
  };

  return (
    <TextField
      value={value}
      id="outlined-required"
      label="User name"
      variant="outlined"
      fullWidth={true}
      onBlur={blurAction}
      onChange={valueChange}
    />
  );
};

export default TextFieldBar;
