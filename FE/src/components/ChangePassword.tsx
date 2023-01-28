import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { changePasswordService } from '../features/changePasswordService';
import { useInput } from '../hooks/useInput';

function ChangePassword() {
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useInput('');
  const [confirmPassword, setconfirmPassword] = useInput('');
  
  function changePass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Konfirmasi password tidak sama' })
      return;
    }
    setLoading(true);
    changePasswordService(password).then(result => {
      setLoading(false);
      let message = result.error ? result.message : 'Password berhasil diubah!';
      Swal.fire({ icon: 'info', title: 'Info', text: message })
      if (!result.error) navigate('/');
    })
  }

  useEffect(() => {
    if (confirmPassword && password) setButtonDisable(false);
    else setButtonDisable(true);
  }, [confirmPassword, password, buttonDisable]);

  return (
    <div>
      <form className='max-w-md mx-auto' onSubmit={(event) => changePass(event)}>
        <input type="password" onChange={setPassword} className="mt-5 w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" />
        <input type="password" onChange={setconfirmPassword} className="mt-5 w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Confirm Password" />
        <button disabled={buttonDisable} className="mt-6 py-2 w-full rounded-lg bg-[#27C4F5] font-medium text-white disabled:opacity-40">
          Change Password {loading && <Spinner className="ml-1" />}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword