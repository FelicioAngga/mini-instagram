import React, { useEffect, useState } from 'react'
import { getAllPostService } from '../features/getAllPostService';
import PostItem from './PostItem';
import noPost from '../assets/image/no-post.png';

function PostList() {
  const [postList, setPostList] = useState<Array<PostType>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllPostService();
      if (!result.error) setPostList(result.posts);
    }
    fetchData();
  }, []);

  if (postList.length === 0) {
    return (
      <div className='mt-2'>
        <img className='mx-auto w-80' src={noPost} alt="" />
        <p className='font-medium text-center'>Masih belum terdapat post</p>
        <p className='font-medium text-center'>Silahkan tambahkan post</p>
      </div>
    )
  }

  return (
    <div className='mt-2'>
      {postList.map((post, index) => <PostItem {...post} key={index} />)}
    </div>
  )
}

export type PostType = {
  id: string,
  caption: string,
  image: any,
  user_id: number,
}

export default PostList