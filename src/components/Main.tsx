import React, { useEffect, useState } from "react";
import App from "../App.tsx";
import LoadingScreen from "./LoadingScreen";

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingScreen /> : <App />;
};

export default Main;
