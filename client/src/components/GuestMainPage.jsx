import { Middle } from "./MainPage/Middle";
import { RightSide } from "./MainPage/RightSide";

export function GuestMainPage() {
  return (
    <div className="flex w-full h-full p-4 justify-center text-center">
      <div className="max-w-2xl mt-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to Make-it-Social!</h1>
        <p className="text-gray-600 mb-8">Please log in to see your personalized feed, recent activity, and connections.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
            <h2 className="font-semibold text-lg">Trending Topics</h2>
            <p className="text-sm text-gray-500 mt-2">Log in to join the conversation.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
            <h2 className="font-semibold text-lg">Discover People</h2>
            <p className="text-sm text-gray-500 mt-2">Connect with professionals and friends.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
