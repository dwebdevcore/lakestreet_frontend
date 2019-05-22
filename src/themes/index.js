import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            //light: '#f05545',
            main: '#288cc6',
            //dark: '#7f0000',
        },
        secondary: {
            //light: '#757de8',
            main: '#c93e92',
            //dark: '#002984',
        },
        additional: {
            main: '#fcb331',
            dark: '#f7a81b',
            contrastText: '#000'
        }
    },
    typography: {
        fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif'
    },
    customBreakpoints: {
        lg: 1024,
        md: 720,
        sm: 540,
        xs: 361
    },
    color: {
        grey: {
            light: '#f5f5f5',
            main: '#6c6c6c',
            dark: '#4a4a4a'
        },
        green: {
            light: '#7ed321'
        },
        white: {
            main: '#fff',
        },
        sand: {
            main: '#e0d9c4'
        },
        stone: {
            main: '#f1f1f1'
        },
        purple: {
            main: '#c93e92'
        }
    },
    loginFormMaxWidth: 816,
    desktopMaxWith: 1400,
    contentContainerMaxWidth: 720,
    leftSideMaxWidth: 420,
    centralBlockMaxWidth: 540
});