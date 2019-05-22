import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.png';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    wrapper: {
        width: '100%',
        textAlign: 'center',
        marginBottom: theme.spacing.unit * 10,
        '& img': {
            width: '100%',
        }
    },
});
const Logo = ({classes}) => (
    <div className={classes.wrapper}>
        <img src={logo} alt="logo"/>
    </div>
);
Logo.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Logo);