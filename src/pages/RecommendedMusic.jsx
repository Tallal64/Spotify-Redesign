import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CtaItem } from "../components";
import CategoriesSkeleton from "../components/skeletons/CategoriesSkeleton";
import CtaItemSkeleton from "../components/skeletons/CtaItemSkeleton";
import {
  useGetBrowseCategoriesQuery,
  useGetRecommendedSongsQuery,
} from "../redux/services/spotify";

const RecommendedMusic = () => {
  const [recommendedSongsId, setRecommendedSongsId] = useState("");
  const [categories, setCategories] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const recommendedSavedSongsId = useSelector(
    (state) => state.spotify.recommendedSavedSongsId
  );
  const recommendedPlaylistSongsId = useSelector(
    (state) => state.spotify.recommendedPlaylistSongsId
  );

  const { data, error, isLoading } = useGetRecommendedSongsQuery(
    recommendedSongsId,
    { skip: !recommendedSongsId }
  );

  const {
    data: CategoriesData,
    error: CategoriesError,
    isLoading: CategoriesLoading,
  } = useGetBrowseCategoriesQuery();

  useEffect(() => {
    if (recommendedSavedSongsId) {
      setRecommendedSongsId(recommendedSavedSongsId);
    } else if (recommendedPlaylistSongsId) {
      setRecommendedSongsId(recommendedPlaylistSongsId);
    }
  }, [recommendedSavedSongsId, recommendedPlaylistSongsId]);

  useEffect(() => {
    if (error) {
      console.error("Error while fetching data inside Music:", error);
    } else if (isLoading) {
      console.log("Fetching the data inside Music...", isLoading);
    } else if (data) {
      setTrackData(data.tracks);
      // console.log(data);
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    if (CategoriesError) {
      console.error("Error while fetching data inside Music:", CategoriesError);
    } else if (CategoriesLoading) {
      console.log("Fetching the data inside Music...", CategoriesLoading);
    } else if (CategoriesData) {
      setCategories(CategoriesData.categories.items);
      // console.log(CategoriesData);
    }
  }, [CategoriesData, CategoriesError, CategoriesLoading]);

  return (
    <>
      <div className="overflow-hidden pb-12 flex flex-col gap-y-12">
        <div className="">
          {CategoriesError ? (
            <>Oh no, there was an error</>
          ) : CategoriesLoading ? (
            <div className="flex gap-5 justify-between items-center pb-12">
              <CategoriesSkeleton count={10} />
            </div>
          ) : CategoriesData ? (
            <>
              <h2 className="mb-5 font-semibold text-2xl capitalize">
                <span className="hover:underline cursor-pointer">
                  Browse categories
                </span>
              </h2>
              <div className="flex gap-5 justify-between items-center">
                {categories.map((arr, index) => (
                  <CtaItem
                    key={index}
                    title={arr.name}
                    img={arr.icons[0]?.url}
                    desc={"categories"}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="">
          {isLoading ? (
            <div className="flex gap-5 justify-between items-center pb-12">
              <CtaItemSkeleton count={5} />
            </div>
          ) : data ? (
            <>
              <h2 className="mb-5 font-semibold text-2xl capitalize">
                <span className="hover:underline cursor-pointer">
                  Recommended Music
                </span>
              </h2>
              <div className="flex gap-5 justify-between items-center">
                {trackData.map((track, index) => (
                  <CtaItem
                    key={index}
                    title={track.name}
                    img={track.album.images[0].url}
                    desc={track.artists.map((item) => item.name).join(", ")}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default RecommendedMusic;
