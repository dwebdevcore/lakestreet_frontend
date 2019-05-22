import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './themes';
import {Routes} from "./components/Layout/Routes";
import {ShackbarContainer} from "./components/Layout/Protected/Snackbar";
import {addIcons} from './helpers/fontAwesomeIcons';
addIcons();


class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Routes/>
                <ShackbarContainer/>
            </MuiThemeProvider>
        );
    }
}


//withRouter HOC used to prevent block render because of connect used
export default withRouter(App);

