import * as actionTypes from '../actions/actionTypes';

const initialState = {
    officeList: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.officeList, action) {
    switch (action.type) {
        case actionTypes.LOAD_OFFICE_DATA_SUCCESS: {
            let portalId = action.payload.portal_id;
            let newItem = {
                [portalId]: action.payload,
            };
            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...newItem
                },
                allIds: [...state.allIds, portalId]
            };
        }

        default:
            return state;
    }
}