import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRecommendedFollowedArtistsId } from "../redux/feature/spotifySlice";
import { useGetCurrentUserFollowedArtistsQuery } from "../redux/services/spotify";
import Heading from "../components/Heading";
import ArtistComponent from "../components/Artist/ArtistComponent";
import ArtistSkeleton from "../components/skeletons/ArtistSkeleton";

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
            <ArtistSkeleton count={20} />
          </div>
        ) : data ? (
          <>
            <Heading
              link={"artists"}
              showLink={false}
              title={"Artists you might like"}
              className={"hover:underline cursor-pointer"}
            />

            <div className="flex flex-wrap w-full gap-3">
              {artists.map((artist) => (
                <div key={nanoid()} className="">
                  <ArtistComponent
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
