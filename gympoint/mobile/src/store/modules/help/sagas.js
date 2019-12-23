import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { helpFailure, selectHelpsSuccess } from './actions';

export function* updateAnwserByStudent({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(
      api.patch,
      `/help-orders/${id}/answer`,
      payload,
    );

    Alert.alert('Successo', 'Estudante atualizado com sucesso!');

    yield put(selectHelpsSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', err);
    yield put(helpFailure());
  }
}

export function* selectHelps({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/students/${id}/help-orders`);
    alert(777);
    yield put(selectHelpsSuccess(response.data));
  } catch (err) {
    alert(JSON.stringify(err.response.data));
    Alert.alert('Erro', err.response.data.error);
    yield put(helpFailure());
  }
}

export default all([
  takeLatest(
    '@help/UPDATE_HELP_ANWSER_BY_SYUDENT_REQUEST',
    updateAnwserByStudent,
  ),
  takeLatest('@help/SELECT_HELPS_REQUEST', selectHelps),
]);
