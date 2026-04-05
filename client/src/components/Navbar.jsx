import { Search, Mic } from "lucide-react"
import { Link } from "react-router-dom"

export function Navbar(){
  return (
    <>
      <div className="box-border border-black bg-[#89D3F0] border-[5px] p-3 rounded-[25px] flex items-center justify-between gap-4 font-display">
          <p className="font-bold text-[36px]">makeitsocial</p>
          <div className="flex relative">
            <input className="border-4 focus:outline-none border-black rounded-[50px] h-[65px] w-[700px] placeholder:text-[24px] text-[24px] px-16 bg-[#B9E2F5] placeholder:text-[#808080]" placeholder="Search"></input>
              <Search className="absolute top-[15px] left-[17px] h-[38px] w-[38px]"/>
              <Mic className="absolute right-[15px] top-[17px] h-[38px] w-[38px]" />
          </div>
          <Link to='/login'>
            <button className="text-[24px] border-4 border-black p-2 rounded-[25px] text-white bg-[#FF6B6B] font-bold">Log out</button>
          </Link>
      </div>
    </>
  )
}