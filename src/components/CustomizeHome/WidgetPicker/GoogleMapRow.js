import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
    row: {
        marginBottom: theme.spacing.unit * 2,
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    image: {},
    label: {
        '& span': {
            fontSize: 16
        }
    },
});

const GoogleMapRow = ({classes, name, value, image, onRadioChange, googleMapSelectedWidget, title}) => {
    return (
        <div className={classes.row}>
            <FormControlLabel
                className={classes.label}
                control={
                    <Radio
                        name='googleMapSelectedWidget'
                        value={value.toString()}
                        checked={value === googleMapSelectedWidget}
                        color="primary"
                        onChange={onRadioChange}
                    />
                }
                label={title}
            />

            <div className={classes.image}><img src={image} alt={title}/></div>
        </div>
    )
};

GoogleMapRow.propTypes = {
    onRadioChange: PropTypes.func,
    googleMapSelectedWidget: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GoogleMapRow);
