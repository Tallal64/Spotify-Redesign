import { nanoid } from "@reduxjs/toolkit";
import Heading from "../../components/Heading";
import CtaItemSkeleton from "../../components/skeletons/CtaItemSkeleton";
import { useGetRecommendedSongsQuery } from "../../redux/services/spotify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MusicComponent from "../../components/Music/MusicComponent";

const Music = () => {
  const [recommendedSongsId, setRecommendedSongsId] = useState("");
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

  return (
    <div className="px-8 py-10">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <div className="flex gap-5 justify-between items-center pb-12">
          <CtaItemSkeleton count={5} />
        </div>
      ) : data ? (
        <>
          <Heading
            link={"#"}
            showLink={false}
            title={"Recommended Music"}
            className={""}
          />
          <div className="grid grid-cols-7 gap-3 ">
            {trackData.map((track) => (
              <MusicComponent
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
  );
};

export default Music;
