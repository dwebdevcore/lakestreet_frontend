import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        backgroundColor: theme.color.grey.light,
        padding: `0 ${theme.spacing.unit * 3}px`,
        marginBottom: 2,
        borderRadius: theme.shape.borderRadius,
        '&:nth-child(odd)': {
            backgroundColor: theme.palette.primary.contrastText
        }
    },
    iconGrip: {
        color: theme.color.grey.main,
        cursor: 'pointer'
    },
    iconPlus: {
        color: theme.color.grey.dark,
        cursor: 'pointer'
    },
    rightSide: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%'
    }
});

const ListItem = ({doctor, sortable, classes, addDoctor, removeDoctor}) => {
    const onAddDoctor = () => addDoctor(doctor);
    const onRemoveDoctor = () => removeDoctor(doctor);
    return (
        <li className={classes.root}>
            {sortable && <FontAwesomeIcon icon='grip-vertical' className={classes.iconGrip}/>}
            <Typography>{`${doctor.last_name} ${doctor.first_name}, ${doctor.designation}`}</Typography>
            <div className={classes.rightSide}>
            <Typography>{doctor.npi}</Typography>
            {sortable ?
                <FontAwesomeIcon
                    icon='minus-circle'
                    className={classes.iconPlus}
                    onMouseDown={onRemoveDoctor}
                /> :
                <FontAwesomeIcon
                    icon='plus-circle'
                    className={classes.iconPlus}
                    onMouseDown={onAddDoctor}
                   />
            }
            </div>
        </li>
    )
};


ListItem.propTypes = {
    sortable: PropTypes.bool,
    doctor: PropTypes.object,
    addDoctor: PropTypes.func,
    removeDoctor: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListItem);
