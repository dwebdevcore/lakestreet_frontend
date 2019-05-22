import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    row: {
        marginBottom: theme.spacing.unit * 2,
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    label: {
        '& span': {
            fontSize: 16
        }
    },
});

const BrandBadge = ({classes, badge, onBrandBadgeChange}) => {
    const handleChange = () => onBrandBadgeChange(badge);
    return (
        <div className={classes.row}>
            <FormControlLabel
                className={classes.label}
                control={
                    <Checkbox
                        checked={badge.enabled}
                        color="primary"
                        onChange={handleChange}
                    />
                }
                label={badge.type}
            />
        </div>
    )
};

BrandBadge.propTypes = {
    onCheckboxChange: PropTypes.func,
    badge: PropTypes.object,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrandBadge);
