import React from "react";
import { FormattedMessage } from "react-intl";

import withStyles from "@material-ui/core/styles/withStyles";

import Heading from "./Heading";
import Excel from "../../style/img/excel.png";
import FTP from "../../style/img/ftp.png";
import Gmail from "../../style/img/gmail.png";
import InfoCard from "./InfoCard";

const styles = () => ({
  cardWrapper: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 20
  }
});

const AppInfoCards = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Heading size="big" heading={<FormattedMessage id="infoCard.weCan" />} />
      <div className={classes.cardWrapper}>
        <InfoCard img={Excel} text={<FormattedMessage id="infoCard.excel" />} />
        <InfoCard img={FTP} text={<FormattedMessage id="infoCard.FTP" />} />
        <InfoCard img={Gmail} text={<FormattedMessage id="infoCard.mail" />} />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(AppInfoCards);
