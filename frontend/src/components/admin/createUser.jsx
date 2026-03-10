import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.svg";
import register from "../../assets/register.svg";
import api from "../../services/api.js";

export default function CreateUserModal({ isOpen, onClose, onUserCreated }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("normal_user");

  const registerUser = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/admin-create-user", {
        username,
        email,
        password,
        role,
      });

      onUserCreated(res.data.data); // update table

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("normal_user");

      alert("User created successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Register failed!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl">
        <div className="bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row rounded-lg">
          {/* LEFT FORM */}
          <div className="w-full md:w-[65%] p-6">
            <div className="flex items-baseline mb-6">
              <img src={logo} alt="Derleng" className="h-5 w-auto" />
              <span
                className="text-lg font-bold text-[#002B11]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                ERLENG
              </span>
            </div>

            <h2 className="text-lg font-bold text-center mb-6">
              Admin Create User
            </h2>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="text-xs font-bold mb-1 block">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-200  rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold mb-1 block">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="normal_user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold mb-1 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-200  rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs font-bold mb-1 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-200  rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={registerUser}
              className="w-full bg-[#008A3D] text-white font-semibold py-2 rounded-full mt-6 hover:bg-green-700"
            >
              Create User
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:flex w-[35%] relative">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${register})`,
                boxShadow: "inset 0 0 0 1000px rgba(1,35,14,0.47)",
              }}
            ></div>
          </div>

          {/* Close button */}
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
