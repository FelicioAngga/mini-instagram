import React, { useState, useEffect } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PostList from '../components/PostList';
import { isUserAuthed } from '../features/checkAuthService';
import { putAccessToken } from '../utils/api';

function HomePage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  function logout() {
    putAccessToken('');
    navigate('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await isUserAuthed()
      if (!result) navigate('/login');
      else setAuth(true);
    }
    fetchData();
  }, [navigate]);

  if (!auth) return null;

  return (
    <div className='mx-auto max-w-md'>
      <NavBar />
      <div className='mb-[68px]' />
      <PostList />

      <div onClick={logout} className='group transition-all duration-300 border p-2 rounded-xl fixed left-2 bottom-2 sm:left-10 sm:bottom-10 cursor-pointer hover:bg-[#000]'>
        <TbLogout className='transition-all duration-300 mx-auto text-4xl group-hover:text-[#FFF]' />
        <p className='transition-all duration-300 group-hover:text-[#FFF] hidden md:block'>Logout</p>
      </div>
      <div onClick={() => {navigate('/add-post')}} className='group transition-all duration-300 border p-2 rounded-xl fixed right-2 bottom-2 sm:right-10 sm:bottom-10 cursor-pointer hover:bg-[#000]'>
        <BsPlusSquareDotted className='transition-all duration-300 mx-auto text-4xl group-hover:text-[#FFF]' />
        <p className='transition-all duration-300 group-hover:text-[#FFF] hidden md:block'>Add a new post</p>
      </div>
    </div>
  )
}

export default HomePage;
