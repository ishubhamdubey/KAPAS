import HeroSlider from '../components/HeroSlider';
import NewArrivals from '../components/NewArrivals';
import BestSellers from '../components/BestSellers';
import Categories from '../components/Categories';
import VideoSection from '../components/VideoSection';
import Feedback from '../components/Feedback';

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <BestSellers />
      <Categories />
      <VideoSection />
      <Feedback />
    </>
  );
};

export default HomePage;
