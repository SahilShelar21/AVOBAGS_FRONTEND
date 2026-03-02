// src/config/api.js

// resolve base URL with sensible defaults
// priority: explicit BASE_URL > VITE_API_URL > localhost during dev > production
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  // if running on localhost assume backend on port 5000
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    API_BASE_URL = "http://localhost:5000";
  } else {
    API_BASE_URL = "https://avobags-backend.onrender.com";
  }
}

// optional log in dev
if (import.meta.env.DEV) {
  console.log("Using API_BASE_URL =", API_BASE_URL);
}

export default API_BASE_URL;
