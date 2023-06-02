import React from 'react'

function OutgoingChat({ chat }: { chat: string }) {
  return (
    <div id="response" className="my-2 ml-auto px-3 py-2 w-fit rounded-3xl text-white bg-blue-500">
      {chat}
    </div>
  )
}

export default OutgoingChat