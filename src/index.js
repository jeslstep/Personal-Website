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
    console.log('in getProjectsSaga');
    try {
        const response = yield call (axios.get, '/projects');
        yield put({ type: 'SET_PROJECTS', payload: response.data });
    }
    catch(error) {
        console.log('error in getProjectsSaga with get request', error);
    }
}

// saga to get tags from server
function* getTagsSaga (action) {
    console.log('in getTagsSaga');
    try {
        const response = yield call (axios.get, '/tags');
        yield put({ type: 'SET_TAGS', payload: response.data });
    }
    catch(error) {
        console.log('error in getTagsSaga with get request', error);
    }
}

// saga to get resume firebase_link from server
function* getResumeSaga (action) {
    console.log('in getResumeSaga');
    try {
        const response = yield call (axios.get, '/resume');
        yield put({ type: 'SET_RESUME', payload: response.data });
    }
    catch(error) {
        console.log('error in getResumeSaga with get request', error);
    }
}

// saga to deletes projects from server
function* deleteProjectSaga (action) {
    console.log('in deleteProjectSaga, deleting project id:', action.payload);
    const projectid = action.payload
    try {
        yield call( axios.delete, `/projects/delete/${projectid}` );
        // get projects after deleting 
        yield put({ type: 'GET_PROJECTS' });
    }
    catch(error) {
        console.log('error in deleteProjectSaga with delete request', error);
    }
}

// saga to send project information to server
function* addProjectsSaga (action) {
    console.log('in addProjectsSaga, adding project:', action.payload);
    try {
        yield call(axios.post, '/projects', action.payload);
        // get newly added projects
        yield put({ type: 'GET_PROJECTS' });
    } catch (error) {
        console.log('error in addProjectsSaga with element post request', error);
    }
}

// saga to send new tech tag information to server
function* addTagsSaga(action) {
    console.log('in addTagsSaga, adding a new tech tag:', action.payload);
    let name = [action.payload];
    try {
        yield call(axios.post, '/tags', name);
        // get newly added tags
        yield put({ type: 'GET_TAGS' });
    } catch (error) {
        console.log('error in addTagsSaga with element post request', error);
    }
}

// addResumeSaga to send resume firebase_link to server
function* addResumeSaga(action) {
     console.log('in addResumeSaga, sending firebase_link:', action.payload);
       let link = [action.payload];
    try {
        yield call(axios.post, '/resume', link);
        // get newly added tags
        yield put({ type: 'GET_RESUME' });
    } catch (error) {
        console.log('error with element post request', error);
    }
}

// Create the rootSaga generator function
function* rootSaga() {
     yield takeEvery('GET_PROJECTS', getProjectsSaga);
     yield takeEvery('GET_TAGS', getTagsSaga);
     yield takeEvery('GET_RESUME', getResumeSaga);
     yield takeEvery('ADD_TAGS', addTagsSaga);
     yield takeEvery('ADD_RESUME', addResumeSaga);
     yield takeEvery('DELETE_PROJECT', deleteProjectSaga);
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

// Used to store resume firebase_link returned from the server
const resume = (state = [], action) => {
    switch (action.type) {
        case 'SET_RESUME':
            return action.payload;
        default:
            return state;
    }
}


// Used to store the project tags from database 
// (e.g. 'React', 'jQuery', 'Angular', 'Node.js') from the server
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
        resume,
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
