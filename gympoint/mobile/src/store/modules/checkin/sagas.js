import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { checkinFailure, selectCheckinSuccess } from './actions';

export function* updateAnwserByStudent({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(
      api.patch,
      `/checkin-orders/${id}/answer`,
      payload,
    );

    Alert.alert('Successo', 'Estudante atualizado com sucesso!');

    yield put(selectCheckinSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', err);
    yield put(checkinFailure());
  }
}

export function* selectCheckinByStudent({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(api.get, `/students/${id}/checkin`);

    yield put(selectCheckinSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', err.response.data.error);
    yield put(checkinFailure());
  }
}

export default all([
  takeLatest(
    '@checkin/UPDATE_CHECKIN_ANWSER_BY_SYUDENT_REQUEST',
    updateAnwserByStudent,
  ),
  takeLatest('@checkin/SELECT_CHECKINS_REQUEST', selectCheckin),
]);
