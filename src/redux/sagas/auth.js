import {call, put} from 'redux-saga/effects';
import {endPoints, postData} from '../../helpers/request';
import {beginAJAXCall, ajaxCallError, logInSuccess, showSnackbar, sendTelemetryError} from '../actions/actionCreators';

export function* logIn(action) {
    try {
        yield put(beginAJAXCall());

        const result = yield call(postData, endPoints.LOGIN, action.payload);

        if (result.data) {
            localStorage.setItem('authUser', JSON.stringify(result.data));

            yield put(logInSuccess(result.data));

            yield put(showSnackbar(`Welcome ${result.data.displayName}`));
        }
    } catch (error) {
        let message = 'Bad username/password.';
        if (error.response) {
            message = error.response.data.message;
        }

        yield put(showSnackbar(message, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

