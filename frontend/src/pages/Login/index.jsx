import { useRef } from 'react';

import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const loginRef = useRef(null);

  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(loginRef.current);
    const data = Object.fromEntries(formData);

    loginUser(data);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-900'>
      <h1 className='text-4xl font-bold mb-4'>Login</h1>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
        ref={loginRef}
      >
        <input
          className='border-2 border-gray-300 p-2 rounded outline-none focus:border-blue-400 focus:shadow'
          type='email'
          placeholder='Email'
          name='email'
        />
        <input
          className='border-2 border-gray-300 p-2 rounded outline-none focus:border-blue-400 focus:shadow'
          type='password'
          placeholder='Password'
          name='password'
        />
        <button
          className='w-full bg-blue-500 hover:bg-blue-400 text-white p-2 rounded shadow'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
