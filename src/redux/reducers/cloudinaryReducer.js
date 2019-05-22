import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cloudinaryImageList: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.cloudinaryImageList, action) {
    switch (action.type) {
        case actionTypes.CLOUDINARY_LOAD_IMAGE_LIST_SUCCESS: {
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
        default:
            return state;
    }
}