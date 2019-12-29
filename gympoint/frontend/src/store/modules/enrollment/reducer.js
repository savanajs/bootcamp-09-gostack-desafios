import produce from 'immer';

const INITIAL_STATE = {
  enrollment: null,
  enrollments: {
    count: 0,
    rows: [],
  },
  loading: false,
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/DELETE_ENROLLMENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@enrollment/UPDATE_ENROLLMENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@enrollment/UPDATE_ENROLLMENT_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        draft.loading = false;
        break;
      }
      case '@enrollment/CREATE_ENROLLMENT_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@enrollment/CREATE_ENROLLMENT_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        draft.loading = false;
        break;
      }
      case '@enrollment/SELECT_ENROLLMENTS_SUCCESS': {
        draft.enrollments = action.payload.enrollments;
        draft.loading = false;
        break;
      }
      case '@enrollment/ENROLLMENT_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
