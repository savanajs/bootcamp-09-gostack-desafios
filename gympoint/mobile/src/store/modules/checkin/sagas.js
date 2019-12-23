import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { checkinFailure, selectCheckinsSuccess } from './actions';

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

    yield put(selectCheckinsSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', err);
    yield put(checkinFailure());
  }
}

export function* selectCheckinByStudent({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/students/${id}/checkins`);

    yield put(selectCheckinsSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', err.response.data);
    yield put(checkinFailure());
  }
}

export default all([
  takeLatest(
    '@checkin/UPDATE_CHECKIN_ANWSER_BY_SYUDENT_REQUEST',
    updateAnwserByStudent,
  ),
  takeLatest('@checkin/SELECT_CHECKINS_REQUEST', selectCheckinByStudent),
]);
