import React from "react";

import { Grid } from "@material-ui/core";

import Heading from "./Heading";
import List from "./List";

const ProcedureList = props => {
  return (
    <Grid item sm={props.isFullPageWidth ? 12 : 6} xs={12}>
      <Heading
        size={props.headingStyle}
        heading={props.isHeading}
        background={props.background}
      />
      <List
        className={props.className}
        action={props.action}
        needBtns={props.needBtns}
        id={props.id}
        addBtn={props.addBtn}
      >
        {props.children}
      </List>
    </Grid>
  );
};

export default ProcedureList;
