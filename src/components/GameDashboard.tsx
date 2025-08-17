import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GameDashboard: React.FC = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="game-dashboard">
      <nav className="w-full fixed bottom-[2px] px-2 max-w-[1200px] z-50">
        <ul className="grid grid-cols-7 gap-1 px-3 lg:gap-5 justify-center items-center bg-[#272A30] pt-3 pb-2 lg:px-4 rounded-3xl w-full border-slate-700 border-2">
          <li>
            <Link
              to="/"
              className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === '/'
                ? 'scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl'
                : 'opacity-50 text-white'
                }`}
            >
              <img
                src="/image/mining.png"
                alt="play"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <p className="text-[10px] lg:text-sm text-white">Home</p>
            </Link>
          </li>
          <li>
            <Link
              to="/game"
              className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === '/game'
                ? 'scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl'
                : 'opacity-50 text-white'
                }`}
            >
              <img
                src="/image/clickimg.png"
                alt="game"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <p className="text-[10px] lg:text-sm text-white">Game</p>
            </Link>
          </li>
          <li>
            <Link
              to="/achievements"
              className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === '/achievements'
                ? 'scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl'
                : 'opacity-50 text-white'
                }`}
            >
              <img
                src="/image/trophy.png"
                alt="achievements"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <p className="text-[10px] lg:text-sm text-white">Achievements</p>
            </Link>
          </li>
          <li>
            <Link
              to="/upgrades"
              className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === '/upgrades'
                ? 'scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl'
                : 'opacity-50 text-white'
                }`}
            >
              <img
                src="/image/star.png"
                alt="upgrades"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <p className="text-[10px] lg:text-sm text-white">Upgrades</p>
            </Link>
          </li>
          <li>
            <Link
              to="/store"
              className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === '/store'
                ? 'scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl'
                : 'opacity-50 text-white'
                }`}
            >
              <img
                src="/image/store.png"
                alt="store"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <p className="text-[10px] lg:text-sm text-white">Store</p>
            </Link>
          </li>
          <li>
            <Link
              to="/friends"
              className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === '/friends'
                ? 'scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl'
                : 'opacity-50 text-white'
                }`}
            >
              <img
                src="/image/friends.png"
                alt="friends"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <p className="text-[10px] lg:text-sm text-white">Friends</p>
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === '/tasks'
                ? 'scale-[110%] opacity-100 bg-transparent p-1 lg:p-2 rounded-2xl'
                : 'opacity-50 text-white'
                }`}
            >
              <img
                src="/image/tasks.png"
                alt="tasks"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <p className="text-[10px] lg:text-sm text-white">Tasks</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GameDashboard;
