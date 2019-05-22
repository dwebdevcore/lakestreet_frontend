import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadDentistChairSuccess,
    loadDentistChairDoctorsSuccess,
    showSnackbar, sendTelemetryError, updateDentistChairDoctorsSuccess
} from '../actions/actionCreators';
import {getData, putData, endPoints} from '../../helpers/request';


export function* loadDentistChair(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, taxonomy_id} = action.payload;
        const url = endPoints.DENTIST_CHAIR(portal_id, taxonomy_id);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadDentistChairSuccess({taxonomy_id: taxonomy_id, item: data.result.result}));
            yield put(loadDentistChairDoctorsSuccess({taxonomy_id: taxonomy_id, item: data.result.doctors}));
        }

    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* updateDentistChairDoctors(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, textToUpdate} = action.payload;
        const url = endPoints.DENTIST_CHAIR(portal_id);
        const {data} = yield call(putData, url, textToUpdate);
        if (data.status === 200) {
            yield put(updateDentistChairDoctorsSuccess(action.payload));

            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}