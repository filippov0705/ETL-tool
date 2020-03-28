import React from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutocompleteField = props => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.data}
      getOptionLabel={option => option}
      onChange={(event, value) => props.action(value)}
      style={{ width: 300 }}
      renderInput={params => {
        return (
          <TextField {...params} label="Name" variant="outlined" fullWidth />
        );
      }}
    />
  );
};

export default AutocompleteField;
