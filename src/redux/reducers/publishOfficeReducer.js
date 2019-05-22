import * as actionTypes from '../actions/actionTypes';

const initialState = {
    publishOfficeLoading: false
};
export default function (state = initialState.publishOfficeLoading, action) {
    switch (action.type) {
        case actionTypes.PUBLISH_OFFICE_LOADING: {
            return true;
        }
        case actionTypes.PUBLISH_OFFICE_SUCCESS: {
            return false;
        }
        default:
            return state;
    }
}