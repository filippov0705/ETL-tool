import {
  ADD_NEW_SCHEDULE,
  ADD_TASK,
  CLEAR_TARGET_PROCEDURE,
  CLEAR_PROCEDURE_HEADS,
  CHANGE_TASK_SETTINGS,
  EDIT_SCHEDULE,
  EDIT_PROCEDURE_NAME,
  GET_PROCEDURES_HEADS,
  GET_PROCEDURE_SCHEDULES,
  PROCEDURE_DELETE,
  PROCEDURE_RUN,
  REMOVE_SCHEDULE,
  REMOVE_CHOSEN_TASK,
  NEW_PROCEDURE_CREATE
} from "../action/ProceduresActions";

const initialState = () => {
  return {
    list: undefined,
    targetProcedure: undefined,
    snackMessage: {},
  };
};

export function proceduresReducer(state = initialState(), action) {
  switch (action.type) {
    case NEW_PROCEDURE_CREATE:
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case CHANGE_TASK_SETTINGS:
      const procedureWithChangedSettings = state.targetProcedure;
      procedureWithChangedSettings.tasks = state.targetProcedure.tasks.map(item => {
        if (item.id === action.payload.taskId) {
          item.settings[ action.payload.newSettings.parameter] = action.payload.newSettings.newValue;
        }
        return item;
      });

      return { ...state, targetProcedure: procedureWithChangedSettings };

    case PROCEDURE_RUN:
      return { ...state, snackMessage: action.payload };

    case CLEAR_PROCEDURE_HEADS:
      return { ...state, list: [] };

    case REMOVE_SCHEDULE:
      const newtargetProcedure = state.targetProcedure;
      newtargetProcedure.schedule = state.targetProcedure.schedule.filter(
        item => item.schedule_id !== action.payload
      );
      return { ...state, targetProcedure: newtargetProcedure };

    case ADD_TASK:
      const targetProcedureWithAddedTask = {
        id: state.targetProcedure.id,
        name: state.targetProcedure.name,
        schedule: state.targetProcedure.schedule,
        tasks: [
          ...state.targetProcedure.tasks,
          {
            id: action.payload.id,
            name: action.payload.name,
            settings: action.payload.settings
          }
        ]
      };

      return { ...state, targetProcedure: targetProcedureWithAddedTask };

    case REMOVE_CHOSEN_TASK:
      const targetProcedureWithDeletedTask = {
        id: state.targetProcedure.id,
        name: state.targetProcedure.name,
        schedule: state.targetProcedure.schedule,
        tasks: state.targetProcedure.tasks.filter(
          item => item.id !== action.payload
        )
      };

      return { ...state, targetProcedure: targetProcedureWithDeletedTask };

    case EDIT_PROCEDURE_NAME:
      const targetProcedureWithNewName = {
        id: state.targetProcedure.id,
        name: action.payload,
        schedule: state.targetProcedure.schedule,
        tasks: state.targetProcedure.tasks.filter(
          item => item.id !== action.payload
        )
      };
      return { ...state, targetProcedure: targetProcedureWithNewName };

    case ADD_NEW_SCHEDULE:
      const procedureWithNewSchedule = {
        id: state.targetProcedure.id,
        name: state.targetProcedure.name,
        schedule: [...state.targetProcedure.schedule, action.payload],
        tasks: state.targetProcedure.tasks
      };
      return { ...state, targetProcedure: procedureWithNewSchedule };

    case EDIT_SCHEDULE:
      state.targetProcedure.schedule = state.targetProcedure.schedule.map(
        item => {
          if (item.schedule_id === action.payload.scheduleId) {
            item = action.payload.editableSchedule;
          }
          return item;
        }
      );

      return { ...state, targetProcedure: state.targetProcedure };

    case GET_PROCEDURE_SCHEDULES:
      return { ...state, targetProcedure: action.payload };

    case PROCEDURE_DELETE: {
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload)
      };
    }

    case GET_PROCEDURES_HEADS: {
      return { ...state, list: action.payload };
    }

    case CLEAR_TARGET_PROCEDURE:
      return { ...state, targetProcedure: null };

    default:
      return state;
  }
}
