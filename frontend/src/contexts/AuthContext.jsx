import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setUser(token);
    }
  }, []);

  const registerUser = async (userData) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();

    if (data.success) {
      setUser(data.token);

      // save to local storage
      localStorage.setItem('token', data.token);

      toast.success('User registered successfully');
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };

  const loginUser = async (userData) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success) {
      setUser(data.token);

      // save to local storage
      localStorage.setItem('token', data.token);

      toast.success('User registered successfully');
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };
  const logoutUser = async () => {
    setUser(null);

    localStorage.removeItem('token');

    toast.success('User logged out successfully');
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
