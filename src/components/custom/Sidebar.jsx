/* eslint-disable no-unused-vars */
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { TbWorldSearch } from "react-icons/tb";
import { TiHeartFullOutline } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
import { useGetCurrentUserPlaylistQuery } from "../../redux/services/spotify";
import logo from "/Spotify_Logo_RGB_White.png";

const Sidebar = () => {
  const { data, error, isLoading } = useGetCurrentUserPlaylistQuery();
  const [playlist, setPlaylist] = useState([]);

  const links = [
    { id: nanoid(), to: "/home", text: "Home", icon: <GoHomeFill size={22} /> },
    {
      id: nanoid(),
      to: "/discover",
      text: "Discover",
      icon: <TbWorldSearch size={22} />,
    },
    {
      id: nanoid(),
      to: "/liked",
      text: "Liked Songs",
      icon: <TiHeartFullOutline size={22} />,
    },
  ];

  useEffect(() => {
    if (error) {
      console.error("Error aa raha hai playlist fetch krte waqt:", error);
    } else if (isLoading) {
      console.log("loading ho rahi hai");
    } else if (data) {
      setPlaylist(data.items);
    }
  }, [data, error, isLoading]);

  return (
    <div className="w-[300px] h-screen py-7 px-6 flex flex-col gap-y-10 bg-sidebar text-white">
      <div>
        {/* logo */}
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-14" />
        </Link>
      </div>

      {/* links */}
      <div className="py-[6px]">
        <h2 className="uppercase font-semibold tracking-wider mb-5">Browse</h2>
        {links.map((link) => (
          <li key={link.id} className="list-none my-3">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-x-2 rounded-[30px] font-medium py-2 px-5 transition-all hover:bg-[#33333366] ${
                  isActive ? "text-Accent bg-[#33333366]" : "text-Neutrals-300"
                }`
              }
            >
              <span>{link.icon}</span>
              <span className="text-Neutrals-300 text-base">{link.text}</span>
            </NavLink>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* playlist */
}
{
  /* <div>
  {error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
    <div className="px-4">
      <div className="flex flex-col gap-y-5 ">
        {playlist.map((item) => (
          <div
            key={item.id}
            className="flex gap-x-3 cursor-pointer mx-3 items-center group duration-150 rounded-lg hover:bg-muted"
          >
            <div className="hw-20 w-20">
              <img
                className="w-full h-full duration-150 group-hover:rounded-l-lg"
                src={item.images[0].url}
                alt={"img"}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="font-medium overflow-x-hidden">{item.name}</p>
              <div className="flex gap-x-2 capitalize items-center text-muted-foreground">
                <p className="text-sm font-medium overflow-x-hidden">
                  {item.type}
                </p>
                <p className="text-sm font-medium overflow-x-hidden">
                  {item.owner.display_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null}
</div> */
}
