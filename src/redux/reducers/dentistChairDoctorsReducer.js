import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    dentistChairDoctors: {
        byTaxonomyId: {},
        allIds: []
    }
    //metadata: []
};
export default function (state = initialState.dentistChairDoctors, action) {
    switch (action.type) {
        case actionTypes.LOAD_DENTIST_CHAIR_DOCTORS_SUCCESS: {
            let {taxonomy_id, item} = action.payload;
            let newItem = {
                [taxonomy_id]: item,
            };
            return {
                ...state,
                byTaxonomyId: {
                    ...state.byTaxonomyId, ...newItem
                },
                allIds: [...state.allIds, taxonomy_id]
            };
        }
        case actionTypes.UPDATE_DENTIST_CHAIR_DOCTORS_SUCCESS: {
            let {taxonomy_id, dentistChairDoctors} = action.payload;
            let updatedItem = {
                [taxonomy_id]: dentistChairDoctors,
            };
            return {
                ...state,
                byTaxonomyId: {
                    ...state.byTaxonomyId, ...updatedItem
                },
            };
        }
        default:
            return state;
    }
}