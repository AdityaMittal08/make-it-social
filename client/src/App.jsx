import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import { LeftSide } from "./components/LeftSide";
import { ExplorePage } from "./components/ExplorePage";

export default function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSide />
        <div className="flex-1 w-full h-full overflow-hidden bg-white">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}