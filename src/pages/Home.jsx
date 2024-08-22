import HeaderLinks from "../components/HeaderLinks";
import { RecommendedArtists, RecommendedMusic } from "./index";

const Home = () => {
  return (
    <>
      <HeaderLinks />
      <div className="px-8 py-10">
        <RecommendedMusic />
        <RecommendedArtists />
      </div>
    </>
  );
};

export default Home;
