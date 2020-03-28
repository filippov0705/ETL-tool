import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  card: {
    width: 200,
    height: 250,
    border: "1px solid black",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 10px",
    marginBottom: 20,
    textIndent: "none"
  },
  img: {
    width: 50,
    height: 50,
    marginBottom: 30
  }
});

const InfoCard = props => {
  const { classes } = props;
  return (
    <div className={classes.card}>
      <img src={props.img} alt="excel" className={classes.img} />
      <span>{props.text}</span>
    </div>
  );
};

export default withStyles(styles)(InfoCard);
