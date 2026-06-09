import HomeView from "@screens/home/views";
import type { DetailNavigation, JumpToProps } from "@/src/libs/types";

const Home = (props: DetailNavigation & JumpToProps) => {
  return <HomeView jumpTo={props.jumpTo} openDetail={props.openDetail} />;
};

export default Home;
