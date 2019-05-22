import React from 'react';
import PropTypes from 'prop-types';
import {Logo} from './Logo';
import {SearchContainer} from '../../../Shared/Search';
import {User} from './User/index';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        boxSizing: 'border-box',
        position: 'relative',
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'flex',
            alignItems: 'flex-start',
            height: 50,
        },
        maxWidth: theme.desktopMaxWith,
        margin: '0 auto'
    },
});
const Header = ({classes, onLogOut, authUser, showSearch}) => (
    <header className={classes.root}>
        <Logo/>
        {showSearch && <SearchContainer/>}
        <User onLogOut={onLogOut} authUser={authUser}/>
    </header>
);

Header.propTypes = {
    showSearch: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    onLogOut: PropTypes.func.isRequired,
    authUser: PropTypes.object
};
export default withStyles(styles)(Header);
