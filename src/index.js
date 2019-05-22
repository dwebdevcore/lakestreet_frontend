import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import {logInSuccess} from "./redux/actions/actionCreators";
import {checkAuthUser} from './helpers/auth';

//Used only to handle Auth user with a redux flow, e.g. in Header
let authUser = checkAuthUser();
if (authUser) {
    store.dispatch(logInSuccess(authUser));
}

ReactDOM.render(
    <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
