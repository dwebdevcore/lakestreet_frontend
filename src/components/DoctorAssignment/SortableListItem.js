import React from 'react';
import PropTypes from 'prop-types';
import {SortableElement} from "react-sortable-hoc";
import ListItem from './ListItem';

export const SortableListItem = SortableElement(({doctor, removeDoctor}) =>
    <ListItem doctor={doctor} removeDoctor={removeDoctor} sortable/>
);
SortableListItem.propTypes = {
    removeDoctor: PropTypes.func.isRequired,
    doctor: PropTypes.object,
};
export default SortableListItem;