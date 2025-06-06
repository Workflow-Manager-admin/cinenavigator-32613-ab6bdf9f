import React from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Header() {
  /**
   * Header component: Contains app logo and integrated search bar.
   */
  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div className="logo">
          <span className="logo-symbol">*</span> CineNavigator
        </div>
        <form className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--secondary)', borderRadius: 6 }}>
          {/* Placeholder for Search input */}
          <input
            type="text"
            placeholder="Search movies..."
            aria-label="Search movies"
            disabled
            style={{
              padding: '6px 12px',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              color: 'var(--text-color)',
              fontSize: 16,
              outline: 'none',
            }}
          />
        </form>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function MovieGrid() {
  /**
   * MovieGrid component: Placeholder for displaying movies in a responsive grid.
   */
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
          {/* Placeholder movie cards */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="movie-card"
              style={{
                background: 'var(--secondary)',
                borderRadius: 8,
                padding: 16,
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 220,
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 160,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: 32,
                }}
              >
                🎬
              </div>
              <div style={{ color: 'var(--text-color)', fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>
                Movie Title
              </div>
              <button className="btn" style={{ marginTop: 'auto' }} disabled>
                + Watchlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function WatchlistSidebar() {
  /**
   * WatchlistSidebar component: Placeholder for watchlist (sidebar/modal).
   */
  // For now, it is a right sidebar.
  return (
    <aside
      className="watchlist-sidebar"
      style={{
        background: 'var(--secondary)',
        color: 'var(--text-color)',
        minWidth: 270,
        maxWidth: 340,
        borderLeft: '1px solid var(--border-color)',
        padding: 24,
        position: 'sticky',
        top: 90,
        height: 'calc(100vh - 90px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 5,
      }}
    >
      <h3 style={{ color: 'var(--accent)', marginTop: 0, marginBottom: 14 }}>🎞️ Watchlist</h3>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
        (Persistent via localStorage; add movies from the grid.)
      </div>
      <ul style={{ padding: 0, margin: 16, listStyle: 'none', flex: 1 }}>
        <li style={{ marginBottom: 12, color: 'var(--text-secondary)' }}><em>Add movies to see them here.</em></li>
      </ul>
    </aside>
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
   */
  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--primary)' }}>
      <Header />
      {/* Main content: grid layout with movie grid and watchlist sidebar */}
      <main style={{ display: 'flex', flex: 1, marginTop: 80, alignItems: 'flex-start' }}>
        {/* Movie grid section */}
        <MovieGrid />
        {/* Watchlist sidebar */}
        <div style={{ minWidth: 0 }}>
          <WatchlistSidebar />
        </div>
      </main>
      {/* Theaters section below main grid */}
      <TheaterSection />
    </div>
  );
}

export default App;
