import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FollowedArtist from "../components/followedArtist/FollowedArtist";
import Heading from "../components/Heading";
import FollowedArtistSkeleton from "../components/skeletons/FollowedArtistSkeleton";
import { setRecommendedFollowedArtistsId } from "../redux/feature/spotifySlice";
import { useGetCurrentUserFollowedArtistsQuery } from "../redux/services/spotify";
import { nanoid } from "@reduxjs/toolkit";

const FollowedArtists = () => {
  const { data, error, isLoading } = useGetCurrentUserFollowedArtistsQuery();
  const [artists, setArtists] = useState([]);
  const dispatch = useDispatch();

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
      const idForRecommendedArtists = data.artists.items.map((item) => item.id);
      const randomArtistIds = getRandomElements(
        idForRecommendedArtists,
        1
      ).join(",");
      dispatch(setRecommendedFollowedArtistsId(randomArtistIds));
    }
  }, [data, error, isLoading, dispatch]);

  return (
    <div className="px-8 py-10">
      {/* artists */}
      <div className="">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <div className="flex flex-wrap w-full gap-3">
            <FollowedArtistSkeleton count={20} />
          </div>
        ) : data ? (
          <>
            <Heading
              title={"Followed Artists"}
              className={"hover:cursor-pointer"}
            />

            <div className="flex flex-wrap w-full gap-3">
              {artists.map((artist) => (
                <div key={nanoid()} className="">
                  <FollowedArtist
                    img={artist.images[1].url}
                    title={artist.name}
                    desc={artist.type}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FollowedArtists;
