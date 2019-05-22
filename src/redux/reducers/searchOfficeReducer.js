import * as actionTypes from '../actions/actionTypes';

const initialState = {
    searchOfficeList: []
};
export default function (state = initialState.searchOfficeList, action) {
    switch (action.type) {
        case actionTypes.SEARCH_OFFICE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}