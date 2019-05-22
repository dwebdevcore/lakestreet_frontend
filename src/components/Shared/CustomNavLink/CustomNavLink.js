import React from 'react';
import {NavLink} from 'react-router-dom';

export const CustomNavLink = props => <NavLink {...props} activeClassName={'active'}/>;