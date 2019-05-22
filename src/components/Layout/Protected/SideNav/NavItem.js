import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {CustomNavLink} from '../../../Shared/CustomNavLink/index';
import {withStyles} from "@material-ui/core/styles";
import {ProtectedLayoutContext} from "../../Protected/ProtectedLayoutContext";

const styles = theme => ({
    listItem: {
        marginBottom: theme.spacing.unit / 2
    },
    link: {
        textDecoration: 'none',
        display: 'inline',
        color: theme.color.grey.dark,
        position: 'relative',
        '&.active': {
            color: theme.palette.primary.main
        },
        '&.active:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            left: -14,
            top: 4,
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: theme.color.green.light
        }
    }
});
const NavItem = ({route, classes}) => {
    return (
        <ProtectedLayoutContext.Consumer>
            {({currentOfficeData, toggleSideNav}) => (
                <li className={classes.listItem} onClick={toggleSideNav}>
                    <Typography
                        component={CustomNavLink}
                        to={route.path + (currentOfficeData ? `/${currentOfficeData.portal_id}` : '')}
                        className={classes.link}>
                        {route.title}
                    </Typography>
                </li>
            )}
        </ProtectedLayoutContext.Consumer>

    )
};

NavItem.propTypes = {
    route: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavItem);