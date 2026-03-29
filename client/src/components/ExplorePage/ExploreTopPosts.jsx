import { TrendingUp, ThumbsUp, MessageCircle, Share2, User } from "lucide-react";

export function ExploreTopPosts() {
  const topPosts = [
    {
      id: 1,
      author: "CodeNinja",
      time: "2h ago",
      title: "Just launched my new React project!",
      content: "Took me 3 weeks to build this using Vite, Tailwind, and a lot of coffee. What do you guys think?",
      likes: "1.2k",
      comments: 342,
      bgColor: "bg-[#FFCAAF]"
    },
    {
      id: 2,
      author: "DesignGuru",
      time: "5h ago",
      title: "Brutalism is making a huge comeback.",
      content: "Thick borders, bold pastel colors, and zero drop shadows. We are abandoning the flat corporate style!",
      likes: 892,
      comments: 215,
      bgColor: "bg-[#B5EAD7]"
    },
    {
      id: 3,
      author: "TechBro",
      time: "8h ago",
      title: "AI is writing code faster than me.",
      content: "Should I be worried or should I just become a prompt engineer? Looking for career advice.",
      likes: "4.5k",
      comments: "1.1k",
      bgColor: "bg-[#CBAACB]"
    }
  ];

  return (
    <div className="flex flex-col gap-6 m-2 ml-4 font-display mt-2">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-[40px] w-[40px]" strokeWidth={2.5} />
        <h2 className="text-[32px] font-black">Top Posts Today:-</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPosts.map(post => (
          <div 
            key={post.id} 
            className={`border-[5px] border-black rounded-[30px] p-6 flex flex-col justify-between h-full ${post.bgColor}`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[48px] w-[48px] rounded-full border-[4px] border-black bg-white flex justify-center items-center shrink-0">
                  <User className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-black text-[20px] leading-tight">{post.author}</p>
                  <p className="font-bold text-[16px] opacity-80 leading-tight">{post.time}</p>
                </div>
              </div>
              
              <h3 className="font-black text-[24px] mb-3 leading-tight">{post.title}</h3>
              <p className="font-bold text-[18px] mb-4 line-clamp-3 leading-snug">{post.content}</p>
            </div>
            
            <div className="flex items-center justify-between border-t-[4px] border-black pt-4 mt-2">
              <div className="flex gap-5">
                <div className="flex items-center gap-2 font-black text-[18px] cursor-pointer">
                  <ThumbsUp className="h-6 w-6 " strokeWidth={2.5} />
                  {post.likes}
                </div>
                <div className="flex items-center gap-2 font-black text-[18px] cursor-pointer">
                  <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
                  {post.comments}
                </div>
              </div>
              <div className="bg-white border-[4px] border-black rounded-full p-2 cursor-pointer">
                <Share2 className="h-5 w-5" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
