import produce from 'immer';

const INITIAL_STATE = {
  checkin: null,
  checkins: [],
  loading: true,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
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
