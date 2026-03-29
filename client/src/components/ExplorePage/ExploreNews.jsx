import { Newspaper, ArrowUpRight, Rss } from "lucide-react"

export function ExploreNews(){
  const newsData = [
    { 
      id: 1, 
      category: "Technology", 
      title: "AI Model Writes Entire Production App in Just 10 Minutes", 
      description: "A small startup managed to bypass standard SDLC completely using standard tooling combined with a prompt.", 
      time: "2 hours ago",
      bgColor: "bg-[#C3F0CA]" },
    { 
      id: 2, 
      category: "Gaming", 
      title: "New Zelda Title Announced for Next Gen Console Launch", 
      description: "The highly anticipated sequel features a massive fully rotatable world and an overhauled cooking system.", 
      time: "5 hours ago", 
      bgColor: "bg-[#FFDD88]" },
    { 
      id: 3, 
      category: "Science", 
      title: "Researchers Discover New Phase of Matter", 
      description: "Building on theories from 2021, a team of international researchers captured the first footage of time-crystals.", 
      time: "1 day ago", 
      bgColor: "bg-[#89D3F0]" 
    },
  ];

  return (
    <div className="m-4 flex-none">
      <div className="flex items-center gap-3 mb-4">
        <Rss className="h-[40px] w-[40px]" strokeWidth={2.5} />
        <div className="text-[32px] font-bold">Trending News:-</div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-2">
        {newsData.map((news) => (
          <div key={news.id} className={`border-[5px] rounded-[30px] flex flex-col justify-between border-black ${news.bgColor} p-5`}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">{news.category}</div>
                <Newspaper className="h-6 w-6" />
              </div>
              <h3 className="text-[22px] leading-tight font-black mb-3">{news.title}</h3>
              <p className="text-gray-800 font-medium text-sm line-clamp-3">{news.description}</p>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-black/20">
              <span className="font-bold text-sm">{news.time}</span>
              <button className="flex items-center gap-1 font-bold">Read <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}