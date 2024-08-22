import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowedArtist from "../components/followedArtist/FollowedArtist";
import FollowedArtistSkeleton from "../components/skeletons/FollowedArtistSkeleton";
import { setRecommendedFollowedArtistsId } from "../redux/feature/spotifySlice";
import { useGetCurrentUserFollowedArtistsQuery } from "../redux/services/spotify";

const FollowedArtists = () => {
  const { data, error, isLoading } = useGetCurrentUserFollowedArtistsQuery();
  const [artists, setArtists] = useState([]);
  const dispatch = useDispatch();
  const recommendedFollowedArtistsId = useSelector(
    (state) => state.spotify.recommendedFollowedArtistsId
  );

  // for generating random elements
  const getRandomElements = (array, n) => {
    return array
      .map((value) => ({ value, sort: Math.random() })) // Assign random sort values
      .sort((a, b) => a.sort - b.sort) // Sort by random values
      .map(({ value }) => value) // Extract original values
      .slice(0, n); // Get n elements
  };

  useEffect(() => {
    if (error) {
      console.error("Error while fetching data inside FollowedArtists:", error);
    } else if (isLoading) {
      console.log("Fetching the data inside FollowedArtists...", isLoading);
    } else if (data) {
      setArtists(data.artists.items);
      if (!recommendedFollowedArtistsId) {
        const idForRecommendedArtists = data.artists.items.map(
          (item) => item.id
        );
        const randomArtistIds = getRandomElements(
          idForRecommendedArtists,
          1
        ).join(",");
        dispatch(setRecommendedFollowedArtistsId(randomArtistIds));
      }
    }
  }, [data, error, isLoading, dispatch, recommendedFollowedArtistsId]);
  console.log("recommendedFollowedArtistsId: ", recommendedFollowedArtistsId);

  return (
    <div className="px-8 py-10">
      <h2 className="mb-5 font-semibold text-2xl">Followed Artists</h2>

      {/* artists */}
      <div className="">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <div className="flex flex-wrap w-full gap-3">
            <FollowedArtistSkeleton count={20} />
          </div>
        ) : data ? (
          <div className="flex flex-wrap w-full gap-3">
            {artists.map((artist, index) => (
              <div key={index} className="">
                <FollowedArtist
                  img={artist.images[1].url}
                  title={artist.name}
                  desc={artist.type}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FollowedArtists;
