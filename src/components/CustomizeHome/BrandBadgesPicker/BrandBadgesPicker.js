import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

import BrandBadge from './BrandBadge';

const styles = theme => ({
    root: {
        // display: 'flex',
        // justifyContent: 'space-between'
    },
});
const BrandBadgesPicker = ({classes, brandBadges, onBrandBadgeChange}) => {
    return (
        <React.Fragment>
            {brandBadges.map((badge, index) =>
                <BrandBadge key={`badge${index}`} badge={badge} onBrandBadgeChange={onBrandBadgeChange}/>)}
        </React.Fragment>
    )

};

BrandBadgesPicker.propTypes = {
    brandBadges: PropTypes.array,
    onBrandBadgeChange: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrandBadgesPicker);
