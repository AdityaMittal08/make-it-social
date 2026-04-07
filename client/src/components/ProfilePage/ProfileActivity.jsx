import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Circle } from "lucide-react";

export function ProfileActivity() {
  return (
    <div className="flex flex-col gap-8">
      <div className="border-[5px] rounded-[35px] bg-[#FFAA8C] border-black p-6 font-display shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
          <div className="flex items-center">
            <Circle className="h-[36px] w-[36px] mr-2"/>
            <p className="font-bold text-[32px] mt-0 mb-0">AdiStarc</p>
          </div>
          <p className="mt-2 text-[20px] font-bold">2hr</p>
        </div>

        <hr className="h-px border-t-[3px] border-black bg-black mb-4"/>

        <div>
          <p className="text-[28px] font-bold mb-4">Just hit 1.2K followers! Thanks everyone! 🎉 What are we building next?</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="border-[4px] border-black bg-white rounded-full px-5 py-2 flex items-center justify-center gap-4 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-7 w-7" strokeWidth={2.5}/>
              <p className="text-xl font-bold">4.2K</p>
            </div>
            <div className="w-[4px] h-8 bg-black rounded"></div>
            <ThumbsDown className="h-7 w-7" strokeWidth={2.5}/>
          </div>
          <div className="border-[4px] border-black bg-[#D9D9D9] rounded-full px-5 py-2 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <MessageCircle className="h-7 w-7" strokeWidth={2.5}/>
            <p className="text-xl font-bold">342</p>
          </div>
          <div className="border-[4px] border-black bg-[#D9D9D9] rounded-full px-5 py-2 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <Share2 className="h-7 w-7" strokeWidth={2.5}/>
            <p className="text-xl font-bold">45</p>
          </div>
        </div>
      </div>
      
      <div className="border-[5px] rounded-[35px] bg-[#C7E9B0] border-black p-6 font-display shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <div className="flex m-2 mt-0 mb-0 pb-2 justify-between">
          <div className="flex items-center">
            <Circle className="h-[36px] w-[36px] mr-2"/>
            <p className="font-bold text-[32px] mt-0 mb-0">AdiStarc</p>
          </div>
          <p className="mt-2 text-[20px] font-bold">1d</p>
        </div>

        <hr className="h-px border-t-[3px] border-black bg-black mb-4"/>

        <div>
          <p className="text-[28px] font-bold mb-4">What's the best database for a neo-brutalist social app? Thinking Postgres SQL but open to options! 🤔</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="border-[4px] border-black bg-white rounded-full px-5 py-2 flex items-center justify-center gap-4 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-7 w-7" strokeWidth={2.5}/>
              <p className="text-xl font-bold">890</p>
            </div>
            <div className="w-[4px] h-8 bg-black rounded"></div>
            <ThumbsDown className="h-7 w-7" strokeWidth={2.5}/>
          </div>
          <div className="border-[4px] border-black bg-[#D9D9D9] rounded-full px-5 py-2 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <MessageCircle className="h-7 w-7" strokeWidth={2.5}/>
            <p className="text-xl font-bold">156</p>
          </div>
          <div className="border-[4px] border-black bg-[#D9D9D9] rounded-full px-5 py-2 flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <Share2 className="h-7 w-7" strokeWidth={2.5}/>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
