import React from 'react';
import {withAuth} from '../components/Auth';

const Page404 = () => (<div>Page not found</div>);


export default withAuth(Page404);