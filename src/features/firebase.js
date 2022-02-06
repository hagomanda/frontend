import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDa3GoIg-tzqEEJlPIDZ9UQa1DBYZ7tQbw",
  authDomain: "dogs-e4f84.firebaseapp.com",
  projectId: "dogs-e4f84",
  storageBucket: "dogs-e4f84.appspot.com",
  messagingSenderId: "3523368992",
  appId: "1:3523368992:web:908633e34aea5932df8445"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
