import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    featuredServices: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.featuredServices, action) {
    switch (action.type) {
        case actionTypes.UPDATE_FEATURED_SERVICES_SUCCESS:
        case actionTypes.LOAD_FEATURED_SERVICES_SUCCESS: {
            let {portal_id, services} = action.payload;
            let newItem = {
                [portal_id]: services,
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