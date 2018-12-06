import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import createRootReducer from '../reducers'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import thunk from 'redux-thunk'
import auth from '../middleware'

import Director from './Director'

let history = createBrowserHistory()
let rootReducer = createRootReducer(history)
let router = routerMiddleware(history)
let enhancer = applyMiddleware(auth, thunk, router)

let store = createStore(rootReducer, enhancer)

export default class Site extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Director />
                </ConnectedRouter>
            </Provider>
        );
    }
}