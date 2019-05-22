import React from 'react';
import PropTypes from 'prop-types';
import SortableListItem from './SortableListItem';
import {SortableContainer} from 'react-sortable-hoc';
//disabled be uncommented to prevent any drag'n'drop for promo
const SortableWidgetList = SortableContainer(({items}) => (
    <ul>
        {
            items.map(({name, image, isPromo, disabled, enabled}, index) => {
                if (enabled || isPromo) {
                    return <SortableListItem
                        name={name}
                        image={image}
                        key={`${name}${index}`}
                        index={index}
                        disabled={!!disabled}
                        isPromo={!!isPromo}
                    />
                }
                return null;
            })
        }
    </ul>));

SortableWidgetList.propTypes = {
    items: PropTypes.array.isRequired
};

export default SortableWidgetList;