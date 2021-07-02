import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAZN5o0SBtAj3mc9H2fMqBvc6TgTFGBxqo",
  authDomain: "react-chat-a33cd.firebaseapp.com",
  projectId: "react-chat-a33cd",
  storageBucket: "react-chat-a33cd.appspot.com",
  messagingSenderId: "16018689511",
  appId: "1:16018689511:web:3de256ab62e3d6ffc1c142"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      </header>
    </div>
  );
}

export default App;
