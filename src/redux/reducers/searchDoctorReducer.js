import * as actionTypes from '../actions/actionTypes';

const initialState = {
    searchDoctorList: []
};
export default function (state = initialState.searchDoctorList, action) {
    switch (action.type) {
        case actionTypes.SEARCH_DOCTOR_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}