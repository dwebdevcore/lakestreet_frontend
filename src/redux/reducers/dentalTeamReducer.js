import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    dentalTeam: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.dentalTeam, action) {
    switch (action.type) {
        case actionTypes.LOAD_DENTAL_TEAM_SUCCESS: {
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
        case actionTypes.ADD_DENTAL_TEAM_MEMBER_SUCCESS: {
            let {portal_id, item} = action.payload;

            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...{
                        [portal_id]: [...state.byPortalId[portal_id], item]
                    }
                },
                allIds: [...state.allIds, portal_id]
            };
        }
        case actionTypes.DELETE_DENTAL_TEAM_MEMBER_SUCCESS: {
            let {portal_id, item} = action.payload;

            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...{
                        [portal_id]: [...state.byPortalId[portal_id]
                            .filter((doctor) => doctor.team_member_id !== item.team_member_id)]
                    }
                },
                allIds: [...state.allIds, portal_id]
            };

        }
        default:
            return state;
    }
}