import { LeftSide } from "./MainPage/LeftSide";
import { Middle } from "./MainPage/Middle";
import { Navbar } from "./MainPage/Navbar";
import { RightSide } from "./MainPage/RightSide";

export function MainPage(){
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSide />
        <Middle />
        <RightSide />
      </div>
    </div>
  )
}