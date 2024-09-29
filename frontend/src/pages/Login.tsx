"use client";

import { useState } from "react";

import { Button } from "../components/AllComponents";
import { Input } from "../components/AllComponents";
import { Label } from "../components/AllComponents";
import { Moon, Sun } from "lucide-react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  const loginhandler = async (e: React.FormEvent) => {
    setError("");

    e.preventDefault();
    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }
      // Simulating API call
      let response = await axios.post("http://localhost:5100/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("login Succesfull !");
      } else {
        console.log("Status code :  ", response.status);
      }
    } catch (error: any) {
      console.log("error is : ", error);

      setError("Invalid Details : ");
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
              <span className="sr-only">Toggle dark mode</span>
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
            <h2 className="text-2xl font-bold">Login</h2>
          </div>
          <form onSubmit={loginhandler} className="space-y-6">
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className={`w-full ${
                darkMode
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Login
            </Button>
          </form>
          <div className="text-center">
            <a href="/register" className="text-blue-500 hover:underline">
              Not registered? Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
