import { TrendingUp, ThumbsUp, MessageCircle, Share2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postsApi } from "../../api/postsApi";

export function ExploreTopPosts() {
  const [topPosts, setTopPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const response = await postsApi.getAllPostsFeed();
        setTopPosts(response.data?.posts?.slice(0, 3) || []);
      } catch (error) {
        console.error("Error fetching top posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  const bgColors = ["bg-[#FFCAAF]", "bg-[#B5EAD7]", "bg-[#CBAACB]", "bg-[#FFE1D1]"];

  if (isLoading) {
    return <div className="text-center font-bold text-xl m-4 mt-8">Loading top posts...</div>;
  }

  if (topPosts.length === 0) {
    return <div className="text-center font-bold text-xl m-4 mt-8">No trending posts yet!</div>;
  }

  return (
    <div className="flex flex-col gap-6 m-2 ml-4 font-display mt-2">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-[40px] w-[40px]" strokeWidth={2.5} />
        <h2 className="text-[32px] font-black">Top Posts Today:-</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPosts.map((post, index) => {
          const postDate = new Date(post.created_at).toLocaleDateString();
          return (
            <div 
              key={post.post_id} 
              className={`border-[5px] border-black rounded-[30px] p-6 flex flex-col justify-between h-full ${bgColors[index % bgColors.length]}`}
            >
              <div>
                <div 
                  className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => navigate(`/${post.username}`)}
                >
                  <div className="h-[48px] w-[48px] rounded-full border-[4px] border-black bg-white flex justify-center items-center shrink-0">
                    <User className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-black text-[20px] leading-tight">{post.username}</p>
                    <p className="font-bold text-[16px] opacity-80 leading-tight">{postDate}</p>
                  </div>
                </div>
                
                <div onClick={() => navigate(`/post/${post.post_id}`)} className="cursor-pointer hover:opacity-80 transition-opacity">
                  {post.title && <h3 className="font-black text-[24px] mb-3 leading-tight line-clamp-1">{post.title}</h3>}
                  <p className="font-bold text-[18px] mb-4 line-clamp-3 leading-snug">{post.content}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t-[4px] border-black pt-4 mt-2">
                <div className="flex gap-5">
                  <div 
                    className="flex items-center gap-2 font-black text-[18px] cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => navigate(`/post/${post.post_id}`)}
                  >
                    <ThumbsUp className="h-6 w-6 " strokeWidth={2.5} />
                    {post.likes_count || 0}
                  </div>
                  <div 
                    className="flex items-center gap-2 font-black text-[18px] cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => navigate(`/post/${post.post_id}`)}
                  >
                    <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
                    {post.comments_count || 0}
                  </div>
                </div>
                <div className="bg-white border-[4px] border-black rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Share2 className="h-5 w-5" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
