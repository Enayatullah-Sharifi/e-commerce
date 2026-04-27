const Message = (props) => {
  return (
    <>
      {props.message && <div
        className={`container bg-[var(--orange--color)] mt-12 text-dark-500 px-5 py-3 mx-auto text-xl font-semibold rounded-lg`}
      >
        <p>{props.message}</p>
        
      </div>}
    </>
  );
};

export default Message;
