import { Circle, UserPlus, User, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../api/usersApi";
import { followersApi } from "../../api/followersApi";
import { useAuth } from "../../context/AuthContext";

function PersonCard({ person, bgColor }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(person.followers_count || 0);

  useEffect(() => {
    const checkStatus = async () => {
      if (user?.username && person.username !== user.username) {
        try {
          const res = await followersApi.checkFollowStatus(person.username);
          setIsFollowing(res.data?.isFollowing);
        } catch (error) {
          console.error("Error checking follow status:", error);
        }
      }
    };
    checkStatus();
  }, [person.username, user?.username]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await followersApi.unfollowUser(person.username);
        setIsFollowing(false);
        setFollowerCount((prev) => Math.max(0, prev - 1));
      } else {
        await followersApi.followUser(person.username);
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  const isOwnProfile = user?.username === person.username;

  return (
    <div className={`border-[5px] rounded-[30px] flex items-center justify-between border-black ${bgColor} p-4`}>
      <div 
        className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate(`/${person.username}`)}
      >
        <div className="bg-black text-white rounded-full p-2">
          <Circle className="h-[40px] w-[40px]" />
        </div>
        <div>
          <h3 className="text-[24px] font-black leading-tight">{person.username}</h3>
          <p className="text-md font-bold text-gray-700">{followerCount} followers</p>
        </div>
      </div>
      {!isOwnProfile && (
        <button 
          onClick={handleFollowToggle}
          className={`p-3 rounded-full flex items-center gap-2 font-bold px-5 transition-colors border-[3px] border-black ${isFollowing ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          {isFollowing ? (
            <><UserCheck className="h-5 w-5" /> Following</>
          ) : (
            <><UserPlus className="h-5 w-5" /> Follow</>
          )}
        </button>
      )}
    </div>
  );
}

export function ExplorePeople(){
  const [peopleData, setPeopleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await usersApi.fetchAllUsersExplore();
        setPeopleData(response.data?.users?.slice(0, 4) || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const bgColors = ["bg-[#F3E8FF]", "bg-[#FFE5E5]", "bg-[#E2F0CB]", "bg-[#FFE1D1]"];

  if (isLoading) {
    return <div className="text-center font-bold text-xl m-4 mt-8">Loading people...</div>;
  }

  return (
    <div className="m-4 mb-2">
      <div className="flex items-center gap-3 mb-4">
        <User className="h-[40px] w-[40px]" strokeWidth={2.5}/>
        <div className="text-[32px] font-bold">Discover People:-</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
        {peopleData.map((person, index) => (
          <PersonCard key={person.user_id} person={person} bgColor={bgColors[index % bgColors.length]} />
        ))}
      </div>
    </div>
  )
}