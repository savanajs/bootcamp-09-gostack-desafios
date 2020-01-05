import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { helpFailure, selectHelpsSuccess } from './actions';

export function* updateAnwserByStudent({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(
      api.patch,
      `/help-orders/${id}/answer`,
      payload
    );

    toast.success('Pedido de ajuda atualizado com sucesso!');

    yield put(selectHelpsSuccess(response.data));
  } catch (err) {
    toast.error(err);
    yield put(helpFailure());
  }
}

export function* selectHelps() {
  try {
    const response = yield call(api.get, `help-orders`);

    yield put(selectHelpsSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(helpFailure());
  }
}

export default all([
  takeLatest(
    '@help/UPDATE_HELP_ANWSER_BY_SYUDENT_REQUEST',
    updateAnwserByStudent
  ),
  takeLatest('@help/SELECT_HELPS_REQUEST', selectHelps),
]);
