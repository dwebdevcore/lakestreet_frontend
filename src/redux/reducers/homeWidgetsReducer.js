import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    homePageWidgets: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.homePageWidgets, action) {
    switch (action.type) {

        case actionTypes.LOAD_HOME_WIDGETS_SUCCESS: {
            let {portal_id, widgets} = action.payload;
            let newItem = {
                [portal_id]: widgets,
            };
            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...newItem
                },
                allIds: [...state.allIds, portal_id]
            };
        }
        case actionTypes.UPDATE_HOME_WIDGETS_SUCCESS: {
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