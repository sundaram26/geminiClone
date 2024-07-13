import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase';
import './SignIn.css'
import { doc, setDoc } from "firebase/firestore";

const SignIn = ({ setHasAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then(async(result) => {
        const user = result.user
        if(user){
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo:user.photoURL,
            lastName: "",
          })
        }
      })
      
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className='signinContainer'>
      <div className='signinContainer__box'>
        <div className='signinContainer__box__inner'>
          <h1>Sign In</h1>
          <form className='signinContainer__box__form' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={email}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={password}
            />
            <button type='submit'>Sign In</button>
            {error && <p>{errorMessage}</p>}
          </form>
          <button onClick={handleGoogleSignIn} className='googleSignUpButton'>Sign In with Google</button>
          <div className='signinContainer__box__signup'>
            <p>
              Don't have an account? <button onClick={() => setHasAccount(false)}>Sign Up</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
