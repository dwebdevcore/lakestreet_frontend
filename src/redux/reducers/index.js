import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import searchOfficeList from './searchOfficeReducer';
import searchDoctorList from './searchDoctorReducer';
import metadata from './metadataReducer';
import dentalTeam from './dentalTeamReducer';
import dentalTeamBio from './dentalTeamBioReducer';
import officeList from './officeListReducer';
import promotions from './promotionsReducer';
import authUser from './authReducer';
import snackbar from './snackbarReducer';
import customizeHome from './customizeHomeReducer';
import cloudinaryImageList from './cloudinaryReducer';
import services from './servicesReducer';
import featuredServices from './featuredServicesReducer';
import homeWidgets from './homeWidgetsReducer';
import doctors from './doctorsReducer';
import doctorBio from './doctorBioReducer';
import dentistChairDoctors from './dentistChairDoctorsReducer';
import dentistChair from './dentistChairReducer';
import publishOfficeLoading from './publishOfficeReducer';

export default combineReducers({
    ajaxCallsInProgress,
    searchOfficeList,
    searchDoctorList,
    metadata,
    authUser,
    snackbar,
    officeList,
    dentalTeam,
    dentalTeamBio,
    promotions,
    customizeHome,
    homeWidgets,
    cloudinaryImageList,
    services,
    featuredServices,
    doctors,
    doctorBio,
    dentistChair,
    dentistChairDoctors,
    publishOfficeLoading
});