import { CtaItem } from "../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetRecommendedSongsQuery } from "../redux/services/spotify";

const Music = () => {
  const [trackData, setTrackData] = useState([]);
  const recommendedSongsId = useSelector((state) => state.spotify.recommendedSongsId);

  const { data, error, isLoading } = useGetRecommendedSongsQuery(recommendedSongsId, {
    skip: !recommendedSongsId,
  });

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
    <div className="overflow-hidden pb-12">
      <h2 className="mb-5 font-medium text-xl">Music you might like</h2>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
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
      ) : null}
    </div>
  );
};

export default Music;
