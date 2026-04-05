import { ExploreNews } from "./ExplorePage/ExploreNews";
import { ExplorePeople } from "./ExplorePage/ExplorePeople";
import { ExploreTopPosts } from "./ExplorePage/ExploreTopPosts";

export function ExplorePage(){
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6 bg-[#FDF6E3]">
      <div className="m-4 font-display font-bold text-[36px]">Explore People and News:-</div>
      <hr className="my-2 h-px border-t-4 border-black bg-black" />
      <ExploreTopPosts />
      <ExplorePeople />
      <ExploreNews />
    </div>
  )
}