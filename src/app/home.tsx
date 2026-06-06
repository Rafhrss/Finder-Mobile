import HomeView from "@screens/home/views";
import type { DetailNavigation } from "@/src/libs/types";

const Home = (props: DetailNavigation) => {
  return <HomeView openDetail={props.openDetail} />;
};

export default Home;
