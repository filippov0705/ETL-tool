import React from "react";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  span: {
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
    margin: "0 5px",
    cursor: "pointer",
    minWidth: 23,
    height: 30
  },
  spanActive: {
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
    margin: "0 5px",
    color: "red",
    minWidth: 23,
    height: 30
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    cursor: "pointer"
  },
  moreSpan: {
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
    margin: "0 5px",
    minWidth: 23,
    height: 30
  }
});

const PageSwitcher = props => {
  const { classes, currentPage, action, pageTotalNumber } = props;

  const getNumbersOfVisiablePages = arr => {
    if (currentPage < 4) {
      return arr.length > 6 ? [...arr.slice(0, 5), "..."] : arr.slice(0, 5);
    }
    if (currentPage > pageTotalNumber - 3) {
      return arr.length > 6 ? ["...", ...arr.slice(-5)] : arr.slice(-5);
    }
    return arr.length > 7
      ? ["...", ...arr.slice(currentPage - 3, currentPage + 2), "..."]
      : arr.slice(currentPage - 3, currentPage + 2);
  };

  const getPagesNumbers = pageTotalNumber => {
    const pagesArr = [];

    for (let i = 1; i <= pageTotalNumber; i++) {
      pagesArr.push(i);
    }

    const visiablePages = getNumbersOfVisiablePages(pagesArr);
    return visiablePages.map((item, i) => {
      if (item === "...") {
        return (
          <span key={i} className={classes.moreSpan}>
            {item}
          </span>
        );
      }
      return (
        <span
          key={i}
          onClick={() => action(item)}
          className={item === currentPage ? classes.spanActive : classes.span}
        >
          {item}
        </span>
      );
    });
  };

  return (
    <Grid item xs={12} sm={6} md={5} className={classes.wrapper}>
      <SkipPreviousIcon
        className={classes.button}
        onClick={() => action(1)}
        color={currentPage === 1 ? "disabled" : "inherit"}
      />
      <NavigateBeforeIcon
        className={classes.button}
        onClick={() => action(currentPage - 1)}
        color={currentPage === 1 ? "disabled" : "inherit"}
      />
      {getPagesNumbers(props.pageTotalNumber)}
      <NavigateNextIcon
        className={classes.button}
        onClick={() => action(currentPage + 1)}
        color={currentPage === pageTotalNumber ? "disabled" : "inherit"}
      />
      <SkipNextIcon
        className={classes.button}
        onClick={() => action(pageTotalNumber)}
        color={currentPage === pageTotalNumber ? "disabled" : "inherit"}
      />
    </Grid>
  );
};

export default withStyles(styles)(PageSwitcher);
