import {all, call, put} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadDentalTeamBioSuccess,
    showSnackbar, updateDentalTeamMemberBioSuccess, sendTelemetryError,
    updateSingleDentalTeamMemberBio
} from '../actions/actionCreators';
import {getData, endPoints, putData} from '../../helpers/request';


export function* loadDentalTeamBio(action) {
    try {
        let {portal_id, team_member_id} = action.payload;
        yield put(beginAJAXCall());
        const url = endPoints.DENTAL_TEAM_BIO(portal_id, team_member_id);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadDentalTeamBioSuccess({portal_id, team_member_id, item: data.result}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}

export function* updateDentalTeamMemberBio(action) {
    let {portal_id, item} = action.payload;
    try {
        const url = endPoints.DENTAL_TEAM_BIO(portal_id, item.team_member_id);
        const {data} = yield call(putData, url, item);
        if (data.status === 200) {
            yield put(updateDentalTeamMemberBioSuccess({portal_id, item}));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action: 'updateDentalTeamMemberBio', error}));
    }
}

export function* bulkUpdateDentalTeamMemberBio(action) {
    try {
        yield put(beginAJAXCall());
        let {portal_id, items} = action.payload;

        if (items.length) {
            yield all(items.map((item) => {
                return put(updateSingleDentalTeamMemberBio({portal_id, item}));
            }));
            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }

    } catch (error) {
        yield put(showSnackbar('Error with updating member bio.', 'error'));

        yield put(sendTelemetryError({action, error}));
    }
}

