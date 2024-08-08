import { useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { TfiArrowLeft, TfiArrowRight } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setUserData } from "../redux/feature/spotifySlice";
import { useGetCurrentUserProfileDataQuery } from "../redux/services/spotify";

const Header = () => {
  const userProfileData = useSelector((state) => state.spotify.userProfileData);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetCurrentUserProfileDataQuery();

  const navLinks = [
    {
      to: "home/music",
      title: "Music",
    },
    {
      to: "home/audiobooks",
      title: "Audiobooks",
    },
    {
      to: "home/artists",
      title: "Artists",
    },
    {
      to: "home/albums",
      title: "Albums",
    },
  ];

  useEffect(() => {
    if (error) {
      console.error("error inside header component", error);
    } else if (isLoading) {
      console.log(
        "fetching the profile data inside header component",
        isLoading
      );
    } else if (data) {
      // console.log(data);
      dispatch(setUserData(userProfileData));
    }
  }, [data, dispatch, error, isLoading, userProfileData]);

  return (
    <div className="bg-Accent-800 pt-7 px-8">
      {/* upperHeader */}
      <div className="flex justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-x-7">
            <div className="flex gap-x-2.5">
              <button className="h-9 w-9 rounded-full flex items-center justify-center bg-Accent-850">
                <TfiArrowLeft />
              </button>
              <button className="h-9 w-9 rounded-full flex items-center justify-center bg-Accent-850">
                <TfiArrowRight />
              </button>
            </div>

            {/* searchBar */}
            <div className="relative w-1/2">
              <FiSearch
                size={18}
                className="absolute left-5 top-[11px] cursor-pointer"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-Accent-850 text-sm pl-12 py-[15px] h-[40px] rounded-3xl shadow-none w-full outline-none"
              />
            </div>
          </div>
        </div>

        {/*  */}
        <div className="flex items-center justify-end w-full">
          <button>
            <FaRegBell size={20} />
          </button>

          <div className="h-6 w-[1px] mx-4 bg-foreground" />

          {/* proifle */}
          <>
            {error || isLoading ? (
              <>
                <span>CN</span>
              </>
            ) : data ? (
              <div className="flex items-center">
                <span className="mr-2 font-medium">{data.display_name}</span>
                <div className="h-11 w-11 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src={data.images[1].url}
                    alt="image"
                  />
                </div>
              </div>
            ) : null}
          </>
        </div>
      </div>

      {/* lowerHeader */}
      <ul className="flex ml-2">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-Accent text-Neutrals-50 transition-all duration-500"
                  : "border-transparent text-Neutrals-300"
              } border-b-[3px] mt-8 font-medium px-6 mx-2 py-4`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Header;
