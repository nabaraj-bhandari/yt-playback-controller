// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MusicPlayerProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MusicPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
