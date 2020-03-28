export const GET_POSSIBLE_TASKS = "GET_POSSIBLE_TASKS";

export function getPossibleTasks() {
  return dispatch => {
    fetch(`http://localhost:3001/api/tasks`, {
      method: "GET",
      credentials: "include"
    })
      .then(result => result.json())
      .then(content => {
        dispatch({
          type: GET_POSSIBLE_TASKS,
          payload: content
        });
      });
  };
}
