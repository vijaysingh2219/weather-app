const Icon = ({ name }) => {
  // Render an icon using the provided name
  return (
    <div className="text-3xl">
      <i className={name}></i>
    </div>
  );
};

export default Icon;
