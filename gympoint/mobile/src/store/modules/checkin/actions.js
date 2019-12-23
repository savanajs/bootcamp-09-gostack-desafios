export function selectCheckinByStudentRequest(query) {
  return {
    type: '@checkin/SELECT_CHECKINS_REQUEST',
    payload: query,
  };
}

export function updateAnwserByStudentRequest(id, answer) {
  return {
    type: '@checkin/UPDATE_CHECKIN_ANWSER_BY_SYUDENT_REQUEST',
    loading: true,
    payload: { id, answer },
  };
}

export function selectCheckinsSuccess(checkins) {
  return {
    type: '@checkin/SELECT_CHECKINS_SUCCESS',
    payload: { checkins },
  };
}

export function updateCheckinFailure() {
  return {
    type: '@checkin/UPDATE_CHECKIN_REQUEST',
  };
}

export function checkinFailure() {
  return {
    type: '@checkin/CHECKIN_FAILURE',
  };
}
