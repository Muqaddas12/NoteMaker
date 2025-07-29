import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import rightColImage from "../assets/right-colunm.png";
import topLogo from "../assets/TopLogo.png";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [showOtpField, setShowOtpField] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

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

  const handleGetOtp = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("OTP sent to " + form.email);
    setShowOtpField(true);
  };

  const handleSignUp = () => {
    if (!form.otp.trim()) {
      setErrors({ ...errors, otp: "OTP is required." });
      return;
    }
    alert("Signed up successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col relative bg-white">
        <div className="absolute top-6 left-6">
          <img src={topLogo} alt="HD Logo" className="w-40 h-5" />
        </div>

        <div className="flex flex-col justify-center items-center h-full px-6 md:px-16">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-2xl font-bold text-left">Sign up</h2>
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
                </fieldset>
              )}
            </div>

            {!showOtpField ? (
              <button
                onClick={handleGetOtp}
                className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
              >
                Get OTP
              </button>
            ) : (
              <button
                onClick={handleSignUp}
                className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
              >
                Sign up
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

      {/* Right Image */}
      <div className="hidden md:block w-3/4 p-1">
        <img
          src={rightColImage}
          alt="Right Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
