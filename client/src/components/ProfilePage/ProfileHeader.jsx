import { Circle, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";
import { usersApi } from "../../api/usersApi";

export function ProfileHeader({ username }) {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    bio: "No bio provided yet.",
    followers_count: 0,
    followings_count: 0,
    posts_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (username) {
          const response = await usersApi.fetchUsername(username);
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

    fetchProfile();
  }, [username]);

  if (isLoading) {
    return <div className="text-center font-bold text-xl mb-8">Loading profile...</div>;
  }

  return (
    <div className="border-[5px] border-black rounded-[35px] bg-[#A8E6CF] p-8 mb-8 font-display shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 items-center md:items-start relative mt-4">
      <div className="bg-white border-[5px] border-black rounded-full h-[150px] w-[150px] flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-colors cursor-pointer">
        <Circle className="h-24 w-24 stroke-black" strokeWidth={1.5} />
      </div>
      
      <div className="flex-1 flex flex-col justify-center w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-[48px] font-bold leading-none mb-2">{profileData.first_name} {profileData.last_name}</h1>
            <p className="text-[22px] font-bold text-gray-700">@{profileData.username}</p>
          </div>
          <button className="border-[5px] border-black bg-[#FD7EAF] px-6 py-3 rounded-[20px] font-bold text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-2 flex-shrink-0 active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Edit3 className="w-6 h-6 stroke-black" strokeWidth={2.5}/> Edit Profile
          </button>
        </div>
        
        <p className="text-[24px] font-bold mb-8 max-w-2xl leading-snug">
          {profileData.bio}
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="bg-white border-[4px] border-black rounded-[20px] px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full sm:w-auto text-center">
            <p className="text-[32px] font-bold leading-none">{profileData.followers_count}</p>
            <p className="text-[18px] font-bold uppercase mt-1">Followers</p>
          </div>
          <div className="bg-white border-[4px] border-black rounded-[20px] px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full sm:w-auto text-center">
            <p className="text-[32px] font-bold leading-none">{profileData.followings_count}</p>
            <p className="text-[18px] font-bold uppercase mt-1">Following</p>
          </div>
          <div className="bg-white border-[4px] border-black rounded-[20px] px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full sm:w-auto text-center">
            <p className="text-[32px] font-bold leading-none">{profileData.posts_count}</p>
            <p className="text-[18px] font-bold uppercase mt-1">Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
