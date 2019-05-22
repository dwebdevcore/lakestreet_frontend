import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {SearchTextField} from '../SearchTextField/index';
import SearchDropdown from './SearchDropdown';

const styles = (theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    icon: {
        color: theme.color.grey.main,
        cursor: 'pointer',
    },
    link: {
        marginLeft: theme.spacing.unit * 2,
    }
});

const Search = ({classes, onTextChange, searchQuery, searchDropDownOpen, items, toggleDropdown, onOfficeSelect}) => {
    return (
        <div className={classes.root}>
            <SearchTextField
                onChange={onTextChange}
                value={searchQuery}
                onFocus={toggleDropdown}
                onBlur={toggleDropdown}
            />

            {(searchDropDownOpen && items.length > 0) &&
            <SearchDropdown items={items} searchQuery={searchQuery} onOfficeSelect={onOfficeSelect}/>
            }
        </div>
    )
};

Search.propTypes = {
    items: PropTypes.array,
    searchQuery: PropTypes.string,
    searchDropDownOpen: PropTypes.bool,
    onTextChange: PropTypes.func,
    toggleDropdown: PropTypes.func,
    onOfficeSelect: PropTypes.func,
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Search);