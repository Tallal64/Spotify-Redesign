import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CtaItem } from "../components";
import CtaItemSkeleton from "../components/skeletons/CtaItemSkeleton";
import { useGetRecommendedArtistsQuery } from "../redux/services/spotify";

const RecommendedArtists = () => {
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
      console.log(
        "tajarba filhal inside artists: ",
        data.artists.map((artist) => artist)
      );
    }
  }, [data, artistsError, artistsLoading, artistsData]);
  console.log("recommendedArtists: ", artistsData);

  return (
    <div className="overflow-hidden pb-12">
      {artistsError ? (
        <>Oh no, there was an error</>
      ) : artistsLoading ? (
        <div className="flex gap-5 justify-between items-center">
          <CtaItemSkeleton count={5} />
        </div>
      ) : artistsData.length > 0 ? (
        <>
          <h2 className="mb-5 font-semibold text-2xl capitalize">
            <span className="hover:underline cursor-pointer">
              Artists you might like
            </span>
          </h2>
          <div className="flex gap-5 justify-between items-center">
            {artistsData.map((item, index) => (
              <CtaItem
                key={index}
                title={item?.name}
                img={item.images[0].url}
                desc={item.type}
              />
            ))}
          </div>
        </>
      ) : // <p>data not found inside &#34;Artists.jsx&#34;</p>
      null}
    </div>
  );
};

export default RecommendedArtists;
