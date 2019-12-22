export function selectHelpsRequest(query) {
  return {
    type: '@help/SELECT_HELPS_REQUEST',
    payload: { query },
  };
}

export function updateAnwserByStudentRequest(id, answer) {
  return {
    type: '@help/UPDATE_HELP_ANWSER_BY_SYUDENT_REQUEST',
    loading: true,
    payload: { id, answer },
  };
}

export function selectHelpsSuccess(helps) {
  return {
    type: '@help/SELECT_HELPS_SUCCESS',
    payload: { helps },
  };
}

export function updateHelpFailure() {
  return {
    type: '@help/UPDATE_HELP_REQUEST',
  };
}

export function helpFailure() {
  return {
    type: '@help/HELP_FAILURE',
  };
}
