import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        '& *': {
            width: '100%',
            textAlign: 'center',
            display: 'block',
        },
        '& > *': {
            marginBottom: theme.spacing.unit * 2,
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& *': {
                width: 'auto',
                display: 'inherit',
            },
        },
    },
    forgot: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: 14
    },
    button: {
        textTransform: 'capitalize',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit * 4,
            paddingRight: theme.spacing.unit * 4,
        },

    }
});
const FormButtons = ({classes, onClear}) => (
    <div className={classes.root}>
        <div>
            <Button color="primary" className={classes.button} onClick={onClear}>
                Cancel
            </Button>
            <Button variant="contained" color="primary" type='submit' className={classes.button}>
                Sign In
            </Button>
        </div>
        <Link to={'/'} className={classes.forgot}>Forgot Password</Link>
    </div>

);


FormButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    onClear: PropTypes.func.isRequired,
};

export default withStyles(styles)(FormButtons);
