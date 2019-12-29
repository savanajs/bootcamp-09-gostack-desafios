import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  updateEnrollmentSuccess,
  createEnrollmentSuccess,
  enrollmentFailure,
  selectEnrollmentsSuccess,
} from './actions';

import history from '../../../services/history';

function requestData(payload) {
  return {
    ...payload,
    start_date: new Date(`${payload.start_date} ` + `00:00:00`),
  };
}

export function* updateEnrollment({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(
      api.put,
      `enrollments/${id}`,
      requestData(payload)
    );

    toast.success('Estudante atualizado com sucesso!');

    yield put(updateEnrollmentSuccess(response.data));

    history.push('/enrollments');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(enrollmentFailure());
  }
}

export function* createEnrollment({ payload }) {
  try {
    const response = yield call(api.post, 'enrollments', requestData(payload));

    toast.success('Estudante criado com sucesso!');

    yield put(createEnrollmentSuccess(response.data));

    history.push('/enrollments');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(enrollmentFailure());
  }
}

export function* selectEnrollments({ payload }) {
  try {
    const response = yield call(api.get, `enrollments${payload.query}`);

    yield put(selectEnrollmentsSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(enrollmentFailure());
  }
}

export function* deleteEnrollment({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(api.delete, `enrollments/${id}`);

    toast.success('Estudante excluido com sucesso!');

    yield put(selectEnrollmentsSuccess(response.data));

    history.push('/enrollments');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(enrollmentFailure());
  }
}

export default all([
  takeLatest('@enrollment/UPDATE_ENROLLMENT_REQUEST', updateEnrollment),
  takeLatest('@enrollment/CREATE_ENROLLMENT_REQUEST', createEnrollment),
  takeLatest('@enrollment/DELETE_ENROLLMENT_REQUEST', deleteEnrollment),
  takeLatest('@enrollment/SELECT_ENROLLMENTS_REQUEST', selectEnrollments),
]);
