import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className='flex justify-center items-center gap-4 py-4 bg-blue-500 text-white text-xl rounded-es-3xl rounded-ee-3xl'>
      {user ? (
        <>
          <Link to='/'>Home</Link>
          <Link to='todo-page'> My Todos</Link>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to='/'>Home</Link>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
