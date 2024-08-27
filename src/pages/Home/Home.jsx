import { useSelector } from "react-redux";
import { RecommendedArtists, RecommendedMusic } from "../index";
import cloudIcon from "/cloudy.png";

const Home = () => {
  const userName = useSelector((state) => state.spotify.userName);

  return (
    <>
      <div className="px-8 py-10">
        <div className="border pb-4 border-transparent mb-12 border-b-Neutrals-600">
          <div className="flex items-end">
            <img src={cloudIcon} alt="weatherIcon" className="w-9 h-9" />
            <h2 className="text-2xl font-medium capitalize ml-2">
              Good morning, {userName}
            </h2>
          </div>
        </div>
        <RecommendedMusic />
        <RecommendedArtists />
      </div>
    </>
  );
};

export default Home;
