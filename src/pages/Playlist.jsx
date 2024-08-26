import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/banner/Banner";
import BannerSkeleton from "../components/skeletons/BannerSkeleton";
import { setUserId } from "../redux/feature/spotifySlice";
import {
  useGetPlaylistQuery,
  useGetUserDataQuery,
} from "../redux/services/spotify";
import PlayerItem from "../components/playerItem/PlayerItem";
import TracksHeading from "../components/TracksHeading";
import { nanoid } from "@reduxjs/toolkit";

const Playlist = () => {
  const playlistId = useSelector((state) => state.spotify.playlistId);
  const userId = useSelector((state) => state.spotify.userId);
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([]);

  const {
    data: PlaylistData,
    error: PlaylistError,
    isLoading: PlaylistLoading,
  } = useGetPlaylistQuery(playlistId);
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserDataQuery(userId);

  useEffect(() => {
    if (PlaylistError) {
      console.error(
        "Error while fetching data of playlist inside playlist:",
        PlaylistError
      );
    } else if (PlaylistLoading) {
      console.log(
        "Fetching the data of playlist inside Playlist...",
        PlaylistLoading
      );
    } else if (PlaylistData) {
      console.log(PlaylistData);
      setTracks(PlaylistData.tracks.items.map((item) => item.track));
      dispatch(setUserId(PlaylistData.owner.id));
    }
  }, [PlaylistError, PlaylistLoading, PlaylistData, dispatch]);

  useEffect(() => {
    if (userError) {
      console.error(
        "Error while fetching data of playlist inside playlist:",
        userError
      );
    } else if (userLoading) {
      console.log(
        "Fetching the data of playlist inside Playlist...",
        userLoading
      );
    } else if (userData) {
      console.log("userData in Playlist", userData);
    }
  }, [userError, userLoading, userData]);

  return (
    <div className="relative">
      {PlaylistError ? (
        <>Oh no, there was an error</>
      ) : PlaylistLoading ? (
        <BannerSkeleton
          className={
            "bg-gradient-to-b from-[#2cd76b5b] to-[#03150b] relative top-0 left-0 w-full h-[720px]"
          }
        />
      ) : PlaylistData ? (
        <div>
          <Banner
            className={
              "bg-gradient-to-b from-[#2cd76b5b] to-[#03150b] relative top-0 left-0 w-full h-[720px]"
            }
            playlistType={PlaylistData.type}
            title={PlaylistData.name}
            desc={PlaylistData.description}
            playlistCoverImage={PlaylistData.images[0]?.url}
            img={userData.images[0]?.url}
            userName={PlaylistData.owner.display_name}
            total={PlaylistData.tracks.total}
          />
          <div className="h-full relative bg-black/25 -mt-[300px] z-10">
            <TracksHeading />
            {tracks.map((track, index) => (
              <PlayerItem
                key={nanoid()}
                index={++index}
                title={track.name}
                img={track.album.images[0].url}
                desc={track.artists.map((artist) => artist.name).join(", ")}
                albumName={track.album.name}
                dateAdded={track.album.release_date}
                time={track.duration_ms}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Playlist;
