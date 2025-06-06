import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
function NowPlaying() {
  /**
   * NowPlaying component: Fetches and displays "Now Playing" movies from TMDB.
   * Uses TMDB API key from process.env (REACT_APP_TMDB_API_KEY).
   * Shows loading, error states, and displays movies in a modern, responsive grid.
   */
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Environment variable for API key
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    // TMDB API endpoint for 'Now Playing' movies
    const fetchNowPlaying = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch movies. Please check your API key.');
        }
        const data = await res.json();
        if (!data.results) {
          throw new Error('No data returned from TMDB.');
        }
        setMovies(data.results);
      } catch (err) {
        setError(
          err.message || 'Something went wrong while fetching now playing movies.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (!apiKey) {
      setError('TMDB API Key not found. Check your environment variables.');
      setLoading(false);
      return;
    }

    fetchNowPlaying();
  }, [apiKey]);

  if (loading) {
    return (
      <section className="movie-grid-section" style={{ flex: 3, minWidth: 0 }}>
        <div className="container" style={{ paddingTop: 120, textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>Now Playing</h2>
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
          <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>Now Playing</h2>
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
        <h2 style={{ color: 'var(--accent)', marginBottom: 24 }}>Now Playing</h2>
        <div
          className="movie-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
          }}
        >
          {movies.map((movie) => (
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
                    fontSize: 36,
                  }}
                  aria-label="No poster available"
                >
                  🎬
                </div>
              )}
              {/* Movie title */}
              <div
                style={{
                  color: 'var(--text-color)',
                  fontWeight: 600,
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 8,
                  minHeight: 36,
                  lineHeight: 1.2,
                  overflow: 'hidden',
                }}
                title={movie.title}
              >
                {movie.title}
              </div>
              {/* Movie overview */}
              <div
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 14.5,
                  textAlign: 'center',
                  maxHeight: 68,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: 6,
                  marginTop: 2,
                  lineHeight: 1.4,
                }}
                title={movie.overview}
              >
                {movie.overview.length > 110
                  ? movie.overview.slice(0, 110) + '...'
                  : movie.overview}
              </div>
              {/* Add to Watchlist btn placeholder */}
              <button
                className="btn"
                style={{ marginTop: 'auto' }}
                disabled
                aria-disabled="true"
              >
                + Watchlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NowPlaying;
