import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { defaultFormValues } from '../../constants';
import useControlInputs from '../../hooks/useControlInputs';
import CommonButton from '../../components/UI/CommonButton';

const CreateTodo = () => {
  const { values, setValues, handleChange } =
    useControlInputs(defaultFormValues);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.success) {
      setValues(defaultFormValues);
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
        <CommonButton text='Create Todo' />
      </form>
    </div>
  );
};

export default CreateTodo;
