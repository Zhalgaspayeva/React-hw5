import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import "./GameList.css";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchGames = async (pageNumber = 1, isRefresh = false) => {
    if (loading) return; // не загружаем, если уже идёт загрузка
    setLoading(true);

    try {
      const response = await fetch(
        "https://corsproxy.io/?https://www.freetogame.com/api/games"
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Имитирует "пагинацию" — просто порциями по 30
      const start = (pageNumber - 1) * 30;
      const end = pageNumber * 30;
      const pageData = data.slice(start, end);

      setGames((prev) => (isRefresh ? pageData : [...prev, ...pageData]));
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  // Автоматическая загрузка при первом рендере
  useEffect(() => {
    fetchGames(1, true);
  }, []);

  // Загрузка новых страниц при изменении page
  useEffect(() => {
    if (page === 1) return;
    fetchGames(page);
  }, [page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleRefresh = () => fetchGames(1, true);

  const handleClearSearch = () => setSearch("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="game-list-container">
      <div className="buttons-container">
        <button onClick={handleRefresh} disabled={loading} className="refresh-btn">
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleClearSearch}>Clear</button>
      </div>

      <ul className="game-list">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>

      {games.length > 0 && (
        <button onClick={handleLoadMore} disabled={loading} className="load-btn">
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default GameList;
