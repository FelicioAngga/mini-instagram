import React from 'react'
import ChangePassword from '../components/ChangePassword'
import ChangeProfile from '../components/ChangeProfileImage'
import NavBar from '../components/NavBar'
import { BsFillChatFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className='mb-[68px]'/>
      <ChangeProfile />
      <div className='max-w-md mx-auto h-[1px] mt-5 bg-[#DADDF2]' />
      <ChangePassword />

      <div onClick={() => navigate("/chat")} className='mt-10 flex gap-3 max-w-md w-fit mx-auto border p-3 rounded-xl cursor-pointer'>
        <p className="font-medium my-auto">Chat with our support bot</p>
        <BsFillChatFill className='text-2xl my-auto' />
      </div>
    </div>
  )
}

export default Profile