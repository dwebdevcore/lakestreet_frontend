import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Color from './Color';

const styles = theme => ({
    colors: {
        display: 'flex',
    },
});
const ColorPicker = ({classes, colors, accentColor, onRadioChange}) => (
    <div className={classes.colors}>
        {
            colors.map((color, index) =>
                <Color
                    key={color + index}
                    color={color}
                    onRadioChange={onRadioChange}
                    accentColor={accentColor}/>)
        }
    </div>
);

ColorPicker.propTypes = {
    colors: PropTypes.array.isRequired,
    accentColor: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorPicker);
