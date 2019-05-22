import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

import SortableWidgetList from "./SortableWidgetList";

const styles = theme => ({
    root: {
        border: `2px solid ${theme.color.grey.light}`,
        // minWidth: 200,
        [theme.breakpoints.down('md')]: {
            width: 200,
            margin: '0 auto'
        },
    },
    img: {
        width: '100%',
    },
    left: {
        width: '100%',
        maxWidth: theme.centralBlockMaxWidth,
    },

});
const PromoWidgetSidebar = ({classes, homeWidgets, onSortEnd}) => (
    <div className={classes.root}>
        <SortableWidgetList items={homeWidgets} onSortEnd={onSortEnd}/>
    </div>
);

PromoWidgetSidebar.propTypes = {
    homeWidgets: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(PromoWidgetSidebar);
