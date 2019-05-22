import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expires: {
        fontStyle: 'italic'
    },
    button: {
        textTransform: 'lowercase',
        marginLeft: theme.spacing.unit * 2,
    }
});
const FormButtons = ({classes, expires}) => (
    <div className={classes.root}>
        <Typography className={classes.expires}>Expires: {format(expires, 'dd/MM/yyyy')}</Typography>
        <div>
            <Button color="primary" className={classes.button}>
                clear
            </Button>
            <Button variant="contained" color="primary" className={classes.button} type='submit'>
                schedule
            </Button>
        </div>
    </div>

);


FormButtons.propTypes = {
    expires: PropTypes.any,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormButtons);
