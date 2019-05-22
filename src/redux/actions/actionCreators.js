import * as actionTypes from './actionTypes';

export function beginAJAXCall() {
    return {type: actionTypes.AJAX_CALL_BEGIN};
}

export function ajaxCallError() {
    return {type: actionTypes.AJAX_CALL_ERROR};
}

export function ajaxCallSuccess() {
    return {type: actionTypes.AJAX_CALL_SUCCESS};
}

export function sendTelemetryError(payload) {
    return {type: actionTypes.SEND_TELEMETRY_ERROR, payload};
}

export function sendTelemetryErrorSuccess() {
    return {type: actionTypes.SEND_TELEMETRY_ERROR_SUCCESS};
}

export function showSnackbar(message, variant) {
    return {type: actionTypes.SHOW_SNACKBAR, message, variant};
}

export function logIn(payload) {
    return {type: actionTypes.LOG_IN, payload};
}

export function logOut() {
    return {type: actionTypes.LOG_OUT};
}

export function logOutSuccess() {
    return {type: actionTypes.LOG_OUT_SUCCESS};
}

export function logInSuccess(payload) {
    return {type: actionTypes.LOG_IN_SUCCESS, payload};
}

export function publishOffice(payload) {
    return {type: actionTypes.PUBLISH_OFFICE, payload};
}
export function publishOfficeLoading(payload) {
    return {type: actionTypes.PUBLISH_OFFICE_LOADING, payload};
}
export function publishOfficeSuccess(payload) {
    return {type: actionTypes.PUBLISH_OFFICE_SUCCESS, payload};
}

export function searchOffice(payload) {
    return {type: actionTypes.SEARCH_OFFICE, payload};
}

export function searchOfficeSuccess(payload) {
    return {type: actionTypes.SEARCH_OFFICE_SUCCESS, payload};
}

export function loadOfficeData(payload) {
    return {type: actionTypes.LOAD_OFFICE_DATA, payload};
}

export function loadOfficeDataSuccess(payload) {
    return {type: actionTypes.LOAD_OFFICE_DATA_SUCCESS, payload};
}


export function loadMetadata(payload) {
    return {type: actionTypes.LOAD_METADATA, payload};
}

export function loadMetadataSuccess(payload) {
    return {type: actionTypes.LOAD_METADATA_SUCCESS, payload};
}

export function updateMetadata(payload) {
    return {type: actionTypes.UPDATE_METADATA, payload};
}

export function updateMetadataSuccess(payload) {
    return {type: actionTypes.UPDATE_METADATA_SUCCESS, payload};
}

export function loadDentalTeamWithBio(payload) {
    return {type: actionTypes.LOAD_DENTAL_TEAM, payload};
}

export function deleteDentalTeamMember(payload) {
    return {type: actionTypes.DELETE_DENTAL_TEAM_MEMBER, payload};
}

export function deleteDentalTeamMemberSuccess(payload) {
    return {type: actionTypes.DELETE_DENTAL_TEAM_MEMBER_SUCCESS, payload};
}

export function addDentalTeamMember(payload) {
    return {type: actionTypes.ADD_DENTAL_TEAM_MEMBER, payload};
}

export function addDentalTeamMemberSuccess(payload) {
    return {type: actionTypes.ADD_DENTAL_TEAM_MEMBER_SUCCESS, payload};
}

export function loadDentalTeamSuccess(payload) {
    return {type: actionTypes.LOAD_DENTAL_TEAM_SUCCESS, payload};
}

export function loadPromotions(payload) {
    return {type: actionTypes.LOAD_PROMOTIONS, payload};
}

export function loadPromotionsSuccess(payload) {
    return {type: actionTypes.LOAD_PROMOTIONS_SUCCESS, payload};
}

export function savePromotion(payload) {
    return {type: actionTypes.SAVE_PROMOTION, payload};
}

export function savePromotionSuccess(payload) {
    return {type: actionTypes.SAVE_PROMOTION_SUCCESS, payload};
}

export function loadDentalTeamBio(payload) {
    return {type: actionTypes.LOAD_DENTAL_TEAM_BIO, payload};
}

export function loadDentalTeamBioSuccess(payload) {
    return {type: actionTypes.LOAD_DENTAL_TEAM_BIO_SUCCESS, payload};
}

export function updateDentalTeamMemberBio(payload) {
    return {type: actionTypes.UPDATE_DENTAL_TEAM_MEMBER_BIO, payload};
}

export function updateDentalTeamMemberBioSuccess(payload) {
    return {type: actionTypes.UPDATE_DENTAL_TEAM_MEMBER_BIO_SUCCESS, payload};
}

export function updateSingleDentalTeamMemberBio(payload) {
    return {type: actionTypes.UPDATE_SINGLE_DENTAL_TEAM_MEMBER_BIO, payload};
}

export function updateSingleDentalTeamMemberBioSuccess(payload) {
    return {type: actionTypes.UPDATE_SINGLE_DENTAL_TEAM_MEMBER_BIO_SUCCESS, payload};
}

export function loadCustomizeHome(payload) {
    return {type: actionTypes.LOAD_CUSTOMIZE_HOME_DATA, payload};
}

export function loadCustomizeHomeSuccess(payload) {
    return {type: actionTypes.LOAD_CUSTOMIZE_HOME_DATA_SUCCESS, payload};
}

export function updateCustomizeHome(payload) {
    return {type: actionTypes.UPDATE_CUSTOMIZE_HOME_DATA, payload};
}

export function updateCustomizeHomeSuccess(payload) {
    return {type: actionTypes.UPDATE_CUSTOMIZE_HOME_DATA_SUCCESS, payload};
}

export function cloudinaryUploadSingleImage(payload) {
    return {type: actionTypes.CLOUDINARY_UPLOAD_SINGLE_IMAGE, payload};
}

export function cloudinaryUploadImages(payload) {
    return {type: actionTypes.CLOUDINARY_UPLOAD_IMAGES, payload};
}

export function cloudinaryLoadImages(payload) {
    return {type: actionTypes.CLOUDINARY_LOAD_IMAGE_LIST, payload};
}

export function cloudinaryLoadImagesSuccess(payload) {
    return {type: actionTypes.CLOUDINARY_LOAD_IMAGE_LIST_SUCCESS, payload};
}

export function cloudinaryUploadImagesSuccess(payload) {
    return {type: actionTypes.CLOUDINARY_UPLOAD_IMAGES_SUCCESS, payload};
}

export function searchDoctor(payload) {
    return {type: actionTypes.SEARCH_DOCTOR, payload};
}

export function searchDoctorSuccess(payload) {
    return {type: actionTypes.SEARCH_DOCTOR_SUCCESS, payload};
}


export function loadServices(payload) {
    return {type: actionTypes.LOAD_SERVICES, payload};
}

export function loadServicesSuccess(payload) {
    return {type: actionTypes.LOAD_SERVICES_SUCCESS, payload};
}

export function updateServices(payload) {
    return {type: actionTypes.UPDATE_SERVICES, payload};
}

export function updateServicesSuccess(payload) {
    return {type: actionTypes.UPDATE_SERVICES_SUCCESS, payload};
}

export function loadFeaturedServices(payload) {
    return {type: actionTypes.LOAD_FEATURED_SERVICES, payload};
}

export function loadFeaturedServicesSuccess(payload) {
    return {type: actionTypes.LOAD_FEATURED_SERVICES_SUCCESS, payload};
}

export function updateFeaturedServices(payload) {
    return {type: actionTypes.UPDATE_FEATURED_SERVICES, payload};
}

export function updateFeaturedServicesSuccess(payload) {
    return {type: actionTypes.UPDATE_FEATURED_SERVICES_SUCCESS, payload};
}

export function deleteServices(payload) {
    return {type: actionTypes.DELETE_SERVICES, payload};
}

export function deleteServicesSuccess(payload) {
    return {type: actionTypes.DELETE_SERVICES_SUCCESS, payload};
}

export function loadHomeWidgets(payload) {
    return {type: actionTypes.LOAD_HOME_WIDGETS, payload};
}

export function loadHomeWidgetsSuccess(payload) {
    return {type: actionTypes.LOAD_HOME_WIDGETS_SUCCESS, payload};
}

export function updateHomeWidgets(payload) {
    return {type: actionTypes.UPDATE_HOME_WIDGETS, payload};
}

export function updateHomeWidgetsSuccess(payload) {
    return {type: actionTypes.UPDATE_HOME_WIDGETS_SUCCESS, payload};
}

export function loadDoctors(payload) {
    return {type: actionTypes.LOAD_DOCTORS, payload};
}

export function loadDoctorsSuccess(payload) {
    return {type: actionTypes.LOAD_DOCTORS_SUCCESS, payload};
}

export function loadDoctorBio(payload) {
    return {type: actionTypes.LOAD_DOCTOR_BIO, payload};
}

export function loadDoctorBioSuccess(payload) {
    return {type: actionTypes.LOAD_DOCTOR_BIO_SUCCESS, payload};
}

export function updateDoctorBio(payload) {
    return {type: actionTypes.UPDATE_DOCTOR_BIO, payload};
}

export function updateDoctorBioSuccess(payload) {
    return {type: actionTypes.UPDATE_DOCTOR_BIO_SUCCESS, payload};
}

export function deleteDoctors(payload) {
    return {type: actionTypes.DELETE_DOCTORS, payload};
}

export function deleteDoctorsSuccess(payload) {
    return {type: actionTypes.DELETE_DOCTORS_SUCCESS, payload};
}

export function addDoctors(payload) {
    return {type: actionTypes.ADD_DOCTORS, payload};
}

export function addDoctorsSuccess(payload) {
    return {type: actionTypes.ADD_DOCTORS_SUCCESS, payload};
}

export function arrangeDoctors(payload) {
    return {type: actionTypes.ARRANGE_DOCTORS, payload};
}

export function arrangeDoctorsSuccess(payload) {
    return {type: actionTypes.ARRANGE_DOCTORS_SUCCESS, payload};
}


export function loadDentistChair(payload) {
    return {type: actionTypes.LOAD_DENTIST_CHAIR, payload};
}

export function loadDentistChairSuccess(payload) {
    return {type: actionTypes.LOAD_DENTIST_CHAIR_SUCCESS, payload};
}

export function loadDentistChairDoctorsSuccess(payload) {
    return {type: actionTypes.LOAD_DENTIST_CHAIR_DOCTORS_SUCCESS, payload};
}

export function updateDentistChairDoctors(payload) {
    return {type: actionTypes.UPDATE_DENTIST_CHAIR_DOCTORS, payload};
}

export function updateDentistChairDoctorsSuccess(payload) {
    return {type: actionTypes.UPDATE_DENTIST_CHAIR_DOCTORS_SUCCESS, payload};
}


