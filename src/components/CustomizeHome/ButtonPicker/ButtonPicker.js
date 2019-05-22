import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Button from './Button';

const styles = theme => ({
    colors: {
        [theme.breakpoints.up(theme.customBreakpoints.sm)]: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    },
});
const ButtonPicker = ({classes, buttons, buttonStyle, onRadioChange}) => (
    <div className={classes.colors}>
        {
            buttons.map((button, index) =>
                <Button
                    key={button + index}
                    button={button}
                    onRadioChange={onRadioChange}
                    buttonStyle={buttonStyle}/>)
        }
    </div>
);

ButtonPicker.propTypes = {
    buttons: PropTypes.array.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonPicker);
