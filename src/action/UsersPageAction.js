export const CHANGE_USER_NAME = "CHANGE_USER_NAME";
export const DELETE_USER = "DELETE_USER";
export const GET_USERS = "GET_USERS";
export const GET_ROLES_TYPES = "GET_ROLES_TYPES";
export const CHANGE_USER_ACTIVENESS = "CHANGE_USER_ACTIVENESS";

export function getUsers(filteredUser) {
  const url = `http://localhost:3001/api/users${
    filteredUser ? `?user=${filteredUser}` : ""
  }`;

  return dispatch => {
    fetch(url, {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(content => {
        dispatch({
          type: GET_USERS,
          payload: content
        });
      });
  };
}

export function getRolesTypes() {
  return dispatch => {
    fetch(`http://localhost:3001/api/users/roles`, {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(content => {
        dispatch({
          type: GET_ROLES_TYPES,
          payload: content
        });
      });
  };
}

export function deleteUser(userId) {
  fetch(`http://localhost:3001/api/users/${userId}`, {
    method: "DELETE",
    credentials: "include"
  });
  return {
    type: DELETE_USER,
    payload: userId
  };
}

export function changeUserActiveness(userId, newState) {
  return dispatch => {
    fetch(`http://localhost:3001/api/users/${userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state: "activeness", value: newState })
    })
      .then(response => response.text())
      .then(content => {
        dispatch({
          type: CHANGE_USER_ACTIVENESS,
          payload: content
        });
      });
  };
}

export function changeUserName(userId, newName) {
  return dispatch => {
    fetch(`http://localhost:3001/api/users/${userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state: "name", value: newName })
    })
      .then(response => response.text())
      .then(content => {
        dispatch({
          type: CHANGE_USER_NAME,
          payload: content
        });
      });
  };
}
