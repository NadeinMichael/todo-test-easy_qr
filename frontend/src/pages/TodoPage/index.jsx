import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../contexts/AuthContext';

import CommonButton from '../../components/UI/CommonButton';
import Todo from '../../components/Todo';

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
  }, [todoList]);

  if (loading) {
    return <h1 className='text-3xl text-center'>Loading...</h1>;
  }

  return (
    <div className='flex flex-col gap-4 items-center min-h-screen justify-around'>
      {todoList.length === 0 && <h1 className='text-3xl'>No todo found</h1>}
      <ul className='flex gap-4 flex-wrap px-5'>
        {todoList.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
      <CommonButton>
        <Link to='/todo-page/create'>Create Todo</Link>
      </CommonButton>
    </div>
  );
};

export default TodoPage;
