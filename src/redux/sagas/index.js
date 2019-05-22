import * as types from '../actions/actionTypes'
import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import {loadOfficeData, searchOffice} from './office';
import {loadMetadata, updateMetadata} from './metadata';
import {loadDentalTeamWithBio, deleteDentalTeamMember, addDentalTeamMember} from './dentalTeam';
import {loadDentalTeamBio, updateDentalTeamMemberBio, bulkUpdateDentalTeamMemberBio} from './dentalTeamBio';
import {searchDoctor} from './doctor';
import {loadPromotions, savePromotion} from './promotions';
import {loadCustomizeHome, updateCustomizeHome} from './customizeHome';
import {logIn} from './auth';
import {bulkUploadImagesToCloudinary, uploadImageToCloudinary, loadImagesByTag} from './cloudinary';
import {sendTelemetryError} from './telemetry';
import {loadServices, updateServices, bulkDeleteServices} from './services';
import {loadFeaturedServices, updateFeaturedServices} from './featuredServices';
import {loadHomeWidgets, updateHomeWidgets} from './homeWidgets';
import {loadDoctors, bulkDeleteAssignedDoctors, bulkAddAssignedDoctors, arrangeDoctors} from './doctors';
import {loadDoctorBio, bulkUpdateDoctorBio} from './doctorBio';
import {loadDentistChair, updateDentistChairDoctors} from './dentistChair';
import {publishOffice} from './publishOffice';
export default function* rootSaga() {
    yield all([
        yield takeLatest(types.LOG_IN, logIn),
        yield takeLatest(types.SEARCH_OFFICE, searchOffice),
        yield takeLatest(types.SEARCH_DOCTOR, searchDoctor),
        yield takeEvery(types.LOAD_METADATA, loadMetadata),
        yield takeEvery(types.LOAD_DENTAL_TEAM, loadDentalTeamWithBio),
        yield takeEvery(types.LOAD_DENTAL_TEAM_BIO, loadDentalTeamBio),
        yield takeEvery(types.UPDATE_SINGLE_DENTAL_TEAM_MEMBER_BIO, updateDentalTeamMemberBio),
        yield takeEvery(types.UPDATE_DENTAL_TEAM_MEMBER_BIO, bulkUpdateDentalTeamMemberBio),
        yield takeEvery(types.DELETE_DENTAL_TEAM_MEMBER, deleteDentalTeamMember),
        yield takeEvery(types.ADD_DENTAL_TEAM_MEMBER, addDentalTeamMember),
        yield takeEvery(types.UPDATE_METADATA, updateMetadata),
        yield takeEvery(types.LOAD_OFFICE_DATA, loadOfficeData),
        yield takeEvery(types.LOAD_PROMOTIONS, loadPromotions),
        yield takeEvery(types.SAVE_PROMOTION, savePromotion),
        yield takeEvery(types.LOAD_CUSTOMIZE_HOME_DATA, loadCustomizeHome),
        yield takeEvery(types.LOAD_HOME_WIDGETS, loadHomeWidgets),
        yield takeLatest(types.UPDATE_CUSTOMIZE_HOME_DATA, updateCustomizeHome),
        yield takeEvery(types.UPDATE_HOME_WIDGETS, updateHomeWidgets),
        yield takeLatest(types.CLOUDINARY_UPLOAD_IMAGES, bulkUploadImagesToCloudinary),
        yield takeEvery(types.CLOUDINARY_UPLOAD_SINGLE_IMAGE, uploadImageToCloudinary),
        yield takeEvery(types.CLOUDINARY_LOAD_IMAGE_LIST, loadImagesByTag),
        yield takeEvery(types.SEND_TELEMETRY_ERROR, sendTelemetryError),
        yield takeEvery(types.LOAD_SERVICES, loadServices),
        yield takeEvery(types.UPDATE_SERVICES, updateServices),
        yield takeEvery(types.DELETE_SERVICES, bulkDeleteServices),
        yield takeEvery(types.LOAD_FEATURED_SERVICES, loadFeaturedServices),
        yield takeEvery(types.UPDATE_FEATURED_SERVICES, updateFeaturedServices),
        yield takeEvery(types.LOAD_DOCTORS, loadDoctors),
        yield takeEvery(types.LOAD_DOCTOR_BIO, loadDoctorBio),
        yield takeEvery(types.UPDATE_DOCTOR_BIO, bulkUpdateDoctorBio),
        yield takeEvery(types.DELETE_DOCTORS, bulkDeleteAssignedDoctors),
        yield takeEvery(types.ADD_DOCTORS, bulkAddAssignedDoctors),
        yield takeEvery(types.ARRANGE_DOCTORS, arrangeDoctors),
        yield takeEvery(types.LOAD_DENTIST_CHAIR, loadDentistChair),
        yield takeEvery(types.UPDATE_DENTIST_CHAIR_DOCTORS, updateDentistChairDoctors),
        yield takeEvery(types.PUBLISH_OFFICE, publishOffice),
    ]);
}