import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import rightColImage from "../assets/right-colunm.png";
import topLogo from "../assets/TopLogo.png";

const API_BASE = "https://notemaker-backend-v3fg.onrender.com/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [showOtpField, setShowOtpField] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpExpireTimer, setOtpExpireTimer] = useState(0);
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
      setOtpExpireTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.dob) newErrors.dob = "Date of birth is required.";
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email.";
    return newErrors;
  };

  const handleGetOtp = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (resendCooldown > 0) {
      alert(`Please wait ${resendCooldown}s before requesting again.`);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/auth/send-otp`,
        {
          name: form.name,
          dob: form.dob,
          email: form.email,
          route:'signup'
        },
        { withCredentials: true }
      );

      if (res.data.exists && res.data.verified) {
        alert("User already exists and is verified. Please sign in.");
        navigate("/signin");
        return;
      }

      alert(res.data.message);
      setShowOtpField(true);
      setOtpExpireTimer(300); // 5 minutes expiry timer
      setResendCooldown(60); // 1 minute cooldown
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!form.otp.trim()) {
      setErrors({ ...errors, otp: "OTP is required." });
      return;
    }

    if (otpExpireTimer === 0) {
      alert("OTP has expired. Please request a new one.");
      return;
    }

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

      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "OTP verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex flex-col relative bg-white">
        <div className="md:absolute top-6 left-6 flex justify-center md:justify-start w-full md:w-auto mt-6 md:mt-0">
                  <img src={topLogo} alt="Logo" className="md:w-45 md:h-5 w-90 h-8" />
                </div>

        <div className="flex flex-col justify-center items-center h-full px-6 md:px-16">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-2xl font-bold text-left mb-0">Sign up</h2>
            <p className="text-gray-500 text-sm">Sign up to enjoy the feature of HD</p>

            <div className="space-y-4">
              <fieldset className="border border-gray-300 rounded-md px-3 pt-1">
                <legend className="text-xs text-gray-500 px-1">Your Name</legend>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jonas Khanwald"
                  className="w-full py-2 text-sm focus:outline-none"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </fieldset>

              <fieldset className="border border-gray-300 rounded-md px-3 pt-1">
                <legend className="text-xs text-gray-500 px-1">Date of Birth</legend>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full py-2 pr-8 text-sm appearance-none focus:outline-none"
                  />
                  <FaCalendarAlt className="absolute right-2 text-gray-400 text-sm" />
                </div>
                {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
              </fieldset>

              <fieldset className="border border-gray-300 rounded-md px-3 pt-1">
                <legend className="text-xs text-gray-500 px-1">Email</legend>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jonas_kahnwald@gmail.com"
                  className="w-full py-2 text-sm focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </fieldset>

              {showOtpField && (
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
                  {otpExpireTimer > 0 && (
                    <p className="text-xs text-gray-500 pt-1">OTP expires in {otpExpireTimer}s</p>
                  )}
                </fieldset>
              )}
            </div>

            {!showOtpField ? (
              <button
                onClick={handleGetOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
              >
                {loading ? "Sending OTP..." : resendCooldown > 0 ? `Wait ${resendCooldown}s` : "Get OTP"}
              </button>
            ) : (
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
              >
                {loading ? "Verifying..." : "Sign up"}
              </button>
            )}

            <p className="text-center text-sm text-gray-600 pt-2">
              Already have an account?
              <Link to="/signin" className="text-blue-600 hover:underline ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-3/4 p-1">
        <img src={rightColImage} alt="Right Visual" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignUp;
