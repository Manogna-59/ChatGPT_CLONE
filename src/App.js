import React from 'react';
import gptLogo from './assets/chatgpt.svg';
import './App.css';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import {sendMsgToOpenAI} from './openai';
import { useState } from 'react';
import { useRef } from 'react';
 import { useEffect } from 'react';

function App() {
  const msgEnd=useRef(null);
  const [input,setInput]= useState("");
  const [messages,setMessages]=useState([
    {
    text:"Hello! I'm ChatGPT, an AI language model created by OpenAI. I'm here to help answer your questions, provide information, and assist you with various tasks using natural language processing. Feel free to ask me anything!",
    isBot:true,
  }
]);
useEffect(()=>{
  msgEnd.current.scrollIntoView();
},[messages]);
  const handleSend=async () => {
    // const res=await sendMsgToOpenAI(input);
    //   console.log(res);
    try {
      const text=input;
      setInput(' ');
      setMessages([
        ...messages,
        {text,isBot: true}
      ])
      const res = await sendMsgToOpenAI(input);
      // console.log(res);
      setMessages([...messages,
      {text,isBot: false},
      {text:res,isBot: true}
    ]);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate-limiting error
        console.error('API rate limit exceeded. Please try again later.');
      } else {
        // Handle other errors
        console.error('Error from OpenAI API:', error.message);
      }
  }
}

const handleEnter=async (e)=>{
  if(e.key==='Enter') await handleSend();
}
const handleQuery= async (e)=>{
  const text=e.target.value;
      setInput(' ');
      setMessages([
        ...messages,
        {text,isBot: true}
      ])
      const res = await sendMsgToOpenAI(input);
      // console.log(res);
      setMessages([...messages,
      {text,isBot: false},
      {text:res,isBot: true}
    ]);
}
  return (
    <div className="App">
      <div className="sideBar">  
      <div className="upperSide">
        <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo"/><span className="brand">ChatGPT</span></div>
        <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
        
        <div className="upperSideBottom">
          <button className="query" onClick={handleQuery} value={"What is programming ?"}><img src={msgIcon} alt="Query" />What is programming ?</button>
          <button className="query" onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt="Query" />How to use an API ?</button>
        </div>                       
        </div>
      
      <div className="lowerSide"></div>
      <div className="listItems"> <img src={home} alt="Home" className="listItemsImg"
      />Home</div>
      <div className="listItems"> <img src={saved} alt="Saved" className="listItemsImg"
      />Saved</div>
      <div className="listItems"> <img src={rocket} alt="Upgrade" className="listItemsImg"
      />Upgrade to Pro</div>
      </div>
      <div className="main">
        <div className="chats">
            {/* <div className="chat"><img className='chatImg' src={userIcon} alt="" /><p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat doloribus unde eligendi soluta possimus neque cumque excepturi. Dolorem itaque culpa consequatur quae deserunt voluptas, harum ex
            ercitationem ratione iure similique fugit.</p>
  </div> 
             <div className="chat bot"><img className='chatImg' src={gptImgLogo} alt="" /><p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius, provident magni autem eos animi. Distinctio sint possimus ex praesentium nam autem tenetur officiis! Deleniti similique eveniet enim a, architecto et vero, 
            neque distinctio cumque tempora rem illo perferendis tempore unde maiores provident facilis temporibus ipsum repudiandae ut. Optio aperiam sim
            ilique ex quas distinctio ratione dignissimos quibusdam, p
            ariatur deleniti suscipit laudantium accusantium, c
            umque, eos accusamus sunt magni explicabo sit ad aliquam? Blanditiis quos 
            voluptatum omnis eveniet nulla aut velit delectus? Dolores ratione, iusto dic
            ta debitis veritatis exercitationem sapiente tenetur ducimus facilis minima iure quo
            s doloribus. Possimus assumenda at nulla eius.</p>
            </div> */}
            {messages.map((message,i)=>
              <div key={i} className={message.isBot?"chat bot":"chat"}><img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
              </div>

            )}
            <div ref={msgEnd}/>
            </div>
           
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a message'
              value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}
             /><button className="send" 
              onClick={handleSend}
             ><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>© 2024 ChatGPT. All rights reserved. | Powered by OpenAI</p>
        </div>
      </div>
    </div>
  );
}

export default App;
