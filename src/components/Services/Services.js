import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Service from './Service';

const styles = theme => ({
});
const Services = ({services, classes, onChange}) => {
    return (
        <React.Fragment>
            {
                services.map((service) =>
                    <Service
                        service={service}
                        key={service.text + service.taxonomy_id}
                        onChange={onChange}
                    />)
            }
        </React.Fragment>)
};

Services.propTypes = {
    onChange: PropTypes.func,
    services: PropTypes.array,
    classes: PropTypes.object
};
export default withStyles(styles)(Services);