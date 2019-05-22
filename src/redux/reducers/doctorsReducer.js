import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    doctors: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.doctors, action) {
    switch (action.type) {
        case actionTypes.ARRANGE_DOCTORS_SUCCESS:
        case actionTypes.ADD_DOCTORS:
        case actionTypes.DELETE_DOCTORS_SUCCESS:
        case actionTypes.LOAD_DOCTORS_SUCCESS: {
            let {portal_id, doctors} = action.payload;
            let newItem = {
                [portal_id]: doctors,
            };
            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...newItem
                },
                allIds: [...state.allIds, portal_id]
            };
        }
        default:
            return state;
    }
}