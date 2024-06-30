import './SubmitButton.css';

const SubmitButton = ({ text, loading }) => {
  return (
    <button className={`bg-white px-10 py-3 rounded-md text-black tracking-widest
     ${loading ? "opacity-50" : ""}  `}>
      {loading ? "Loading..." : "SUBMIT"}
    </button>
  );
};

export default SubmitButton;
