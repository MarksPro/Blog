import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBp4NDdfUS3rBWMnJvzf11LfIZmMSUfL1k",
  authDomain: "reactapp-5fdcd.firebaseapp.com",
  databaseURL: "https://reactapp-5fdcd.firebaseio.com",
  projectId: "reactapp-5fdcd",
  storageBucket: "",
  messagingSenderId: "202177927328",
  appId: "1:202177927328:web:650656e766cdce84"
};

class Firebase {
 constructor(){
  // Initialize Firebase
  app.initializeApp(firebaseConfig);
  this.app = app.database();
 };

 registerUser = async (nome, email, password) => {
   await app.auth().createUserWithEmailAndPassword(email, password);
   const uid = app.auth().currentUser.uid;
   return app.database().ref('usuarios').child(uid).set({nome});
 };

 login = (email, password) => {
   return app.auth().signInWithEmailAndPassword(email, password);
 };

 logout = () => {
   return app.auth().signOut();
 }

 isConnect = () => {
   return new Promise(resolve => {
    app.auth().onAuthStateChanged(resolve);
   });
 };

 getCurrentUser = () => {
   return app.auth().currentUser && app.auth().currentUser.email;
 }

  getUserName = async (callback) => {
  if(!app.auth().currentUser){
    return null;
  }
  const uid = app.auth().currentUser.uid;
  await app.database().ref('usuarios').child(uid)
  .once('value').then(callback); 
 }
}
export default new Firebase();