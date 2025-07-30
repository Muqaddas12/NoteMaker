import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import topLogo from "../assets/TopLogo.png";
import rightColImage from "../assets/right-colunm.png";

const API_BASE = "https://notemaker-backend-v3fg.onrender.com/api";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", otp: "" });
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

 useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/check`, {
        credentials: "include",
      });

      const data = await res.json();
      if (data.loggedIn && data.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    }
  };
  checkAuth();
}, [navigate]);



  useEffect(() => {
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    return errs;
  };

  const validateForm = () => {
    const errs = validateEmail();
    if (!form.otp) errs.otp = "OTP is required.";
    return errs;
  };

  const sendOtp = async () => {
    const errs = validateEmail();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/auth/send-otp`,
        {
          name: "Guest User",
          dob: "2000-01-01",
          email: form.email,
        },
        { withCredentials: true }
      );
      alert(res.data.message || "OTP sent!");
      setOtpSent(true);
      setResendCooldown(60);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/auth/signin`,
        {
          email: form.email,
          otp: form.otp,
        },
        { withCredentials: true }
      );
      alert(res.data.message || "Signed in successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col relative">
        <div className="md:absolute top-6 left-6 flex justify-center md:justify-start w-full md:w-auto mt-6 md:mt-0">
           <img src={topLogo} alt="Logo" className="w-90 h-8" />
        </div>

        <div className="flex flex-col justify-center items-center h-full px-6 md:px-16">
          <div className="w-full max-w-md space-y-6 mt-10 md:mt-0">
            <h2 className="text-2xl font-bold">Sign in</h2>
            <p className="text-sm text-gray-500">Welcome back to HD</p>

            <div className="space-y-4">
              {/* Email */}
              <fieldset className="border border-gray-300 rounded-md px-3 pt-1">
                <legend className="text-xs text-gray-500 px-1">Email</legend>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full py-2 text-sm focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </fieldset>

              {/* OTP */}
              {otpSent && (
                <fieldset className="border border-blue-500 rounded-md px-3 pt-1 relative">
                  <legend className="text-xs text-blue-500 px-1">OTP</legend>
                  <div className="flex items-center">
                    <input
                      type={showOtp ? "text" : "password"}
                      name="otp"
                      value={form.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      className="w-full py-2 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute right-2 text-lg text-gray-500"
                    >
                      {showOtp ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                  {errors.otp && <p className="text-red-500 text-xs">{errors.otp}</p>}
                </fieldset>
              )}
            </div>

            {/* Buttons */}
            {!otpSent ? (
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                <button
                  onClick={sendOtp}
                  disabled={resendCooldown > 0 || loading}
                  className="w-full border border-blue-600 text-blue-600 py-2 text-sm rounded-md hover:bg-blue-50 transition"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                </button>
              </div>
            )}

            {/* Switch to Signup */}
            <p className="text-center text-sm text-gray-600 pt-2">
              Need an account?
              <Link to="/" className="text-blue-600 hover:underline ml-1">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden md:block w-3/4 p-1">
        <img src={rightColImage} alt="Visual" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignIn;
