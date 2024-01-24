// eslint-disable-next-line react/prop-types
const CommonButton = ({ text, children, type = 'submit', onClick }) => {
  return (
    <button
      type={type}
      className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
      onClick={onClick}
    >
      {text ? text : children}
    </button>
  );
};

export default CommonButton;
