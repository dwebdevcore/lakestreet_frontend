import {all, call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    ajaxCallSuccess,
    loadServicesSuccess,
    updateServicesSuccess,
    deleteServicesSuccess,
    showSnackbar, sendTelemetryError
} from '../actions/actionCreators';
import {getData, endPoints, patchData, deleteData} from '../../helpers/request';


export function* loadServices(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.SERVICES(action.payload);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadServicesSuccess({portal_id: action.payload, services: data.result}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* updateServices(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, taxonomy_ids, services} = action.payload;
        const url = endPoints.SERVICES(portal_id);
        let {data} = yield call(patchData, url, taxonomy_ids, true);
        if (data.status === 200) {
            yield put(updateServicesSuccess({portal_id: portal_id, services: services}));
            yield put(showSnackbar('Services has been updated.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* deleteService(portal_id, service) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.SERVICES(portal_id, service);
        let result = yield call(deleteData, url);
        yield put(ajaxCallSuccess());
        return result.status;

    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action: 'DELETE_SERVICE', error}));
    }
}

export function* bulkDeleteServices(action) {

    try {

        let {portal_id, servicesToDelete, services} = action.payload;

        if (servicesToDelete.length) {
            let results = yield all(servicesToDelete.map((service) => {
                return call(deleteService, portal_id, service);
            }));

            if (!results.filter(result => result !== 204).length) {
                yield put(deleteServicesSuccess({portal_id: portal_id, services: services}));
                yield put(showSnackbar('Data was deleted successfully.', 'success'));
            }

        }

    } catch (error) {
        yield put(showSnackbar('Error with updating services.', 'error'));

        yield put(sendTelemetryError({action, error}));
    }
}