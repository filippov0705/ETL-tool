import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ProcedurePage from "../procedure/ProcedurePage";
import ProcedureList from "../../../common/ProcedureList";
import Item from "../../../common/Item";
import LogContent from "../../../common/LogContent";
import LogFilter from "../../../common/LogFilter";

import { FROM_EARLIEST } from "../../../../constants/constants";

import { getUserLogs } from "../../../../action/LogsAction";

const Logs = props => {
  const [openedItems, setOpenedItems] = useState([]);
  const [numberOfLogs, setNumberOfLogs] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [radioBtnValue, setRadioBtnValue] = useState(FROM_EARLIEST);
  const [desiredProcedure, setDesiredProcedure] = useState(null);

  const getPageTotalNumber = Math.ceil(props.logs.numberOfLogs / numberOfLogs);

  useEffect(() => {
    props.getUserLogs(currentPage, numberOfLogs, {
      radioBtnValue,
      desiredProcedure
    });
  }, []);

  useEffect(() => {
    if (getPageTotalNumber < currentPage) {
      setCurrentPage(getPageTotalNumber);
      props.getUserLogs(getPageTotalNumber, numberOfLogs, {
        radioBtnValue,
        desiredProcedure
      });
    }
  });

  const toggleItemAppearance = id => {
    openedItems.includes(id)
      ? setOpenedItems(openedItems.filter(item => item !== id))
      : setOpenedItems([...openedItems, id]);
  };

  const changeNumberOfLogs = numberOfLogs => {
    setNumberOfLogs(numberOfLogs);
    const pageTotalNumber = Math.ceil(props.logs.numberOfLogs / numberOfLogs);
    const page = pageTotalNumber < currentPage ? pageTotalNumber : currentPage;
    props.getUserLogs(page, numberOfLogs, {
      radioBtnValue,
      desiredProcedure
    });
  };

  const changeDesiredProcedure = name => {
    setDesiredProcedure(name);
    props.getUserLogs(currentPage, numberOfLogs, {
      radioBtnValue,
      desiredProcedure: name
    });
  };

  const getRunStatus = data => {
    const allStatuses = data.map(item => item.status);
    return allStatuses.includes("Error")
      ? "Error"
      : allStatuses.includes("Warning")
      ? "Warning"
      : "Success";
  };

  const itemCreation = () => {
    return props.logs.procedureLogs.map((item, i) => {
      const runStatus = getRunStatus(item.log);
      return (
        <Item
          name={`${item.name}`}
          labelAction={toggleItemAppearance}
          id={item.procedure_log_id}
          key={i}
          needBtns={true}
          specificColor={runStatus.toLowerCase()}
        >
          <LogContent
            isOpen={openedItems.includes(item.procedure_log_id)}
            action={toggleItemAppearance}
            executionTime={item.execution_time}
            pageLogs={item.log}
            id={item.procedure_log_id}
            runStatus={runStatus}
          />
        </Item>
      );
    });
  };

  const changeRadioValue = value => {
    setRadioBtnValue(value);
    props.getUserLogs(currentPage, numberOfLogs, {
      radioBtnValue: value,
      desiredProcedure
    });
  };

  const changePage = page => {
    if (page === currentPage || page <= 0 || page > getPageTotalNumber) return;
    setCurrentPage(page);
    props.getUserLogs(page, numberOfLogs, { radioBtnValue, desiredProcedure });
  };

  return (
    <ProcedurePage>
      <ProcedureList
        isFullPageWidth={true}
        className="listStyle"
        needBtns={true}
      >
        <LogFilter
          changeDesiredProcedure={changeDesiredProcedure}
          allProceduresNames={props.logs.allProceduresNames}
          changeNumberOfLogs={changeNumberOfLogs}
          numberOfLogs={numberOfLogs}
          currentPage={currentPage}
          pageTotalNumber={getPageTotalNumber}
          changePage={changePage}
          radioBtnValue={radioBtnValue}
          changeRadioValue={changeRadioValue}
        />
        {itemCreation()}
      </ProcedureList>
    </ProcedurePage>
  );
};

const mapStateToProps = store => {
  return {
    logs: store.logs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLogs: (page, numberOfLogs, filterSettings) =>
      dispatch(getUserLogs(page, numberOfLogs, filterSettings))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
