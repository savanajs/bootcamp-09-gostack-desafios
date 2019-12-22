import produce from 'immer';

const INITIAL_STATE = {
  checkin: null,
  checkins: [],
  loading: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@checkin/UPDATE_CHECKIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@checkin/UPDATE_CHECKIN_SUCCESS': {
        draft.checkin = action.payload.checkin;
        draft.loading = false;
        break;
      }
      case '@checkin/CREATE_CHECKIN_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@checkin/CREATE_CHECKIN_SUCCESS': {
        draft.checkin = action.payload.checkin;
        draft.loading = false;
        break;
      }
      case '@checkin/SELECT_CHECKINS_SUCCESS': {
        draft.checkins = action.payload.checkins;
        draft.loading = false;
        break;
      }
      case '@checkin/CHECKIN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
