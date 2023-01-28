import { Alert, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import { isUserAuthed } from '../features/checkAuthService';
import { loginService } from '../features/loginService';
import { useInput } from '../hooks/useInput';

function LoginPage() {
  const [error, setError] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');
  const navigate = useNavigate();

  function login(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    loginService({ username, password}).then((result) => {
      setLoading(false);
      if (result.error) setError(result.message);
      else {
        setError('');
        navigate('/')
      }
    });
  }

  useEffect(() => {
    if (username && password) setButtonDisable(false);
    else setButtonDisable(true);
  }, [username, password, buttonDisable]);

  useEffect(() => {
    isUserAuthed().then(result => {
      if (result) navigate('/')
    });
  }, [navigate])

  return (
    <div className="p-6 bg-[#F7F7F7] h-screen">
      <div className="max-w-md mt-10 mx-auto p-4 border rounded-lg bg-white">
        <img className="w-40 mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt="" />
        <div className='mt-6'>
        <p className='my-3 font-medium text-lg text-center text-[#8E8E8E]'>Login to see photos and videos from your friends</p>
        <form onSubmit={(event) => login(event)}>
          {error && <Alert className='font-medium mb-4' color='failure' icon={HiInformationCircle}>{error}</Alert>}
          <input type="text" onChange={setUsername} className="w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Username" />
          <input type="password" onChange={setPassword} className="mt-5 w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" />
          <button disabled={buttonDisable || loading} type='submit' className='mt-6 py-2 w-full rounded-lg bg-[#27C4F5] font-medium text-white disabled:opacity-40'>
            Log in {loading && <Spinner className='ml-1' />}
          </button>
        </form>
        </div>
      </div>

      <div className='max-w-md mx-auto py-5 mt-5 border rounded bg-white'>
        <p className='mx-auto w-fit'>Don't have an account? <a className='cursor-pointer text-[#27C4F5]' href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginPage;