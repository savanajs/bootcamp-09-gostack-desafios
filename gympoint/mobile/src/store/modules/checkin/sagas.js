import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { checkinFailure, selectCheckinsSuccess } from './actions';

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

export function* saveCheckinByStudent({ payload }) {
    const { id } = payload;

    try {
        const response = yield call(api.post, `/students/${id}/checkins`);
        yield put(selectCheckinsSuccess(response.data));
    } catch (err) {
        Alert.alert('Erro', err.response.data.error);

        yield put(checkinFailure());
    }
}

export default all([
    takeLatest('@checkin/SELECT_CHECKINS_REQUEST', selectCheckinByStudent),
    takeLatest('@checkin/SAVE_CHECKIN_REQUEST', saveCheckinByStudent),
]);
