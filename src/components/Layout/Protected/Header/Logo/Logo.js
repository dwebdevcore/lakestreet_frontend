import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../../../assets/images/logo.png';
import logoMobile from '../../../../../assets/images/logo-mobile.png';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    wrapper: {
        width: '100%',
        maxWidth: theme.leftSideMaxWidth,
        '& img': {
            maxHeight: '40px'
        },
    },
    logo: {
        display: 'none',
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'block'
        },
    },
    logoMobile: {
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'none'
        },
    }
});
const Logo = ({classes}) => (
    <div className={classes.wrapper}>
        <img className={classes.logo} src={logo} alt="logo"/>
        <img className={classes.logoMobile} src={logoMobile} alt="logo"/>
    </div>
);
Logo.propTypes = {
    classes: PropTypes.object.isRequired,
    fullWidth: PropTypes.bool
};
export default withStyles(styles)(Logo);