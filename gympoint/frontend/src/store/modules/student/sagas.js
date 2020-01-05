import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  updateStudentSuccess,
  createStudentSuccess,
  studentFailure,
  selectStudentsSuccess,
} from './actions';

import history from '../../../services/history';

function requestData(payload) {
  return {
    ...payload,
    height: String(parseFloat(payload.height).toFixed(2)),
    weight: String(parseFloat(payload.weight).toFixed(1)),
  };
}

export function* updateStudent({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(
      api.put,
      `students/${id}`,
      requestData(payload)
    );

    toast.success('Estudante atualizado com sucesso!');

    yield put(updateStudentSuccess(response.data));

    history.push('/students');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(studentFailure());
  }
}

export function* createStudent({ payload }) {
  try {
    const response = yield call(api.post, 'students', requestData(payload));

    toast.success('Estudante criado com sucesso!');

    yield put(createStudentSuccess(response.data));

    history.push('/students');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(studentFailure());
  }
}

export function* selectStudents({ payload }) {
  const { limit = 20 } = payload;

  try {
    const response = yield call(api.get, `students?limit=${limit}`);

    yield put(selectStudentsSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    if (err.response.data.error === 'Token invalid') {
      localStorage.removeItem('persist:gympoint');
      window.reload();
    }
    yield put(studentFailure());
  }
}

export function* deleteStudent({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(api.delete, `students/${id}`);

    toast.success('Estudante excluido com sucesso!');

    yield put(selectStudentsSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(studentFailure());
  }
}

export default all([
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
  takeLatest('@student/CREATE_STUDENT_REQUEST', createStudent),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
  takeLatest('@student/SELECT_STUDENTS_REQUEST', selectStudents),
]);
