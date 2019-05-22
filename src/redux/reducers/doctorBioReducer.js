import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    doctorBio: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.doctorBio, action) {
    switch (action.type) {
        case actionTypes.LOAD_DOCTOR_BIO_SUCCESS: {
            let {portal_id, npi, item} = action.payload;
            let biosArray = [];

            if (state.byPortalId[portal_id] !== undefined) {
                biosArray = [...state.byPortalId[portal_id]];
            }
            let newItem = {
                [portal_id]: [...biosArray, {...item, ...{npi: npi}}]
            };

            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...newItem
                },
                allIds: state.allIds.indexOf(portal_id) > -1 ? [...state.allIds] : [...state.allIds, portal_id]
            };
        }
        case actionTypes.UPDATE_DOCTOR_BIO_SUCCESS: {
            let {portal_id, item} = action.payload;

            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...{
                        [portal_id]: [...state.byPortalId[portal_id]
                            .map((bio) => {
                                if (bio.npi === item.npi) {
                                    return {...item};
                                }
                                return bio;
                            })]
                    }
                },
                allIds: state.allIds.indexOf(portal_id) > -1 ? [...state.allIds] : [...state.allIds, portal_id]
            };

        }
        default:
            return state;
    }
}