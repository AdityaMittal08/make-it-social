export function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = ["Posts", "Comments", "Likes", "Dislikes"];
  
  return (
    <div className="flex flex-wrap gap-4 mb-10 font-display overflow-x-auto p-4 pl-0">
      {tabs.map((tab) => (
        <button 
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`border-[5px] border-black px-8 py-3 rounded-full font-bold text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex-shrink-0 cursor-pointer transition-colors ${activeTab === tab ? "bg-[#F0FF9D]" : "bg-white hover:bg-gray-100"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
