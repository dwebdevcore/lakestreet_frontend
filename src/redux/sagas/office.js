import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    searchOfficeSuccess,
    showSnackbar,
    loadOfficeDataSuccess,
    sendTelemetryError
} from '../actions/actionCreators';
import {postData, endPoints} from '../../helpers/request';

//TODO: Move this to a shared POST saga with params
export function* searchOffice(action) {
    try {
        const url = endPoints.SEARCH_OFFICE;
        const {data} = yield call(postData, url, {q: action.payload.query});

        if (data.result) {
            yield put(searchOfficeSuccess(data.result));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));

        yield put(sendTelemetryError({action, error}));
    }
}

export function* loadOfficeData(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.SEARCH_OFFICE;
        const {data} = yield call(postData, url, {portal_id: action.payload});
        if (data.result.length) {
            yield put(loadOfficeDataSuccess(data.result[0]));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}