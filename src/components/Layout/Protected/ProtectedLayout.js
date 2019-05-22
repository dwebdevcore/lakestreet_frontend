import React from 'react';
import PropTypes from 'prop-types';

import {HeaderContainer} from "./Header";
import {SideNav} from "./SideNav";
import {Main} from "./Main";
import {NavBar} from "./NavBar";
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import routes from '../../../config/routes';
import {classNames} from "../../../helpers/format";

const styles = theme => ({
    root: {
        padding: `14px 18px`
    },
    main: {
        width: '100%',
        maxWidth: theme.contentContainerMaxWidth,
        boxSizing: 'border-box',
    },
    themeSelectPage: {
        maxWidth: 770
    },
    homePage: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 'initial'
    }
});
const ProtectedLayout = ({children, classes, match, history}) => {
    let mainClasses = [classes.main];
    let isHome = false;
    if (match.path === routes.CUSTOMIZE_HOME_PAGE.path) {
        mainClasses.push(classes.themeSelectPage);
    }
    if (match.path === '/' || match.path === '') {
        mainClasses.push(classes.homePage);
        isHome = true;
    }

    return (
        <div className={classes.root}>
            <HeaderContainer/>
            {!isHome && <NavBar history={history}/>}
            <Main>
                {!!match.params.id && <SideNav/>}
                <div className={classNames(mainClasses)}>
                    {children}
                </div>
            </Main>
        </div>
    )
};
ProtectedLayout.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.any
};
export default withRouter(withStyles(styles)(ProtectedLayout));
