import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { TbWorldSearch } from "react-icons/tb";
import { TiHeartFullOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  setRecommendedArtistsId,
  setRecommendedSongsId,
  setTrackId,
} from "../redux/feature/spotifySlice";
import {
  useGetCurrentUserPlaylistQuery,
  useGetTrackFromPlaylistQuery,
} from "../redux/services/spotify";
import logo from "/Spotify_Logo_RGB_White.png";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const trackId = useSelector((state) => state.spotify.trackId);
  const dispatch = useDispatch();

  const {
    data: playlistData,
    error,
    isLoading,
  } = useGetCurrentUserPlaylistQuery();
  const {
    data: trackData,
    error: trackError,
    isLoading: trackLoading,
  } = useGetTrackFromPlaylistQuery(trackId, { skip: !trackId }); // skip is a built-in property in redux-toolkit, Skip fetching if trackId is not available.

  const links = [
    { id: nanoid(), to: "/home", text: "Home", icon: <GoHomeFill size={21} /> },
    {
      id: nanoid(),
      to: "/discover",
      text: "Discover",
      icon: <TbWorldSearch size={21} />,
    },
    {
      id: nanoid(),
      to: "/liked",
      text: "Liked Songs",
      icon: <TiHeartFullOutline size={21} />,
    },
  ];

  /*
     ~~~~~ function for generating random items/ids from an array ~~~~~ 
  */
  const getRandomElements = (array, n) => {
    return array
      .map((value) => ({ value, sort: Math.random() })) // Assign random sort values
      .sort((a, b) => a.sort - b.sort) // Sort by random values
      .map(({ value }) => value) // Extract original values
      .slice(0, n); // Get n elements
  };

  /*
     ~~~~~ This is for getting the Ids from each playlist then select a random id among them and set that specific id for "trackId":>redux>spotifySlice.js ~~~~~ 
  */
  useEffect(() => {
    if (error) {
      console.error(
        "Error while fetching playlist data inside sidebar:",
        error
      );
    } else if (isLoading) {
      console.log("Fetching the playlist data inside sidebar...");
    } else if (playlistData) {
      setPlaylists(playlistData.items);
      const urls = playlistData.items.map((item) => item.tracks.href); // getting links from playlist for tracks ids
      const parts = urls.map((url) => url.split("/")); // spliting each link to get the track id
      const playlistId = parts.map((item) => item[5]); // getting the ids of each track
      let randomIdForTrackId = getRandomElements(playlistId, 1).join(""); // selecting random ids
      dispatch(setTrackId(randomIdForTrackId)); // setting the id for "trackId":>redux>spotifySlice.js
    }
  }, [playlistData, error, isLoading, dispatch]);

  /*
     ~~~~~ After setting "trackId" we will get tracks Data and each track has it's own id, this will get all the track Ids and select the random one then set that id for "recommededSongsId":>redux>spotifySlice.js ~~~~~ 
  */
  useEffect(() => {
    if (trackError) {
      console.error("Error while fetching tracks:", trackError);
    } else if (trackLoading) {
      console.log("Fetching the tracks...", trackLoading);
    } else if (trackData) {
      const ids = trackData.items.map((item) => item.track.id); // change it to dynamic
      let randomIdForRecommendedSongs = getRandomElements(ids, 5).join(",");
      dispatch(setRecommendedSongsId(randomIdForRecommendedSongs));

      let idOfArtist = trackData.items.map((item) =>
        item.track.artists.map((artist) => artist.id)
      );
      let randomId = idOfArtist.map((item) => item[0]);
      let randomIdForRecommendedArtists = getRandomElements(randomId, 1);
      dispatch(setRecommendedArtistsId(randomIdForRecommendedArtists));
      // console.log("tajarba", randomIdForRecommendedArtists);
    }
  }, [trackData, trackError, trackLoading, dispatch]);

  return (
    <div className="w-[300px] h-screen p-6 flex flex-col gap-y-10 bg-sidebar text-white">
      {/* logo */}
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-12" />
        </Link>
      </div>

      {/* links */}
      <div className="">
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
              <span className="text-Neutrals-300">{link.text}</span>
            </NavLink>
          </li>
        ))}
      </div>

      {/* playlist */}
      <div className="">
        <h2 className="uppercase font-semibold tracking-wider mb-5">
          your playlists
        </h2>
        {error ? (
          <>
            <p className="capitalize text-red-500">
              Oh no, there was an error while fetching the data!
            </p>
          </>
        ) : isLoading ? (
          <>
            <p className="capitalize text-Neutrals-300">Loading...</p>
          </>
        ) : playlistData ? (
          <div>
            <div className="flex flex-col gap-y-3">
              {playlists.map((item) => (
                <li
                  key={item.id}
                  className="list-none flex cursor-pointer items-center"
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-Neutrals-50" : "text-Neutrals-300"
                      } flex flex-col w-full py-2 px-5 hover:bg-[#33333366] rounded-[30px]`
                    }
                  >
                    <p className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.name}
                    </p>
                  </NavLink>
                </li>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
