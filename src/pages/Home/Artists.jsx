import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetRecommendedArtistsQuery } from "../../redux/services/spotify";
import { nanoid } from "@reduxjs/toolkit";
import ArtistSkeleton from "../../components/skeletons/ArtistSkeleton";
import ArtistComponent from "../../components/Artist/ArtistComponent";
import Heading from "../../components/Heading";

const Artists = () => {
  const [recommendedArtistsId, setRecommendedArtistsId] = useState("");
  const [artistsData, setArtistsData] = useState([]);
  const recommendedPlaylistArtistsId = useSelector(
    (state) => state.spotify.recommendedPlaylistArtistsId
  );
  const recommendedFollowedArtistsId = useSelector(
    (state) => state.spotify.recommendedFollowedArtistsId
  );
  const {
    data,
    error: artistsError,
    isLoading: artistsLoading,
  } = useGetRecommendedArtistsQuery(recommendedArtistsId, {
    skip: !recommendedArtistsId,
  });
  useEffect(() => {
    if (recommendedFollowedArtistsId) {
      setRecommendedArtistsId(recommendedFollowedArtistsId);
    } else if (recommendedPlaylistArtistsId) {
      setRecommendedArtistsId(recommendedPlaylistArtistsId);
    }
  }, [recommendedFollowedArtistsId, recommendedPlaylistArtistsId]);
  useEffect(() => {
    if (artistsError) {
      console.error("Error while fetching artistsData:", artistsError);
    } else if (artistsLoading) {
      console.log("Fetching the artistsData...", artistsLoading);
    } else if (data) {
      setArtistsData(data.artists);
    }
  }, [data, artistsError, artistsLoading, artistsData]);
  return (
    <div className="px-8 py-10">
      {artistsError ? (
        <>Oh no, there was an error</>
      ) : artistsLoading ? (
        <div className="flex gap-5 justify-between items-center">
          <ArtistSkeleton count={5} />
        </div>
      ) : artistsData.length > 0 ? (
        <>
          <Heading
            link={"#"}
            showLink={false}
            title={"Artists you might like"}
            className={""}
          />
          <div className="grid grid-cols-7 gap-3">
            {artistsData.map((item) => (
              <ArtistComponent
                key={nanoid()}
                title={item?.name}
                img={item.images[0].url}
                desc={item.type}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Artists;
