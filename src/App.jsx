import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './components/auth/firebase';
import SignUp from './components/auth/SingUp'
import SignIn from './components/auth/SignIn'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

const App = () => {
  const [user, setUser] = useState(null);
  const [hasAccount, setHasAccount] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      
      <>
        <Sidebar /> 
        <Main />
      </>
    );
  }

  return (
    <div>
      {hasAccount ? (
        <SignIn setHasAccount={setHasAccount} />
      ) : (
        <SignUp setHasAccount={setHasAccount} />
      )}
    </div>
  );
};

export default App;
