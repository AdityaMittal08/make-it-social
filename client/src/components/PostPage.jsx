import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Circle,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  ArrowLeft,
  Send
} from "lucide-react";
import { postsApi } from "../api/postsApi";
import { commentsApi } from "../api/commentsApi";
import { useAuth } from "../context/AuthContext";

export function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postRes = await postsApi.getPostById(postId);
        setPost(postRes.data?.post || postRes.post || postRes);

        const commentsRes = await commentsApi.getAllCommentsPost(postId);
        setComments(commentsRes.data?.comments || commentsRes.comments || []);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleReaction = async (reactionType) => {
    try {
      const response = await postsApi.reactToPost(postId, reactionType);
      
      setPost(currentPost => {
        const action = response.action; 
        let newLikes = parseInt(currentPost.likes_count || 0);
        let newDislikes = parseInt(currentPost.dislike_count || 0);
        const oldReaction = currentPost.user_reaction;

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
          ...currentPost, 
          likes_count: newLikes, 
          dislike_count: newDislikes,
          user_reaction: action === 'removed' ? null : reactionType
        };
      });
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await commentsApi.createComment(postId, { content: newComment });
      const createdComment = res.data?.comment || res.data?.post || res;
      
      setComments(prev => [createdComment, ...prev]);
      setPost(prev => ({...prev, comments_count: parseInt(prev.comments_count || 0) + 1}));
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentsApi.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.comment_id !== commentId));
      setPost(prev => ({...prev, comments_count: Math.max(0, parseInt(prev.comments_count || 0) - 1)}));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (isLoading) {
    return <div className="flex-1 p-6 h-full flex items-center justify-center font-display font-bold text-xl">Loading post...</div>;
  }

  if (!post || (!post.post_id && !post.content)) {
    return (
      <div className="flex-1 p-6 h-full flex flex-col items-center justify-center font-display">
        <p className="font-bold text-xl mb-4">Post not found.</p>
        <button onClick={() => navigate(-1)} className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2">
          <ArrowLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  const postDate = new Date(post.created_at).toLocaleDateString();

  return (
    <div className="flex-1 p-6 pt-4 h-full overflow-y-auto font-display">
      <div className="mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-bold hover:underline"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <div className="border-[5px] rounded-[35px] bg-[#C7E9B0] border-black mt-[8px] p-4 mb-8">
        <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
          <div className="flex items-center">
            <Circle className="h-[36px] w-[36px] m-2 mb-0 border-black border-[2px] rounded-full" />
            <p className="font-bold text-[32px] m-2 mt-0 mb-0">{post.username || "Unknown User"}</p>
          </div>
          <p className="mt-5 text-[20px]">{postDate}</p>
        </div>

        <hr className="h-px border-t-[3px] border-black bg-black" />

        <div className="mt-4 mb-4">
          <p className="text-[28px] font-bold">{post.content}</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-2">
          <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-3 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            <div 
              className={`flex items-center gap-2 cursor-pointer ${post.user_reaction === 'like' ? 'text-blue-600' : ''}`}
              onClick={() => handleReaction('like')}
            >
              <ThumbsUp className="h-6 w-6" fill={post.user_reaction === 'like' ? 'currentColor' : 'none'} />
              <p className="text-lg font-bold">{post.likes_count || 0}</p>
            </div>
            <div 
              className={`cursor-pointer ${post.user_reaction === 'dislike' ? 'text-red-600' : ''}`}
              onClick={() => handleReaction('dislike')}
            >
              <ThumbsDown className="h-6 w-6" fill={post.user_reaction === 'dislike' ? 'currentColor' : 'none'} />
            </div>
          </div>
          <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-default">
            <MessageCircle className="h-6 w-6" />
            <p className="text-lg font-bold">{post.comments_count || 0}</p>
          </div>
          <div className="border-[2px] border-black bg-[#D9D9D9] rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            <Share2 className="h-6 w-6" />
            <p className="text-lg font-bold">0</p>
          </div>
        </div>
      </div>

      <hr className="my-8 border-black border-t-[3px]" />

      <div>
        <h3 className="text-2xl font-bold mb-6">Comments ({post.comments_count || 0})</h3>

        <form onSubmit={handleCommentSubmit} className="mb-8 flex gap-3">
          <input 
            type="text" 
            placeholder="Write a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 border-[3px] border-black rounded-[20px] px-4 py-3 font-bold text-lg outline-none focus:bg-gray-50"
          />
          <button 
            type="submit" 
            disabled={!newComment.trim() || isSubmitting}
            className="bg-black text-white px-6 rounded-[20px] border-[3px] border-black font-bold flex items-center justify-center disabled:opacity-50"
          >
            <Send size={24} />
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {!comments || comments.length === 0 ? (
            <p className="text-gray-500 font-bold text-lg">No comments yet. Be the first to reply!</p>
          ) : (
            comments.map(comment => (
              <div key={comment.comment_id} className="border-[3px] border-black rounded-[20px] p-4 bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Circle className="h-8 w-8 border-black border-[2px] rounded-full" />
                    <div>
                      <p className="font-bold text-lg">{comment.username || comment.user?.username || "Unknown User"}</p>
                      <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  {(user?.id === comment.user_id || user?.id === comment.commented_by) && (
                    <button 
                      onClick={() => handleDeleteComment(comment.comment_id)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-lg mt-2 ml-10">
                  {comment.is_deleted ? <span className="italic text-gray-500">[This comment was deleted]</span> : comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}