import { Player } from '@lottiefiles/react-lottie-player';
import hrLottie from '../assets/json/hrLottie.json';
import hr from '../assets/json/hr.json';

const IntroLottie = () => {
  return (
    <div className="">
      <Player
        autoplay
        loop
        src={hr}
        style={{ height: '280px', width: '280px' }}
      />
    </div>
  );
};

export default IntroLottie;
