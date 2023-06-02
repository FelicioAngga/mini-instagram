import React from 'react'
import { FaRobot } from 'react-icons/fa';

function IncomingChat({ chat }: { chat: string }) {
  return (
    <div className="flex gap-2">
      <FaRobot className="text-2xl mt-[14px]" />
      <div className="my-2 px-3 py-2 w-fit rounded-3xl bg-gray-100">
        {chat}
      </div>
    </div>
  )
}

export default IncomingChat