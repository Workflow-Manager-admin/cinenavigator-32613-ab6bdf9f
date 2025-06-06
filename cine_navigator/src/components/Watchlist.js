import React, { useState, useEffect, useCallback } from "react";

// PUBLIC_INTERFACE
function Watchlist({
  availableMovies = [],
  watchlist,
  onAdd,
  onRemove,
  isSidebar = true,
}) {
  /**
   * Renders the watchlist as a sidebar or modal.
   * Allows removing movies & shows persistent state indicator.
   * Props:
   * - availableMovies: Used only by parent for add button logic (not needed here).
   * - watchlist: [{id, title, poster_path, ...}], all details required for display.
   * - onAdd: function(movie) => void
   * - onRemove: function(movieId) => void
   * - isSidebar (default true): if false, renders as modal (future-proof).
   */
  return (
    <aside
      className="watchlist-sidebar"
      style={{
        background: "var(--secondary)",
        color: "var(--text-color)",
        minWidth: 270,
        maxWidth: 340,
        borderLeft: "1px solid var(--border-color)",
        padding: 24,
        position: isSidebar ? "sticky" : "fixed",
        top: isSidebar ? 90 : 0,
        right: 0,
        height: isSidebar ? "calc(100vh - 90px)" : "100vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 15,
        boxShadow: isSidebar
          ? "none"
          : "0px 4px 32px 0 rgba(0,0,0,.65)",
        backgroundColor: isSidebar
          ? undefined
          : "var(--secondary)",
      }}
      aria-label="Watchlist"
    >
      <h3
        style={{
          color: "var(--accent)",
          marginTop: 0,
          marginBottom: 14,
          fontWeight: 600,
        }}
      >
        🎞️ Watchlist
      </h3>
      <div style={{ color: "var(--text-secondary)", fontSize: 15 }}>
        {watchlist.length > 0
          ? "Your movies are saved for next visit!"
          : "(Persistent via localStorage; add movies from the grid.)"}
      </div>
      <ul
        style={{
          padding: 0,
          margin: 16,
          listStyle: "none",
          flex: 1,
          overflowY: "auto",
          maxHeight: isSidebar ? "calc(100vh - 210px)" : "75vh",
        }}
      >
        {watchlist.length === 0 ? (
          <li style={{ marginBottom: 12, color: "var(--text-secondary)" }}>
            <em>Add movies to see them here.</em>
          </li>
        ) : (
          watchlist.map((movie) => (
            <li
              key={movie.id}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: 12,
                marginBottom: 12,
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: 36,
                    height: 52,
                    borderRadius: 3,
                    objectFit: "cover",
                    background: "#26262a",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 52,
                    background: "rgba(255,255,255,0.09)",
                    borderRadius: 3,
                    color: "var(--text-secondary)",
                    fontSize: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="No poster"
                >
                  🎬
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: "var(--text-color)",
                    fontSize: 15,
                    lineHeight: 1.1,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  title={movie.title}
                >
                  {movie.title}
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    lineHeight: 1.2,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: 180,
                  }}
                  title={movie.release_date}
                >
                  {movie.release_date || ""}
                </div>
              </div>
              <button
                className="btn"
                style={{
                  marginLeft: 7,
                  fontSize: 15,
                  lineHeight: 1,
                  padding: "5px 10px",
                }}
                aria-label={`Remove ${movie.title} from watchlist`}
                onClick={() => onRemove(movie.id)}
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

// PUBLIC_INTERFACE
export function useWatchlist(key = "cinenavigator_watchlist") {
  /**
   * Custom React hook for managing persistent movie watchlist via localStorage.
   * Returns [watchlist, addToWatchlist, removeFromWatchlist]
   * Each movie = {id, title, poster_path, ...}
   */
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // Sync to localStorage on changes
    try {
      localStorage.setItem(key, JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist, key]);

  // PUBLIC_INTERFACE
  const addToWatchlist = useCallback(
    (movie) => {
      setWatchlist((prev) => {
        if (prev.some((m) => m.id === movie.id)) return prev;
        return [...prev, movie];
      });
    },
    [setWatchlist]
  );

  // PUBLIC_INTERFACE
  const removeFromWatchlist = useCallback(
    (movieId) => {
      setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    },
    [setWatchlist]
  );

  return [watchlist, addToWatchlist, removeFromWatchlist];
}

export default Watchlist;
