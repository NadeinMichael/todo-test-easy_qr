import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import TodoPage from './pages/TodoPage';
import PrivateRoutes from './utils/PrivateRoutes';
import CreateTodo from './pages/CreateTodo';
import UpdateTodo from './pages/UpdateTodo';

function App() {
  const { user } = useAuth();

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/todo-page' element={<TodoPage />} />
          <Route path='/todo-page/create' element={<CreateTodo />} />
          <Route path='/todo-page/update/:id' element={<UpdateTodo />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route
          path='/register'
          element={user ? <Navigate to='/' /> : <Register />}
        />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
