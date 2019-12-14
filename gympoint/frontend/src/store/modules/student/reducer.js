import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  loading: false,
  countItemsDeleted: 0,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/DELETE_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/DELETE_STUDENT_SUCCESS': {
        draft.student = action.payload.student;
        draft.loading = false;
        draft.countItemsDeleted = 1;
        break;
      }
      case '@student/UPDATE_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/UPDATE_STUDENT_SUCCESS': {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }
      case '@student/CREATE_STUDENT_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@student/CREATE_STUDENT_SUCCESS': {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }
      case '@student/STUDENT_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
