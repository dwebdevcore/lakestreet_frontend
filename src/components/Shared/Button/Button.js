import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import MaterialButton from '@material-ui/core/Button';
import {classNames} from "../../../helpers/format";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        textTransform: 'capitalize',
    },
    buttonAdditional: {
        backgroundColor: theme.palette.additional.main,
        color: theme.palette.additional.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.additional.dark,
        }
    }
});
const Button = ({text, classes, color, onClick}) => {
    let buttonProps = {};
    let buttonClassNames = [classes.button];
    if (color !== 'additional') {
        buttonProps.color = color;
    } else {
        buttonClassNames.push(classes.buttonAdditional);
    }
    buttonProps.className = classNames(buttonClassNames);
    return (
        <MaterialButton variant="contained" size="medium" {...buttonProps} onClick={onClick}>
            {text}
        </MaterialButton>
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Button);