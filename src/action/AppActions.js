export const SET_USER_DATA = "SET_USER_DATA";

export function setUserParams(userData) {
  return {
    type: SET_USER_DATA,
    payload: userData
  };
}
