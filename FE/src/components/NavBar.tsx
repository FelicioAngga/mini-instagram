import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnProfile } from '../features/profileService';

function NavBar() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function changePass() {
    navigate('/change-password');
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOwnProfile();
      if (!result.error && result.user) setUsername(result.user.username);
    };
    fetchData();
  }, [username]);

  return (
    <div className='py-2 px-4 fixed w-full max-w-md top-0 inset-x-0 mx-auto bg-[#FFF]'>
      <div onClick={changePass} className='cursor-pointer absolute flex gap-2 right-0'>
        <div></div>
        <p className='font-medium text-xl my-auto'>{username}</p>
        <img className='w-12 h-12 rounded-full' src='https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/08/11/1722136995.jpg' alt="" />
      </div>
      <img onClick={() => navigate('/')} className="w-36" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt="" />
    </div>
  )
}

export default NavBar;
