import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from '../components/ProgressBar';
import { GameLogic } from '../game/gameLogic';

const HomePage: React.FC = () => {
  const gameLogic = new GameLogic();
  const [token, setToken] = useState<number>(0);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(1000);
  const playerId = 'player123';

  function formatNumberWithCommas(number: number, locale = 'en-US') {
    return new Intl.NumberFormat(locale).format(number);
  }

  const handleTap = async () => {
    if (remainedEnergy > 0) {
      let multiplier = 1;
      const fetchedState = await gameLogic.fetchGameState(playerId);
      const parsed = fetchedState !== undefined ? fetchedState : { resources: 0, miningPower: 1, upgradeCost: 10 };
      multiplier = parsed?.miningPower || 1;
      const coinsPerTap = Math.floor((parsed?.resources || 0) * 8 * multiplier);
      setToken((prev) => prev + coinsPerTap);
      setRemainedEnergy(remainedEnergy - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainedEnergy((pre) => (pre === 999 ? 1000 : pre < 1000 ? pre + 1 : 1000));
    }, 21600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home-page pb-24 px-4 min-h-screen w-screen flex flex-col items-center justify-center"
      style={{ background: "url('/image/background.png') center center / cover no-repeat" }}
    >
      <ToastContainer />
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <img src="/image/dollar.png" alt="" className="w-14 h-14" />
          <h1 className="text-5xl text-white ml-3 font-bold">{formatNumberWithCommas(token)}</h1>
        </div>
        <ProgressBar value={remainedEnergy / 10} />
        <div
          className={`relative rounded-full bg-cover w-full max-w-[400px] aspect-square z-10 ${remainedEnergy > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
          style={{ backgroundImage: "url('image/clickimg.png')" }}
          onClick={handleTap}
        ></div>
      </div>
      <div className="flex flex-row justify-between w-full px-10 mt-4">
        <Link to="/boost" className="flex">
          <img src="/image/rocket.png" alt="rocket" className="w-8 h-8" />
          <h3 className="text-2xl text-white">Boost</h3>
        </Link>
        <Link to="/mine" className="flex">
          <img src="/image/axs.png" alt="mine" className="w-8 h-8" />
          <h3 className="text-2xl text-white">Mine</h3>
        </Link>
        <Link to="/trophies" className="flex">
          <img src="/image/trophy.png" alt="trophy" className="w-8 h-8" />
          <h3 className="text-2xl text-white">Trophies</h3>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
