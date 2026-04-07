export function ProfileTabs() {
  return (
    <div className="flex flex-wrap gap-4 mb-10 font-display overflow-x-auto p-4 pl-0">
      <button className="border-[5px] border-black bg-[#F0FF9D] px-8 py-3 rounded-full font-bold text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex-shrink-0 cursor-pointer">
        Posts
      </button>
      <button className="border-[5px] border-black bg-white px-8 py-3 rounded-full font-bold text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex-shrink-0 cursor-pointer">
        Comments
      </button>
      <button className="border-[5px] border-black bg-white px-8 py-3 rounded-full font-bold text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex-shrink-0 cursor-pointer">
        Likes
      </button>
      <button className="border-[5px] border-black bg-white px-8 py-3 rounded-full font-bold text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex-shrink-0 cursor-pointer">
        Dislikes
      </button>
    </div>
  );
}
