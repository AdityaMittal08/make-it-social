import { Link } from "react-router-dom"
import { Circle, Bell } from "lucide-react"
import { useAuth } from "../../../context/AuthContext"
import { usersApi } from "../../../api/usersApi";
import { useState, useEffect } from "react";

export function UserProfile(){
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
      username: "",
      followers_count: 0,
      followings_count: 0,
      posts_count: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user?.id) {
          const response = await usersApi.fetchUserById();
          if (response?.data?.userData) {
            setProfileData((prev) => ({
              ...prev,
              ...response.data.userData
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div className="text-center font-bold text-xl mb-8">Loading profile...</div>;
  }
  
  if (!user) {
    return (
      <div className="border-[25px] rounded-[50px] bg-[#FFAA8C] border-black p-6 text-center">
        <p className="font-bold text-[24px]">Welcome!</p>
        <p className="font-bold text-[18px] mt-2 mb-4">Please log in to see your profile.</p>
        <Link to="/login" className="bg-white px-6 py-2 rounded-full font-bold border-2 border-black">
          Log in
        </Link>
      </div>
    );
  }


  return (
    <>
      <div className="border-[5px] rounded-[50px] bg-[#FFAA8C] border-black p-3 flex-col">
      <div className="flex m-2 pb-4">
        <Circle className="h-[50px] w-[50px] m-2 mb-0"/>
        <div className="relative">
          <Link to={`/${user.username}`} className="font-bold text-[36px] m-2 mt-0 mb-0">{user.username}</Link>
          <p className="absolute top-[50px] font-bold left-[10px]">{profileData.followers_count} followers</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="bg-white pl-5 pr-5 rounded-[35px]">
          <p className="font-bold text-[20px] leading-[36px]">{profileData.followings_count} Following</p>
        </div>
        <div className="bg-white pl-5 pr-5 rounded-[35px]">
          <p className="font-bold text-[20px] leading-[36px]">{profileData.posts_count} Posts</p>
        </div>
      </div>
      <div className="flex-col m-2">
        <div className="flex justify-center">
          <p className="font-bold text-[24px]">Notfications</p>
          <Bell className="h-[28px] w-[28px] right-[10px] m-2 mb-0" />
        </div>
        <div>
          <div className="p-1 pl-4 pr-4 bg-[#D9D9D9] rounded-[25px] m-2">
            <p className="font-bold text-[18px]">Ridhima liked your post</p>
          </div>
          <div className="p-1 pl-4 pr-4 bg-[#D9D9D9] rounded-[25px] m-2">
            <p className="font-bold text-[18px]">Somnath followed you</p>
          </div>

          <div className="p-1 pl-4 pr-4 m-2 flex justify-center">
            <p className="font-bold text-[18px]">...</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
