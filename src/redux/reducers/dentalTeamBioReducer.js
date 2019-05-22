import * as actionTypes from '../actions/actionTypes';
//Storing normalized data instead of just an array
const initialState = {
    dentalTeamBio: {
        byPortalId: {},
        allIds: []
    }
};
export default function (state = initialState.dentalTeamBio, action) {
    switch (action.type) {
        case actionTypes.LOAD_DENTAL_TEAM_BIO_SUCCESS: {
            let {portal_id, team_member_id, item} = action.payload;
            let biosArray = [];

            if (state.byPortalId[portal_id] !== undefined) {
                biosArray = [...state.byPortalId[portal_id]];
            }
            let newItem = {
                [portal_id]: [...biosArray, {...item, ...{team_member_id: team_member_id}}]
            };

            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...newItem
                },
                allIds: state.allIds.indexOf(portal_id) > -1 ? [...state.allIds] : [...state.allIds, portal_id]
            };

        }

        case actionTypes.UPDATE_DENTAL_TEAM_MEMBER_BIO_SUCCESS: {
            let {portal_id, item} = action.payload;
            //Needed if update bio called for a new created member
            let bioExist = !!state.byPortalId[portal_id].filter(b => b.team_member_id === item.team_member_id).length;
            return {
                ...state,
                byPortalId: {
                    ...state.byPortalId, ...{
                        [portal_id]: !bioExist ?
                            [...state.byPortalId[portal_id], {...item}] :
                            [...state.byPortalId[portal_id]
                                .map((bio) => {
                                    if (bio.team_member_id === item.team_member_id) {
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