export const REGISTRATION = "REGISTRATION";

export function userRegistration(code) {
  return dispatch => {
    fetch("http://localhost:3001/api/main/registration", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ code })
    }).then(response => {
      return response.json();
    });
  };
}
