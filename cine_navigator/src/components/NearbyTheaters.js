import React from "react";

// PUBLIC_INTERFACE
function NearbyTheaters() {
  /**
   * NearbyTheaters component: 
   * - Shows a responsive list of top manually-defined theaters, with directions link to Google Maps.
   * - Optionally embeds a small Google Map if environment variable is set.
   * - API key is never exposed outside of the embed where required.
   */

  // Define your top theaters manually.
  // Each theater should have a name, address, and if desired, a lat/lng for map links.
  // Example list (can be replaced or extended):
  const theaters = [
    {
      name: "AMC Metreon 16",
      address: "135 4th St #3000, San Francisco, CA 94103",
      directionsQuery: "AMC+Metreon+16+San+Francisco+CA",
      lat: 37.784778,
      lng: -122.403009
    },
    {
      name: "Alamo Drafthouse Cinema",
      address: "2550 Mission St, San Francisco, CA 94110",
      directionsQuery: "Alamo+Drafthouse+San+Francisco",
      lat: 37.756388,
      lng: -122.418313
    },
    {
      name: "Century San Francisco Centre 9",
      address: "845 Market St #500, San Francisco, CA 94103",
      directionsQuery: "Century+San+Francisco+Centre+9+CA",
      lat: 37.784105,
      lng: -122.406669
    }
  ];

  // Read the Google Maps API key from the React env variable
  // (must start with REACT_APP_ to be injected at build time)
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // Default map center (e.g., mid-point of theaters or a generic city location)
  const mapCenter = theaters.length
    ? { lat: theaters[0].lat, lng: theaters[0].lng }
    : { lat: 37.7749, lng: -122.4194 };

  // Prepare Google Maps embed URL if API key is set
  let embedUrl = null;
  if (googleMapsApiKey) {
    // Center the map to show the area of the theaters
    // We'll use a query around "movie theater" and city for generality.
    // Alternatively, add marker via "&markers=lat,lng"
    embedUrl =
      `https://www.google.com/maps/embed/v1/search` +
      `?key=${googleMapsApiKey}` +
      `&q=movie+theater+near+${encodeURIComponent(theaters[0].address.split(",").pop().trim())}` +
      `&center=${mapCenter.lat},${mapCenter.lng}` +
      `&zoom=13`;
  }

  return (
    <section
      className="theater-section"
      style={{
        margin: "48px auto 0",
        padding: "40px 0 0",
        background: "none",
        maxWidth: 1024,
        width: "100%",
      }}
    >
      <h2 style={{ color: "var(--accent)", marginBottom: 16 }}>Nearby Theaters</h2>
      <div
        style={{
          display: "flex",
          gap: 32,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Map Embed or Placeholder */}
        <div
          style={{
            flex: 2,
            minWidth: 300,
            background: "var(--secondary)",
            borderRadius: 8,
            padding: 18,
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {embedUrl ? (
            <iframe
              title="Nearby Theaters Map"
              src={embedUrl}
              width="100%"
              height={240}
              style={{
                border: 0,
                borderRadius: 6,
                width: "100%",
                minWidth: 200,
                aspectRatio: "16 / 9",
                marginBottom: 14,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                background: "rgba(255,255,255,0.045)",
                border: "1.5px dashed var(--border-color)",
                borderRadius: 6,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                fontSize: 21,
              }}
            >
              [Google Maps Embed Unavailable]
            </div>
          )}
          <div style={{ fontSize: 15, color: "var(--text-secondary)", textAlign: "center" }}>
            {embedUrl
              ? "Search for theaters, pan/zoom, or click map points for more info and directions."
              : (
                <>
                  To view an interactive map of theaters, set your <b>REACT_APP_GOOGLE_MAPS_API_KEY</b> in your <span style={{ fontFamily: "monospace" }}>.env</span> file.
                </>
              )}
          </div>
        </div>
        {/* Theaters List */}
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "var(--secondary)",
            borderRadius: 8,
            padding: 18,
            marginBottom: 24,
          }}
        >
          <strong style={{ color: "var(--accent)" }}>
            Top Nearby Theaters
          </strong>
          <ul style={{ listStyle: "none", margin: 12, padding: 0 }}>
            {theaters.map((theater, idx) => {
              // Google Maps Directions URL (from user location to theater)
              // Use Google Maps Directions: https://www.google.com/maps/dir/?api=1&destination=LAT,LNG (prefer lat/lng for accuracy)
              const destination = theater.lat && theater.lng
                ? `${theater.lat},${theater.lng}`
                : encodeURIComponent(theater.directionsQuery || theater.address);

              const directionsUrl =
                `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

              return (
                <li key={theater.name} style={{ marginBottom: 12 }}>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text-color)",
                      textDecoration: "none",
                      display: "block"
                    }}
                    aria-label={`Directions to ${theater.name} via Google Maps`}
                  >
                    🎟️ <b>{theater.name}</b>
                  </a>
                  <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 1 }}>
                    {theater.address}
                  </div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      marginTop: 7,
                      fontSize: 15,
                      padding: "7px 15px",
                      display: "inline-block",
                    }}
                    aria-label={`Open Google Maps Directions for ${theater.name}`}
                  >
                    Directions
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default NearbyTheaters;
