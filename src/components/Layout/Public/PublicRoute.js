import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import PublicLayout from './PublicLayout';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <PublicLayout>
                <Component {...matchProps} />
            </PublicLayout>
        )}/>
    )
};
PublicRoute.propTypes = {
    component: PropTypes.any
};
export default PublicRoute;