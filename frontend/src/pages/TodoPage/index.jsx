import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const handleDeleteTodo = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/todo/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
      }
    );

    const data = await res.json();

    setTodoList(todoList.filter((todo) => todo._id !== id));

    if (data.success) {
      toast.success('Todo deleted');
    }
  };

  const getAllTodo = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setTodoList(data.data);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  if (loading) {
    return <h1 className=''>Loading...</h1>;
  }

  return (
    <div className='flex flex-col gap-4 items-center min-h-screen justify-around'>
      {todoList.length === 0 && <h1 className='text-3xl'>No todo found</h1>}
      <div className='w-full flex gap-4 flex-wrap px-5'>
        {todoList.map((todo) => (
          <div
            key={todo._id}
            className='flex flex-col gap-4 p-4 items-center justify-center min-w-fit min-h-fit bg-gray-300 rounded-md '
          >
            <h2 className='text-2xl font-bold'>{todo.title}</h2>
            <p className='text-xl'>{todo.description}</p>
            <p className='text-xl'>{todo.status}</p>
            <button>
              <Link
                to={`/todo-page/update/${todo._id}`}
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
              >
                Update Todo
              </Link>
            </button>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Delete Todo
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link
          to='/todo-page/create'
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Create Todo
        </Link>
      </button>
    </div>
  );
};

export default TodoPage;
