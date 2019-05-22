import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

import SearchDropdownItem from './SearchDropdownItem';

const styles = (theme) => ({
    dropDown: {
        borderRadius: theme.shape.borderRadius,
        position: 'absolute',
        top: 41,
        zIndex: 200,
        boxSizing: 'border-box',
        maxWidth: theme.centralBlockMaxWidth,
        width: '100%',
        minWidth: '100%',
        backgroundColor: theme.color.grey.light,
        listStyleType: 'none',
        padding: `${theme.spacing.unit * 3}px`,
    },
    sectionTitle: {
        color: theme.color.grey.dark,
        fontWeight: 700
    },
});

const SearchDropdown = ({classes, items, searchQuery, onOfficeSelect}) => (
    <ul className={classes.dropDown}>
            {
                items.map((item) =>
                    <SearchDropdownItem
                        onOfficeSelect={onOfficeSelect}
                        searchQuery={searchQuery}
                        item={item}
                        key={item.office_name + item.portal_id}/>
                )
            }
    </ul>
);

SearchDropdown.propTypes = {
    onOfficeSelect: PropTypes.func,
    searchQuery: PropTypes.string,
    items: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SearchDropdown);