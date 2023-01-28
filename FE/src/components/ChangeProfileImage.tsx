import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { changeProfileImageService } from '../features/changeProfilePicService';
import { getOwnProfile } from '../features/profileService';

function ChangeProfile() {
  const navigate = useNavigate();
  const [imageBuffer, setImageBuffer] = useState<any>(null);
  const [image64, setImage64] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreviewImage] = useState('');
  const [selectedFileImage, setSelectedFileImage] = useState<Blob>();

  function _arrayBufferToBase64( buffer: ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  function onChangeClicked() {
    inputFileRef.current?.click();
  }

  function onInputImageChange() {
    if (!inputFileRef.current?.files || inputFileRef.current?.files?.length === 0) {
      if (inputFileRef.current) inputFileRef.current.value = '';
      return;  
    }
    if (inputFileRef.current?.files[0].size > 1048576) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File kamu harus lebih kecil dari 1MB!',
        footer: '<a href="https://imagecompressor.com/" target="_blank">Kompres foto di website ini?</a>'
      })
      if (inputFileRef.current) inputFileRef.current.value = '';
      return;
    }
    setSelectedFileImage(inputFileRef.current?.files[0])
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFileImage) formData.append('image', selectedFileImage);
    changeProfileImageService(formData).then(result => {
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
    const fetchData = async () => {
      const result = await getOwnProfile()
      if (!result.error) setImageBuffer(result.user.image.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (imageBuffer) setImage64(_arrayBufferToBase64(imageBuffer));
  }, [image64, imageBuffer]);

  useEffect(() => {
    if (selectedFileImage) {
      const objUrl = URL.createObjectURL(selectedFileImage);
      setPreviewImage(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }
  }, [selectedFileImage])

  useEffect(() => {
    if (preview) setButtonDisable(false);
    else setButtonDisable(true);
  }, [preview])

  return (
    <>
      <div className='max-w-md mx-auto'>
        <p className='font-medium text-2xl text-center mb-6'>Profile</p>
        <img onClick={onChangeClicked} className='object-cover w-32 h-32 rounded-full mx-auto' 
        src={preview ? preview : image64 ? `data:image/png;base64,${image64}` : "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/08/11/1722136995.jpg"} alt="" />
        <p onClick={onChangeClicked} className='w-fit cursor-pointer font-medium text-[#27C4F5] mx-auto mt-4'>Ubah Foto Profile</p>
        <form onSubmit={handleSubmit}>
          <input onChange={onInputImageChange} ref={inputFileRef} type="file" className='hidden' />
          <button disabled={buttonDisable} className="mt-6 py-2 w-full rounded-lg bg-[#27C4F5] font-medium text-white disabled:opacity-40">
            Simpan Foto Profile
          </button>
        </form>
      </div>
    </>
  )
}

export default ChangeProfile