export function selectStudentsRequest(query) {
  return {
    type: '@student/SELECT_STUDENTS_REQUEST',
    payload: { query },
  };
}

export function deleteStudentRequest(id) {
  return {
    type: '@student/DELETE_STUDENT_REQUEST',
    payload: { id },
  };
}

export function updateStudentRequest(id, name, email, age, weight, height) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { id, name, email, age, weight, height },
  };
}

export function createStudentRequest(name, email, age, weight, height) {
  return {
    type: '@student/CREATE_STUDENT_REQUEST',
    payload: { name, email, age, weight, height },
  };
}

export function selectStudentsSuccess(students) {
  return {
    type: '@student/SELECT_STUDENTS_SUCCESS',
    payload: { students },
  };
}

export function updateStudentSuccess(student) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function createStudentSuccess(student) {
  return {
    type: '@student/CREATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
  };
}

export function studentFailure() {
  return {
    type: '@student/STUDENT_FAILURE',
  };
}
