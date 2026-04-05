import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-4 border-black p-4 flex flex-col font-display gap-2 bg-[#C7E9B0] shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl w-[450px] sm:w-[500px] h-[90vh] overflow-y-auto my-4 relative">
        <ArrowLeft onClick={() => navigate('/')} className="w-8 h-8 cursor-pointer absolute font-bold left-4 top-4 hover:-translate-x-1 transition-transform"/>
        <div className="flex justify-center mb-2">
          <p className="text-[32px] font-bold">Sign Up</p>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="font-bold text-lg">First Name</p>
            <input className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" placeholder="First Name" />
          </div>
          <div className="w-1/2">
            <p className="font-bold text-lg">Last Name</p>
            <input className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" placeholder="Last Name" />
          </div>
        </div>
        <div>
          <p className="font-bold text-lg">Username</p>
          <input className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" placeholder="Choose a username" />
        </div>
        <div>
          <p className="font-bold text-lg">Email</p>
          <input type="email" className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" placeholder="Email address" />
        </div>
        <div>
          <p className="font-bold text-lg">Password</p>
          <input type="password" className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" placeholder="Password" />
        </div>
        <div>
          <p className="font-bold text-lg">Confirm Password</p>
          <input type="password" className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" placeholder="Confirm Password" />
        </div>
        <div className="flex justify-center text-sm font-bold mt-2">
          <p>Already have an account? <Link to='/login' className="underline cursor-pointer text-blue-600">Log in</Link></p>
        </div>
        <button className="border-4 border-black bg-[#A8E6CF] font-bold text-xl p-3 mt-2 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]"> 
          Sign Up 
        </button>
      </div>
    </div>
  );
}
