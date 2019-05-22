import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    dentistChair: {
        byTaxonomyId: {},
        allIds: []
    }
    //metadata: []
};
export default function (state = initialState.dentistChair, action) {
    switch (action.type) {
        case actionTypes.LOAD_DENTIST_CHAIR_SUCCESS: {
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
        default:
            return state;
    }
}