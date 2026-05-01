import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Circle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { postsApi } from "../../api/postsApi";

export function ProfileActivity() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAllPostsUser();
        setPosts(response.data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center font-bold text-xl mt-8">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center font-bold text-xl mt-8">No posts yet!</div>;
  }

  const bgColors = ["bg-[#FFAA8C]", "bg-[#C7E9B0]", "bg-[#FFD966]", "bg-[#8CB8FF]"];

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post, index) => {
        const bgColor = bgColors[index % bgColors.length];
        
        const postDate = new Date(post.created_at).toLocaleDateString();

        return (
          <div key={post.post_id} className={`border-[5px] rounded-[35px] ${bgColor} border-black p-6 font-display shadow-[8px_8px_0px_rgba(0,0,0,1)]`}>
            <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
              <div className="flex items-center">
                <Circle className="h-[36px] w-[36px] mr-2" />
                <p className="font-bold text-[32px] mt-0 mb-0">{user?.username}</p>
              </div>
              <p className="mt-2 text-[20px] font-bold">{postDate}</p>
            </div>

            <hr className="h-px border-t-[3px] border-black bg-black mb-4" />

            <div>
              <p className="text-[28px] font-bold mb-4">{post.content}</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="border-[4px] border-black bg-white rounded-full px-5 py-2 flex items-center justify-center gap-4 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-7 w-7" strokeWidth={2.5} />
                  <p className="text-xl font-bold">0</p>
                </div>
                <div className="w-[4px] h-8 bg-black rounded"></div>
                <ThumbsDown className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <div className="border-[4px] border-black bg-[#D9D9D9] rounded-full px-5 py-2 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <MessageCircle className="h-7 w-7" strokeWidth={2.5} />
                <p className="text-xl font-bold">0</p>
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
