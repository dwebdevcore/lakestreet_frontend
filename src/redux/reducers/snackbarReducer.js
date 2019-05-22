import * as actionTypes from '../actions/actionTypes';

const initialState = {
    snackbar: {
        message: '',
        variant: ''
    }
};
export default function (state = initialState.snackbar, action) {
    if (action.type === actionTypes.SHOW_SNACKBAR) {
        return {
            message: action.message,
            variant: action.variant
        };
    }

    return state;
}