import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CtaItem } from "../components";
import Heading from "../components/Heading";
import CtaItemSkeleton from "../components/skeletons/CtaItemSkeleton";
import { useGetRecommendedArtistsQuery } from "../redux/services/spotify";
import { nanoid } from "@reduxjs/toolkit";

const RecommendedArtists = () => {
  const [recommendedArtistsId, setRecommendedArtistsId] = useState("");
  const [artistsData, setArtistsData] = useState([]);
  const recommendedPlaylistArtistsId = useSelector(
    (state) => state.spotify.recommendedPlaylistArtistsId
  );
  const recommendedFollowedArtistsId = useSelector(
    (state) => state.spotify.recommendedFollowedArtistsId
  );

  console.log("recommendedPlaylistArtistsId", recommendedPlaylistArtistsId);
  console.log("recommendedFollowedArtistsId", recommendedFollowedArtistsId);

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
      // console.log(
      //   "tajarba filhal inside artists: ",
      //   data.artists.map((artist) => artist)
      // );
    }
  }, [data, artistsError, artistsLoading, artistsData]);
  console.log("recommendedArtists: ", artistsData);

  return (
    <div className="overflow-hidden pb-10">
      {artistsError ? (
        <>Oh no, there was an error</>
      ) : artistsLoading ? (
        <div className="flex gap-5 justify-between items-center">
          <CtaItemSkeleton count={5} />
        </div>
      ) : artistsData.length > 0 ? (
        <>
          <Heading
            title={"Artists you might like"}
            className={"hover:underline cursor-pointer"}
          />
          <div className="flex gap-5 justify-between items-center">
            {artistsData.map((item) => (
              <CtaItem
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

export default RecommendedArtists;
