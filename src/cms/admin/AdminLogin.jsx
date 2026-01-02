import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Arrow from "../../components/Arrow";
import { API_BASE_URL } from "../../services/apiService";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Control flow states
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- NEW TIMER STATES ---
  const [timer, setTimer] = useState(0); 
  const [canResend, setCanResend] = useState(false);

  const BASE_URL = API_BASE_URL;

  // --- TIMER LOGIC ---
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startTimer = () => {
    setTimer(60); // 1 minute
    setCanResend(false);
  };

  // STEP 1: Request OTP
  const handleVerifyEmail = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/auth/admin/request-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setStep(2);
        startTimer(); // Start timer on successful request
      } else {
        setError("Email is not verified");
      }
    } catch (err) {
      setError("Email check failed");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP LOGIC
  const handleResendOTP = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/admin/request-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ email: email }),
      });
      if (response.ok) {
        startTimer(); // Restart timer
        setError("");
      }
    } catch (err) {
      setError("Resend failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOTP = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/auth/admin/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ email: email, otp: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("sessionToken", data.sessionToken);
        setStep(3);
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Login
  const handleFinalLogin = async () => {
    setLoading(true);
    setError("");
    const sessionToken = localStorage.getItem("sessionToken");

    try {
      const response = await fetch(`${BASE_URL}/auth/admin/login/`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        // localStorage.removeItem("sessionToken");
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid Credentials");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center py-[80px] px-[20px]">
      <div className="flex flex-col md:flex-row w-full max-w-[1400px] bg-[#0a0f14] rounded-3xl border border-gray-800">
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-[36px] md:text-[47px] text-white font-manrope">Get Started Now</h2>
          <p className="text-gray-400 text-base md:text-xl mb-8 font-manrope">
            Admin access portal. Please verify your identity to proceed.
          </p>

          <div className="space-y-6">
            {/* Admin Email Section */}
            <div className="flex flex-col">
              <label className="block text-gray-400 text-base md:text-xl mb-2 ml-1 font-manrope">Admin Email</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={step > 1}
                  className={`w-full bg-transparent border rounded-full px-5 py-3 pr-28 text-white focus:outline-none transition-all
                    ${error && step === 1 ? "border-red-600" : "border-gray-700 focus:border-cyan-400"}
                    ${step > 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {step === 1 && (
                  <button
                    onClick={handleVerifyEmail}
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors bg-black/20 py-1 px-2 rounded-lg"
                  >
                    {loading ? "Checking..." : "Verify"}
                  </button>
                )}
              </div>
              {error && step === 1 && <p className="text-red-600 text-xs mt-2 ml-4">{error}</p>}
            </div>

            {/* OTP Field */}
            <div className={step < 2 ? "opacity-30 pointer-events-none" : ""}>
              <label className="block text-gray-400 text-base md:text-xl mb-2 font-manrope">OTP</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Share the OTP received on the admin email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={step !== 2}
                  className="w-full bg-transparent border border-gray-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-cyan-400 font-manrope"
                />
                {step === 2 && (
                  <button
                    onClick={handleVerifyOTP}
                    disabled={loading}
                    className="absolute right-5 top-1/2 -translate-y-1/2 font-manrope text-cyan-400 text-sm hover:text-cyan-300"
                  >
                    {loading ? "Checking..." : "Verify"}
                  </button>
                )}
              </div>
              
              {/* --- UPDATED RESEND BUTTON SECTION --- */}
              <button
                onClick={handleResendOTP}
                disabled={!canResend || loading}
                className={`mt-2 font-manrope text-sm transition-colors ${
                  canResend ? "text-cyan-400 hover:underline" : "text-gray-600 cursor-not-allowed"
                }`}
              >
                {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
              </button>
            </div>

            {/* Password Field */}
            <div className={step < 3 ? "opacity-30 pointer-events-none" : ""}>
              <label className="block text-gray-400 text-base md:text-xl mb-2 font-manrope">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={step !== 3}
                  className="w-full bg-transparent border border-gray-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <HiOutlineEyeOff size={22} /> : <HiOutlineEye size={22} />}
                </button>
              </div>
              {error && step === 3 && <p className="text-red-600 text-xs mt-2 ml-4">{error}</p>}
            </div>

            {/* Final Sign In Button */}
            <button
              onClick={handleFinalLogin}
              disabled={step < 3 || loading}
              className={`main-btn flex font-manrope ${step === 3 ? "bg-cyan-400 text-black" : "cursor-not-allowed"}`}
            >
              <div className="text bg-secondary text-white text-base lg:text-lg leading-10 py-1 px-6 lg:leading-[40px] rounded-[50px]">
                {loading ? "Signing In..." : "Sign In"}
              </div>
              <Arrow customClass="bg-secondary text-white -rotate-45" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:block w-1/2 p-4">
          <div className="h-full w-full rounded-2xl overflow-hidden relative">
            <img src="/admin-login.png" alt="Branding" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;