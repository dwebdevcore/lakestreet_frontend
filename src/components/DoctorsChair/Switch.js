import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialSwitch from '@material-ui/core/Switch';

const styles = theme => ({});
const Switch = ({classes, comment, onToggle}) => {
    const handleToggle = () => onToggle(comment);
    return (
        <FormControlLabel
            control={
                <MaterialSwitch
                    checked={comment.enabled}
                    name='enabled'
                    color="primary"
                    onChange={handleToggle}
                />
            }
            label="From the Doctors Chair"
        />
    )
};

Switch.propTypes = {
    comment: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Switch);
