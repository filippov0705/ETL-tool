import React from "react";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import mainTheme from "../../style/theme";

const styles = () => ({
  btn: {
    border: "none",
    backgroundColor: "#f4f4f4",
    cursor: "pointer"
  },
  btnWhite: {
    border: "none",
    backgroundColor: "white",
    padding: 0
  },
  Run: {
    border: "none"
  },
  Add: {
    backgroundColor: "#cfe8fc",
    border: "none"
  },
  icon: {
    marginTop: "5px"
  },
  addBtn: {
    zIndex: "50",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "yellowgreen"
  },
  applyBtn: {
    width: "85px",
    height: "40px",
    color: "#fff",
    backgroundColor: "#28a745",
    backgroundImage: "linear-gradient(-180deg,#34d058,#28a745 90%)",
    borderRadius: "7px",
    marginLeft: "20px",
    marginRight: "20px",
    cursor: "pointer"
  },
  applyBtnDisabled: {
    width: "85px",
    height: "40px",
    border: "1px solid gray",
    borderRadius: "7px",
    marginLeft: "20px",
    marginRight: "20px",
    cursor: "pointer"
  },
  sceduleBtn: {
    width: "80px",
    height: "40px",
    margin: "5px",
    borderRadius: "7px",
    cursor: "pointer"
  },
  sceduleBtnActive: {
    width: "80px",
    height: "40px",
    margin: "5px",
    borderRadius: "7px",
    cursor: "pointer",
    backgroundColor: "white"
  },
  itemRemove: {
    ...mainTheme.cardColor,
    border: "none",
    width: "28px",
    height: "28px",
    padding: "0",
    borderRadius: "50%",
    marginTop: 5,
    backgroundColor: "#f4f4f4"
  },
  itemEdit: {
    ...mainTheme.cardColor,
    border: "none",
    marginTop: 5,
    backgroundColor: "#f4f4f4"
  },
  schedule: {
    borderRadius: "50%",
    border: "none",
    margin: "16px 0 11px 1px",
    cursor: "pointer"
  },
  hidden: {
    display: "none"
  },
  back: {
    position: "absolute",
    right: -80,
    bottom: 10,
    borderRadius: 5,
    backgroundColor: "yellowgreen"
  }
});

const Button = props => {
  const { classes } = props;

  return (
    <Link to={props.linkTo}>
      <button
        className={`${classes[props.looks]} button`}
        onClick={props.btnAction}
        data-info={props.info}
      >
        {props.children}
      </button>
    </Link>
  );
};

export default withStyles(styles)(Button);
