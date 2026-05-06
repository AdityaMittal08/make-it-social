import { Circle, Edit3, UserPlus, UserCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../api/usersApi";
import { followersApi } from "../../api/followersApi";
import { useAuth } from "../../context/AuthContext";

function UserListModal({ title, isOpen, onClose, fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchUsers()
        .then((res) => {
          setUsers(res.data?.followers || res.data?.following || []);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, fetchUsers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-[5px] border-black rounded-[30px] p-6 w-full max-w-md shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center mb-6 border-b-[4px] border-black pb-4">
          <h2 className="text-[28px] font-black">{title}</h2>
          <button onClick={onClose} className="p-2 bg-gray-200 hover:bg-gray-300 border-[3px] border-black rounded-full transition-colors active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <X className="w-6 h-6 stroke-black" strokeWidth={3} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {loading ? (
            <div className="font-bold text-center py-4">Loading loading...</div>
          ) : users.length === 0 ? (
            <div className="font-bold text-center py-4 text-gray-500">No users found.</div>
          ) : (
            users.map((u) => (
              <div 
                key={u.username} 
                onClick={() => {
                  onClose();
                  navigate(`/${u.username}`);
                }}
                className="flex items-center justify-between p-3 border-[3px] border-black rounded-[15px] cursor-pointer hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-black text-white rounded-full p-2">
                    <Circle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-lg leading-tight">{u.first_name || ''} {u.last_name || ''}</p>
                    <p className="font-bold text-gray-600">@{u.username}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function ProfileHeader({ username }) {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const isOwnProfile = user?.username === username;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (username) {
          const response = await usersApi.fetchUsername(username);
          if (response?.data?.userData) {
            setProfileData((prev) => ({
              ...prev,
              ...response.data.userData
            }));
          }
          
          if (!isOwnProfile && user?.username) {
            const followStatus = await followersApi.checkFollowStatus(username);
            setIsFollowing(followStatus.data?.isFollowing);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username, user?.username, isOwnProfile]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await followersApi.unfollowUser(username);
        setIsFollowing(false);
        setProfileData(prev => ({ ...prev, followers_count: Math.max(0, prev.followers_count - 1) }));
      } else {
        await followersApi.followUser(username);
        setIsFollowing(true);
        setProfileData(prev => ({ ...prev, followers_count: prev.followers_count + 1 }));
      }
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

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
          {isOwnProfile ? (
            <button className="border-[5px] border-black bg-[#FD7EAF] px-6 py-3 rounded-[20px] font-bold text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-2 flex-shrink-0 active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Edit3 className="w-6 h-6 stroke-black" strokeWidth={2.5}/> Edit Profile
            </button>
          ) : (
            <button 
              onClick={handleFollowToggle}
              className={`border-[5px] border-black px-6 py-3 rounded-[20px] font-bold text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-2 flex-shrink-0 active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_rgba(0,0,0,1)] transition-all ${isFollowing ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              {isFollowing ? (
                <><UserCheck className="w-6 h-6 stroke-black" strokeWidth={2.5}/> Following</>
              ) : (
                <><UserPlus className="w-6 h-6 stroke-white" strokeWidth={2.5}/> Follow</>
              )}
            </button>
          )}
        </div>
        
        <p className="text-[24px] font-bold mb-8 max-w-2xl leading-snug">
          {profileData.bio}
        </p>

        <div className="flex flex-wrap gap-4">
          <div 
            onClick={() => isOwnProfile && setShowFollowers(true)}
            className={`bg-white border-[4px] border-black rounded-[20px] px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full sm:w-auto text-center ${isOwnProfile ? 'cursor-pointer hover:bg-gray-100 transition-colors active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_rgba(0,0,0,1)]' : ''}`}
          >
            <p className="text-[32px] font-bold leading-none">{profileData.followers_count}</p>
            <p className="text-[18px] font-bold uppercase mt-1">Followers</p>
          </div>
          <div 
            onClick={() => isOwnProfile && setShowFollowing(true)}
            className={`bg-white border-[4px] border-black rounded-[20px] px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full sm:w-auto text-center ${isOwnProfile ? 'cursor-pointer hover:bg-gray-100 transition-colors active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_rgba(0,0,0,1)]' : ''}`}
          >
            <p className="text-[32px] font-bold leading-none">{profileData.followings_count}</p>
            <p className="text-[18px] font-bold uppercase mt-1">Following</p>
          </div>
          <div className="bg-white border-[4px] border-black rounded-[20px] px-6 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full sm:w-auto text-center">
            <p className="text-[32px] font-bold leading-none">{profileData.posts_count}</p>
            <p className="text-[18px] font-bold uppercase mt-1">Posts</p>
          </div>
        </div>
      </div>

      <UserListModal 
        title="Followers" 
        isOpen={showFollowers} 
        onClose={() => setShowFollowers(false)} 
        fetchUsers={() => followersApi.getFollowers(username)} 
      />
      <UserListModal 
        title="Following" 
        isOpen={showFollowing} 
        onClose={() => setShowFollowing(false)} 
        fetchUsers={() => followersApi.getFollowing(username)} 
      />
    </div>
  );
}
