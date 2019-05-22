import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ajaxCallsInProgress: 0
};

function actionTypeEndsInSuccess(type) {
    return type.search('_SUCCESS') > -1;
}

export default function (state = initialState.ajaxCallsInProgress, action) {
  /*  console.log(action.type)*/
    if (action.type === actionTypes.AJAX_CALL_BEGIN) {
        return state + 1;
    } else if (action.type === actionTypes.AJAX_CALL_ERROR ||
        actionTypeEndsInSuccess(action.type)) {
        if (state > 0)
            return state - 1;
    }

    return state;
}