import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  updatePlanSuccess,
  createPlanSuccess,
  planFailure,
  selectPlansSuccess,
} from './actions';

import history from '../../../services/history';

export function* updatePlan({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(api.put, `plans/${id}`, payload);

    toast.success('Plano atualizado com sucesso!');

    yield put(updatePlanSuccess(response.data));

    history.push('/plans');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(planFailure());
  }
}

export function* createPlan({ payload }) {
  try {
    const response = yield call(api.post, 'plans', payload);

    toast.success('Plano criado com sucesso!');

    yield put(createPlanSuccess(response.data));

    history.push('/plans');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(planFailure());
  }
}

export function* selectPlans() {
  try {
    const response = yield call(api.get, `plans`);

    yield put(selectPlansSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(planFailure());
  }
}

export function* deletePlan({ payload }) {
  const { id } = payload;

  delete payload.id;

  try {
    const response = yield call(api.delete, `plans/${id}`);

    toast.success('Plano excluido com sucesso!');

    yield put(selectPlansSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(planFailure());
  }
}

export default all([
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
  takeLatest('@plan/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plan/DELETE_PLAN_REQUEST', deletePlan),
  takeLatest('@plan/SELECT_PLANS_REQUEST', selectPlans),
]);
