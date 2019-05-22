import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Switch from './Switch';
import Select from './Select';
import TextArea from './TextArea';

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.unit * 2
    },
    title: {
        fontWeight: 700
    },
    section: {
        marginBottom: theme.spacing.unit * 8
    }
});
const Comment = ({classes, comment, dentistChairDoctors, onChange, onToggle, onSelect}) => {
    return (
        <div className={classes.section}>
            <Typography variant='title' className={classes.title}>{comment.service_name}</Typography>
            <div className={classes.row}>
                <Switch comment={comment} dentistChairDoctors={dentistChairDoctors} onToggle={onToggle}/>
                {comment.npi &&
                <Select comment={comment} dentistChairDoctors={dentistChairDoctors} onSelect={onSelect}/>}
            </div>
            {comment.npi &&
            <TextArea comment={comment} dentistChairDoctors={dentistChairDoctors} onChange={onChange}/>}
        </div>
    )
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    dentistChairDoctors: PropTypes.object,
    onToggle: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
