import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MaterialSelect from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
        '& svg': {
            right: theme.spacing.unit * 2
        }
    },
    select: {
        border: `2px solid ${theme.color.grey.main}`,
        padding: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 5,
        borderRadius: theme.shape.borderRadius,
        color: theme.color.grey.main,
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    }
});
const Select = ({classes, comment, dentistChairDoctors, onSelect}) => {
    const handlePropChange = (e) => {
        onSelect(comment, e.target.value);
    };

    return (

        <FormControl className={classes.formControl}>
            <MaterialSelect
                disableUnderline
                name='npi'
                value={comment.npi}
                onChange={handlePropChange}
                displayEmpty
                classes={{
                    select: classes.select
                }}
            >
                {/*  <MenuItem value="">
                    <em>Attributed Doctor</em>
                </MenuItem>*/}
                {Object.keys(dentistChairDoctors).map((item, i) => (
                    <MenuItem key={item + i}
                              value={dentistChairDoctors[item].npi}>
                        {
                            `${dentistChairDoctors[item].first_name} ${dentistChairDoctors[item].last_name} `
                        }
                    </MenuItem>
                ))}
            </MaterialSelect>
        </FormControl>
    )
};

Select.propTypes = {
    comment: PropTypes.object.isRequired,
    dentistChairDoctors: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Select);
