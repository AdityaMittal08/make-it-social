import { Middle } from "./MainPage/Middle";
import { Navbar } from "./Navbar";
import { RightSide } from "./MainPage/RightSide";

export function MainPage(){
  return (
    <div className="flex h-full w-full overflow-hidden bg-[#FDF6E3]">
      <Middle />
      <RightSide />
    </div>
  )
}