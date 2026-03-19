import { Circle, Bell } from "lucide-react"
import './RightSide.css';

export function RightSide(){
  return (
    <>
        <div className="border-l-4 border-black pl-4 pt-2 w-[900px] ml-auto h-full overflow-y-auto font-display scroll-left">
          <div className="border-[5px] rounded-[50px] bg-[#FFAA8C] border-black p-3 flex-col">
            <div className="flex m-2 pb-4">
              <Circle className="h-[60px] w-[60px] m-2 mb-0"/>
              <div className="relative">
                <p className="font-bold text-[48px] m-2 mt-0 mb-0">Karishma</p>
                <p className="absolute top-[60px] font-bold left-[10px]">178K followers</p>
              </div>
            </div>
            <div className="flex pl-5 pr-5 justify-between">
              <div className="bg-white pl-8 pr-8 rounded-[35px]">
                <p className="font-bold text-[20px] leading-[36px]">58 Following</p>
              </div>
              <div className="bg-white pl-8 pr-8 rounded-[35px]">
                <p className="font-bold text-[20px] leading-[36px]">25 Posts</p>
              </div>
            </div>
            <div className="flex-col m-2">
              <div className="flex justify-center">
                <p className="font-bold text-[36px]">Notfications</p>
                <Bell className="h-[40px] w-[40px] right-[10px] m-2 mb-0" />
              </div>
              <div>
                <div className="p-1 pl-4 pr-4 bg-[#D9D9D9] rounded-[25px] m-2">
                  <p className="font-bold text-[24px]">Ridhima liked your post</p>
                </div>
                <div className="p-1 pl-4 pr-4 bg-[#D9D9D9] rounded-[25px] m-2">
                  <p className="font-bold text-[24px]">Somnath followed you</p>
                </div>

                <div className="p-1 pl-4 pr-4 m-2 flex justify-center">
                  <p className="font-bold text-[24px]">...</p>
                </div>

              </div>
            </div>
          </div>

          <div className="border-[5px] rounded-[25px] bg-[#F0FF9D] border-black mt-[8px] p-3 font-display">
            <div className="flex justify-center">
              <p className="text-[32px] font-bold">LATEST FEED...</p>
            </div>

            <hr className="my-2 h-px border-t-0 bg-black"/>

            <div className="bg-[#262A2E] rounded-[25px] p-4 m-2 mt-4">
              <p className="font-bold text-[20px] text-white leading-[24px]">Africa-Bound India-Flagged Fuel Tanker Sets Sail From East Of Hormuz</p>
              <a className="text-[#1E90FF] underline text-[13px] cursor-pointer" href="https://www.ndtv.com/india-news/africa-bound-india-flagged-fuel-tanker-sets-sail-from-east-of-hormuz-top">https://www.ndtv.com/india-news/africa-bound-india-flagged-fuel-tanker-sets-sail-from-east-of-hormuz-top</a>
            </div>
            <div className="bg-[#262A2E] rounded-[25px] p-4 m-2 mt-4">
              <p className="font-bold text-[20px] text-white leading-[24px]">Africa-Bound India-Flagged Fuel Tanker Sets Sail From East Of Hormuz</p>
              <a className="text-[#1E90FF] underline text-[13px] cursor-pointer" href="https://www.ndtv.com/india-news/africa-bound-india-flagged-fuel-tanker-sets-sail-from-east-of-hormuz-top">https://www.ndtv.com/india-news/africa-bound-india-flagged-fuel-tanker-sets-sail-from-east-of-hormuz-top</a>
            </div>
            <div className="bg-[#262A2E] rounded-[25px] p-4 m-2 mt-4">
              <p className="font-bold text-[20px] text-white leading-[24px]">Africa-Bound India-Flagged Fuel Tanker Sets Sail From East Of Hormuz</p>
              <a className="text-[#1E90FF] underline text-[13px] cursor-pointer" href="https://www.ndtv.com/india-news/africa-bound-india-flagged-fuel-tanker-sets-sail-from-east-of-hormuz-top">https://www.ndtv.com/india-news/africa-bound-india-flagged-fuel-tanker-sets-sail-from-east-of-hormuz-top</a>
            </div>
          </div>
        </div>
    </>
  )
}