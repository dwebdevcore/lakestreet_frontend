import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    icon: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    }

});
const AddMemberButton = ({classes, onAddMember, added}) => (
    <div className={classes.root}>
        <Button onClick={onAddMember} variant="contained" color="default" className={classes.button}>
            {added ? 'CANCEL' : 'ADD A TEAM MEMBER'}
            {added ?
                <FontAwesomeIcon icon='minus-circle' className={classes.icon}/> :
                <FontAwesomeIcon icon='plus-circle' className={classes.icon}/>}
        </Button>
    </div>
);

AddMemberButton.propTypes = {
    onAddMember: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(AddMemberButton);