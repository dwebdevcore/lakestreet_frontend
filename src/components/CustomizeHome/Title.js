import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    title: {
        paddingTop: theme.spacing.unit * 2,
    },
    cursive: {
        fontStyle: 'italic'
    },
    description:{
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 3,
    }
});
const Title = ({classes, title, description}) => (
    <React.Fragment>
        <Typography variant='subheading' className={classes.title}>{title}</Typography>
        {description && <Typography component='p' className={classes.description}>
            NOTE:
            <span className={classes.cursive}>
                {description}
            </span>
        </Typography>}

    </React.Fragment>
);

Title.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Title);
