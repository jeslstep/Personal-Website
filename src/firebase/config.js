import firebase from 'firebase/app';
import 'firebase/storage';
import api_key from './api_key';

// Initialize Firebase
var config = {
    apiKey: api_key,
    authDomain: "personal-website-93452.firebaseapp.com",
    databaseURL: "https://personal-website-93452.firebaseio.com",
    projectId: "personal-website-93452",
    storageBucket: "",
    messagingSenderId: "659178451548"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default }
