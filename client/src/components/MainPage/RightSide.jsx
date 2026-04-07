import './RightSide.css';
import { UserProfile } from "./RightSide/UserProfile";
import { Recent } from "./RightSide/Recent";

export function RightSide(){
  return (
    <>
        <div className="w-[350px] border-l-4 border-black pl-4 pt-2 ml-auto h-full overflow-y-auto font-display scroll-left">
          <UserProfile />
          <Recent />
        </div>
    </>
  )
}