import { useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import GameDashboard from "./components/GameDashboard";
import Loading from "./components/LoadingScreen.tsx";
import { AirdropLogic } from "./game/airdropLogic";
import Layout from "./Layout";
import Achievements from "./pages/AchievementsPage";
import DailyCheckin from "./pages/DailyCheckInPage";
import Friends from "./pages/FriendsPage";
import Home from "./pages/GamePage";
import LeaderBoard from "./pages/LeaderboardPage";
import Store from "./pages/StorePage";
import Tasks from "./pages/TasksPage";
import Upgrades from "./pages/UpgradesPage";
import { store } from "./store";

function AirdropLogicWrapper() {
  useEffect(() => {
    const airdropLogic = new AirdropLogic();
    airdropLogic.startAirdropInterval(5000);
  }, []);

  return null;
}

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <ReduxProvider store={store}>
          <AirdropLogicWrapper />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="game" element={<Home />} />
              <Route path="leaderboard" element={<LeaderBoard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="upgrades" element={<Upgrades />} />
              <Route path="friends" element={<Friends />} />
              <Route path="dailycheckin" element={<DailyCheckin />} />
              <Route path="store" element={<Store />} />
              <Route path="achievements" element={<Achievements />} />
            </Route>
          </Routes>
          <ToastContainer />
          <GameDashboard />
        </ReduxProvider>
      )}
    </Router>
  );
}

export default App;
