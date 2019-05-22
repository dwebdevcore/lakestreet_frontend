import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadFeaturedServicesSuccess,
    showSnackbar, sendTelemetryError, updateFeaturedServicesSuccess
} from '../actions/actionCreators';
import {getData, endPoints, putData} from '../../helpers/request';


export function* loadFeaturedServices(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.FEATURED_SERVICES(action.payload);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadFeaturedServicesSuccess({portal_id: action.payload, services: data.result}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* updateFeaturedServices(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, featuredServices} = action.payload;
        const url = endPoints.FEATURED_SERVICES(portal_id);
        let {data} = yield call(putData, url, {order: featuredServices}, true);
        if (data.status === 200) {
            yield put(updateFeaturedServicesSuccess({portal_id: portal_id, services: featuredServices}));
            yield put(showSnackbar('Featured Services updated.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}