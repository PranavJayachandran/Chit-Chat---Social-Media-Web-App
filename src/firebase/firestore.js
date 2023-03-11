import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3XSb7ECCSMTyFaCM5LCN-DtvJHLRVFPc",
    authDomain: "care-stack.firebaseapp.com",
    projectId: "care-stack",
    storageBucket: "care-stack.appspot.com",
    messagingSenderId: "337467957976",
    appId: "1:337467957976:web:0f2017c999b6b8db00adad",
    measurementId: "G-R1FTZFEW5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
export const storage = getStorage(app);


// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyD3XSb7ECCSMTyFaCM5LCN-DtvJHLRVFPc",
//     authDomain: "care-stack.firebaseapp.com",
//     projectId: "care-stack",
//     storageBucket: "care-stack.appspot.com",
//     messagingSenderId: "337467957976",
//     appId: "1:337467957976:web:0f2017c999b6b8db00adad",
//     measurementId: "G-R1FTZFEW5C"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const db = getFirestore(app)
// export const auth = getAuth();
// export const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });


