import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Comment from './Comment';

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
const DoctorsChair = ({classes, dentistChair, dentistChairDoctors, onChange, onToggle, onSelect}) => {
    return (
        <React.Fragment>
            {
                dentistChair.map(item =>
                    <Comment
                        comment={item}
                        key={item.service_name + item.taxonomy_id}
                        dentistChairDoctors={dentistChairDoctors}
                        onToggle={onToggle}
                        onChange={onChange}
                        onSelect={onSelect}
                    />)
            }
        </React.Fragment>
    )
};

DoctorsChair.propTypes = {
    dentistChair: PropTypes.array,
    dentistChairDoctors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DoctorsChair);
