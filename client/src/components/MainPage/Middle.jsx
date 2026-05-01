import {
  Circle,
  Bell,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { postsApi } from "../../api/postsApi";
import "./RightSide.css";

export function Middle() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAllPostsFeed();
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
    return <div className="flex-1 p-6 pt-1 h-full overflow-y-auto font-display scroll-left text-center font-bold text-xl">Loading posts...</div>;
  }

  const bgColors = ["bg-[#FD7EAF]", "bg-[#A8E6CF]", "bg-[#C7E9B0]", "bg-[#FFF0F5]"];

  return (
    <>
      <div className="flex-1 p-6 pt-1 h-full overflow-y-auto font-display scroll-left">
        {posts.length === 0 ? (
           <div className="text-center font-bold text-xl mt-8">No posts to show! Create one!</div>
        ) : (
          posts.map((post, index) => {
            const bgColor = bgColors[index % bgColors.length];
            const postDate = new Date(post.created_at).toLocaleDateString();

            return (
              <div key={post.post_id} className={`border-[5px] rounded-[35px] ${bgColor} border-black mt-[8px] p-4 font-display`}>
                <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
                  <div className="flex items-center">
                    <Circle className="h-[36px] w-[36px] m-2 mb-0" />
                    <p className="font-bold text-[32px] m-2 mt-0 mb-0">{post.username || "Unknown User"}</p>
                  </div>
                  <p className="mt-5 text-[20px]">{postDate}</p>
                </div>

                <hr className="h-px border-t-[3px] border-black bg-black" />

                <div className="mt-4">
                  <p className="text-[28px] font-bold">{post.content}</p>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-3 cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-6 w-6" />
                      <p className="text-lg font-bold">0</p>
                    </div>
                    <ThumbsDown className="h-6 w-6" />
                  </div>
                  <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <MessageCircle className="h-6 w-6" />
                    <p className="text-lg font-bold">0</p>
                  </div>
                  <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <Share2 className="h-6 w-6" />
                    <p className="text-lg font-bold">0</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
