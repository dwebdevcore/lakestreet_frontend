import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {SelectField} from '../../Shared/SelectField';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2
    },
});
const FeaturedServicesEditor = ({
                                    classes,
                                    services,
                                    featuredServices,
                                    onFeaturedServicesChange
                                }) => {

    return (<div className={classes.root}>
        {
            featuredServices && featuredServices.map((featured, index) => {
                const handleServiceChange = (e) => {
                    onFeaturedServicesChange(e, index);
                };
                return <SelectField
                    onChange={handleServiceChange}
                    fullWidth
                    key={`featured${index}`}
                    value={featured.taxonomy_id}
                    name={`featuredServiceSelect${index}`}
                    selectOptions={services.map(service => {
                        return {
                            label: service.text,
                            option: service.taxonomy_id
                        };
                    })}/>
            })
        }
    </div>);
};

FeaturedServicesEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedServicesEditor);
