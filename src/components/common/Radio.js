import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(theme => ({
  formControl: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  Manual: {
    marginBottom: 106
  },
  single: {
    marginBottom: 50
  }
}));

const RadioBtn = props => {
  const classes = useStyles();

  const handleChange = event => {
    props.radioBtnClick(event.target.value);
  };

  const getItems = values => {
    return values.map((item, i) => {
      return (
        <FormControlLabel
          key={i}
          value={item}
          control={<Radio />}
          label={item}
          disabled={props.isEdit}
        />
      );
    });
  };

  return (
    <FormControl component="fieldset" className={classes[props.radio]}>
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup
        className={classes.formControl}
        aria-label="gender"
        name="gender1"
        value={props.radio}
        onChange={handleChange}
      >
        {getItems(props.values)}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBtn;
