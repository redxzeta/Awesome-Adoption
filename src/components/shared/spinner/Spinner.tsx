const Spinner = () => {
  return (
    <div
      className="inline-block w-8 h-8 border-solid border-primary border-4 border-r-base-200 rounded-full animate-spin"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
