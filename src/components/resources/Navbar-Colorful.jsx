import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import LogoArtro from "../../src2/resources/logoartro.png";
import PanahBawah from "../../src2/resources/panah bawah.png";
import hamburger from "../../src2/resources/hamburger.svg";

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const visitorName = Cookies.get("visitorName") || "Visitor";
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // State untuk sub-dropdown kategori
  const [isVisitorDropdownOpen, setIsVisitorDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null); // Ref untuk sub-dropdown kategori
  const visitorDropdownRef = useRef(null);

  // Fetch kategori dari Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("kategori")
        .select("nama_kategori");
      if (error) console.error("Error fetching categories:", error);
      else setCategories(data);
    };
    fetchCategories();
  }, []);

  // Tutup dropdown jika klik di luar elemen
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target) &&
        visitorDropdownRef.current &&
        !visitorDropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
        setIsCategoryDropdownOpen(false);
        setIsVisitorDropdownOpen(false);
      } else if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        visitorDropdownRef.current &&
        !visitorDropdownRef.current.contains(e.target) &&
        !categoryDropdownRef.current?.contains(e.target) // Tambahkan kondisi ini
      ) {
        setIsDropdownOpen(false);
        setIsVisitorDropdownOpen(false);
      } else if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target) &&
        dropdownRef.current &&
        dropdownRef.current.contains(e.target) &&
        !e.target.closest('[aria-controls="category-dropdown"]') // Tambahkan kondisi ini
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("visitorName");
    navigate("/visitorForm");
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#00525e] font-"
      : "text-[#00525e]/60 hover:text-[#32779a]";
  };

  return (
    <>
      {/* MOBILE VIEW */}
      {isMobile && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-[1.6rem] w-[90%] max-w-[48rem] flex flex-col items-center drop-shadow-lg">
          {/* Header */}
          <div className="w-full px-4 py-5 md:px-10 md:py-10 bg-gradient-to-br from-zinc-100/85 to-neutral-200/75 rounded-lg outline outline-[0.3125rem] outline-gray-200/40 backdrop-blur-[0.81px] flex flex-col justify-center items-center gap-2.5">
            <div className="w-full flex flex-row justify-between items-center">
              <img
                className="w-32 md:w-80 h-auto"
                src={LogoArtro}
                alt="Logo Artropolis"
                onClick={() => navigate("/")}
              />
              <div className="flex flex-col items-end gap-0 md:gap-2.5">
                <div className="text-cyan-700 text-2xl md:text-5xl font-normal font-yatra [text-shadow:_0px_5px_9px_rgb(226_236_241_/_1.00)] leading-tight">
                  {visitorName.split(" ")[0]}
                </div>
                <div className="text-purple-900/75 text-sm md:text-2xl font-normal font-yatra">
                  Visitor
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Trigger */}
          <div
            className="px-7 h-8 bg-gradient-to-br from-zinc-300/30 to-neutral-200/30 rounded-b-lg border-l-[0.3125rem] border-r-[0.25rem] border-b-[0.25rem] border-gray-200/40 backdrop-blur-[0.81px] flex justify-center items-center cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img className="w-4 h-3" src={hamburger} alt="Hamburger" />
          </div>

          {/* Isi Dropdown Utama */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full mt-4 w-[92vw] max-w-sm bg-white/80 backdrop-blur-md rounded-xl border-[3px] border-[#e0e0e0] shadow-xl z-50 animate-fadeInSlide px-4 py-3 transition-all duration-300 ease-out"
            >
              {/* Home */}
              <div
                className="py-3 text-[#00525e] font-yatra text-base xl:text-sm hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] hover:text-white rounded-md cursor-pointer transition duration-200 px-3 border-b border-gray-300"
                onClick={() => {
                  navigate("/");
                  setIsDropdownOpen(false);
                }}
              >
                Home
              </div>

              {/* Kategori Karya (Dropdown Trigger) */}
              <div className="py-3 border-b border-gray-300">
                <div
                  className="flex justify-between items-center px-3 text-[#00525e] font-yatra text-base xl:text-sm cursor-pointer"
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                  aria-controls="category-dropdown"
                  aria-expanded={isCategoryDropdownOpen}
                >
                  Kategori Karya
                  <img
                    className={`w-4 h-3 transition-transform duration-300 ${
                      isCategoryDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    src={PanahBawah}
                    alt="Dropdown Icon"
                  />
                </div>

                {/* Sub-Dropdown Kategori */}
                {isCategoryDropdownOpen && (
                  <div
                    ref={categoryDropdownRef}
                    className="ml-2 mt-1 space-y-1 animate-fadeInSlide"
                  >
                    {categories.length > 0 ? (
                      categories.map((cat, idx) => (
                        <div
                          key={idx}
                          className="px-5 py-2 text-sm xl:text-xs font-yatra text-[#00525e] hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] hover:text-white rounded-md cursor-pointer transition duration-200"
                          onClick={() => {
                            navigate(`/${cat.nama_kategori}`);
                            setIsDropdownOpen(false);
                            setIsCategoryDropdownOpen(false);
                          }}
                        >
                          {cat.nama_kategori}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        Tidak ada kategori
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Seniman */}
              <div
                className="py-3 px-3 text-[#00525e] font-yatra text-base xl:text-sm hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] hover:text-white rounded-md cursor-pointer transition duration-200 border-b border-gray-300"
                onClick={() => {
                  navigate("/seniman");
                  setIsDropdownOpen(false);
                }}
              >
                Seniman
              </div>

              {/* Glimpse of Artropolis */}
              <div
                className="py-3 px-3 text-[#00525e] font-yatra text-base xl:text-sm hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] hover:text-white rounded-md cursor-pointer transition duration-200 border-b border-gray-300"
                onClick={() => {
                  navigate("/glimpse-of-artropolis");
                  setIsDropdownOpen(false);
                }}
              >
                Glimpse of Artropolis
              </div>

              {/* Champions */}
              <div
                className="py-3 px-3 text-[#00525e] font-yatra text-base xl:text-sm hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] hover:text-white rounded-md cursor-pointer transition duration-200 border-b border-gray-300"
                onClick={() => {
                  navigate("/champions");
                  setIsDropdownOpen(false);
                }}
              >
                Champions
              </div>

              {/* Logout */}
              <div
                className="py-3 px-3 text-red-600 font-yatra text-base xl:text-sm hover:underline cursor-pointer transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}

      {/* DESKTOP VIEW (Tidak ada perubahan signifikan) */}
      {isDesktop && (
        <div className="fixed top-0 flex w-full justify-center z-50">
          <div className="w-full max-w-[80%] h-28 mx-auto px-6 bg-gradient-to-r from-[#d7d7d7]/50 to-[#dfdfdf]/50 rounded-[10px] border-4 border-[#e9e9e9]/40 backdrop-blur-lg flex items-center relative mt-[50px] bg-opacity-30">
            {/* Logo */}
            <img
              className="ml-8 w-[15%]"
              src={LogoArtro}
              alt="Artropolis Logo"
              onClick={handleLogout}
            />

            {/* Menu Navigasi */}
            <div className="flex-grow flex justify-center items-center gap-6 xl:gap-10 text-lg font-normal font-yatra cursor-pointer ">
              {/* Home */}
              <div
                className={`${getLinkClass("/")} `}
                onClick={() => navigate("/")}
              >
                Home
              </div>

              {/* Kategori Karya dengan Dropdown */}
              <div
                className="relative flex items-center cursor-pointer gap-2 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                ref={dropdownRef}
              >
                <div
                  className={
                    location.pathname.startsWith("/kategori")
                      ? "text-[#00525e] font-normal"
                      : "text-[#00525e]/60 font-normal hover:text-[#32779a] font-yatra "
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
                  <div className="absolute top-full mt-4 bg-gradient-to-r from-[#ffffff]/90 to-[#ffffff]/85 rounded-[10px] border-4 border-[#e9e9e9]/40 w-52">
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 text-base xl:text-sm text-[#00525e] hover:bg-gradient-to-r from-[#32779A] to-[#1e719b] rounded-[10px] hover:text-[#ffffff] cursor-pointer"
                          onClick={() => {
                            navigate(`/${category.nama_kategori}`);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {category.nama_kategori}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-base xl:text-lg">
                        No Categories
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Seniman */}
              <div
                className={`${getLinkClass("/seniman")}`}
                onClick={() => navigate("/seniman")}
              >
                Seniman
              </div>

              {/* Glimpse of Artropolis */}
              <div
                className={`${getLinkClass("/glimpse-of-artropolis")} `}
                onClick={() => navigate("/glimpse-of-artropolis")}
              >
                Glimpse of Artropolis
              </div>

              {/* Champions */}
              <div
                className={`${getLinkClass("/champions")} `}
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
                className="text-[#32779a] text-2xl font-normal font-yatra cursor-pointer"
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
                    className="px-4 py-3 text-lg text-[#00525e] hover:bg-gradient-to-r from-[#973952] to-[#ab0e6a] rounded-[10px] hover:text-[#ffffff] cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
