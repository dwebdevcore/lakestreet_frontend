import rootSaga from './sagas';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import {createStore, compose, applyMiddleware} from 'redux';


const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware];


const composeEnhancers =
    process.env.NODE_ENV === 'development' ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(...middleware))
);

/** run saga watchers */
sagaMiddleware.run(rootSaga);

export default store;