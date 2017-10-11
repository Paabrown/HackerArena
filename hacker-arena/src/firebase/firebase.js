import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBh-fU3BoBvdgOvCjzDb8Gql86RlWwsfxU",
    authDomain: "hacker-arena.firebaseapp.com",
    databaseURL: "https://hacker-arena.firebaseio.com",
    projectId: "hacker-arena",
    storageBucket: "",
    messagingSenderId: "194372044318"
};
const fire = firebase.initializeApp(config);

export default fire;