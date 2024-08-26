import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";

const HeaderLinks = () => {
  const navLinks = [
    {
      to: "music",
      title: "Music",
    },
    {
      to: "audiobooks",
      title: "Audiobooks",
    },
    {
      to: "artists",
      title: "Artists",
    },
    {
      to: "albums",
      title: "Albums",
    },
  ];

  return (
    <div className="bg-Accent-800">
      <ul className="flex ml-2">
        {navLinks.map((link) => (
          <NavLink
            key={nanoid()}
            to={link.to}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-Accent text-Neutrals-50 transition-all duration-500"
                  : "border-transparent text-Neutrals-300"
              } border-b-[3px] font-medium px-6 mx-2 py-4`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default HeaderLinks;
