import React, { useContext, useEffect, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import parse from 'html-react-parser'
import { auth, db } from '../auth/firebase'
import { doc, getDoc } from 'firebase/firestore'

function Main() {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
    const [userDetails, setUserDetails] = useState('')

    const fetchUserData = async()=>{
        auth.onAuthStateChanged(async(user) => {
            const docRef = doc(db, "Users", user.uid);
            const docSnap =await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data())
            }
        })
    }
    useEffect(() => {
        fetchUserData();
    }, []);

    const send = function(){
        onSent();
    }

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={userDetails.photo ? userDetails.photo : assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult
        ?<>
            <div className="greet">
                <p><span>Hello, {userDetails.firstName}.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
        </>
        : <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    : 
                    <p>{parse(resultData)}</p>
                }
                {/* <p dangerouslySetInnerHTML={{__html:resultData}}></p> */}
            </div>
        </div>
        }
        
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter the prompt here...' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    {input ? <img onClick={send} src={assets.send_icon} alt="" /> : null}
                </div>
            </div>
            <p className='bottom-info'>
                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
