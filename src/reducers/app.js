import { SET_USER_DATA } from "../action/AppActions";

const initialState = () => {
  return {
    roles: [],
    userLogin: null,
    isActive: null
  };
};

export function appReducer(state = initialState(), action) {
  switch (action.type) {
    case SET_USER_DATA:
      const { login, userRole, isActive } = action.payload;
      return { ...state, userLogin: login, roles: userRole, isActive };

    default:
      return { ...state };
  }
}
