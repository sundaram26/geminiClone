import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

function Sidebar() {

  const [extented, setExtented] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    onSent(prompt)
  }

  const handleExtented = function(){
    setExtented(!extented)
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={handleExtented} className='menu' src={assets.menu_icon} alt="" />
        <div onClick={() =>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extented ? <p>New Chat</p> : null}
        </div>
        {extented 
        ? <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className='recent-entry'>
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
            
          </div> 
        : null}
      </div>
      <div className="bottom">
        <div className={`${extented ? 'bottom-item-extended' : 'bottom-item'} recent-entry`}>
          <img src={assets.question_icon} alt="" />
          {extented ? <p>Help</p> : null}
        </div>
        <div className={`${extented ? 'bottom-item-extended' : 'bottom-item'} recent-entry`}>
          <img src={assets.history_icon} alt="" />
          {extented ? <p>Activity</p> : null}
        </div>
        <div className={`${extented ? 'bottom-item-extended' : 'bottom-item'} recent-entry`}>
          <img src={assets.setting_icon} alt="" />
          {extented ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
