import React from "react";
import "./GameCard.css";

function GameCard({ game }) {
  return (
    <li className="game-card">
      <img
        src={game.thumbnail}
        alt={game.title}
        className="game-image"
      />
      <h3>{game.title}</h3>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>
      <a
        href={game.game_url}
        target="_blank"
        rel="noopener noreferrer"
        className="game-link"
      >
        Visit Game
      </a>
    </li>
  );
}

export default GameCard;