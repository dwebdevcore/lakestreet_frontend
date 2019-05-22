import * as actionTypes from '../actions/actionTypes';
const initialState = {
    authUser: null
};
export default function (state = initialState.authUser, action) {
    switch (action.type) {
        case actionTypes.LOG_IN_SUCCESS:
            return action.payload;
        case actionTypes.LOG_OUT:
            return null;
        default:
            return state;
    }
}