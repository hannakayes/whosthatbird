// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { GameProvider } from "./context/GameContext";
import SplashScreen from "./pages/SplashScreen";
import GameView from "./pages/GameView";
import EndScreen from "./pages/EndScreen";

const App = () => {
  return (
    <MantineProvider>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/game" element={<GameView />} />
            <Route path="/end" element={<EndScreen />} />
          </Routes>
        </Router>
      </GameProvider>
    </MantineProvider>
  );
};

export default App;
