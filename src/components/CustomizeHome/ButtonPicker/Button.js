import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import {classNames} from "../../../helpers/format";

const styles = theme => ({
    buttonWrapper: {
        margin: theme.spacing.unit,

    },
    button: {
        boxShadow: '0px 4px 2px 0px rgba(13,81,80,0.9)',
        backgroundColor: '#17aeab',
        color: theme.palette.primary.contrastText,
        padding: `${theme.spacing.unit * 2}px 0`,
        textAlign: 'center',
        width: 134,
        '&.tab': {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        },
        '&.pill': {
            borderRadius: 10
        },
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'center'
    },

});
const Button = ({classes, button, buttonStyle, onRadioChange}) => (

    <FormControlLabel
        className={classes.label}
        control={
            <div className={classes.buttonWrapper}>
                <div className={classNames([classes.button, button])}>
                    Button 1
                </div>
                <Radio
                    color='primary'
                    checked={buttonStyle === button}
                    onChange={onRadioChange}
                    value={button}
                    name='button_style'
                />
            </div>
        }
        label={button}
    />

);

Button.propTypes = {
    button: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Button);
