import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARsnED08tGiAs4atKRai4jHqoCZ0qGI8w",
  authDomain: "fileupload-111.firebaseapp.com",
  databaseURL: "https://fileupload-111.firebaseio.com",
  projectId: "fileupload-111",
  storageBucket: "fileupload-111.appspot.com",
  messagingSenderId: "896491270390",
  appId: "1:896491270390:web:5f40d81ef542fa9f29fcd7"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { firebase, storage };