/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import IncomingChat from '../components/IncomingChat'
import OutgoingChat from '../components/OutgoingChat'
import { IoMdSend } from 'react-icons/io';

function Chat() {
  const [text, setText] = useState("");
  const [chatArray, setChatArray] = useState([<IncomingChat chat='Hi, How can i help you?' key={0} />]);
  const messagesEndRef = useRef<any>(null)

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && text) {
      handleSend();
    }
  }

  function handleSend() {
    
    fetch(`http://localhost:5000/response/${text}`).then(res => res.json()).then(data => {
      setChatArray((prev) => {
        return [...prev, <OutgoingChat chat={text} key={chatArray.length} />, <IncomingChat chat={data.msg} key={chatArray.length + 1} />]
      })
      setText("");
    })
  }
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [chatArray])

  return (
    <div className="max-w-md mx-auto">
      <NavBar />
      <div className='mb-[68px]'/>
      <p className='font-medium text-center text-2xl'>Support Chat</p>
      <div className="mt-2 py-2 px-3 border-2 rounded-xl h-[500px] overflow-y-scroll">
        {chatArray.map((element, i) => element)}
        <div ref={messagesEndRef} />
      </div>
      <div className="relative flex mt-3 border-gray-300 rounded-xl w-full">
        <input id="text" type="text" value={text} onKeyDown={handleEnter} onChange={(e) => setText(e.target.value)} className="border-gray-300 rounded-xl w-full h-11 pr-10" />
        <IoMdSend onClick={handleSend} className="absolute right-2 inset-y-0 m-auto text-2xl text-blue-500" />
      </div>
    </div>
  )
}

export default Chat