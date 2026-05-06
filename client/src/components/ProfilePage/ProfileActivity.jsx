import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postsApi } from "../../api/postsApi";
import { commentsApi } from "../../api/commentsApi";

export function ProfileActivity( {user, activeTab} ) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (activeTab === "Posts") {
          response = await postsApi.getAllPostsUser();
          setData(response.data.posts || []);
        } else if (activeTab === "Likes") {
          response = await postsApi.getLikedPostsUser();
          setData(response.data.posts || []);
        } else if (activeTab === "Dislikes") {
          response = await postsApi.getDislikedPostsUser();
          setData(response.data.posts || []);
        } else if (activeTab === "Comments") {
          response = await commentsApi.getAllCommentsUser();
          setData(response.data.comments || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  if (isLoading) {
    return <div className="text-center font-bold text-xl mt-8">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center font-bold text-xl mt-8">No {activeTab.toLowerCase()} yet!</div>;
  }

  const bgColors = ["bg-[#FFAA8C]", "bg-[#C7E9B0]", "bg-[#FFD966]", "bg-[#8CB8FF]"];

  return (
    <div className="flex flex-col gap-8">
      {data.map((item, index) => {
        const bgColor = bgColors[index % bgColors.length];
        
        const itemDate = new Date(item.created_at).toLocaleDateString();
        
        if (activeTab === "Comments") {
          return (
            <div key={item.comment_id} className={`border-[5px] rounded-[35px] ${bgColor} border-black p-6 font-display shadow-[8px_8px_0px_rgba(0,0,0,1)]`}>
              <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
                <div className="flex items-center">
                  <Circle className="h-[36px] w-[36px] mr-2" />
                  <p className="font-bold text-[32px] mt-0 mb-0">{item.username || user?.username}</p>
                </div>
                <p className="mt-2 text-[20px] font-bold">{itemDate}</p>
              </div>

              <hr className="h-px border-t-[3px] border-black bg-black mb-4" />

              <div 
                className="cursor-pointer hover:bg-black/5 p-2 rounded-xl transition-colors"
                onClick={() => navigate(`/post/${item.post_id}`)}
              >
                <p className="text-[28px] font-bold mb-4">{item.content}</p>
                <p className="text-sm font-bold opacity-70 mt-2">View parent post →</p>
              </div>
            </div>
          );
        }

        return (
          <div key={item.post_id} className={`border-[5px] rounded-[35px] ${bgColor} border-black p-6 font-display shadow-[8px_8px_0px_rgba(0,0,0,1)]`}>
            <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
              <div className="flex items-center">
                <Circle className="h-[36px] w-[36px] mr-2" />
                <p className="font-bold text-[32px] mt-0 mb-0">{item.username || user?.username}</p>
              </div>
              <p className="mt-2 text-[20px] font-bold">{itemDate}</p>
            </div>

            <hr className="h-px border-t-[3px] border-black bg-black mb-4" />

            <div 
              className="cursor-pointer hover:bg-black/5 p-2 rounded-xl transition-colors"
              onClick={() => navigate(`/post/${item.post_id}`)}
            >
              <p className="text-[28px] font-bold mb-4">{item.content}</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="border-[4px] border-black bg-white rounded-full px-5 py-2 flex items-center justify-center gap-4 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-7 w-7" strokeWidth={2.5} />
                  <p className="text-xl font-bold">{item.likes_count || 0}</p>
                </div>
                <div className="w-[4px] h-8 bg-black rounded"></div>
                <ThumbsDown className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <div 
                onClick={() => navigate(`/post/${item.post_id}`)}
                className="border-[4px] border-black bg-[#D9D9D9] rounded-full px-5 py-2 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#c0c0c0] transition-colors"
              >
                <MessageCircle className="h-7 w-7" strokeWidth={2.5} />
                <p className="text-xl font-bold">{item.comments_count || 0}</p>
              </div>
              <div className="border-[4px] border-black bg-[#D9D9D9] rounded-full px-5 py-2 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Share2 className="h-7 w-7" strokeWidth={2.5} />
                <p className="text-xl font-bold">0</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
