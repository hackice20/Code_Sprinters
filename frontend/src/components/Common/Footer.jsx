import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-white font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              UnBoundEd is dedicated to making quality education accessible to
              everyone, everywhere.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin/auth" className="hover:text-white">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} UnBoundEd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
