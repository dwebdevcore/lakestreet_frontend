import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {ProtectedLayoutContext} from '../ProtectedLayoutContext';
import routes from '../../../../config/routes';
import {classNames} from "../../../../helpers/format";

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit}px 0`,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            flexDirection: 'row',
            borderTop: `1px solid ${theme.color.grey.light}`,
            borderBottom: `1px solid ${theme.color.grey.light}`,
        },
        marginBottom: theme.spacing.unit * 6,
        '& p': {
            color: theme.color.grey.main
        }
    },
    backIcon: {
        color: theme.color.grey.main,
        cursor: 'pointer',
        display: 'none',
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'block',
        },
    },
    menuIcon: {
        color: theme.color.grey.main,
        cursor: 'pointer',
        fontSize: 20,
        transition: 'all 0.3s',
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            display: 'none',
        },
    },
    hidden: {
        display: 'none'
    },
    title: {
        paddingLeft: theme.spacing.unit * 2,
        fontWeight: 500
    },
    leftSide: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px 0`,
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            maxWidth: theme.leftSideMaxWidth,
        },
    },
    linkIcon: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing.unit / 2,
        fontSize: 12
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    central: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${theme.spacing.unit * 2}px 0`,
        borderTop: `1px solid ${theme.color.grey.light}`,
        borderBottom: `1px solid ${theme.color.grey.light}`,
        [theme.breakpoints.up(theme.customBreakpoints.md)]: {
            maxWidth: theme.centralBlockMaxWidth,
            border: 'none',
        },
    }
});
const NavBar = ({history, classes}) => (
    <ProtectedLayoutContext.Consumer>
        {({currentOfficeData, open, toggleSideNav}) => {
            let menuIconClasses = [classes.menuIcon];
            if (open) {
                menuIconClasses.push(classes.hidden)
            }
            return (
                <React.Fragment>
                    {currentOfficeData && <div className={classes.root}>
                        <div className={classes.leftSide}>
                            <Link to={routes.HOME_PAGE.path}>
                                <FontAwesomeIcon icon="arrow-left" className={classes.backIcon}/>
                            </Link>
                            <FontAwesomeIcon
                                icon="bars"
                                className={classNames(menuIconClasses)}
                                onClick={toggleSideNav}/>
                            <Typography variant='title' component='h1' className={classes.title}>
                                {currentOfficeData.office_name}
                            </Typography>
                        </div>
                        <div className={classes.central}>
                            <a href={`http://${currentOfficeData.content_url}.${currentOfficeData.tld}`} target='_blank'
                               className={classes.link}>
                                <FontAwesomeIcon icon="link" className={classes.linkIcon}/>
                                <Typography>{`${currentOfficeData.content_url}.${currentOfficeData.tld}`}</Typography>
                            </a>
                            <Typography>{`${currentOfficeData.city}, ${currentOfficeData.province_abbr}`}</Typography>
                        </div>

                    </div>}
                </React.Fragment>
            )
        }}
    </ProtectedLayoutContext.Consumer>

);

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NavBar);