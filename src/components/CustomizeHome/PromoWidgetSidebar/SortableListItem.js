import React from 'react';
import PropTypes from 'prop-types';
import {SortableElement} from "react-sortable-hoc";
import ListItem from './ListItem';

export const SortableListItem = SortableElement(({name, image, isPromo}) => {
        return (<ListItem name={name} image={image} sortable isPromo={isPromo}/>)
    }
);
SortableListItem.propTypes = {
    name: PropTypes.string,
    image: PropTypes.any
};
export default SortableListItem;