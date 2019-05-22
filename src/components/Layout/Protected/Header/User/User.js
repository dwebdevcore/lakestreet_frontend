import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Menu from "./Menu";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            position: 'static',
        },
    },
    avatar: {
        margin: '0 10px'
    },
    username:{
        display: 'none',
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'block',
        },
    }
});
const User = ({classes, onLogOut, authUser}) => (
    <div className={classes.root}>
        {authUser && <Typography className={classes.username}>{authUser.displayName}</Typography>}
        <Avatar alt="UserName" src="https://placeimg.com/200/200/any" className={classes.avatar}/>
        <Menu onLogOut={onLogOut}/>
    </div>
);

User.propTypes = {
    classes: PropTypes.object.isRequired,
    onLogOut: PropTypes.func.isRequired,
    authUser: PropTypes.object
};
export default withStyles(styles)(User);