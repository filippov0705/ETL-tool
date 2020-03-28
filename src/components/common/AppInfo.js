import React from "react";
import { FormattedMessage } from "react-intl";

import withStyles from "@material-ui/core/styles/withStyles";

import Heading from "./Heading";

const styles = () => ({
  text: {
    marginBottom: 20,
    textIndent: 30,
    padding: "0 20px"
  }
});

const AppInfo = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Heading size="big" heading="ETL-tool" />
      <div className={classes.text}>
        <FormattedMessage id="appInfo.firstParagraph" />
      </div>
      <div className={classes.text}>
        <FormattedMessage id="appInfo.secondParagraph" />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(AppInfo);
