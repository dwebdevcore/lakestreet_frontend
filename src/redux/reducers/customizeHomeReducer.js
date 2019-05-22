import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    customizeHome: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.customizeHome, action) {
    switch (action.type) {
        case actionTypes.LOAD_CUSTOMIZE_HOME_DATA_SUCCESS:{
            let {portal_id, item} = action.payload;
            let newItem = {
                [portal_id]: item,
            };
            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...newItem
                },
                allIds: [...state.allIds, portal_id]
            };
        }
        case actionTypes.UPDATE_CUSTOMIZE_HOME_DATA_SUCCESS: {
            let {portal_id} = action.payload;
            let updatedItem = {
                [portal_id]: action.payload.item,
            };
            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...updatedItem
                },
            };
        }
        default:
            return state;
    }
}