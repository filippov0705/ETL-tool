import {
  CHANGE_USER_NAME,
  DELETE_USER,
  GET_USERS,
  GET_ROLES_TYPES,
  CHANGE_USER_ACTIVENESS
} from "../action/UsersPageAction";

const initialState = () => {
  return {
    existingUsers: [],
    rolesTypes: []
  };
};

export function usersReducer(state = initialState(), action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, existingUsers: action.payload };

    case GET_ROLES_TYPES:
      return { ...state, rolesTypes: action.payload };

    case DELETE_USER:
        const newUserList = state.existingUsers.filter(
            item => item.id !== action.payload
        );
      return {
        ...state,
        existingUsers: [...newUserList]
      };

    case CHANGE_USER_ACTIVENESS:
      return {
        ...state,
        existingUsers: state.existingUsers.map(item => {
          item.isActive = action.payload;
          return item;
        })
      };

    case CHANGE_USER_NAME:
      return {
        ...state,
        existingUsers: state.existingUsers.map(item => {
          item.name = action.payload;
          return item;
        })
      };

    default:
      return state;
  }
}
