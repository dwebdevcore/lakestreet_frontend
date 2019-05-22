import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    main: {
        display: 'flex',
        maxWidth: theme.desktopMaxWith,
        margin: '0 auto',
        position: 'relative'
    },
});
const Main = ({children, classes}) => <main className={classes.main}>{children}</main>;

Main.propTypes = {
    children: PropTypes.any,
    classes: PropTypes.object
};
export default withStyles(styles)(Main);
