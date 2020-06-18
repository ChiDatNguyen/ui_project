import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB9PMWJ52ylPRfGgBqFJXm3mOE8Xyjzq4k",
    authDomain: "uiproject-20816.firebaseapp.com",
    databaseURL: "https://uiproject-20816.firebaseio.com",
    projectId: "uiproject-20816",
    storageBucket: "uiproject-20816.appspot.com",
    messagingSenderId: "285115613401",
    appId: "1:285115613401:web:e681108e6d0b976cf9fec8",
    measurementId: "G-XYXZ9RDKP2"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
var database = firebase.database();