"use client";

import { useState } from "react";

import axios from "axios";

import { Button } from "../components/AllComponents";
import { Input } from "../components/AllComponents";
import { Label } from "../components/AllComponents";
import { Moon, Sun } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  const getOtpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:5100/api/auth/get-otp",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setOtpSent(true);
      } else {
        setError("already regsiter with this email , try login !");
      }
    } catch (error) {
      alert("already regsiter with this email , try login !");
    }
  };

  const verifyOtpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!otp) {
        setError("Please enter OTP");
        return;
      }
      // Simulating API call
      let response = await axios.post(
        "http://localhost:5100/api/auth/verify-otp",
        {
          email,
          password,
          otp,
        }
      );
      if (response.status === 200) {
        alert("Otp validation is successfull !");
      } else {
        setError("Invalid OTP !");
      }
    } catch (error) {
      setError("Invalid OTP");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <nav className={`py-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            Portfolio
          </a>
          <div className="flex items-center space-x-4">
            <a href="/admin" className="hover:underline">
              Admin Panel
            </a>
            <Button
              //   variant="ghost"
              //   size="icon"
              onClick={toggleDarkMode}
              className={darkMode ? "text-white" : "text-black"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle dark mode </span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center mt-10">
        <div
          className={`w-full max-w-md p-8 space-y-8 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          } rounded-xl shadow-md`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Register</h2>
          </div>
          <form
            onSubmit={otpSent ? verifyOtpHandler : getOtpHandler}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              />
            </div>
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`w-full ${
                    darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className={`w-full ${
                darkMode
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {otpSent ? "Verify OTP" : "Get OTP"}
            </Button>
          </form>
          <div className="text-center">
            <a
              href="/login"
              className="text-gray-600 underline hover:underline"
            >
              Already registered? Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
