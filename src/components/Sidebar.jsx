/* eslint-disable no-unused-vars */
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { PiHouseBold, PiMusicNoteBold, PiUserCheckBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  setPlaylistId,
  setRecommendedFollowedArtistsId,
  setRecommendedPlaylistArtistsId,
  setRecommendedPlaylistSongsId,
  setRecommendedSavedSongsId,
  setTrackId,
} from "../redux/feature/spotifySlice";
import {
  useGetBrowseCategoriesQuery,
  useGetCurrentUserFollowedArtistsQuery,
  useGetCurrentUserPlaylistQuery,
  useGetTrackFromPlaylistQuery,
  useGetUserSavedSongsQuery,
} from "../redux/services/spotify";
import logo from "/Spotify_Logo_RGB_White.png";
import PlaylistSkeleton from "./skeletons/PlaylistSkeleton";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const trackId = useSelector((state) => state.spotify.trackId);
  const dispatch = useDispatch();
  const [artists, setArtists] = useState([]);
  const location = useLocation();

  const {
    data: playlistData,
    error: playlistError,
    isLoading: playlistLoading,
  } = useGetCurrentUserPlaylistQuery();
  const {
    data: trackData,
    error: trackError,
    isLoading: trackLoading,
  } = useGetTrackFromPlaylistQuery(trackId, { skip: !trackId });
  const {
    data: savedSongsData,
    error: savedSongsError,
    isLoading: savedSongsLoading,
  } = useGetUserSavedSongsQuery();
  const {
    data: CategoriesData,
    error: CategoriesError,
    isLoading: CategoriesLoading,
  } = useGetBrowseCategoriesQuery();
  const {
    data: followedArtistData,
    error: followedArtistError,
    isLoading: followedArtistLoading,
  } = useGetCurrentUserFollowedArtistsQuery();

  const links = [
    {
      id: nanoid(),
      to: "/",
      text: "Home",
      icon: <PiHouseBold size={20} />,
    },
    {
      id: nanoid(),
      to: "/followed",
      text: "Followed Artists",
      icon: <PiUserCheckBold size={20} />,
    },
    {
      id: nanoid(),
      to: "/saved",
      text: "Saved Songs",
      icon: <PiMusicNoteBold size={20} />,
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
    if (playlistError) {
      console.error("Error while fetching playlist data:", playlistError);
      return;
    }
    if (playlistLoading) {
      console.log("Fetching playlist data...");
      return;
    }
    if (playlistData?.items?.length > 0) {
      setPlaylists(playlistData.items);
      const playlistIds = playlistData.items.map((item) => item.id);
      const randomTrackId = getRandomElements(playlistIds, 1)[0];
      dispatch(setTrackId(randomTrackId));
      console.log("suiii: ", playlistData);
    } else if (savedSongsData?.items?.length > 0) {
      console.log("No playlists found, loading saved songs...");
      const songIds = savedSongsData.items.map((item) => item.track.id);
      const randomSongIds = getRandomElements(songIds, 5).join(",");
      dispatch(setRecommendedPlaylistSongsId(randomSongIds));
      console.log("songsid", randomSongIds);
      // console.log("suiiiii: ", savedSongsData);
    } else {
      console.log("Data fetch failed or no data available.");
    }
  }, [
    playlistData,
    playlistError,
    playlistLoading,
    savedSongsData,
    CategoriesData,
    dispatch,
  ]);

  useEffect(() => {
    if (savedSongsError) {
      console.error("Error while fetching savedSongs data:", savedSongsError);
      return;
    }
    if (savedSongsLoading) {
      console.log("Fetching savedSongs data...", savedSongsLoading);
      return;
    } else if (savedSongsData?.items?.length > 0) {
      // console.log("saved songs...");
      const songIds = savedSongsData.items.map((item) => item.track.id);
      const randomSongIds = getRandomElements(songIds, 5).join(",");
      dispatch(setRecommendedSavedSongsId(randomSongIds));
      // console.log("songsid", randomSongIds);
      // console.log("suiiiii: ", savedSongsData);
    }
  }, [savedSongsData, savedSongsError, savedSongsLoading, dispatch]);

  /*
     ~~~~~ After setting "trackId" we will get tracks Data and each track has it's own id, this will get all the track Ids and select the random one then set that id for "recommededSongsId":>redux>spotifySlice.js ~~~~~ 
  */
  useEffect(() => {
    if (trackError) {
      console.error("Error while fetching tracks:", trackError);
    } else if (trackLoading) {
      console.log("Fetching the tracks...", trackLoading);
    } else if (trackData) {
      console.log("track Data inside sidebar...", trackData);
      const ids = trackData.items.map((item) => item.track.id);
      const randomIdForRecommendedSongs = getRandomElements(ids, 5).join(",");
      dispatch(setRecommendedPlaylistSongsId(randomIdForRecommendedSongs));
      // console.log("temporary",randomIdForRecommendedSongs);

      const idOfArtist = trackData.items.map((item) =>
        item.track.artists.map((artist) => artist.id)
      );
      const randomId = idOfArtist.map((item) => item[0]);
      const randomIdForRecommendedArtists = getRandomElements(randomId, 1);
      dispatch(setRecommendedPlaylistArtistsId(randomIdForRecommendedArtists)); // Dispatching to the separate state
    }
  }, [trackData, trackError, trackLoading, dispatch]);

  // for followed artists
  useEffect(() => {
    if (followedArtistError) {
      console.error(
        "Error while fetching data of FollowedArtists inside sidebar:",
        followedArtistError
      );
    } else if (followedArtistLoading) {
      console.log(
        "Fetching the data of FollowedArtists inside sidebar...",
        followedArtistLoading
      );
    } else if (followedArtistData) {
      setArtists(followedArtistData.artists.items);
      let idForRecommendedArtists = followedArtistData.artists.items.map(
        (item) => item.id
      );
      let randomArtistIds = getRandomElements(idForRecommendedArtists, 1).join(
        ","
      );
      console.log(
        "generated id for recommendedArtists in sidebar.jsx: ",
        randomArtistIds
      );
      dispatch(setRecommendedFollowedArtistsId(randomArtistIds));
    }
  }, [
    followedArtistData,
    followedArtistError,
    followedArtistLoading,
    dispatch,
  ]);

  return (
    <div className="max-w-[320px] min-h-screen p-6 flex flex-col gap-y-10 bg-sidebar text-white">
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
                  isActive ||
                  (link.to === "/" &&
                    (location.pathname.startsWith("/music") ||
                      location.pathname.startsWith("/artists") ||
                      location.pathname.startsWith("/albums")))
                    ? "text-Accent bg-[#33333366]"
                    : "text-Neutrals-300"
                }`
              }
            >
              <span>{link.icon}</span>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-Neutrals-300"}`
                }
              >
                {link.text}
              </NavLink>
            </NavLink>
          </li>
        ))}
      </div>

      {/* playlist */}
      <div className="">
        <h2 className="uppercase font-semibold tracking-wider mb-5">
          your playlists
        </h2>
        {playlistError ? (
          <>
            <p className="capitalize text-red-500">
              Oh no, there was an error while fetching the data!
            </p>
          </>
        ) : playlistLoading ? (
          <>
            <PlaylistSkeleton count={8} />
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
                    to={`/playlist/${item.id}`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-Neutrals-50 bg-[#33333366]" : "text-Neutrals-300"
                      } flex flex-col w-full py-2 px-5 hover:bg-[#33333366] rounded-[30px]`
                    }
                    onClick={() => {
                      dispatch(setPlaylistId(item.id));
                    }}
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
