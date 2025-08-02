// src/App.jsx
import { Routes, Route } from "react-router-dom";
import PlayerPage from "./pages/PlayerPage";
import SearchPage from "./pages/SearchPage";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="relative pt-8 pb-16">
      {" "}
      <Routes>
        <Route path="/" element={<PlayerPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
