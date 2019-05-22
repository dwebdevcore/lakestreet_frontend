import {call, put, all} from 'redux-saga/effects';
import {
    beginAJAXCall,
    ajaxCallError,
    loadDentalTeamSuccess,
    loadDentalTeamBio,
    deleteDentalTeamMemberSuccess,
    showSnackbar,
    sendTelemetryError,
    addDentalTeamMemberSuccess,
    cloudinaryUploadSingleImage,
    updateSingleDentalTeamMemberBio
} from '../actions/actionCreators';
import {getData, deleteData, postData, endPoints} from '../../helpers/request';
import {cloudinaryConfig} from '../../config/cloudinary';

export function* loadDentalTeamWithBio(action) {
    try {
        yield put(beginAJAXCall());
        const url = endPoints.DENTAL_TEAM(action.payload);
        const {data} = yield call(getData, url, action.payload);
        if (data.result) {
            yield put(loadDentalTeamSuccess({portal_id: action.payload, item: data.result}));

            if (data.result.length) {
                yield all(data.result.map(({team_member_id}) => {
                    return put(loadDentalTeamBio({portal_id: action.payload, team_member_id}))
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


export function* deleteDentalTeamMember(action) {
    try {
        yield put(beginAJAXCall());

        let {portal_id, item} = action.payload;
        const url = endPoints.DENTAL_TEAM_MEMBER(portal_id, item.team_member_id);

        yield call(deleteData, url);
        yield put(deleteDentalTeamMemberSuccess({portal_id, item}));

        yield put(showSnackbar(`${item.first_name} ${item.last_name} has been removed.`, 'success'));

    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}


export function* addDentalTeamMember(action) {
    try {
        yield put(beginAJAXCall());

        let {portal_id, item, image, bio} = action.payload;
        const url = endPoints.DENTAL_TEAM(portal_id);

        let response = yield call(postData, url, item, true);

        if (response.data) {
            yield put(addDentalTeamMemberSuccess({
                portal_id, item: {
                    ...item,
                    team_member_id: response.data.team_member_id
                }
            }));
            //TODO: need to call POST here
            yield put(updateSingleDentalTeamMemberBio({
                portal_id, item: {
                    biography: bio,
                    team_member_id: response.data.team_member_id
                },
            }));

            //Upload image to cloudinary on success
            let public_id = response.data.team_member_id;
            let folder = cloudinaryConfig.dentalTeamPhotosFolder(portal_id);

            yield put(cloudinaryUploadSingleImage({
                portal_id, item: image, public_id, folder
            }));
            //yield put(updateSingleDentalTeamMemberBio)

            yield put(showSnackbar(`${item.first_name} ${item.last_name} has been added.`, 'success'));
        }


    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action, error}));
    }
}