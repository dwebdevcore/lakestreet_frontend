import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    publishOfficeLoading,
    publishOfficeSuccess,
    showSnackbar,
    sendTelemetryError
} from '../actions/actionCreators';
import {postData, endPoints} from '../../helpers/request';

export function* publishOffice(action) {
    try {
        yield put(beginAJAXCall());
        yield put(publishOfficeLoading());

        const url = endPoints.PUBLISH_OFFICE(action.payload);
        const response = yield call(postData, url, null, true);
        if (response.status === 200) {
            yield put(publishOfficeSuccess());

            yield put(showSnackbar('Office has been published.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());
        yield put(sendTelemetryError({action, error}));
    }
}
