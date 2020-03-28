import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./app";
import { proceduresReducer } from "./procedures";
import { tasksReducer } from "./tasks";
import { usersReducer } from "./users";
import { logsReducer } from "./logs";

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  logs: logsReducer,
  procedures: proceduresReducer,
  tasks: tasksReducer,
  users: usersReducer
});
