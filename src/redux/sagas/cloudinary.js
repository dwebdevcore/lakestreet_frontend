import {call, put, all} from 'redux-saga/effects';
import axios from 'axios';
import {
    beginAJAXCall,
    ajaxCallError,
    ajaxCallSuccess,
    cloudinaryUploadSingleImage,
    showSnackbar, sendTelemetryError, cloudinaryLoadImagesSuccess,
} from '../actions/actionCreators';

import {cloudinaryConfig} from '../../config/cloudinary';
import {endPoints} from "../../config/api";


const postData = (url, formData) => axios.post(url, formData);
const getData = (url) => axios.get(url);

export function* loadImagesByTag(action) {
    try {
        const url = endPoints.CLOUDINARY_IMAGE_LIST(action.payload);
        const {data} = yield call(getData, url);

        if (data.resources) {
            yield put(cloudinaryLoadImagesSuccess({
                portal_id: action.payload,
                item: data.resources
            }));
        }
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));

        yield put(sendTelemetryError({action, error}));
    }
}

export function* uploadImageToCloudinary(action) {

    let {item, public_id, folder, tag} = action.payload;
    try {
        yield put(beginAJAXCall());
        let url = cloudinaryConfig.imageUploadUrl;

        let formData = new FormData();
        formData.append("api_key", cloudinaryConfig.apiKey);
        formData.append("file", item.file);
        formData.append("folder", folder);
        formData.append("public_id", public_id);
        formData.append("upload_preset", cloudinaryConfig.uploadPreset);
        if (tag) {
            formData.append("tags", [tag]);
        }
        yield call(postData, url, formData);

        yield put(ajaxCallSuccess());
    } catch (error) {
        let errorMsg = error.response ? error.response.data.message : 'Unknown error.';
        yield put(showSnackbar(errorMsg, 'error'));
        yield put(ajaxCallError());

        yield put(sendTelemetryError({action: 'uploadImageToCloudinary', error}));
    }
}

export function* bulkUploadImagesToCloudinary(action) {

    try {

        let {portal_id, items, isDoctorPhoto} = action.payload;
        let folder = isDoctorPhoto ?
            cloudinaryConfig.doctorPhotosFolder :
            cloudinaryConfig.dentalTeamPhotosFolder(portal_id);
        if (items.length) {
            yield all(items.map((item) => {
                let public_id = isDoctorPhoto ? item.npi : item.team_member_id;
                return put(cloudinaryUploadSingleImage({portal_id, item, public_id, folder}));
            }));

            // yield put(cloudinaryUploadImagesSuccess(portal_id));

            yield put(showSnackbar('Data was saved successfully.', 'success'));
        }

    } catch (error) {
        yield put(showSnackbar('Error with updating member bio.', 'error'));

        yield put(sendTelemetryError({action, error}));
    }
}