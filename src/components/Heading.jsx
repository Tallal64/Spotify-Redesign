/* eslint-disable react/prop-types */
const Heading = ({ title, className }) => {
  return (
    <div className="flex items-center gap-x-1">
      <h2 className="mb-3 font-medium text-xl capitalize">
        <span className={className}>{title}</span>
      </h2>
    </div>
  );
};

export default Heading;
