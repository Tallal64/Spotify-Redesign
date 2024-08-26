/* eslint-disable react/prop-types */
import {
  PiArrowCircleDown,
  PiMusicNotes,
  PiPlayFill,
  PiShuffleBold,
} from "react-icons/pi";

const Banner = ({
  playlistType,
  playlistCoverImage,
  title,
  img,
  userName,
  total,
  className,
  desc,
}) => {
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`px-8 w-full p-7 ${className} overflow-hidden`}>
      {/* upper div */}
      <div className="flex items-end gap-x-6">
        {playlistCoverImage ? (
          <div className="h-72 w-72 rounded-lg overflow-hidden">
            <img
              src={playlistCoverImage}
              alt="playlistCoverImage"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-72 w-72 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#2cd76bb8] via-[#2cd76b9f] to-[#03150b]">
            <PiMusicNotes size={180} />
          </div>
        )}

        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col overflow-hidden">
            <p className="capitalize text-neutral-300">{playlistType}</p>
            <h2 className="py-3 text-8xl font-bold capitalize tracking-tight whitespace-nowrap truncate max-w-[1200px]">
              {title}
            </h2>
            <p className="whitespace-nowrap truncate max-w-[1200px]">{desc}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-500 text-white">
              {img ? (
                <img
                  src={img}
                  alt="User"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold">
                  {getInitials(userName)}
                </span>
              )}
            </div>

            <span className="capitalize font-semibold text-sm">{userName}</span>

            <div className="h-[4px] w-[4px] -mr-1 -mb-1 bg-Neutrals-300 rounded-full" />

            <span className="text-Neutrals-300 capitalize font-semibold text-sm">
              {`${total} songs`}
            </span>
          </div>
        </div>
      </div>

      {/* lower div */}
      <div className="flex items-center gap-x-5 mt-6">
        <button className="p-4 bg-Accent-500 rounded-full">
          <PiPlayFill color="#000" size={25} />
        </button>
        <button className="">
          <PiShuffleBold color="#B3B3B3" size={35} />
        </button>
        <button className="">
          <PiArrowCircleDown color="#B3B3B3" size={40} />
        </button>
      </div>
    </div>
  );
};

export default Banner;
