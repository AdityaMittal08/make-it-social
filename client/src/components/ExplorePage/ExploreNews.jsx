import { Newspaper, ArrowUpRight, Rss } from "lucide-react";
import { useState, useEffect } from "react";
import { newsApi } from "../../api/newsApi";

export function ExploreNews(){
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApi.fetchLatestNews();
        setNewsData(response.data || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const bgColors = ["bg-[#C3F0CA]", "bg-[#FFDD88]", "bg-[#89D3F0]", "bg-[#FFCAAF]", "bg-[#CBAACB]"];

  return (
    <div className="m-4 flex-none">
      <div className="flex items-center gap-3 mb-4">
        <Rss className="h-[40px] w-[40px]" strokeWidth={2.5} />
        <div className="text-[32px] font-bold">Trending News:-</div>
      </div>
      
      {isLoading ? (
        <div className="text-center font-bold text-xl mt-4">Loading news...</div>
      ) : newsData.length === 0 ? (
        <div className="text-center font-bold text-xl mt-4">No recent news available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {newsData.map((news, index) => {
            const timeAgo = new Date(news.published_at).toLocaleString();
            return (
              <div key={news.article_id || news.id} className={`border-[5px] rounded-[30px] flex flex-col justify-between border-black ${bgColors[index % bgColors.length]} p-5`}>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">News</div>
                    <Newspaper className="h-6 w-6" />
                  </div>
                  <h3 className="text-[22px] leading-tight font-black mb-3 line-clamp-2" title={news.title}>{news.title}</h3>
                  <p className="text-gray-800 font-medium text-sm line-clamp-3">{news.description}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-black/20">
                  <span className="font-bold text-[12px] truncate w-1/2">{timeAgo}</span>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-bold hover:underline">
                    Read <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}