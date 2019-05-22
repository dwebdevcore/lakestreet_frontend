import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';


const SearchList = ({items, addDoctor}) => (
    <ul>
        {
            items && items.map((doctor, index) => {
                return <ListItem addDoctor={addDoctor} doctor={doctor} key={doctor.npi} index={index}/>
            })
        }
    </ul>);

SearchList.propTypes = {
    items: PropTypes.array.isRequired
};

export default SearchList;