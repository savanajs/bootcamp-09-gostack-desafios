export function selectPlansRequest() {
  return {
    type: '@plan/SELECT_PLANS_REQUEST',
  };
}

export function deletePlanRequest(id) {
  return {
    type: '@plan/DELETE_PLAN_REQUEST',
    payload: { id },
  };
}

export function updatePlanRequest(id, title, duration, price) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { id, title, duration, price },
  };
}

export function createPlanRequest(title, duration, price) {
  return {
    type: '@plan/CREATE_PLAN_REQUEST',
    payload: { title, duration, price },
  };
}

export function selectPlansSuccess(plans) {
  return {
    type: '@plan/SELECT_PLANS_SUCCESS',
    payload: { plans },
  };
}

export function updatePlanSuccess(plan) {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
    payload: { plan },
  };
}

export function createPlanSuccess(plan) {
  return {
    type: '@plan/CREATE_PLAN_SUCCESS',
    payload: { plan },
  };
}

export function updatePlanFailure() {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
  };
}

export function planFailure() {
  return {
    type: '@plan/PLAN_FAILURE',
  };
}
