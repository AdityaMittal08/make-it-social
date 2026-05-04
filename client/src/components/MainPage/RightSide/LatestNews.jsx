import React, { useEffect } from "react";
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { newsApi } from "../../../api/newsApi";

export function LatestNews() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['latest-news'],
    queryFn: ({ pageParam = null }) => newsApi.fetchLatestNews(pageParam),
    getNextPageParam: (lastPage) => {

      return lastPage.nextCursor ? lastPage.nextCursor : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return <div className="flex-1 p-6 pt-1 h-full overflow-y-auto font-display scroll-left text-center font-bold text-xl">Loading posts...</div>;
  }

  if (status === 'error') {
    return <div className="text-center font-bold text-red-500 text-xl mt-5">Error: {error.message}</div>;
  }

  return (
    <>
      <div className="border-[5px] rounded-[25px] bg-[#F0FF9D] border-black mt-[8px] p-3 font-display">
        <div className="flex justify-center">
          <p className="text-[24px] font-bold">LATEST FEED...</p>
        </div>

        <hr className="my-2 h-px border-t-0 bg-black"/>
        
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.data && page.data.map((item, index) => (
              <div key={item.article_id || index} className="bg-[#262A2E] rounded-[25px] p-4 m-2 mt-4">
                <p className="font-bold text-[20px] text-white leading-[24px]">{item.title}</p>
                <a 
                  className="text-[#1E90FF] underline text-[13px] cursor-pointer" 
                  href={item.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </React.Fragment>
        ))}

        <div ref={ref} className="text-center p-4 font-bold text-black">
          {isFetchingNextPage
            ? 'Loading more news...'
            : hasNextPage
            ? 'Scroll down for more'
            : 'No more news!'}
        </div>
      </div>
    </>
  );
}