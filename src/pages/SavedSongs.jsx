import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/banner/Banner";
import PlayerItem from "../components/playerItem/PlayerItem";
import BannerSkeleton from "../components/skeletons/BannerSkeleton";
import PlayerItemSkeleton from "../components/skeletons/PlayerItemSkeleton";
import { setRecommendedSavedSongsId } from "../redux/feature/spotifySlice";
import { useGetUserSavedSongsQuery } from "../redux/services/spotify";
import TracksHeading from "../components/TracksHeading";

const SavedSongs = () => {
  const [savedSongs, setSavedSongs] = useState([]);
  const [totalSongs, setTotalSongs] = useState();
  const userImage = useSelector((state) => state.spotify.userImage);
  const userName = useSelector((state) => state.spotify.userName);
  const { data, error, isLoading } = useGetUserSavedSongsQuery();
  const dispatch = useDispatch();

  const recommendedFollowedArtistsId = useSelector(
    (state) => state.spotify.recommendedFollowedArtistsId
  );

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

  useEffect(() => {
    if (error) {
      console.error("Error while fetching data inside saved songs :", error);
    } else if (isLoading) {
      console.log("Fetching the data inside saved songs...");
    } else if (data) {
      setSavedSongs(data.items.map((item) => item.track));
      setTotalSongs(data.total);

      let Ids = data.items.map((item) => item.track.id);
      let randomIdsFromFunc = getRandomElements(Ids, 5).join(",");
      dispatch(setRecommendedSavedSongsId(randomIdsFromFunc));
    } else {
      console.log("No saved songs available.");
    }
  }, [data, error, isLoading, dispatch]);
  console.log("all hail: ", savedSongs);
  console.log("recommendedFollowedArtistsId: ", recommendedFollowedArtistsId);

  return (
    <div className="">
      {/* decoration */}
      <div className="">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <BannerSkeleton
            className={
              "bg-gradient-to-b from-[#2cd76b5b] to-[#03150b] relative top-0 left-0 w-full h-[720px]"
            }
          />
        ) : data ? (
          <Banner
            className={
              "bg-gradient-to-b from-[#2cd76b5b] to-[#03150b] relative top-0 left-0 w-full h-[720px]"
            }
            playlistType={"playlist"}
            title={"saved songs"}
            img={userImage}
            userName={userName}
            total={totalSongs}
          />
        ) : null}
      </div>

      <div className="h-screen px-8 relative bg-black/25 -mt-[300px] z-10">
        {/* songs headers */}
        <TracksHeading />

        {/* songs */}
        <div>
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <PlayerItemSkeleton count={15} />
          ) : data ? (
            <div className="flex flex-col gap-3">
              {savedSongs.map((song, index) => (
                <PlayerItem
                  key={index}
                  index={++index}
                  title={song.name}
                  img={song.album.images[0].url}
                  desc={song.artists.map((artist) => artist.name).join(", ")}
                  albumName={song.album.name}
                  dateAdded={song.album.release_date}
                  time={song.duration_ms}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SavedSongs;
