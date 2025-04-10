import React from "react";
import Navbar from "./Navbar-Colorful";
import Background from "./Background";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const visitorName = Cookies.get("visitorName");
  const location = useLocation();

  // Tentukan path-path yang tidak ingin menampilkan navbar
  const hideNavbarPaths = ["/visitorForm", "/admin", "admin-login", "/admin/karya", "/admin/pembuat", "/admin/visitor"];

  return (
    <div className="relative w-full min-h-screen">
      <Background />
      {!hideNavbarPaths.includes(location.pathname) && (
        <Navbar visitorName={visitorName || ""} />
      )}
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
