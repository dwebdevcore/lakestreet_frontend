import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

import RecentOfficeRow from './RecentOfficeRow';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 4
    },
});
const RecentOffices = ({classes, offices}) => {
    return (
        <div className={classes.container}>
            <Typography variant="title" gutterBottom>Recent Offices</Typography>
            <div>
                {
                    offices.map(office => <RecentOfficeRow office={office} key={office.portal_id}/>)
                }
            </div>
        </div>
    )
};

RecentOffices.propTypes = {
    offices: PropTypes.array,
};

export default withStyles(styles)(RecentOffices);
