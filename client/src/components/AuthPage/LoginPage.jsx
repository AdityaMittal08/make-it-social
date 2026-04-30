import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { authApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrorMsg("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await authApi.login({
        userId: formData.userId,
        password: formData.password,
      });

      if (response.data && response.data.user) {
        login(response.data.user);
      }

      navigate("/");
    } catch (err) {
      setErrorMsg(err.message || "An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border-4 border-black p-8 flex flex-col font-display gap-2 bg-[#C7E9B0] shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl w-[450px] relative"
      >
        <ArrowLeft
          onClick={() => navigate("/")}
          className="w-8 h-8 cursor-pointer absolute font-bold left-4 top-4 hover:-translate-x-1 transition-transform"
        />
        <div className="flex justify-center mb-2">
          <p className="text-[32px] font-bold">Login</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500 text-white font-bold p-3 border-4 border-black rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <div>
          <p className="font-bold text-lg">Username</p>
          <input
            name="userId"
            className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1"
            placeholder="Email or username"
            onChange={handleChange}
            value={formData.userId}
            required
          />
        </div>
        <div>
          <p className="font-bold text-lg">Password</p>
          <input
            type="password"
            name="password"
            className="focus:outline-none p-2 border-4 border-black w-full rounded-lg mt-1"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>
        <div className="flex-col justify-between text-sm font-bold mt-1">
          <p className="cursor-pointer">Forgot password?</p>
          <p>
            New?{" "}
            <Link
              to="/signup"
              className="underline cursor-pointer text-blue-600"
            >
              Sign up
            </Link>
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="border-4 border-black bg-[#A8E6CF] font-bold text-xl p-3 mt-2 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
