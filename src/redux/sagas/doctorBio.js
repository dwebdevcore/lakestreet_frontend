import {all, call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadDoctorBioSuccess,
    showSnackbar, updateDoctorBioSuccess, sendTelemetryError,
} from '../actions/actionCreators';
import {getData, endPoints, putData} from '../../helpers/request';


export function* loadDoctorBio(action) {
    try {
        let {portal_id, npi} = action.payload;
        yield put(beginAJAXCall());
        const url = endPoints.DOCTORS_BIO(npi);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadDoctorBioSuccess({portal_id, npi: npi, item: data.result}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

function* updateDoctorBio(portal_id, item) {
    try {
        const url = endPoints.DOCTORS_BIO(item.npi);
        const {data} = yield call(putData, url, item);
        if (data.status === 200) {
            yield put(updateDoctorBioSuccess({portal_id, item}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action: 'updateDoctorBio', error}));
    }
}

export function* bulkUpdateDoctorBio(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, bios} = action.payload;

        if (bios.length) {
            yield all(bios.map((bio) => {
                return call(updateDoctorBio, portal_id, bio);
            }));
            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }

    } catch (error) {
        yield put(showSnackbar('Error with updating member bio.', 'error'));

        yield put(sendTelemetryError({action, error}));
    }
}

