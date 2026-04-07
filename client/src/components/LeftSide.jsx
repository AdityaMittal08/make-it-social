import { Home, Compass, PlusCircle, UserCircle } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function LeftSide(){
  const location = useLocation();

  const getLinkContainerClasses = (path) => {
    const isActive = location.pathname === path;
    return `flex relative p-2 rounded-[25px] cursor-pointer transition-colors mt-1 ${
      isActive ? "border bg-[#1E293B] hover:opacity-90" : "hover:bg-black/5"
    }`;
  };

  const getIconClasses = (path) => `h-[36px] w-[36px] m-1 ${location.pathname === path ? "text-[#FDF6E3]" : ""}`;
  const getTextClasses = (path) => `text-[24px] font-bold m-1 ${location.pathname === path ? "text-[#FDF6E3]" : ""}`;

  return (
    <>
        <div className="border-r-4 border-black pr-4 pt-2 h-full overflow-y-auto w-[300px]">
          <div className="border-[5px] rounded-[25px] bg-[#C3F0CA] border-black p-3 font-display flex flex-col gap-1">
            <Link to="/" className={getLinkContainerClasses("/")}>
              <Home className={getIconClasses("/")} />
              <p className={getTextClasses("/")}>Home</p>
            </Link>
            <Link to="/explore" className={getLinkContainerClasses("/explore")}>
              <Compass className={getIconClasses("/explore")}/>
              <p className={getTextClasses("/explore")}>Explore</p>
            </Link>
            <Link to='/create' className={getLinkContainerClasses("/create")}>
              <PlusCircle className={getIconClasses("/create")}/>
              <p className={getTextClasses("/create")}>Create</p>
            </Link>
            <Link to='/profile' className={getLinkContainerClasses("/profile")}>
              <UserCircle className={getIconClasses("/profile")}/>
              <p className={getTextClasses("/profile")}>Profile</p>
            </Link>
          </div>

          <div className="border-[5px] rounded-[25px] bg-[#FFDD88] border-black mt-[8px] p-3 font-display">
            <div className="flex justify-center">
              <p className="text-[24px] font-bold">RECENT</p>
            </div>

            <hr className="my-2 h-px border-t-0 bg-black"/>

            <div className="bg-[#F3E8FF] rounded-[35px] p-4 m-4">
              <div className="flex justify-center">
                <p className="text-[24px] font-bold">AdiStarc</p>
              </div>
              <hr className="my-2 h-px border-t-0 bg-black" />
              <p className="font-bold text-[20px] leading-[36px]">What are your thoughts on pokemon cards collectors?</p>
            </div>

            <div className="bg-[#F3E8FF] rounded-[35px] p-4 m-4">
              <div className="flex justify-center">
                <p className="text-[24px] font-bold">AdiStarc</p>
              </div>
              <hr className="my-2 h-px border-t-0 bg-black" />
              <p className="font-bold text-[20px] leading-[36px]">What are your thoughts on pokemon cards collectors?</p>
            </div>
          </div>
        </div>
    </>
  )
}