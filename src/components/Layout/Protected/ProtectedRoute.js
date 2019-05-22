import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import ProtectedLayoutContainer from './ProtectedLayoutContainer';

import routes from '../../../config/routes';
import {checkAuthUser} from '../../../helpers/auth';

const ProtectedRoute = ({component: Component, ...rest}) => {
    //App context authUser can't be used here, because if page will be reloaded
    //authUser prop will be null initially and this will cause redirect to a login screen
    //and then to a default page
    return (
        checkAuthUser() ?
            <Route {...rest} render={props => (
                <ProtectedLayoutContainer {...props}>
                    <Component {...props} />
                </ProtectedLayoutContainer>
            )}/> :
            <Redirect to={routes.LOGIN.path}/>
    )
};
ProtectedRoute.propTypes = {
    component: PropTypes.any
};
export default ProtectedRoute;