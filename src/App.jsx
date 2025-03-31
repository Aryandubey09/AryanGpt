import React, { useContext, useState } from 'react';
import gptLogo from './assets/chatgptLogo.svg';
import './App.css';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user_icon.png';
import gptImgLogo from './assets/chatgptLogo.svg'; 
import { Context } from './context/context';

function App() {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput,prevPrompt,setRecentPrompt, input ,newChat} = useContext(Context);

    const [extended ,setExtended] = useState(false)

    // const loadPrompt = async(prompt)=>{
    //   setRecentPrompt(prompt)
    //   await onSent(prompt)
    // }
   

    return (
        <div className="App">
            <div className="sideBar">
                <div className="upperSide">
                    <div className="upperSideTop">
                        <img onClick={()=>setExtended(prev=>!prev)} src={gptLogo} alt="Logo" className="logo" />
                        <span className="brand">AryanGpt</span>
                    </div>
                    <button onClick={()=>newChat()} className="midBtn">
                        <img src={addBtn} alt="new chat" className="addBtn" />
                        New Chat
                    </button>
                    <div className="upperSideBottom">
                       {prevPrompt.map((item,index)=>{
                        return(
                          <button  onClick ={()=>loadPrompt(item)}   className="query">
                          <img src={msgIcon} alt="query" />
                          {item.slice(0,18)}...
                      </button>
                    
                        )
                       })}
                    </div>
                </div>
                <div className="lowerSide">
                    <div className="listItems">
                        <img src={home} alt="" className="listItemsImg" />
                        Home
                    </div>
                    <div className="listItems">
                        <img src={saved} alt="" className="listItemsImg" />
                        Saved
                    </div>
                    <div className="listItems">
                        <img src={rocket} alt="" className="listItemsImg" />
                        Upgrade to Pro
                    </div>
                </div>
            </div>
            <div className="main">


       {!showResult?
       <>
        
        <div className="chats">
                    <div className="chat">
                        <img className="chatImg" src={userIcon} alt="" />
                        <h2 className="txt1">
                            User✨
                        </h2>
                    </div>
                    <div className="chat bot">
                        <img className="chatImg" src={gptImgLogo} alt="" />
                        <p className="txt">
                        Hey <span className="cutie">cutie! 💖</span>

I'm AryanGPT, your new friend and trusty companion.., share your thoughts... 

Feel free to reach out—I'm here for you! 😊

                        </p>
                    </div>
                </div>
       
       </>
       :<div className="result">
           
           <div className="result-title">
            <img src={userIcon} alt="" />
            <p>{recentPrompt}</p>
           </div>

           <div className="result-data">
            <img src={gptImgLogo} alt="" />

{loading
?<div className="loader">
<hr/>
<hr/>
<hr/>
</div>
:<p dangerouslySetInnerHTML={{__html:resultData}} ></p>
}

            
           </div>


       </div>
       
      }


                
                <div className="chatFooter">
                    <div className="inp">
                        <input type="text" placeholder="Write something..." value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className="send" onClick={onSent}>
                            <img src={sendBtn} alt="" />
                        </button>
                    </div>
                    <p className="p">ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 version.</p>
                </div>
            </div>
        </div>
    );
}

export default App;
