import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import {Logo} from './Logo';
import {TextField} from '../Shared/TextField';
import FormButtons from './FormButtons';

const styles = theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        [theme.breakpoints.up(theme.customBreakpoints.lg)]: {
            '&:after': {
                content: '""',
                display: 'block',
                width: '50%',
                height: '100%',
                backgroundColor: theme.color.purple.main
            },
        },
    },
    formWrapper: {
        // maxWidth: theme.loginFormMaxWidth,
        padding: theme.spacing.unit * 2,
        width: '100%',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        [theme.breakpoints.up(theme.customBreakpoints.lg)]: {
            width: '50%',
        },
    },
    form: {
        width: '100%',
        margin: '0 auto',
        maxWidth: theme.centralBlockMaxWidth,

    },
});
const Login = ({credentials, onChange, classes, onSubmit, onClear}) =>
    <div className={classes.root}>
        <div className={classes.formWrapper}>
            <form className={classes.form} onSubmit={onSubmit}>
                <Logo className={classes.wrapper} fullWidth/>
                <TextField
                    fullWidth
                    value={credentials.login}
                    name='u'
                    label='eMail Address'
                    onChange={onChange}
                />
                <TextField
                    fullWidth
                    value={credentials.password}
                    name='p'
                    label='Password'
                    onChange={onChange}
                    type='password'
                />
                <FormButtons onClear={onClear}/>
            </form>
        </div>

    </div>
;


Login.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    credentials: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);