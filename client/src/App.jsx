import { Routes, Route, Outlet } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import { LeftSide } from "./components/LeftSide";
import { ExplorePage } from "./components/ExplorePage";
import { CreatePage } from "./components/CreatePage";
import { LoginPage } from "./auth/LoginPage";
import { SignupPage } from "./auth/SignupPage";

function MainLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSide />
        <div className="flex-1 w-full h-full overflow-hidden bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}