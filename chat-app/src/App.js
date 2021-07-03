import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import React, { useRef, useState } from 'react';

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
      <h1>⚛️🔥💬Chat</h1>
      <SignOut />
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
    <>
    <button className="sign-in" onClick={signInWithGoogle}> Sign in with Google</button>
    <h2>Violation of guidelines will result in a ban</h2>
    <h2>Created by: Ryan McDonald</h2>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button className ="sign-out" onClick={() => auth.signOut()}>Sign Out</button>

  )
}

function ChatRoom() {

  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {

    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
    })

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth' });

  }

  return (<>
    <main>
    
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message here" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
    </>)
}

function ChatMessage(props) {
  const { text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

 return (<>
   <div className={`message ${messageClass}`}>
     <img src={photoURL || 'https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?d=identicon'} />
 <p>{text}</p>
 </div>

 </>) 
}



export default App;
