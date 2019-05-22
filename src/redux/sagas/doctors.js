import {all, call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadDoctorsSuccess,
    loadDoctorBio,
    deleteDoctorsSuccess,
    showSnackbar, sendTelemetryError, ajaxCallSuccess, addDoctorsSuccess, arrangeDoctorsSuccess,
} from '../actions/actionCreators';
import {getData, endPoints, deleteData, postData, putData} from '../../helpers/request';


export function* loadDoctors(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id} = action.payload;
        const url = endPoints.DOCTORS(portal_id);
        const {data} = yield call(getData, url, portal_id);
        if (data.result) {
            yield put(loadDoctorsSuccess({portal_id: portal_id, doctors: data.result}));
            if (data.result.length) {
                yield all(data.result.map(({npi}) => {
                    return put(loadDoctorBio({portal_id: portal_id, npi: npi}));
                }));
            }
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* addAssignedDoctor(portal_id, doctor) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.DOCTORS(portal_id);
        let result = yield call(postData, url, {npi: doctor.npi}, true);
        yield put(ajaxCallSuccess());
        return result.status;

    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action: 'UPDATE_ASSIGNED_DOCTOR', error}));
    }
}

export function* bulkAddAssignedDoctors(action) {

    try {
        let {portal_id, doctorsToAssign, doctors} = action.payload;

        if (doctorsToAssign.length) {
            let results = yield all(doctorsToAssign.map((doc) => {
                return call(addAssignedDoctor, portal_id, doc);
            }));

            if (!results.filter(result => result !== 201).length) {
                yield put(addDoctorsSuccess({portal_id: portal_id, doctors: doctors}));
                yield put(showSnackbar('Doctors added to a current office.', 'success'));
            }

        }

    } catch (error) {
        yield put(showSnackbar('Error with updating doctors.', 'error'));
        yield put(sendTelemetryError({action, error}));
    }
}

export function* deleteAssignedDoctor(portal_id, doctor) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.DOCTORS(portal_id, doctor.npi);
        let result = yield call(deleteData, url);
        yield put(ajaxCallSuccess());
        return result.status;

    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action: 'DELETE_ASSIGNED_DOCTOR', error}));
    }
}

export function* bulkDeleteAssignedDoctors(action) {

    try {

        let {portal_id, doctorsToDelete, doctors} = action.payload;

        if (doctorsToDelete.length) {
            let results = yield all(doctorsToDelete.map((doc) => {
                return call(deleteAssignedDoctor, portal_id, doc);
            }));

            if (!results.filter(result => result !== 204).length) {
                yield put(deleteDoctorsSuccess({portal_id: portal_id, doctors: doctors}));
                yield put(showSnackbar('Doctors were removed from office.', 'success'));
            }

        }

    } catch (error) {
        yield put(showSnackbar('Error with deleting doctors.', 'error'));
        yield put(sendTelemetryError({action, error}));
    }
}


export function* arrangeDoctors(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, arrangedNpiList, doctors} = action.payload;
        const url = endPoints.DOCTORS(portal_id);
        const {data} = yield call(putData, url, {
            order: arrangedNpiList
        });
        if (data.status === 200) {
            yield put(arrangeDoctorsSuccess({portal_id: portal_id, doctors: doctors}));
            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}