import { Textarea } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import { addPostService } from '../features/addPostService';

function AddPost() {
  const navigate = useNavigate();
  const inputFile = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [caption, setCaption] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const [selectedFileImage, setSelectedFileImage] = useState<Blob>();
  const [preview, setPreviewImage] = useState('');
  
  function uploadPhoto() {
    inputFile.current?.click();
  }

  function onCaptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCaption(e.currentTarget.value)
  }

  function onInputImageChange() {
    if (!inputFile.current?.files || inputFile.current?.files?.length === 0) {
      if (inputFile.current) inputFile.current.value = '';
      return;  
    }
    if (inputFile.current?.files[0].size > 1048576) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File kamu harus lebih kecil dari 1MB!',
        footer: '<a href="https://imagecompressor.com/" target="_blank">Kompres foto di website ini?</a>'
      })
      if (inputFile.current) inputFile.current.value = '';
      return;
    }
    setSelectedFileImage(inputFile.current?.files[0])
  }

  function createNewPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    if (selectedFileImage) formData.append('image', selectedFileImage);
    addPostService(formData).then(result => {
      if (!result.error) navigate('/');
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message,
        })
      }
    });
  }

  useEffect(() => {
    if (selectedFileImage) {
      const objUrl = URL.createObjectURL(selectedFileImage);
      setPreviewImage(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }
  }, [selectedFileImage])

  useEffect(() => {
    if (caption && preview) setBtnDisable(false);
    else setBtnDisable(true);
  }, [caption, preview])

  return (
    <>
      <NavBar />

      <div className='cursor-pointer mt-[68px] mx-auto max-w-md'>
        <form ref={formRef} onSubmit={(e) => createNewPost(e)}>
          <div onClick={uploadPhoto} className='flex flex-col justify-center border-2 w-full h-96'>
            {preview ? <img className='object-cover h-full' src={preview} alt="" /> : null}
            {!preview ? <p className='text-center'>Upload photo here</p> : null}
            <input ref={inputFile} onChange={onInputImageChange} type="file" name='image' className='hidden'  accept='image/*' />
          </div>
          <Textarea onChange={(e) => onCaptionChange(e)} maxLength={200} className='my-4 border-none bg-[#FFF]' placeholder="Write a caption..." required={true} rows={4}/>
          <button type='submit' disabled={btnDisable} className='w-full rounded-lg px-3 py-2 bg-[#27C4F5] text-white disabled:opacity-40'>Publish your post</button>
        </form>
      </div>
    </>
  )
}

export default AddPost;
