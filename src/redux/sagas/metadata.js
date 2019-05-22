import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadMetadataSuccess,
    updateMetadataSuccess,
    showSnackbar, sendTelemetryError
} from '../actions/actionCreators';
import {getData, putData, endPoints} from '../../helpers/request';


export function* loadMetadata(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.METADATA(action.payload);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadMetadataSuccess({portal_id: action.payload, item: data.result}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* updateMetadata(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, item} = action.payload;
        const url = endPoints.METADATA(portal_id);
        const {data} = yield call(putData, url, item);
        if (data.status === 200) {
            yield put(updateMetadataSuccess(action.payload));

            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}