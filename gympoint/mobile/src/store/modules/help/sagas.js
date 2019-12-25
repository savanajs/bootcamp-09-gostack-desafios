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

export function* saveHelp({ payload }) {
  const { id } = payload;
  const { question } = payload;
  const { navigation } = payload;

  delete payload.id;

  try {
    const response = yield call(api.post, `/students/${id}/help-orders`, {
      question,
    });
    yield put(selectHelpsSuccess(response.data));
    navigation.navigate('QuestionList');
  } catch (err) {
    Alert.alert('Erro', err.response.data.error);
    yield put(helpFailure());
  }
}

export function* selectHelps({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/students/${id}/help-orders`);
    yield put(selectHelpsSuccess(response.data));
  } catch (err) {
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
  takeLatest('@help/SAVE_HELP_REQUEST', saveHelp),
]);
