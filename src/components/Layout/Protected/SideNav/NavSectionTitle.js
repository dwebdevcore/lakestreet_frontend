import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CustomNavLink} from '../../../Shared/CustomNavLink/index';
import {ProtectedLayoutContext} from "../../Protected/ProtectedLayoutContext";

const styles = theme => ({

    rootName: {
        display: 'flex',
        alignItems: 'center',
        color: theme.color.grey.dark,
        marginBottom: theme.spacing.unit + 2,
        position: 'relative',
        '& a': {
            textDecoration: 'none'
        }
    },
    sectionName: {
        fontWeight: 700,
        color: theme.color.grey.dark,
    },
    icon: {
        position: 'absolute',
        left: -36
    }
});
const NavSectionTitle = ({sectionName, icon, classes, titleRoutePath}) => {

    const component = titleRoutePath ? CustomNavLink : 'span';

    return (
        <ProtectedLayoutContext.Consumer>
            {({currentOfficeData, toggleSideNav}) => {
                let linkProps = {};
                if (titleRoutePath) {
                    linkProps.onClick = toggleSideNav;
                }
                return (
                    <div className={classes.rootName}>
                        <FontAwesomeIcon icon={icon} className={classes.icon}/>
                        <Typography
                            {...linkProps}
                            component={component}
                            to={titleRoutePath + (currentOfficeData ? `/${currentOfficeData.portal_id}` : '')}
                            className={classes.sectionName}>{sectionName}</Typography>
                    </div>
                )
            }}
        </ProtectedLayoutContext.Consumer>
    )
};

NavSectionTitle.propTypes = {
    titleRoutePath: PropTypes.string,
    icon: PropTypes.string,
    sectionName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavSectionTitle);