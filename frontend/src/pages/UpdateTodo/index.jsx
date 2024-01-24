import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

import { defaultFormValues } from '../../constants';
import useControlInputs from '../../hooks/useControlInputs';
import CommonButton from '../../components/UI/CommonButton';

const UpdateTodo = () => {
  const [loading, setLoading] = useState(true);

  const { values, setValues, handleChange } =
    useControlInputs(defaultFormValues);

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/todo/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (data.success) {
      setValues(defaultFormValues);
      toast.success('Todo updated');
      navigate('/todo-page');
    }

    if (!data.success) {
      toast.error(data.error);
    }
  };

  const getTodo = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/todo/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      console.log(data.data);
      setValues({
        title: data.data.title,
        description: data.data.description,
        status: data.data.status,
      });
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='flex flex-col gap-4 p-4 min-h-screen items-center justify-center'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={values.title}
          onChange={(e) => handleChange(e)}
          className='bg-gray-100 px-4 py-2 rounded-md'
        />
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={values.description}
          onChange={(e) => handleChange(e)}
          className='bg-gray-100 px-4 py-2 rounded-md'
        />
        <select
          name='status'
          value={values.status}
          onChange={(e) => handleChange(e)}
          className='bg-gray-100 px-4 py-2 rounded-md'
        >
          <option value='await'>Await</option>
          <option value='In progress'>In progress</option>
          <option value='done'>Done</option>
        </select>
        <CommonButton text='Update Todo' />
      </form>
    </div>
  );
};

export default UpdateTodo;
