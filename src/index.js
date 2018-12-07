import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows the use of redux within a react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// saga to get projects from server
function* getProjectsSaga (action) {
    console.log('in getProjectsSaga', action.payload);
    try {
        const response = yield call (axios.get, '/projects', {projects: action.payload});
        yield put( { type: 'SET_PROJECTS', payload: response.data} );
    }
    catch(error) {
        console.log('error with get request', error);
    }
}

// saga to get tags from server
function* getTagsSaga (action) {
    console.log('in getTagsSaga', action.payload);
    try {
        const response = yield call (axios.get, '/projects/tags', {projects: action.payload});
        yield put( { type: 'SET_TAGS', payload: response.data} );
    }
    catch(error) {
        console.log('error with get request', error);
    }
}

// saga to deletes projects from server
function* deleteProjectSaga (action) {
    console.log('in projectsSaga', action.payload);
    const projectid = action.payload
    try {
        yield call(axios.delete, `/projects/delete/${projectid}` );
        yield put( { type: 'GET_PROJECTS' } );
    }
    catch(error) {
        console.log('error with get request', error);
    }
}

// saga to send project information to server
function* addProjectsSaga (action) {
    console.log('in second saga');
    // standred js way to handle errors
    try {
        yield call(axios.post, '/projects', action.payload);
        yield put({type: 'GET_PROJECTS'});
    } catch (error) {
        console.log('error with element post request', error);
    }
}

// Create the rootSaga generator function
function* rootSaga() {
     yield takeEvery('GET_PROJECTS', getProjectsSaga);
     yield takeEvery('GET_TAGS', getTagsSaga)
     yield takeEvery('DELETE_PROJECT', deleteProjectSaga)
     yield takeEvery('ADD_PROJECT', addProjectsSaga);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store projects returned from the server
const projects = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return action.payload;
        default:
            return state;
    }
}


// Used to store the project tags (e.g. 'React', 'jQuery', 'Angular', 'Node.js')
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        projects,
        tags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
