import { Link } from 'react-router-dom';

import CommonButton from '../UI/CommonButton';

const index = ({ todo, handleDeleteTodo }) => {
  return (
    <li className='flex flex-col gap-4 p-4 items-center justify-center min-w-fit min-h-fit bg-blue-100 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold'>{todo.title}</h2>
      <p className='text-xl'>{todo.description}</p>
      <p className='text-xl'>Status: {todo.status}</p>
      <div className='flex gap-2'>
        <CommonButton>
          <Link to={`/todo-page/update/${todo._id}`}>Update</Link>
        </CommonButton>
        <CommonButton
          text='Delete'
          type='button'
          onClick={() => handleDeleteTodo(todo._id)}
        />
      </div>
    </li>
  );
};

export default index;
