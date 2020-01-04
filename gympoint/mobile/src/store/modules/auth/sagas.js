import { all, put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { id } = payload;

        const response = yield call(api.post, 'session/student', {
            id,
        });

        const { token, student } = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, student));

        // history.push('/students');
    } catch (err) {
        const messageError = err.response
            ? err.response.data.error
            : 'Houve um erro!';

        Alert.alert('Erro no login', messageError);
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    // A action "persist/REHYDRATE" é disparada pelo redux-persist
    // Seta o token de autorização no headers
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {
    // history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
