import { GET_USER_LOGS } from "../action/LogsAction";

const initialState = () => {
  return {
    procedureLogs: [],
    taskLogs: [],
    numberOfLogs: 1,
    allProceduresNames: []
  };
};

export function logsReducer(state = initialState(), action) {
  switch (action.type) {
    case GET_USER_LOGS:
      const { logsForPage, logsTotally, allProceduresNames } = action.payload;

      return {
        ...state,
        procedureLogs: logsForPage,
        numberOfLogs: logsTotally || 1,
        allProceduresNames
      };

    default:
      return { ...state };
  }
}
