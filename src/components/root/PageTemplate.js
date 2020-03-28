import React from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";
import PositionedSnackbar from "../common/Notification";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  proceduresWrapper: {
    minWidth: "260px",
    backgroundColor: "white",
    flexGrow: "2",
    width: "100%",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px"
  },
  container: {
    display: "flex",
    flexGrow: "80",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      padding: "0"
    }
  }
});

const PageTemplate = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <PositionedSnackbar snackMessage={props.snackMessage} />
      <Header
        isLoggedIn={props.isLoggedIn}
        action={props.action}
        location={props.location}
        isAdmin={props.isAdmin}
        isActive={props.isActive}
      />
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Typography component="div" className={classes.proceduresWrapper}>
          {props.children}
        </Typography>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default withStyles(styles)(PageTemplate);
