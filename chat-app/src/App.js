import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

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

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
      
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}> Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>

  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  return (<>
    <div>
    
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

      <button type="submit">🕊️</button>

    </form>
    </>)
}

function ChatMessage(props) {
  const { text, uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

 return (
   <div className={`message ${messageClass}`}>
     <img src={photoURL} />
 <p>{text}</p>
 </div>

 ) 
}



export default App;
