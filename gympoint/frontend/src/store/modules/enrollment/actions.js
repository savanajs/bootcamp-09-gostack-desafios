export function selectEnrollmentsRequest(query) {
  return {
    type: '@enrollment/SELECT_ENROLLMENTS_REQUEST',
    payload: { query },
  };
}

export function deleteEnrollmentRequest(id) {
  return {
    type: '@enrollment/DELETE_ENROLLMENT_REQUEST',
    payload: { id },
  };
}

export function updateEnrollmentRequest(id, student_id, plan_id, start_date) {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_REQUEST',
    payload: { id, student_id, plan_id, start_date },
  };
}

export function createEnrollmentRequest(student_id, plan_id, start_date) {
  return {
    type: '@enrollment/CREATE_ENROLLMENT_REQUEST',
    payload: { student_id, plan_id, start_date },
  };
}

export function selectEnrollmentsSuccess(enrollments) {
  return {
    type: '@enrollment/SELECT_ENROLLMENTS_SUCCESS',
    payload: { enrollments },
  };
}

export function updateEnrollmentSuccess(enrollment) {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function createEnrollmentSuccess(enrollment) {
  return {
    type: '@enrollment/CREATE_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function updateEnrollmentFailure() {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_REQUEST',
  };
}

export function enrollmentFailure() {
  return {
    type: '@enrollment/ENROLLMENT_FAILURE',
  };
}
