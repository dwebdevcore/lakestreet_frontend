import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography/Typography";
import SearchContainer from "../Shared/Search/SearchContainer";
import RecentOffices from "./RecentOffices";

const styles = theme => ({
    container: {
        minWidth: theme.centralBlockMaxWidth,
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        },
    },
});

const Home = ({classes, offices}) => {
    return (
        <div className={classes.container}>
            <Typography variant="title" gutterBottom>Find an Office</Typography>
            <SearchContainer/>
            {offices.length > 0 && <RecentOffices offices={offices}/>}
        </div>
    )
};

Home.propTypes = {
    offices: PropTypes.array,
};

export default withStyles(styles)(Home);
