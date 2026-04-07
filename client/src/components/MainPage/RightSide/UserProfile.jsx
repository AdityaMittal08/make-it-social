import { Link } from "react-router-dom"
import { Circle, Bell } from "lucide-react"

export function UserProfile(){
  return (
    <>
      <div className="border-[5px] rounded-[50px] bg-[#FFAA8C] border-black p-3 flex-col">
      <div className="flex m-2 pb-4">
        <Circle className="h-[50px] w-[50px] m-2 mb-0"/>
        <div className="relative">
          <Link to='/profile' className="font-bold text-[36px] m-2 mt-0 mb-0">Karishma</Link>
          <p className="absolute top-[50px] font-bold left-[10px]">178K followers</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="bg-white pl-5 pr-5 rounded-[35px]">
          <p className="font-bold text-[20px] leading-[36px]">58 Following</p>
        </div>
        <div className="bg-white pl-5 pr-5 rounded-[35px]">
          <p className="font-bold text-[20px] leading-[36px]">25 Posts</p>
        </div>
      </div>
      <div className="flex-col m-2">
        <div className="flex justify-center">
          <p className="font-bold text-[24px]">Notfications</p>
          <Bell className="h-[28px] w-[28px] right-[10px] m-2 mb-0" />
        </div>
        <div>
          <div className="p-1 pl-4 pr-4 bg-[#D9D9D9] rounded-[25px] m-2">
            <p className="font-bold text-[18px]">Ridhima liked your post</p>
          </div>
          <div className="p-1 pl-4 pr-4 bg-[#D9D9D9] rounded-[25px] m-2">
            <p className="font-bold text-[18px]">Somnath followed you</p>
          </div>

          <div className="p-1 pl-4 pr-4 m-2 flex justify-center">
            <p className="font-bold text-[18px]">...</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
