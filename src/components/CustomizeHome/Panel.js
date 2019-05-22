import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexDirection: 'column'
    },
    summary: {
        backgroundColor: theme.color.grey.light,
        color: theme.color.grey.main,
    },
    cursive: {
        fontStyle: 'italic'
    },
    note: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 3,
    }
});
const Panel = ({classes, children, title, note}) => (
    <ExpansionPanel className={classes.panel} defaultExpanded>
        <ExpansionPanelSummary className={classes.summary} expandIcon={<FontAwesomeIcon icon='chevron-down'/>}>
            {title}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
            classes={{
                root: classes.root
            }}>
            {note && <Typography component='p' className={classes.note}>
                NOTE:
                <span className={classes.cursive}>
                {note}
            </span>
            </Typography>}
            {children}
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

Panel.propTypes = {
    title: PropTypes.string.isRequired,
    note: PropTypes.string,
    children: PropTypes.any.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel);
