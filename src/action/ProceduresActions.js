export const ADD_TASK = "ADD_TASK";
export const ADD_NEW_SCHEDULE = "ADD_NEW_SCHEDULE";
export const CLEAR_TARGET_PROCEDURE = "CLEAR_TARGET_PROCEDURE";
export const CLEAR_PROCEDURE_HEADS = "CLEAR_PROCEDURE_HEADS";
export const CHANGE_TASK_SETTINGS = "CHANGE_TASK_SETTINGS";
export const PROCEDURE_DELETE = "PROCEDURE_DELETE";
export const EDIT_PROCEDURE_NAME = "EDIT_PROCEDURE_NAME";
export const EDIT_SCHEDULE = "EDIT_SCHEDULE";
export const GET_PROCEDURES_HEADS = "GET_USER_PROCEDURES_HEADS";
export const GET_PROCEDURE_SCHEDULES = "GET_PROCEDURE_SCHEDULES";
export const NEW_PROCEDURE_CREATE = "NEW_PROCEDURE_CREATE";
export const PROCEDURE_RUN = "PROCEDURE_RUN";
export const REMOVE_SCHEDULE = "REMOVE_SCHEDULE";
export const REMOVE_CHOSEN_TASK = "REMOVE_CHOSEN_TASK";

export function getProceduresHeads(filterValue) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures?filter=${filterValue}`, {
      method: "GET",
      credentials: "include"
    })
      .then(result => result.json())
      .then(content => {
        dispatch({
          type: GET_PROCEDURES_HEADS,
          payload: content
        });
      });
  };
}

export function procedureRun(procedureId) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/${procedureId}/tasks`, {
      method: "GET",
      credentials: "include"
    })
      .then(result => result.json())
      .then(content => {
        dispatch({
          type: PROCEDURE_RUN,
          payload: content
        });
      });
  };
}

export function procedureDelete(procedureId) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/${procedureId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }).then(() => {
      dispatch({
        type: PROCEDURE_DELETE,
        payload: procedureId
      });
    });
  };
}

export function newProcedureCreate(newProcedure) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(newProcedure)
    }).then(() =>
      dispatch({
        type: NEW_PROCEDURE_CREATE,
        payload: newProcedure
      })
    );
  };
}

export function getTargetProcedure(procedureId) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/${procedureId}`, {
      method: "GET",
      credentials: "include"
    })
      .then(result => result.json())
      .then(content => {
        dispatch({
          type: GET_PROCEDURE_SCHEDULES,
          payload: content
        });
      });
  };
}

export function removeSchedule(procedureId, scheduleId) {
  return dispatch => {
    fetch(
      `http://localhost:3001/api/procedures/${procedureId}/schedules/${scheduleId}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    );
    dispatch({
      type: REMOVE_SCHEDULE,
      payload: scheduleId
    });
  };
}

export function addNewSchedule(procedureId, newSchedule) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/${procedureId}/schedules`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newSchedule)
    });
    dispatch({
      type: ADD_NEW_SCHEDULE,
      payload: newSchedule
    });
  };
}

export function editSchedule(procedureId, scheduleId, editableSchedule) {
  return dispatch => {
    fetch(
      `http://localhost:3001/api/procedures/${procedureId}/schedules/${scheduleId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editableSchedule)
      }
    );
    dispatch({
      type: EDIT_SCHEDULE,
      payload: { editableSchedule, scheduleId }
    });
  };
}

export function editProcedureName(procedureId, newName) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/${procedureId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ newName })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          return;
        }
      })
      .then(content =>
        dispatch({
          type: EDIT_PROCEDURE_NAME,
          payload: content
        })
      );
  };
}

export function addTask(procedureId, newTask) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/${procedureId}/tasks`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ newTask })
    })
      .then(response => response.json())
      .then(content =>
        dispatch({
          type: ADD_TASK,
          payload: content
        })
      );
  };
}

export function removeTask(procedureId, taskId) {
  return dispatch => {
    fetch(
      `http://localhost:3001/api/procedures/${procedureId}/tasks/${taskId}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    ).then(response => {
      if (response.ok) {
        dispatch({
          type: REMOVE_CHOSEN_TASK,
          payload: taskId
        });
      }
    });
  };
}

export function changeTaskSettings(procedureId, taskId, newSettings) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/info`, {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ procedureId, taskId, newSettings })
    }).then(() => {
      dispatch({
        type: CHANGE_TASK_SETTINGS,
        payload: { taskId, newSettings }
      });
    })
  };
}

export function clearTargetProcedure() {
  return {
    type: CLEAR_TARGET_PROCEDURE,
    payload: ""
  };
}

export function deleteProcedureHeads() {
  return {
    type: CLEAR_PROCEDURE_HEADS,
    payload: ""
  }
}
