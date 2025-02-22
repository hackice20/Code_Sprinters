import { GraduationCap } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = ({ setTab }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        setUser({
          email: "",
          password: "",
        })
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center">
        <GraduationCap className="w-16 h-16" />
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-center text-gray-600">
          Unlock Knowledge, Elevate Learning! <br /> Admin Login
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-semibold text-[16px] text-left">
              Email Address
            </label>
            <Input
              type="email"
              className="w-full"
              placeholder="you@example.com"
              name="email"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-[16px] text-left">
              Password
            </label>
            <Input
              type="password"
              className="w-full"
              placeholder="••••••••"
              name="password"
              onChange={handleChange}
              value={user.password}
            />
          </div>

          <div className="w-full mt-5">
            <Button
              className="w-full text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-purple-700 bg-purple-600"
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
        <div className="mt-1">
          <p className="text-center">
            Don't have an account?{" "}
            <span
              className="text-purple-600 font-semibold cursor-pointer"
              onClick={() => {
                setTab("register");
              }}
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
