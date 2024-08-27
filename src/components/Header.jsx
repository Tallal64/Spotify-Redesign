import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import {
  PiArrowLeft,
  PiArrowRight,
  PiBell,
  PiGear,
  PiUsers,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUserData,
  setUserImage,
  setUserName,
} from "../redux/feature/spotifySlice";
import { useGetCurrentUserDataQuery } from "../redux/services/spotify";

const Header = () => {
  const userData = useSelector((state) => state.spotify.userData);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetCurrentUserDataQuery();

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
      dispatch(setCurrentUserData(userData));
      dispatch(setUserImage(data.images[0]?.url));
      dispatch(setUserName(data.display_name));
    }
  }, [data, dispatch, error, isLoading, userData]);

  return (
    <div className="bg-Accent-800 py-7 px-8">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-x-7">
            <div className="flex gap-x-2.5">
              <button className="h-9 w-9 rounded-full flex items-center justify-center bg-Accent-850">
                <PiArrowLeft size={21} />
              </button>
              <button className="h-9 w-9 rounded-full flex items-center justify-center bg-Accent-850">
                <PiArrowRight size={21} />
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
          <div className="flex items-center gap-x-3">
            <button>
              <PiBell size={21} />
            </button>
            <button>
              <PiGear size={21} />
            </button>
            <button>
              <PiUsers size={24} />
            </button>
          </div>

          <div className="h-6 w-[1px] mx-4 bg-foreground/50" />

          {/* proifle */}
          <>
            {error || isLoading ? (
              <>
                <span>CN</span>
              </>
            ) : data ? (
              <div className="flex items-center">
                <span className="mr-2 font-medium">{data.display_name}</span>
                {data.images && data.images.length > 0 ? (
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      className="h-full w-full object-cover"
                      src={data.images[1]?.url || data.images[0]?.url}
                      alt="Profile"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-500 text-white">
                    <span className="font-semibold">
                      {data.display_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;
