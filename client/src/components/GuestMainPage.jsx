import { Link } from "react-router-dom";

export function GuestMainPage() {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto bg-[#FDF6E3] border-l-4 border-black font-display relative">

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-6xl mx-auto w-full">
        
        <div className="relative text-center mb-20 mt-10 w-full max-w-4xl group">
          <div className="absolute inset-0 bg-pink-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] translate-y-4 translate-x-4 -z-10 transition-transform duration-300 group-hover:translate-y-6 group-hover:translate-x-6"></div>
          
          <div className="bg-white p-10 md:p-16 border-4 border-black relative z-10">
            <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-none text-black">
              Make-It-<br className="md:hidden" /><span className="bg-cyan-300 px-2 border-4 border-black inline-block mt-2 md:mt-0 transform -rotate-2">Social</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-900 max-w-2xl mx-auto border-b-4 border-black pb-6 mb-10">
              The brutal truth? Your current feed is boring. Join the network built for raw, real-time connection.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-cyan-400 text-black font-black text-xl uppercase tracking-wider border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
              >
                Start Posting
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 bg-white text-black font-black text-xl uppercase tracking-wider border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mt-4 pb-12">
          
          <div className="group bg-yellow-300 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-200 rounded-full border-4 border-black group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
            <div className="relative z-10">
              <div className="bg-white border-4 border-black w-16 h-16 flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:animate-float">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h2 className="text-3xl font-black uppercase mb-3 text-black">Trending Now</h2>
              <p className="text-lg font-bold text-gray-800">Discover what's blowing up right now. No algorithms, just pure, optimized activity.</p>
            </div>
          </div>

          <div className="group bg-green-400 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-300 rounded-full border-4 border-black group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
            <div className="relative z-10">
               <div className="bg-white border-4 border-black w-16 h-16 flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:animate-float" style={{ animationDelay: '0.2s' }}>
                 <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               </div>
               <h2 className="text-3xl font-black uppercase mb-3 text-black">Find Your Crew</h2>
               <p className="text-lg font-bold text-gray-800">Connect with engineers, creators, and friends dynamically across the platform.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}