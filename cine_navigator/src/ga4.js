/// Simple GA4 analytics helper for React apps using gtag.js, with graceful degradation if no Measurement ID provided.
/// Usage: Call initGA4() in your entrypoint (App.js), and use logGA4Event to track events.

let ga4Initialized = false;

/**
 * PUBLIC_INTERFACE
 * Initialize Google Analytics 4 if measurement ID is present.
 * Loads gtag.js non-blocking and sets up window.gtag.
 * Returns true if initialized, false if not.
 */
export function initGA4(measurementId) {
  if (!measurementId) {
    // No analytics; nothing to do.
    return false;
  }
  if (window.gtag || ga4Initialized) {
    return true;
  }
  // Insert gtag.js script tag asynchronously.
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  ga4Initialized = true;
  return true;
}

/**
 * PUBLIC_INTERFACE
 * Log a GA4 event (non-blocking/no-op if not available).
 * eventName: string ('movie_added_to_watchlist' etc.)
 * params: object (additional event params)
 */
export function logGA4Event(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  // Else: gracefully do nothing if GA is not loaded.
}
