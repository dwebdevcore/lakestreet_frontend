import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import routes from '../../config/routes';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.unit * 2,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
        '&:nth-of-type(odd)':{
            backgroundColor: theme.color.grey.light
        }
    },
    title: {
        fontWeight: 700
    },
    link: {
       color: theme.palette.primary.main
    }
});
const RecentOfficeRow = ({classes, office}) => {
    return (
        <div className={classes.row}>
            <Link to={`${routes.SITE_META.path}/${office.portal_id}`} className={classes.link}>
                {`${office.content_url}.${office.tld}`}
            </Link>
            <Link to={`${routes.SITE_META.path}/${office.portal_id}`} className={classes.link}>
                <FontAwesomeIcon icon="edit" className={classes.linkIcon}/>
            </Link>

        </div>
    )
};

RecentOfficeRow.propTypes = {
    office: PropTypes.object,
};

export default withStyles(styles)(RecentOfficeRow);
