import { Middle } from "./MainPage/Middle";
import { Navbar } from "./Navbar";
import { RightSide } from "./MainPage/RightSide";

export function MainPage(){
  return (
    <div className="flex flex-1 bg-white h-full w-full overflow-hidden">
      <Middle />
      <RightSide />
    </div>
  )
}