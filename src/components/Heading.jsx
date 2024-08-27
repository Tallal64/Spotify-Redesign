import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
const Heading = ({ title, link, showLink, className }) => {
  return (
    <div className="flex items-end justify-between gap-x-1 pb-3">
      <h2 className="font-medium text-xl capitalize">
        <NavLink to={link} className={className}>
          {title}
        </NavLink>
      </h2>
      {showLink ? (
        <NavLink
          to={link}
          className={
            "hover:underline text-sm pr-2 font-medium text-Neutrals-300"
          }
        >
          Show All
        </NavLink>
      ) : null}
    </div>
  );
};

export default Heading;
