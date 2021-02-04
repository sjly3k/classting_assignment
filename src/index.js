import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore, compose} from "redux";
import "react-datetime/css/react-datetime.css";

import firebase from 'firebase/app';
import {
    ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import fbConfig from './config/fbConfig';
import {Provider} from "react-redux";

import App from './App';
import rootReducer from './store/modules';
import GlobalStyle from "./styles/globalStyles";

const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, compose(applyMiddleware(thunk), devTools));

const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle/>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App />
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.Fragment>,
  document.getElementById('root')
);

