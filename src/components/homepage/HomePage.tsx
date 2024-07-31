import About from './sections/About';
import AllNaitramEvents from './sections/AllNaitramEvents';
import Events from './sections/Events';
import Hero from './sections/Hero';
import RewardProgram from './sections/RewardProgram';
import StayInformed from './sections/StayInformed';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Events />
      <About />
      <RewardProgram />
      <AllNaitramEvents />
      <StayInformed />
    </>
  );
};

export default HomePage;
