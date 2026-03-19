import { Home, Compass, PlusCircle, Maximize2 } from "lucide-react"

export function LeftSide(){
  return (
    <>
        <div className="border-r-4 border-black pr-4 pt-2 w-[500px] h-full overflow-y-auto">
          <div className="border-[5px] rounded-[25px] bg-[#C3F0CA] border-black p-3 font-display">
            <div className="flex relative p-2 border bg-[#1E293B] rounded-[25px]">
              <Home className="h-[40px] w-[40px] text-[#FDF6E3] m-1" />
              <p className="text-[32px] font-bold text-[#FDF6E3] m-1">Home</p>
            </div>
            <div className="flex relative p-2">
              <Compass className="h-[40px] w-[40px] m-1"/>
              <p className="text-[32px] font-bold m-1">Explore</p>
            </div>
            <div className="flex relative p-2">
              <PlusCircle className="h-[40px] w-[40px] m-1"/>
              <p className="text-[32px] font-bold m-1">Create</p>
            </div>
          </div>

          <div className="border-[5px] rounded-[25px] bg-[#FFDD88] border-black mt-[8px] p-3 font-display">
            <div className="flex justify-center">
              <p className="text-[32px] font-bold">RECENT</p>
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