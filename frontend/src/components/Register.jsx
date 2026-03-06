// src/components/RegisterUI.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.svg"; 
import register from "../assets/register.svg";
import api from "../services/api.js";


export default function RegisterUI({ isOpen, onClose, switchToLogin }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const sendCode = async () => {
  try {
    await api.post("/auth/send-code", { email });

    alert("Code sent to your email!");
    setStep(2);
  } catch (error) {
    alert("Failed to send code");
  }
};
const registerUser = async () => {
  try {
    await api.post("/auth/register", {
      email,
      code,
      username,
      password,
    });

    alert("Registration complete!");
    switchToLogin(); // go back to login modal
  } catch (err) {
    alert("Register failed!");
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      
    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl transition-all duration-300">


        <div
          className={`bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto ${
            step === 3 ? "md:h-[550px]" : "md:h-[450px]"
          } rounded-l transition-all duration-300`}
        >
          {/* LEFT FORM */}
          <div className="relative w-full md:w-[65%] p-6 flex flex-col">
            {/* Logo */}
            <div className="flex items-baseline mb-6">
              <img src={logo} alt="Derleng" className="h-5 w-auto" />
              <span
                className="text-lg font-bold text-[#002B11]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                ERLENG
              </span>
            </div>

            <div className="max-w-xs mx-auto w-full">
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">
                    Sign Up
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={sendCode}
                    className="w-full max-w-[140px] mx-auto block bg-[#008A3D] text-white font-semibold py-2 text-sm rounded-full hover:bg-[#006F31] transition mt-4 cursor-pointer"
                  >
                    Next
                  </button>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">
                    Sign up
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className="w-full max-w-[180px] mx-auto block bg-[#008A3D] text-white font-semibold py-2 text-sm rounded-full hover:bg-[#006F31] transition mt-4 cursor-pointer"
                  >
                    Next
                  </button>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center cursor-pointer">
                    Sign up
                  </h2>

                  <div className="space-y-3">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Name
                      </label>
                      <input
                          type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                        />
                    </div>

                    {/* Email */}
                    {/* <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-gray-200 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                      />
                    </div> */}

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    onClick={registerUser}
                    className="w-full max-w-[180px] mx-auto block bg-[#008A3D] text-white font-semibold py-2 text-sm rounded-full hover:bg-[#006F31] transition mt-4"
                  >
                    Sign up
                  </button>

                  {/* Switch to Login
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="text-[#002B11] font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </p> */}
                </>
              )}
            </div>
             {/* Switch to Login */}
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="text-[#002B11] font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
          </div>

          {/* RIGHT VISUAL */}
          <div
            className={`relative hidden md:flex h-full  overflow-hidden items-center justify-center rounded-l-[50%] transition-all duration-300 ${
              step === 3 ? "w-[40%]" : "w-[35%]"
            }`}
          >
            <div
              className="absolute inset-0  bg-center rounded-l-[50%]"
              style={{
                backgroundImage: `url(${register})`,
                boxShadow: "inset 0 0 0 1000px rgba(1, 35, 14, 0.47)",
              }}
            ></div>
            <div className="relative z-10 text-center px-4">
              <h1
                className="text-white text-3xl italic opacity-80 leading-tight"
                style={{
                  fontFamily: "Georgia, serif",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.37)",
                }}
              >
                Join our community
              </h1>
            </div>
            
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

