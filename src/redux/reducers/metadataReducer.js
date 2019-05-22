import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    metadata: {
        byPortalId: {},
        allIds: []
    }
    //metadata: []
};
export default function (state = initialState.metadata, action) {
    switch (action.type) {
        case actionTypes.LOAD_METADATA_SUCCESS: {
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
        case actionTypes.UPDATE_METADATA_SUCCESS: {
            let {portal_id, item} = action.payload;
            let updatedItem = {
                [portal_id]: item,
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