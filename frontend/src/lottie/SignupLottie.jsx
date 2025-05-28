import { Player } from '@lottiefiles/react-lottie-player';
import hrLottie from '../assets/json/hrLottie.json';
import hr from '../assets/json/hr.json';

const SignupLottie = () => {
  return (
    <div className="">
      <Player
        autoplay
        loop
        src={hr}
        style={{ height: '240px', width: '240px' }}
      />
    </div>
  );
};

export default SignupLottie;
