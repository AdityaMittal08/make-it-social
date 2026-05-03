import {
  Circle,
  Bell,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postsApi } from "../../api/postsApi";
import "./RightSide.css";

export function Middle() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleReaction = async (postId, reactionType) => {
    try {
      const response = await postsApi.reactToPost(postId, reactionType);
      
      setPosts(currentPosts => currentPosts.map(post => {
        if (post.post_id === postId) {
          const action = response.action; 
          let newLikes = parseInt(post.likes_count || 0);
          let newDislikes = parseInt(post.dislike_count || post.dislikes_count || 0);
          const oldReaction = post.user_reaction;

          if (action === 'added') {
            if (reactionType === 'like') newLikes++;
            if (reactionType === 'dislike') newDislikes++;
          } else if (action === 'updated') {
            if (reactionType === 'like') {
              newLikes++;
              newDislikes = Math.max(0, newDislikes - 1);
            } else if (reactionType === 'dislike') {
              newDislikes++;
              newLikes = Math.max(0, newLikes - 1);
            }
          } else if (action === 'removed') {
            if (oldReaction === 'like') newLikes = Math.max(0, newLikes - 1);
            if (oldReaction === 'dislike') newDislikes = Math.max(0, newDislikes - 1);
          }

          return { 
            ...post, 
            likes_count: newLikes, 
            dislike_count: newDislikes,
            dislikes_count: newDislikes,
            user_reaction: action === 'removed' ? null : reactionType
          };
        }
        return post;
      }));
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

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
                  <div className="flex items-center" onClick={() => navigate(`/${post.username}`)}>
                    <Circle className="h-[36px] w-[36px] m-2 mb-0" />
                    <p className="font-bold text-[32px] m-2 mt-0 mb-0">{post.username || "Unknown User"}</p>
                  </div>
                  <p className="mt-5 text-[20px]">{postDate}</p>
                </div>

                <hr className="h-px border-t-[3px] border-black bg-black" />

                <div 
                  className="mt-4 cursor-pointer hover:bg-black/5 p-2 rounded-xl transition-colors"
                  onClick={() => navigate(`/post/${post.post_id}`)}
                >
                  <p className="text-[28px] font-bold">{post.content}</p>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-3 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <div 
                      className={`flex items-center gap-2 cursor-pointer ${post.user_reaction === 'like' ? 'text-blue-600' : ''}`}
                      onClick={() => handleReaction(post.post_id, 'like')}
                    >
                      <ThumbsUp className="h-6 w-6" fill={post.user_reaction === 'like' ? 'currentColor' : 'none'} />
                      <p className="text-lg font-bold">{post.likes_count || 0}</p>
                    </div>
                    <div 
                      className={`cursor-pointer ${post.user_reaction === 'dislike' ? 'text-red-600' : ''}`}
                      onClick={() => handleReaction(post.post_id, 'dislike')}
                    >
                      <ThumbsDown className="h-6 w-6" fill={post.user_reaction === 'dislike' ? 'currentColor' : 'none'} />
                    </div>
                  </div>
                  <div 
                    onClick={() => navigate(`/post/${post.post_id}`)}
                    className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-[#c0c0c0] transition-colors"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <p className="text-lg font-bold">{post.comments_count || 0}</p>
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
