import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnProfile } from '../features/profileService';

function NavBar() {
  const [username, setUsername] = useState('');
  const [imageBuffer, setImageBuffer] = useState<any>(null);
  const [image64, setImage64] = useState('');
  const navigate = useNavigate();

  function changePass() {
    navigate('/change-profile');
  }

  function _arrayBufferToBase64( buffer: ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOwnProfile();
      if (!result.error && result.user) {
        setUsername(result.user.username);
        setImageBuffer(result.user.image.data);
      } 
    };
    fetchData();
  }, [username]);

  useEffect(() => {
    if (imageBuffer) setImage64(_arrayBufferToBase64(imageBuffer));
  }, [image64, imageBuffer]);

  return (
    <div className='py-2 px-4 fixed w-full max-w-md top-0 inset-x-0 mx-auto bg-[#FFF]'>
      <div onClick={changePass} className='cursor-pointer absolute flex gap-2 right-0'>
        <div></div>
        <p className='font-medium text-xl my-auto'>{username}</p>
        <img className='w-12 h-12 rounded-full' src={image64 ? `data:image/png;base64,${image64}` : 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/08/11/1722136995.jpg'} alt="" />
      </div>
      <img onClick={() => navigate('/')} className="w-36" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt="" />
    </div>
  )
}

export default NavBar;
