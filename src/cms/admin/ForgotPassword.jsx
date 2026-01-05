import React, { useState, useEffect } from "react";
import Arrow from "../../components/Arrow";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  // Field States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // UI States
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Passwords
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:3000/api/auth/admin";

  // STEP 1: Request OTP for Password Change
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/request-password-change-otp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Send current admin token if logged in, or session token if in login flow
          "Authorization": `Bearer ${localStorage.getItem("adminToken") || localStorage.getItem("sessionToken")}` 
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP sent to your email");
        // Store the specific token received for the next step
        console.log(data);
        localStorage.setItem("pwResetStepToken", data.token || data.otpSessionToken); 
        setStep(2);
      } else {
        setError(data.message || "Request failed");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const stepToken = localStorage.getItem("pwResetStepToken");
      const response = await fetch(`${BASE_URL}/verify-password-change-otp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${stepToken}` 
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success("OTP Verified");
        // Update token for the final change-password request
        localStorage.setItem("pwResetStepToken", data.token || data.changePasswordToken);
        setStep(3);
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Final Password Change
  const handleFinalReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const finalToken = localStorage.getItem("pwResetStepToken");
      const response = await fetch(`${BASE_URL}/change-password`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${finalToken}` 
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      if (response.ok) {
        toast.success("Password changed successfully!");
        localStorage.removeItem("pwResetStepToken");
        setTimeout(() => window.history.back(), 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Reset failed");
      }
    } catch (err) {
      setError("Final reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center py-[80px] px-[20px]">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row w-full max-w-[1400px] bg-[#0a0f14] rounded-3xl border border-gray-800 overflow-hidden">
        
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-[36px] md:text-[47px] text-white font-manrope mb-2">
            {step === 3 ? "Set New Password" : "Reset Security"}
          </h2>
          <p className="text-gray-400 text-base md:text-xl mb-8 font-manrope">
            Step {step} of 3: {step === 1 ? "Verify Email" : step === 2 ? "Enter OTP" : "Update Credentials"}
          </p>

          <form onSubmit={step === 1 ? handleRequestOTP : step === 2 ? handleVerifyOTP : handleFinalReset} className="space-y-6">
            
            {/* STEP 1: Email */}
            {step === 1 && (
              <div className="flex flex-col">
                <label className="block text-gray-400 text-base md:text-xl mb-2 ml-1 font-manrope">Admin Email</label>
                <input
                  type="email"
                  placeholder="Enter registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-cyan-400 font-manrope transition-all"
                  required
                />
              </div>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <div className="flex flex-col">
                <label className="block text-gray-400 text-base md:text-xl mb-2 ml-1 font-manrope">Verification OTP</label>
                <input
                  type="text"
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-cyan-400 font-manrope transition-all"
                  required
                />
              </div>
            )}

            {/* STEP 3: Password Inputs */}
            {step === 3 && (
              <>
                <div className="flex flex-col ">
                  <label className="block text-gray-400 text-base md:text-xl mb-2 ml-1 font-manrope">Old Password</label>
                  <div className="relative">
                    <input
                    type={showOld ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-transparent border border-gray-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                  <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      {showOld ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-400 text-base md:text-xl mb-2 ml-1 font-manrope">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-transparent border border-gray-700 rounded-full px-5 py-3 pr-12 text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      {showNew ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-400 text-base md:text-xl mb-2 ml-1 font-manrope">Confirm New Password</label>
                 <div className="relative">
                   <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-transparent border rounded-full px-5 py-3 text-white focus:outline-none ${error ? "border-red-600" : "border-gray-700 focus:border-cyan-400"}`}
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      {showConfirm ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                    </button>
                 </div>
                </div>
              </>
            )}

            {error && <p className="text-red-600 text-xs mt-2 ml-4 animate-pulse">{error}</p>}

            <button type="submit" disabled={loading} className={`main-btn flex font-manrope mt-4 ${loading ? "opacity-50" : ""}`}>
              <div className="text bg-secondary text-white text-base lg:text-lg leading-10 py-1 px-10 rounded-[50px]">
                {loading ? "Processing..." : step === 3 ? "Update Password" : "Next Step"}
              </div>
              <Arrow customClass="bg-secondary text-white -rotate-45" />
            </button>
          </form>

          <button onClick={() => window.history.back()} className="text-gray-400 text-base md:text-lg block mt-8 hover:text-white transition-colors text-left">
            ← Back to Login
          </button>
        </div>

        <div className="hidden md:block w-1/2 p-4">
          <div className="h-full w-full rounded-2xl overflow-hidden relative">
            <img src="/admin-login.png" alt="Branding" className="w-full object-cover h-full" />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ForgotPassword;