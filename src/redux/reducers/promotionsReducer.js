import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    promotions: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.promotions, action) {
    switch (action.type) {
        case actionTypes.LOAD_PROMOTIONS_SUCCESS: {
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
        case actionTypes.SAVE_PROMOTION_SUCCESS: {
            let {portal_id, item} = action.payload;
            let updatedItem = {
                [portal_id]: [...state.byPortalId[portal_id].map((promotion) => {
                    if (promotion.id === item.id) {
                        return {...item};
                    }
                    return promotion;
                })],
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