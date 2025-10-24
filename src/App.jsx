import React from "react";
import "./App.css";
import GameList from "./components/GameList";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <a href="/" className="app-title-link">
          <h1 className="app-title">Free Games Browser</h1>
        </a>
        <p className="app-subtitle">
          A clean and minimal game grid powered by FreeToGame API
        </p>
      </header>

      <main className="app-content">
        <GameList />
      </main>
    </div>
  );
}

export default App;
