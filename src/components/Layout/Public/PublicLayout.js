import React from 'react';
import PropTypes from 'prop-types';
const PublicLayout = ({children, ...rest}) => {
    return (
        <div>
            {children}
        </div>
    )
};

PublicLayout.propTypes = {
    children: PropTypes.any
};
export default PublicLayout;