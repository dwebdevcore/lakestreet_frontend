import React from 'react';
import PropTypes from 'prop-types';
import SortableListItem from './SortableListItem';
import {SortableContainer} from 'react-sortable-hoc';

const SortableDoctorList = SortableContainer(({items, removeDoctor}) => (
    <ul>
        {
            items && items.map((doctor, index) => {
                    return <SortableListItem
                        removeDoctor={removeDoctor}
                        doctor={doctor}
                        key={doctor.npi + index}
                        index={index}/>
            })
        }
    </ul>));

SortableDoctorList.propTypes = {
    items: PropTypes.array.isRequired,
    removeDoctor: PropTypes.func.isRequired,
    onSortEnd: PropTypes.func
};

export default SortableDoctorList;