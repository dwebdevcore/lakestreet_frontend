import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadPromotionsSuccess,
    showSnackbar, savePromotionSuccess,
    sendTelemetryError
} from '../actions/actionCreators';
import {getData, endPoints, postData} from '../../helpers/request';


export function* loadPromotions(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.PROMOTIONS(action.payload);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadPromotionsSuccess({portal_id: action.payload, item: data.result}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* savePromotion(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, item} = action.payload;
        const url = endPoints.PROMOTIONS(portal_id);

        yield call(postData, url, item, true);

        yield put(savePromotionSuccess(action.payload));

        yield put(showSnackbar('Data was saved successfully.', 'success'));

    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}
