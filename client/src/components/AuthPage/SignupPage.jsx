import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { authApi } from "../../api/authApi";

export function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMsg("");
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.signup({
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      navigate('/');
      
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="border-4 border-black p-4 flex flex-col font-display gap-2 bg-[#C7E9B0] shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl w-[450px] sm:w-[500px] h-[90vh] overflow-y-auto my-4 relative">
        <ArrowLeft onClick={() => navigate('/')} className="w-8 h-8 cursor-pointer absolute font-bold left-4 top-4 hover:-translate-x-1 transition-transform"/>
        <div className="flex justify-center mb-2">
          <p className="text-[32px] font-bold">Sign Up</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500 text-white font-bold p-3 border-4 border-black rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="font-bold text-lg">First Name</p>
            <input 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" 
              placeholder="First Name" 
            />
          </div>
          <div className="w-1/2">
            <p className="font-bold text-lg">Last Name</p>
            <input 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" 
              placeholder="Last Name" 
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-lg">Username</p>
          <input 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" 
            placeholder="Choose a username" 
          />
        </div>
        <div>
          <p className="font-bold text-lg">Email</p>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" 
            placeholder="Email address" 
          />
        </div>
        <div>
          <p className="font-bold text-lg">Password</p>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" 
            placeholder="Password" 
          />
        </div>
        <div>
          <p className="font-bold text-lg">Confirm Password</p>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1" 
            placeholder="Confirm Password" 
          />
        </div>
        <div className="flex justify-center text-sm font-bold mt-2">
          <p>Already have an account? <Link to='/login' className="underline cursor-pointer text-blue-600">Log in</Link></p>
        </div>
        <button 
          type="submit"
          disabled={isLoading}
          className="border-4 border-black bg-[#A8E6CF] font-bold text-xl p-3 mt-2 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] disabled:opacity-50"
        > 
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
