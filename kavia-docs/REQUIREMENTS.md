# CineNavigator Requirements

## 1. Introduction

CineNavigator is a modern, dark-themed React web application that enables users to discover now playing movies, search movie titles, find nearby theaters, and manage a persistent watchlist, while tracking key user interactions using Google Analytics 4 (GA4). The application integrates with external APIs including TMDB, Google Maps, and GA4, with all sensitive API credentials managed securely using environment variables.

---

## 2. System Requirements

- **Operating System:** Windows 10+, macOS 10.15+, or any modern Linux distribution
- **Node.js Version:** v16.x or above
- **npm Version:** 7.x or above
- **Browsers Supported:** Chrome (latest two versions), Firefox (latest two versions), Safari (latest two versions), Edge (latest two versions)
- **Internet Connection:** Required for API requests to TMDB, Google Maps, and analytics endpoints

---

## 3. Functional Requirements

### 3.1. Theme and UI

- The app uses a modern, responsive dark UI.
- CSS variables are used for theme colors and are modifiable to adjust branding.
- Main layout features a fixed header with logo and global navigation; main view for movie data, and sidebar/modal for watchlist.

### 3.2. Now Playing (TMDB Movies) Integration

- The application fetches a list of currently playing movies from the TMDB API.
- Each movie displays poster, title, and overview in a grid layout.
- API requests to TMDB must use a TMDB API key, which is accessed via an environment variable.

### 3.3. Movie Search

- Users can search for movies by title.
- Search queries use the TMDB API and display results dynamically.

### 3.4. Watchlist Management

- Users can add or remove movies to a personal watchlist.
- The watchlist is stored locally in the browser using `localStorage`.
- The watchlist is persistent across page reloads and browser sessions.

### 3.5. Nearby Theaters Feature

- Users can view a list of top nearby theaters (static or dynamically found).
- Each theater listing provides a direct link to Google Maps directions.
- Google Maps is integrated for location display/search; uses the Google Maps API key from environment variables.

### 3.6. Google Analytics 4 (GA4) Event Tracking

- The application must track and report the following events to GA4:
    - `movie_added_to_watchlist`
    - `movie_searched`
    - `theater_directions_clicked`
- GA4 events are sent using the GA4 API key from environment variables.

---

## 4. Non-Functional Requirements

### 4.1. Security

- **API Keys:**  
  All external service API keys (TMDB API, Google Maps API, GA4 Measurement ID or API Key) must **never** be hard-coded or committed to the codebase.
    - API keys must be referenced using environment variables as set in a `.env` file.
    - Example keys:
        - `REACT_APP_TMDB_API_KEY`
        - `REACT_APP_GOOGLE_MAPS_API_KEY`
        - `REACT_APP_GA4_MEASUREMENT_ID`
    - Include `.env` in `.gitignore` to prevent accidental commits.
- **.env File Instructions:**
    1. Copy `.env.example` to `.env`.
    2. Fill in the API keys for TMDB, Google Maps, and GA4.
    3. Never commit actual `.env` files with sensitive data to version control.

### 4.2. Performance

- App should load initial movie data (now playing) within 2 seconds on a typical broadband connection.
- UI transitions and interactions must remain smooth at 60fps on desktop browsers for main flows (movie browsing, adding to watchlist).

### 4.3. Compatibility

- The application must render and function correctly on current major browsers (see system requirements).
- Responsive design: usable on desktops, tablets, and smartphones.

### 4.4. Maintainability

- Follow idiomatic, modern React coding practices (function components, hooks).
- Lint code using ESLint (configuration present in `cine_navigator/eslint.config.mjs`).
- Keep dependencies minimal and up-to-date.

### 4.5. Accessibility

- App must be navigable using keyboard only.
- All interactive elements should have accessible labels.
- Color choices must pass WCAG AA contrast standards.

---

## 5. API Key & Environment Variable Management

### 5.1. Environment Variables in React

- React applications access environment variables if their names begin with `REACT_APP_`.
- Example `.env.example`:
  ```
  REACT_APP_TMDB_API_KEY=your_tmdb_api_key
  REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  REACT_APP_GA4_MEASUREMENT_ID=your_ga4_measurement_id
  ```
- Documentation (README, onboarding docs) must instruct developers to create a `.env` (never to commit it) and where to obtain/replace API keys.

### 5.2. Good Practices

- Do not echo or log API keys anywhere in the UI or console.
- Use environment variables in all scripts and deployment configs.
- Review `.gitignore` to ensure that `.env` and similar sensitive configuration files are excluded from source control.

---

## 6. Out of Scope

- User authentication (sign up/in)
- Social login or sharing features
- Payment processing
- Backend server (project is frontend-only)

---

## 7. Appendix: Quick Setup

1. `cp .env.example .env`  
   Add your API keys in `.env`.

2. `npm install`  
   Install dependencies.

3. `npm start`  
   Run the development server.

---

## 8. References

- [TMDB API Docs](https://developers.themoviedb.org/3)
- [Google Maps API Docs](https://developers.google.com/maps/documentation)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
