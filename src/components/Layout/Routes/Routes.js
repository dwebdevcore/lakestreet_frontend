import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {PublicRoute} from '../Public';
import routes from '../../../config/routes';

import Home from '../../../pages/HomeContainer';
import LoginContainer from '../../../pages/LoginContainer';
import SiteMetaContainer from '../../../pages/SiteMetaContainer';
import PracticeMetaContainer from '../../../pages/PracticeMetaContainer';
import DoctorAssignmentContainer from '../../../pages/DoctorAssignmentContainer';
import AboutYourDentistContainer from '../../../pages/AboutYourDentistContainer';
import AboutYourTeamContainer from '../../../pages/AboutYourTeamContainer';
import ServicesContainer from '../../../pages/ServicesContainer';
import DoctorsChairContainer from '../../../pages/DoctorsChairContainer';
import PromotionsContainer from '../../../pages/PromotionsContainer';
import CustomizeHomeContainer from '../../../pages/CustomizeHomeContainer';
import Page404 from '../../../pages/Page404';

const Routes = () =>
    <Switch>

        <Route path="/" exact component={Home}/>
        <Route path={routes.HOME_PAGE.path} exact component={Home}/>

        <PublicRoute path={routes.LOGIN.path} exact component={LoginContainer}/>

        <Route path={routes.CUSTOMIZE_HOME_PAGE.path} exact component={CustomizeHomeContainer}/>
        <Route path={`${routes.CUSTOMIZE_HOME_PAGE.path}/:id`} component={CustomizeHomeContainer}/>

        <Route path={routes.SITE_META.path} exact component={SiteMetaContainer}/>
        <Route path={`${routes.SITE_META.path}/:id`} component={SiteMetaContainer}/>

        <Route path={routes.PRACTICE_META.path} exact component={PracticeMetaContainer}/>
        <Route path={`${routes.PRACTICE_META.path}/:id`} component={PracticeMetaContainer}/>

        <Route path={routes.DOCTOR_ASSIGNMENT.path} exact component={DoctorAssignmentContainer}/>
        <Route path={`${routes.DOCTOR_ASSIGNMENT.path}/:id`} component={DoctorAssignmentContainer}/>

        <Route path={routes.ABOUT_YOUR_DENTIST.path} exact component={AboutYourDentistContainer}/>
        <Route path={`${routes.ABOUT_YOUR_DENTIST.path}/:id`} component={AboutYourDentistContainer}/>

        <Route path={routes.ABOUT_YOUR_TEAM.path} exact component={AboutYourTeamContainer}/>
        <Route path={`${routes.ABOUT_YOUR_TEAM.path}/:id`} component={AboutYourTeamContainer}/>

        <Route path={routes.SERVICES.path} exact component={ServicesContainer}/>
        <Route path={`${routes.SERVICES.path}/:id`} component={ServicesContainer}/>

        <Route path={routes.DOCTORS_CHAIR.path} exact component={DoctorsChairContainer}/>
        <Route path={`${routes.DOCTORS_CHAIR.path}/:id`} exact component={DoctorsChairContainer}/>
        <Route path={`${routes.DOCTORS_CHAIR.path}/:taxonomyId/:id`} component={DoctorsChairContainer}/>

        <Route path={routes.PROMOTIONS.path} exact component={PromotionsContainer}/>
        <Route path={`${routes.PROMOTIONS.path}/:id`} component={PromotionsContainer}/>

        <Route path='/' component={Page404}/>
    </Switch>;
export default Routes;