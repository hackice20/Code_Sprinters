import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, GraduationCap } from "lucide-react";
import { AuthContext } from "@/context/authContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate("/auth");

  const handleClick = () => {
    try {
      sessionStorage.removeItem("token");
      alert("User Logged Out!!!");
      navigate("/auth");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[#FFFBF5]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-slate-800">
                UnBoundEd
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to={"/ExploreCourses"}
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Courses
            </Link>
            {user ? (
              <Link
                to={`dashboard`}
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                Dashboard
              </Link>
            ) : null}
            {user ? (
              <Link
                href="/"
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                My Course
              </Link>
            ) : null}
            {!user ? (
              <Link to={"/auth"}>
                <Button className="hover:bg-purple-600 bg-white text-black shadow-xl hover:text-white">
                  Login
                </Button>
              </Link>
            ) : (
              <Link to={"/dashboard"}>
                <Button
                  onClick={handleClick}
                  className="hover:bg-purple-600 bg-white text-black shadow-xl hover:text-white"
                >
                  LogOut
                </Button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
