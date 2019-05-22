import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Highlight from 'react-highlighter';

const styles = (theme) => ({
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& *': {
            color: theme.color.grey.dark,
        }
    },
    link: {
        color: theme.color.grey.main,
    },
    item: {
        cursor: 'pointer',
        borderBottom: `1px solid ${theme.color.grey.main}`,
        paddingBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    highLight: {fontWeight: 700, backgroundColor: 'transparent'}
});

/*
* onMouseDown used instead of onClick or Link component,
* because onBlur event fired on a parent component prvent those above
*
* */

const SearchDropdownItem = ({classes, item, searchQuery, onOfficeSelect}) => (
    <li className={classes.item} onMouseDown={() => onOfficeSelect(item)}>
        <div className={classes.title}>
            <Highlight search={searchQuery}
                       matchClass={classes.highLight}>{item.office_name}</Highlight>
            {/*<Typography>{item.description}</Typography>*/}
        </div>
        <Typography className={classes.link}>{item.content_url}</Typography>
    </li>
);

SearchDropdownItem.propTypes = {
    searchQuery: PropTypes.string,
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchDropdownItem);