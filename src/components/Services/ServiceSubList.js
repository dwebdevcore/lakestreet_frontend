import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ServiceSubListItem from './ServiceSubListItem';

const styles = theme => ({
    list: {
        listStyleType: 'none',
        width: '100%',
    }
});
const ServiceSubList = ({items, parentService, onChange, classes}) =>
    <ul className={classes.list}>
        {
            items.map((item) => <ServiceSubListItem
                parentService={parentService}
                key={item.text + item.taxonomy_id} service={item}
                onChange={onChange}
            />)
        }
    </ul>;

ServiceSubList.propTypes = {
    onChange: PropTypes.func,
    parentService: PropTypes.object,
    items: PropTypes.array,
    classes: PropTypes.object
};
export default withStyles(styles)(ServiceSubList);