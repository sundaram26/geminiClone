import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import './SignUp.css'

const SignUp = ({ setHasAccount }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fname") setFname(value);
    if (name === "lname") setLname(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo:""
        })
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then(async(result) => {
        const user = result.user;
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
    <div className='signupContainer'>
      <div className='signupContainer__box'>
        <div className='signupContainer__box__inner'>
          <h1>Sign Up</h1>
          <form className='signupContainer__box__form' onSubmit={handleSubmit}>
            <input 
              type="name"
              placeholder="First Name"
              onChange={handleChange}
              name="fname"
              value={fname}
            />
            <input 
              type="name"
              placeholder="Last Name"
              onChange={handleChange}
              name="lname"
              value={lname}
            />
            <input
              type='email'
              placeholder='Email'
              onChange={handleChange}
              name='email'
              value={email}
            />
            <input
              type='password'
              placeholder='Password'
              onChange={handleChange}
              name='password'
              value={password}
            />
            <button type='submit'>Sign Up</button>
            {error && <p>{errorMessage}</p>}
          </form>
          <button onClick={handleGoogleSignUp} className='googleSignUpButton'>Sign Up with Google</button>
          <div className='signupContainer__box__login'>
            <p>
              Already have an account? <button onClick={() => setHasAccount(true)}>Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
