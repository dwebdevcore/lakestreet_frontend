import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    list: {
        listStyleType: 'none',
    },
});
const NavItemList = ({routes, classes}) => (
    <ul className={classes.list}>
        {
            routes.map((route, i) => <NavItem route={route} key={route.path + i}/>)
        }
    </ul>
);

NavItemList.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NavItemList);