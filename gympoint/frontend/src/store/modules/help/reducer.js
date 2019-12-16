import produce from 'immer';

const INITIAL_STATE = {
  help: null,
  helps: [],
  loading: false,
};

export default function help(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/UPDATE_HELP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help/UPDATE_HELP_SUCCESS': {
        draft.help = action.payload.help;
        draft.loading = false;
        break;
      }
      case '@help/CREATE_HELP_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@help/CREATE_HELP_SUCCESS': {
        draft.help = action.payload.help;
        draft.loading = false;
        break;
      }
      case '@help/SELECT_HELPS_SUCCESS': {
        draft.helps = action.payload.helps;
        draft.loading = false;
        break;
      }
      case '@help/HELP_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
