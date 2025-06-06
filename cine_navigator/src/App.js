import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Watchlist, { useWatchlist } from './components/Watchlist';
import NearbyTheaters from './components/NearbyTheaters';
import { initGA4, logGA4Event } from './ga4';

// PUBLIC_INTERFACE
function Header({ onSearch, isSearching }) {
  /**
   * Header component: Contains app logo and integrated search bar.
   */
  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div className="logo">
          <span className="logo-symbol">*</span> CineNavigator
        </div>
        <SearchBar onSearch={onSearch} isSearching={isSearching} />
      </div>
    </nav>
  );
}

/**
 * Helper: Display a grid of movies.
 * Used for both "Now Playing" and search results.
 */
function MovieGrid({ movies, loading, error, gridTitle, watchlistIds = [], onAddToWatchlist, onRemoveFromWatchlist }) {
  /**
   * Helper: Display a grid of movies.
   * Used for both "Now Playing" and search results.
   * Shows watchlist add/remove for each movie in grid.
   */
  if (loading) {
    return (
      <section className="movie-grid-section" style={{ flex: 3, minWidth: 0 }}>
        <div className="container" style={{ paddingTop: 120, textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>{gridTitle}</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: 18, padding: 40 }}>
            Loading movies...
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="movie-grid-section" style={{ flex: 3, minWidth: 0 }}>
        <div className="container" style={{ paddingTop: 120, textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>{gridTitle}</h2>
          <div style={{ color: '#ff6565', fontSize: 18, padding: 40 }}>
            {error}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="movie-grid-section" style={{ flex: 3, minWidth: 0 }}>
      <div className="container" style={{ paddingTop: 120 }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>{gridTitle}</h2>
        <div
          className="movie-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
          }}
        >
          {movies.length === 0 ? (
            <div style={{ color: "var(--text-secondary)", fontSize: 18, gridColumn: "1/-1" }}>
              No movies found.
            </div>
          ) : (
            movies.map((movie) => {
              const inWatchlist = watchlistIds.includes(movie.id);
              return (
                <div
                  key={movie.id}
                  className="movie-card"
                  style={{
                    background: 'var(--secondary)',
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: 320,
                  }}
                  tabIndex={0}
                  aria-label={movie.title}
                >
                  {/* Movie poster */}
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                      alt={movie.title}
                      style={{
                        width: 110,
                        height: 162,
                        objectFit: 'cover',
                        borderRadius: 4,
                        marginBottom: 12,
                        background: '#282828',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 110,
                        height: 162,
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: 4,
                        marginBottom: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: 32,
                      }}
                      aria-label="No poster available"
                    >
                      🎬
                    </div>
                  )}
                  {/* Movie title */}
                  <div style={{ color: 'var(--text-color)', fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>
                    {movie.title}
                  </div>
                  {inWatchlist ? (
                    <button
                      className="btn"
                      style={{ marginTop: 'auto', backgroundColor: '#4b3840', color: 'var(--accent)' }}
                      onClick={() => onRemoveFromWatchlist(movie.id)}
                      aria-label={`Remove ${movie.title} from watchlist`}
                    >
                      ✓ Added
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{ marginTop: 'auto' }}
                      onClick={() => onAddToWatchlist(movie)}
                      aria-label={`Add ${movie.title} to watchlist`}
                    >
                      + Watchlist
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}



// PUBLIC_INTERFACE
function TheaterSection() {
  /**
   * TheaterSection component: Shows nearby theaters (Google Maps placeholder & links).
   */
  return (
    <section className="theater-section" style={{ margin: '48px auto 0', padding: '40px 0 0', background: 'none', maxWidth: 1024 }}>
      <h2 style={{ color: 'var(--accent)', marginBottom: 16 }}>Nearby Theaters</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div
          style={{
            flex: 2,
            minWidth: 300,
            background: 'var(--secondary)',
            borderRadius: 8,
            padding: 18,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              background: 'rgba(255,255,255,0.045)',
              border: '1.5px dashed var(--border-color)',
              borderRadius: 6,
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              fontSize: 21,
            }}
          >
            [Google Maps Embed Here]
          </div>
          <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
            Enable location to see theaters near you and open directions.
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: 'var(--secondary)',
            borderRadius: 8,
            padding: 18,
            marginBottom: 24,
          }}
        >
          <strong style={{ color: 'var(--accent)' }}>Top Nearby Theaters</strong>
          <ul style={{ listStyle: 'none', margin: 12, padding: 0 }}>
            <li style={{ marginBottom: 10 }}>
              <a
                href="https://www.google.com/maps/search/Theater/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-color)' }}
              >
                🎟️ Example Theater 1
              </a>
            </li>
            <li style={{ marginBottom: 10 }}>
              <a
                href="https://www.google.com/maps/search/Movie+Theater/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-color)' }}
              >
                🎟️ Example Theater 2
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application container: Combines header, main content, watchlist, and theaters section.
   * Handles search state and now playing fallback logic.
   */

  // State for Now Playing
  const [nowPlaying, setNowPlaying] = useState([]);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [nowPlayingError, setNowPlayingError] = useState("");

  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  // Fetch "Now Playing" on mount
  useEffect(() => {
    async function fetchNowPlaying() {
      setNowPlayingLoading(true);
      setNowPlayingError("");
      if (!apiKey) {
        setNowPlayingError("TMDB API Key not found. Check your environment variables.");
        setNowPlayingLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );
        if (!res.ok) throw new Error('Failed to fetch movies. Please check your API key.');
        const data = await res.json();
        if (!data.results) throw new Error('No data returned from TMDB.');
        setNowPlaying(data.results);
      } catch (err) {
        setNowPlayingError(
          err.message || "Something went wrong while fetching now playing movies."
        );
      } finally {
        setNowPlayingLoading(false);
      }
    }
    fetchNowPlaying();
  }, [apiKey]);

  // Search handler
  async function handleMovieSearch(query) {
    setSearchQuery(query);
    setSearchResults([]);
    setSearchLoading(true);
    setSearchError("");
    if (!apiKey) {
      setSearchError("TMDB API Key not found. Check your environment variables.");
      setSearchLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}`
      );
      if (!res.ok) throw new Error("TMDB search failed. Please check your API key.");
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setSearchError(
        err.message || "Something went wrong while searching for movies."
      );
    } finally {
      setSearchLoading(false);
    }
  }

  // Clear search when SearchBar is empty (not covered by SearchBar, so here):
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
      setSearchError("");
      setSearchLoading(false);
    }
  }, [searchQuery]);

  // --- WATCHLIST STATE & LOGIC ---
  const [watchlist, addToWatchlist, removeFromWatchlist] = useWatchlist();

  // If searching, show search results; otherwise fall back to now playing
  const moviesToShow = searchQuery ? searchResults : nowPlaying;
  const loading = searchQuery ? searchLoading : nowPlayingLoading;
  const error = searchQuery ? searchError : nowPlayingError;
  const gridTitle = searchQuery
    ? `Results for "${searchQuery}"`
    : "Now Playing";
  const watchlistIds = watchlist.map((movie) => movie.id);

  // Accessibility: Announce add/remove actions
  // (optional, but omitted for brevity)

  // Add to watchlist handler (passed to MovieGrid)
  function handleAddToWatchlist(movie) {
    addToWatchlist(movie);
    // TODO: send event to GA4 in future
  }
  function handleRemoveFromWatchlist(movieId) {
    removeFromWatchlist(movieId);
    // TODO: send event to GA4 in future
  }

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--primary)' }}>
      <Header onSearch={handleMovieSearch} isSearching={searchLoading} />
      {/* Main content: grid layout with movie grid and watchlist sidebar */}
      <main style={{ display: 'flex', flex: 1, marginTop: 80, alignItems: 'flex-start' }}>
        {/* Movie grid section */}
        <MovieGrid
          movies={moviesToShow}
          loading={loading}
          error={error}
          gridTitle={gridTitle}
          watchlistIds={watchlistIds}
          onAddToWatchlist={handleAddToWatchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
        />
        {/* Watchlist sidebar */}
        <div style={{ minWidth: 0 }}>
          <Watchlist
            watchlist={watchlist}
            onRemove={handleRemoveFromWatchlist}
            isSidebar={true}
          />
        </div>
      </main>
      {/* Theaters section below main grid */}
      <TheaterSection />
    </div>
  );
}

export default App;
