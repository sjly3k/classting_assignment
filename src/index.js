import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";

import firebase from 'firebase/app';
import {
    ReactReduxFirebaseProvider,
    firebaseReducer,
} from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import fbConfig from './config/fbConfig';
import {Provider} from "react-redux";

import App from './App';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

