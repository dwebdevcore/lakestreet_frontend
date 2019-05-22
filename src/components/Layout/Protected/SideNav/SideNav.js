import React from 'react';
import PropTypes from 'prop-types';
import NavSection from './NavSection';
import routes from '../../../../config/routes';
import {withStyles} from '@material-ui/core/styles';
import AssignedServicesContainer from "./AssignedServicesContainer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ProtectedLayoutContext} from '../ProtectedLayoutContext';
import {classNames} from '../../../../helpers/format';

const styles = theme => ({
    root: {
        width: '100%',
        position: 'absolute',
        left: '-100%',
        top: -94,
        transition: 'all 0.3s',
        zIndex: 150,
        backgroundColor: 'rgba(255,255,255,0.9)',
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            position: 'static',
            maxWidth: theme.leftSideMaxWidth,
        },
    },
    open: {
        [theme.breakpoints.down(theme.customBreakpoints.md)]: {
            left: '0%',
            height: '100%',
            paddingLeft: 18,
            paddingTop: 40
        },
    },
    menuIcon: {
        color: theme.color.grey.main,
        cursor: 'pointer',
        zIndex: 120,
        position: 'absolute',
        right: 40,
        top: 0,
        fontSize: 20,
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'none',
        },
    }
});
const SideNav = ({classes}) => (
    <ProtectedLayoutContext.Consumer>
        {({currentOfficeData, open, toggleSideNav}) => {
            let rootClasses = [classes.root];
            if (open) {
                rootClasses.push(classes.open)
            }
            return (
                <aside className={classNames(rootClasses)}>
                    <FontAwesomeIcon icon="bars" className={classes.menuIcon} onClick={toggleSideNav}/>
                    <nav>
                        <NavSection icon='cogs'
                                    sectionName='Admin'
                                    routes={
                                        [
                                            routes.SITE_META,
                                            routes.PRACTICE_META,
                                            routes.DOCTOR_ASSIGNMENT
                                        ]
                                    }/>
                        {/*  <NavSection icon='palette'
                        sectionName='Theme'
                        titleRoutePath={routes.CUSTOMIZE_HOME.path}
            />*/}
                        {/*  <NavSection icon='clock'
                        sectionName='Office Hours'/>*/}
                        <NavSection icon='laptop'
                                    sectionName='Site'
                                    routes={
                                        [
                                            routes.ABOUT_YOUR_DENTIST,
                                            routes.ABOUT_YOUR_TEAM,
                                            // routes.ABOUT_YOUR_OFFICE,
                                            routes.CUSTOMIZE_HOME_PAGE,
                                        ]
                                    }
                        />
                        {/*  <NavSection icon='credit-card'
                        sectionName='Payment'/>*/}
                        <NavSection icon='money-bill-alt'
                                    sectionName='Promotions'
                                    titleRoutePath={routes.PROMOTIONS.path}
                        />
                        {/*<NavSection icon='users'
                        sectionName='New Patients'
                        routes={
                            [
                                routes.INTRODUCTION,
                                routes.DIRECTIONS,
                            ]
                        }
            />*/}
                        <NavSection icon='heartbeat'
                                    sectionName='Services'
                                    titleRoutePath={routes.SERVICES.path}
                        />
                        {/*  <NavSection icon='heartbeat'
                        sectionName='Assigned Services'
                        routes={
                            [
                                routes.DOCTORS_CHAIR,
                            ]
                        }
            />*/}
                        <AssignedServicesContainer/>
                    </nav>
                </aside>
            )
        }}
    </ProtectedLayoutContext.Consumer>
);

SideNav.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideNav);