import { Routes, Route, Outlet } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { GuestMainPage } from "./components/GuestMainPage";
import { Navbar } from "./components/Navbar";
import { LeftSide } from "./components/LeftSide";
import { ExplorePage } from "./components/ExplorePage";
import { CreatePage } from "./components/CreatePage";
import { LoginPage } from "./components/AuthPage/LoginPage";
import { SignupPage } from "./components/AuthPage/SignupPage";
import { ProfilePage } from "./components/ProfilePage";
import { PostPage } from "./components/PostPage";
import ProtectedRoutes from "./components/ProtectedAuth/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";

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
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      {!isAuthenticated && (
        <Route path="/" element={<GuestMainPage />} />
      )}

      <Route element={<MainLayout />}>
        {isAuthenticated && (
          <Route path="/" element={<MainPage />} />
        )}
        
        <Route path="/explore" element={<ExplorePage />} />
        
        <Route element={<ProtectedRoutes />}>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/:username" element={<ProfilePage />} />
        </Route>
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}