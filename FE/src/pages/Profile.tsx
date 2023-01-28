import React from 'react'
import ChangePassword from '../components/ChangePassword'
import ChangeProfile from '../components/ChangeProfileImage'
import NavBar from '../components/NavBar'

function Profile() {
  return (
    <div>
      <NavBar />
      <div className='mb-[68px]'/>
      <ChangeProfile />
      <div className='max-w-md mx-auto h-[1px] mt-5 bg-[#DADDF2]' />
      <ChangePassword />
    </div>
  )
}

export default Profile