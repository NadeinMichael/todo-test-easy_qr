import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('await');

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      title,
      description,
      status,
    };

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(todo),
    });

    const data = await res.json();

    if (data.success) {
      setTitle('');
      setDescription('');
      setStatus('await');
      toast.success('Todo created');
      navigate('/todo-page');
    }

    if (!data.success) {
      toast.error(data.error);
    }
  };

  return (
    <div className='flex flex-col gap-4 p-4 min-h-screen items-center justify-center'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='bg-gray-100 px-4 py-2 rounded-md'
        />
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='bg-gray-100 px-4 py-2 rounded-md'
        />
        <select
          name='status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='bg-gray-100 px-4 py-2 rounded-md'
        >
          <option value='await'>Await</option>
          <option value='progress'>In progress</option>
          <option value='done'>Done</option>
        </select>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
