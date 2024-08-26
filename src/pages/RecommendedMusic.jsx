import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CtaItem } from "../components";
import Heading from "../components/Heading";
import CategoriesSkeleton from "../components/skeletons/CategoriesSkeleton";
import CtaItemSkeleton from "../components/skeletons/CtaItemSkeleton";
import {
  useGetBrowseCategoriesQuery,
  useGetRecommendedSongsQuery,
} from "../redux/services/spotify";
import { nanoid } from "@reduxjs/toolkit";

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
  console.log("RecommendedMusic", trackData);

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
      <div className="overflow-hidden pb-10 flex flex-col gap-y-10">
        <div className="">
          {CategoriesError ? (
            <>Oh no, there was an error</>
          ) : CategoriesLoading ? (
            <div className="flex gap-5 justify-between items-center pb-12">
              <CategoriesSkeleton count={10} />
            </div>
          ) : CategoriesData ? (
            <>
              <Heading
                title={"Browse categories"}
                className={"hover:underline cursor-pointer"}
              />
              <div className="flex gap-5 justify-between items-center">
                {categories.map((arr) => (
                  <CtaItem
                    key={nanoid()}
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
              <Heading
                title={"Recommended Music"}
                className={"hover:underline cursor-pointer"}
              />
              <div className="flex gap-5 justify-between items-center">
                {trackData.map((track) => (
                  <CtaItem
                    key={nanoid()}
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
