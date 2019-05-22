import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    loading: {
        position: 'fixed',
        width: '100%'
    }
});
const ProgressBar = ({classes}) => <LinearProgress className={classes.loading}/>;
ProgressBar.propTypes = {
    classes: PropTypes.object,
};
export default withStyles(styles)(ProgressBar);
