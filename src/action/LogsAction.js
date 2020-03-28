export const GET_USER_LOGS = "GET_USER_LOGS";

export function getUserLogs(page, numberOfLogs, filterSettings) {
  return dispatch => {
    fetch(
      `http://localhost:3001/api/users/user/logs?page=${page}&logsNumber=${numberOfLogs}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          order: filterSettings.radioBtnValue,
          procedureName: filterSettings.desiredProcedure
        })
      }
    )
      .then(result => result.json())
      .then(content => {
        dispatch({
          type: GET_USER_LOGS,
          payload: content
        });
      });
  };
}
