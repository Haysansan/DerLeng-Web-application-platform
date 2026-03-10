// components/Register.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.svg";
import registerImg from "../assets/register.svg";
import { useRegister } from "../hooks/useRegister";
import OTPInput from "./OTPInput";

export default function RegisterUI({ isOpen, onClose, switchToLogin }) {
  const { form, errors, step, loading, handleChange, handleSendCode,resendCooldown, handleRegister } = useRegister(switchToLogin);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl transition-all duration-300">
        <div className="bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row rounded-l transition-all duration-300 max-h-[90vh]">
          
          {/* LEFT FORM */}
          <div className="relative w-full md:w-[65%] p-6 flex flex-col">
            <div className="flex items-baseline mb-6">
              <img src={logo} alt="Derleng" className="h-5 w-auto" />
              <span className="text-lg font-bold text-[#002B11]" style={{ fontFamily: "Georgia, serif" }}>ERLENG</span>
            </div>

            <div className="max-w-xs mx-auto w-full">
              {/* Step 1: Sign Up */}
              {step === 1 && (
                <>
                  <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">Sign Up</h2>
                  <div className="space-y-4">
                    <InputField label="Name" value={form.name} onChange={val => handleChange("name", val)} error={errors.name} />
                    <InputField label="Username" value={form.username} onChange={val => handleChange("username", val)} error={errors.username} />
                    <InputField label="Email" value={form.email} onChange={val => handleChange("email", val)} error={errors.email} />
                    <PasswordField label="Password" value={form.password} onChange={val => handleChange("password", val)} show={showPassword} toggleShow={() => setShowPassword(!showPassword)} error={errors.password} />
                    <PasswordField label="Confirm Password" value={form.confirmPassword} onChange={val => handleChange("confirmPassword", val)} show={showConfirmPassword} toggleShow={() => setShowConfirmPassword(!showConfirmPassword)} error={errors.confirmPassword} />
                  </div>
                  <button onClick={handleSendCode} disabled={loading} className="w-full max-w-[180px] mx-auto block bg-[#008A3D] text-white font-semibold py-2 text-sm rounded-full hover:bg-[#006F31] transition mt-4 cursor-pointer">
                    {loading ? "Sending Code" : "Create Account"}
                  </button>
                </>
              )}

              {/* Step 2: Verification */}
              {step === 2 && (
                <>
                  <h2 className="text-lg font-bold text-[#002B11] mb-2 text-center">Verification Code</h2>
                  <h3 className="text-sm text-[#002B11] mb-4 text-center">Please check your email for the verification code</h3>

                  <div className="relative">
                    <OTPInput value={form.code} onChange={val => handleChange("code", val)} error={errors.code} />
                  </div>

                  <p className="text-center text-xs text-gray-500 mt-6">
                    Didn't receive code?{" "}
                    <button type="button" onClick={handleSendCode} disabled={loading || resendCooldown > 0} className="text- font-bold hover:underline">{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}</button>
                  </p>

                  <button onClick={handleRegister} disabled={loading} className="w-full max-w-[180px] mx-auto block bg-[#008A3D] text-white font-semibold py-2 text-sm rounded-full hover:bg-[#006F31] transition mt-4 cursor-pointer">
                    {loading ? "Registering..." : "Submit"}
                  </button>
                </>
              )}

              <p className="text-center text-xs text-gray-400 mt-4 mb-10">
                Already have an account?{" "}
                <button type="button" onClick={switchToLogin} className="text-[#002B11] font-bold hover:underline">Sign In</button>
              </p>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className={`relative hidden md:flex flex-1 overflow-hidden items-center justify-center rounded-l-[50%] transition-all duration-300 ${step === 2 ? "w-[40%]" : "w-[35%]"}`}>
            <div className="absolute inset-0 bg-center rounded-l-[50%]" style={{ backgroundImage: `url(${registerImg})`, boxShadow: "inset 0 0 0 1000px rgba(1, 35, 14, 0.47)" }}></div>
            <div className="relative z-10 text-center px-4">
              <h1 className="text-white text-3xl italic opacity-80 leading-tight" style={{ fontFamily: "Georgia, serif", textShadow: "2px 2px 4px rgba(0,0,0,0.37)" }}>Join our community</h1>
            </div>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl">✕</button>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field
const InputField = ({ label, value, onChange, error }) => (
  <div>
    <label className="block text-xs font-bold text-[#002B11] mb-1">{label}</label>
    <input type="text" placeholder={`Enter your ${label.toLowerCase()}`} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]" />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Reusable Password Field
const PasswordField = ({ label, value, onChange, show, toggleShow, error }) => (
  <div>
    <label className="block text-xs font-bold text-[#002B11] mb-1">{label}</label>
    <div className="relative">
      <input type={show ? "text" : "password"} placeholder={`Enter ${label.toLowerCase()}`} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]" />
      <button type="button" onClick={toggleShow} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);