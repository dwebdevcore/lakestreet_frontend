import {call, put} from 'redux-saga/effects';
import {searchDoctorSuccess, sendTelemetryError, showSnackbar} from '../actions/actionCreators';
import {postData, endPoints} from '../../helpers/request';

export function* searchDoctor(action) {
    try {
        const url = endPoints.SEARCH_DOCTOR;
        const {data} = yield call(postData, url, {q: action.payload.query});

        if (data.result) {
            yield put(searchDoctorSuccess(data.result));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));

        yield put(sendTelemetryError({action, error}));
    }
}
