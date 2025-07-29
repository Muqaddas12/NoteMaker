import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import topLogo from "../assets/TopLogo.png";
import rightColImage from "../assets/right-colunm.png";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    keepLoggedIn: false,
  });

  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.otp.trim()) newErrors.otp = "OTP is required.";
    return newErrors;
  };

  const handleSignIn = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Signed in successfully!");
  };

  const handleResendOtp = () => {
    if (!form.email) {
      setErrors({ email: "Please enter email first." });
      return;
    }
    alert("OTP resent to " + form.email);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col relative">
    
        <div className="md:absolute top-6 left-6 flex justify-center md:justify-start w-full md:w-auto mt-6 md:mt-0">
          <img src={topLogo} alt="HD Logo" className="w-40 h-5" />
        </div>

        {/* Form  */}
        <div className="flex flex-col justify-center items-center h-full px-6 md:px-16">
          <div className="w-full max-w-md space-y-6 mt-10 md:mt-0">
            <h2 className="text-2xl font-bold text-left md:text-left">Sign in</h2>
            <p className="text-gray-500 text-sm">Welcome back to HD</p>

            <div className="space-y-4">
              {/* Email */}
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
              </fieldset>

              {/* OTP */}
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
              </fieldset>

              {/* Checkbox + Resend */}
              <div className="flex flex-col  md:justify-between gap-2 text-sm text-gray-600">
                
                <button
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:underline w-fit"
                >
                  Resend OTP
                </button>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="keepLoggedIn"
                    checked={form.keepLoggedIn}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Keep me logged in
                </label>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
            >
              Sign in
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 pt-2">
              Need an account?
              <a href="/" className="text-blue-600 hover:underline ml-1">Create one</a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column Image */}
      <div className="hidden md:block w-3/4 p-1">
        <img
          src={rightColImage}
          alt="Right Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
