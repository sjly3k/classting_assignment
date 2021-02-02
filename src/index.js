import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore, compose} from "redux";

import firebase from 'firebase/app';
import {
    ReactReduxFirebaseProvider,
    firebaseReducer,
} from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import fbConfig from './config/fbConfig';
import {Provider} from "react-redux";

import App from './App';
import rootReducer from './store/modules';

const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


const store = createStore(rootReducer, compose(applyMiddleware(thunk), devTools));

const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

console.log(store)

ReactDOM.render(
  <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

