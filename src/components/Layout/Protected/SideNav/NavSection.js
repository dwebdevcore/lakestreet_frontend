import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import NavItemList from "./NavItemList";
import NavSectionTitle from "./NavSectionTitle";

const styles = (theme) => ({
    root: {
        paddingLeft: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 2,
        color: theme.color.grey.dark,
    },
});

const NavSection = ({icon, sectionName, routes, classes, titleRoutePath}) => (
    <div className={classes.root}>
        <NavSectionTitle sectionName={sectionName} icon={icon} titleRoutePath={titleRoutePath}/>
        {routes && <NavItemList routes={routes}/>}
    </div>
);

NavSection.propTypes = {
    icon: PropTypes.any,
    sectionName: PropTypes.string.isRequired,
    titleRoutePath: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavSection);
