import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    showSnackbar, sendTelemetryError, loadHomeWidgetsSuccess, updateHomeWidgetsSuccess
} from '../actions/actionCreators';
import {getData, endPoints, putData} from '../../helpers/request';
import {formatWidgetsAfterArrange} from '../../helpers/homeWidgetsHelper';

export function* loadHomeWidgets(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.CUSTOMIZE_HOME_ARRANGE(action.payload);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadHomeWidgetsSuccess({portal_id: action.payload, widgets: data.result}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* updateHomeWidgets(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, item} = action.payload;
        const url = endPoints.CUSTOMIZE_HOME_ARRANGE(portal_id);
        const {data} = yield call(putData, url, item);
        if (data.status === 200) {
            yield put(updateHomeWidgetsSuccess({
                portal_id: portal_id,
                item: formatWidgetsAfterArrange(item)
            }));

            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}
