import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
  plans: [],
  loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/DELETE_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/UPDATE_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/UPDATE_PLAN_SUCCESS': {
        draft.plan = action.payload.plan;
        draft.loading = false;
        break;
      }
      case '@plan/CREATE_PLAN_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@plan/CREATE_PLAN_SUCCESS': {
        draft.plan = action.payload.plan;
        draft.loading = false;
        break;
      }
      case '@plan/SELECT_PLANS_SUCCESS': {
        draft.plans = action.payload.plans;
        draft.loading = false;
        break;
      }
      case '@plan/PLAN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
