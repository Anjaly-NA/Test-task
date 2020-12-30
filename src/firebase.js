import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Ie918eDFKCus2bbBqicVXVUnR4Ih-kk",
  authDomain: "testproject-5c3fd.firebaseapp.com",
  projectId: "testproject-5c3fd",
  storageBucket: "testproject-5c3fd.appspot.com",
  messagingSenderId: "854663840169",
  appId: "1:854663840169:web:5c29535fa95583c5f084b8",
  measurementId: "G-9RYWCQKJKQ",
};

firebase.initializeApp(firebaseConfig);
class Firebase {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }
  async uploadImage(fileName, file) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(fileName);
    await fileRef.put(file);
    return await fileRef.getDownloadURL();
  }
  //adding event details to the firebase
  addEvents(title, description, date, fileUrl) {
    if (this.auth.currentUser && this.auth.currentUser.uid !== null) {
      var userId = this.auth.currentUser.uid;
    }
    const eventRef = firebase.database().ref("Event/" + userId);
    const event = {
      title,
      description,
      date,
      file: fileUrl,
    };
    eventRef.push(event);
  }
  updateEvent(title, description, date, fileUrl, eventId) {
    if (this.auth.currentUser && this.auth.currentUser.uid !== null) {
      var userId = this.auth.currentUser.uid;
    }
    const eventRef = firebase.database().ref("Event/" + userId);
    eventRef.child(eventId).update({ title, description, date, file: fileUrl });
  }

  deleteEvent = (eventId) => {
    if (this.auth.currentUser && this.auth.currentUser.uid !== null) {
      var userId = this.auth.currentUser.uid;
    }
    const eventRef = firebase.database().ref("Event/" + userId);
    eventRef.child(eventId).remove();
  };

  searchEvent = (title) => {
    if (this.auth.currentUser && this.auth.currentUser.uid !== null) {
      var userId = this.auth.currentUser.uid;
      return firebase
        .database()
        .ref("Event/" + userId)
        .orderByChild("title")
        .equalTo(title);
    }
  };
  async editEvent(eventId) {
    var userId = this.auth.currentUser.uid;
    const response = await firebase
      .database()
      .ref("/Event/" + userId + "/" + eventId);
    return response;
  }
  //retrieve event details
  getEvents() {
    //if user is logged in show users' event
    if (this.auth.currentUser && this.auth.currentUser.uid !== null) {
      var userId = this.auth.currentUser.uid;
      return firebase.database().ref("/Event/" + userId);
    }
    //if user is not logged in show every event
    else {
      return firebase.database().ref("Event");
    }
  }
  //retrieve blogs data from firebase database
  getBlogs() {
    return firebase.database().ref("Blogs");
  }
  //login into application by authenticating user through firebase
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  //logout user
  logout() {
    return this.auth.signOut();
  }
  //register user with firefox with authentication
  async register(
    firstName,
    lastName,
    phoneNumber,
    acceptTerms,
    email,
    password
  ) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: firstName + " " + lastName,
      phoneNumber: phoneNumber,
      acceptTerms: acceptTerms,
      email: email,
      password: password,
    });
  }
  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  //get current username from firebase
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}
export default new Firebase();
