import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
	apiKey: "AIzaSyBMgrVjLHweTMtB-wEjqDp_kztqUyla0jg",
	authDomain: "classting-assignment.firebaseapp.com",
	projectId: "classting-assignment",
	storageBucket: "classting-assignment.appspot.com",
	messagingSenderId: "531248018603",
	appId: "1:531248018603:web:85a4a7bcc512c31ca233ee",
	measurementId: "G-8F1V2NM9JB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase