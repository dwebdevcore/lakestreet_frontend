import {call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadCustomizeHomeSuccess,
    updateCustomizeHomeSuccess,
    showSnackbar, sendTelemetryError, loadHomeWidgetsSuccess,
} from '../actions/actionCreators';
import {getData, endPoints, putData} from '../../helpers/request';


export function* loadCustomizeHome(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.CUSTOMIZE_HOME(action.payload);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadCustomizeHomeSuccess({portal_id: action.payload, item: data.result}));

            //home widgets should be in a separate redux prop
            //to handle updateHomeWidgets saga call with a correct payload structure
            yield put(loadHomeWidgetsSuccess({
                portal_id: action.payload,
                widgets: Object.keys(data.result.widgets).map(i => {
                    return {
                        name: i,
                        enabled: data.result.widgets[i].enabled
                    }
                })
            }));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* updateCustomizeHome(action) {
    try {
        yield put(beginAJAXCall());

        let {portal_id, item} = action.payload;
        const url = endPoints.CUSTOMIZE_HOME(portal_id);
        const {data} = yield call(putData, url, item);

        if (data.status === 200) {
            yield put(updateCustomizeHomeSuccess(action.payload));
            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

