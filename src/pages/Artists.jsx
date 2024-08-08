import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CtaItem } from "../components";
import { useGetRecommendedArtistsQuery } from "../redux/services/spotify";

const Artists = () => {
  const [artistsData, setArtistsData] = useState([]);
  const recommendedArtistsId = useSelector(
    (state) => state.spotify.recommendedArtistsId
  );

  const {
    data,
    error: artistsError,
    isLoading: artistsLoading,
  } = useGetRecommendedArtistsQuery(recommendedArtistsId, {
    skip: !recommendedArtistsId,
  });

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
    <div className="overflow-hidden pb-12">
      <h2 className="mb-5 font-medium text-xl">Artist you might like</h2>
      {artistsError ? (
        <>Oh no, there was an error</>
      ) : artistsLoading ? (
        <>Loading...</>
      ) : artistsData ? (
        <div className="flex gap-5 justify-between items-center">
          {artistsData.map((item, index) => (
            <CtaItem
              key={index}
              title={item.name}
              img={item.images[0].url}
              desc={item.type}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Artists;
