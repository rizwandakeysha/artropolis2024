import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import LogoArtro from "../../src2/resources/Logo + typograph.png";
import PanahBawah from "../../src2/resources/panah bawah.png";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisitorDropdownOpen, setIsVisitorDropdownOpen] = useState(false);
  const visitorName = Cookies.get("visitorName") || "Visitor";
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const visitorDropdownRef = useRef(null);

  // Fetch data kategori dari database
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("kategori")
        .select("nama_kategori");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  // Function to handle click outside of dropdowns
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      visitorDropdownRef.current &&
      !visitorDropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsVisitorDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdowns
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Logout
  const handleLogout = () => {
    Cookies.remove("visitorName");
    navigate("/visitorForm");
  };

  // Function to determine active link style
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#00525e] text-2xl font-normal font-yatra cursor-pointer"
      : "text-[#00525e]/60 text-2xl font-normal font-yatra cursor-pointer hover:text-[#32779a] transition-colors";
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Background Navbar */}
      <div className="w-[calc(100%-370px)] h-[120px] bg-gradient-to-r from-[#d7d7d7]/50 to-[#dfdfdf]/50 rounded-[10px] border-4 border-[#e9e9e9]/40 backdrop-blur-lg flex items-center relative mx-[185px] mt-[50px] bg-opacity-30">
        {/* Logo */}
        <img
          className="ml-8 w-[204.40px] h-[71.12px]"
          src={LogoArtro}
          alt="Artropolis Logo"
        />

        {/* Menu Navigasi */}
        <div className="flex-grow flex justify-center items-center gap-10">
          {/* Home */}
          <div className={getLinkClass("/")} onClick={() => navigate("/")}>
            Home
          </div>

          {/* Kategori Karya dengan Dropdown */}
          <div
            className="relative flex items-center cursor-pointer gap-2 transition-colors font-yatra"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}
          >
            <div
              className={
                location.pathname.startsWith("/kategori")
                  ? "text-[#00525e] text-2xl font-normal"
                  : "text-[#00525e]/60 text-2xl font-normal hover:text-[#32779a] font-yatra"
              }
            >
              Kategori Karya
            </div>
            <img
              className={`w-4 h-3 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              } duration-300`}
              src={PanahBawah}
              alt="Dropdown Icon"
            />

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-4 bg-gradient-to-r from-[#ffffff]/90 to-[#ffffff]/85 rounded-[10px] border-4 border-[#e9e9e9]/40 w-66">
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 text-lg text-[#00525e] hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] rounded-[10px] hover:text-[#ffffff] cursor-pointer"
                      onClick={() => {
                        navigate(`/${category.nama_kategori}`);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {category.nama_kategori}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No Categories</div>
                )}
              </div>
            )}
          </div>

          {/* Seniman */}
          <div
            className={getLinkClass("/seniman")}
            onClick={() => navigate("/seniman")}
          >
            Seniman
          </div>

          {/* Glimpse of Artropolis */}
          <div
            className={getLinkClass("/glimpse-of-artropolis")}
            onClick={() => navigate("/glimpse-of-artropolis")}
          >
            Glimpse of Artropolis
          </div>

          {/* Champions */}
          <div
            className={getLinkClass("/champions")}
            onClick={() => navigate("/champions")}
          >
            Champions
          </div>
        </div>

        {/* Bagian Nama Visitor */}
        <div
          className="mr-8 flex flex-col items-end relative"
          ref={visitorDropdownRef}
        >
          <div
            className="text-[#32779a] text-[36px] font-normal font-yatra cursor-pointer"
            onClick={() => setIsVisitorDropdownOpen(!isVisitorDropdownOpen)}
          >
            {visitorName.split(" ")[0]}
          </div>
          <div className="text-[#620f89]/75 text-lg font-normal font-yatra">
            Visitor
          </div>

          {/* Dropdown Menu Visitor */}
          {isVisitorDropdownOpen && (
            <div className="absolute top-full mt-4 bg-gradient-to-r from-[#ffffff]/90 to-[#ffffff]/85 rounded-[10px] border-4 border-[#e9e9e9]/40 w-[150px] font-yatra">
              <div
                className="px-4 py-3 text-lg text-[#00525e] hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] rounded-[10px] hover:text-[#ffffff] cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
