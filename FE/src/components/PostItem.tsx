import React, { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import profileStranger from '../assets/image/profile-stranger.jpg';
import { deletePostService } from '../features/deletePostService';
import { getProfileServiceById } from '../features/getProfileService';
import { getOwnProfile } from '../features/profileService';
import { PostType } from './PostList';

function PostItem({ id, caption, image, user_id }: PostType) {
  const [username, setUsername] = useState('');
  const [myUsername, setMyUsername] = useState('');
  
  const image64 = _arrayBufferToBase64(image.data)

  function _arrayBufferToBase64( buffer: ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  function deletePost() {
    deletePostService(id).then(() => {
      window.location.reload();
    }) ;
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfileServiceById(user_id);
      if (!result.error) setUsername(result.user.username);
    }
    fetchData();
  }, [user_id])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOwnProfile();
      if (!result.error && result.user) setMyUsername(result.user.username);
    };
    fetchData();
  }, [myUsername]);

  return (
    <div className='mb-4'>
      <div className='border-x-[1px] border-t-[1px] rounded-lg rounded-b-none px-4 py-2 flex gap-2'>
        <img className='object-cover w-12 h-12 rounded-full' src={profileStranger} alt="" referrerPolicy='no-referrer' />
        <p className='my-auto text-sm'>{username}</p>
        { myUsername === username && <p onClick={deletePost} className='text-[#EA4335] font-medium ml-auto my-auto'>Delete</p>}
      </div>
      <img className='object-cover' src={`data:image/png;base64,${image64}`} alt="" referrerPolicy='no-referrer' />
      <div className="cursor-pointer w-fit flex gap-4 mt-2 ml-2">
        <FaRegComment className='text-2xl' />
        <p className='text-sm font-medium my-auto'>Send a Comment...</p>
      </div>
      <div className='px-2 mt-2'>
        <p className='text-sm text-justify font-thin'>{caption}</p>
      </div>
    </div>
  )
}

export default PostItem