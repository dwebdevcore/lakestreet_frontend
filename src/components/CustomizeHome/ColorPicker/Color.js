import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import {classNames} from "../../../helpers/format";

const styles = theme => ({
    colorWrapper: {
        margin: theme.spacing.unit,
    },
    accentColor: {
        width: 60,
        height: 60,
        border: `1px solid ${theme.color.grey.light}`,
        '&.white': {
            backgroundColor: theme.color.white.main
        },
        '&.sand': {
            backgroundColor: theme.color.sand.main
        },
        '&.stone': {
            backgroundColor: theme.color.stone.main
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
const Color = ({classes, color, accentColor, onRadioChange}) => (

    <FormControlLabel
        className={classes.label}
        control={
            <div className={classes.colorWrapper}>
                <div className={classNames([classes.accentColor, color])}/>
                <Radio
                    color='primary'
                    checked={accentColor === color}
                    onChange={onRadioChange}
                    value={color}
                    name='accent_color'

                />
            </div>
        }
        label={color}
    />

);

Color.propTypes = {
    color: PropTypes.string.isRequired,
    accentColor: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Color);
