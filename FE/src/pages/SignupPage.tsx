import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isUserAuthed } from '../features/checkAuthService';
import { signupService } from '../features/signupService';
import { useInput } from '../hooks/useInput';

function SignupPage() {
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');

  function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username && password) {
      setLoading(true);
      signupService({ username: username, password: password }).then(result => {
        setLoading(false);
        if (result.error) setError(result.message);
        else {
          setError('');
          navigate('/login');
        }
      });
    }
    setButtonDisable(true);
  }

  useEffect(() => {
    if (username && password) setButtonDisable(false);
    else setButtonDisable(true);
  }, [username, password, buttonDisable]);

  useEffect(() => {
    isUserAuthed().then(result => {
      if (result) navigate('/')
    });
  }, [navigate]);

  return (
    <div className="p-6 bg-[#F7F7F7] h-screen">
      <div className="max-w-md mt-10 mx-auto p-4 border rounded-lg bg-white">
        <img className="w-40 mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt="" />
        <div className='mt-6'>
          <p className='my-3 font-medium text-lg text-center text-[#8E8E8E]'>Sign up to use this app</p>

          {error && 
          <div className='mb-4 p-2 bg-red-50 border-2 border-red-300 rounded-lg'>
            <p className='font-medium text-red-800'>{error}</p>
          </div>}
          <form onSubmit={(event) => signup(event)}>
            <input type="text" onChange={setUsername} className="w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Username" />
            <input type="password" onChange={setPassword} className="mt-5 w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" />
            <button disabled={buttonDisable} className='mt-6 py-2 w-full rounded-lg bg-[#27C4F5] font-medium text-white disabled:opacity-40'>
              Sign up {loading && <Spinner className='ml-1' />}
            </button>
          </form>
        </div>
      </div>

      <div className='max-w-md mx-auto py-5 mt-5 border rounded bg-white'>
        <p className='mx-auto w-fit'>Have an account? <a className='cursor-pointer text-[#27C4F5]' href="/login">Log in</a></p>
      </div>
    </div>
  );
}

export default SignupPage;