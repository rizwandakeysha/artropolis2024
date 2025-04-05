import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../resources/Navbar-Colorful";
import "../../src2/tailwind.css";
import colorfull from "../../src2/resources/colorfulbg.png";
import ArtEx from "../../src2/resources/digital art ex text.png";
import MM from "../../src2/resources/mulai menjelajah.png";
import pb2 from "../../src2/resources/panah bawha 2.png";

function UserGallery() {
  const [karya, setKarya] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visitorName, setVisitorName] = useState("");
  const [allowScroll, setAllowScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const nameFromCookie = Cookies.get("visitorName");
    if (!nameFromCookie) {
      navigate("/visitor");
    } else {
      setVisitorName(nameFromCookie);
    }
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = allowScroll ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow on component unmount
    };
  }, [allowScroll]);

  const fetchKarya = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("karya")
        .select("id_karya, judul_karya, deskripsi, ukuran, image_url");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setKarya(data);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKarya();
  }, []);

  const handleScrollUnlock = () => {
    setAllowScroll(true);
    document.getElementById("Fotografi").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <title>Home - Artropolis 2024</title>
      {/* Memasukkan Navbar */}
      <Navbar visitorName={visitorName} />

      {/* Main content */}
      <div className="min-w-screen min-h-screen pt-[130px] px-6 font-yatra relative bg-repeat-y">
        {/* Background */}
        <div className="absolute right-0 left-0 top-0 z-0 bg-cover bg-repeat-y bg-top">
          <img src={colorfull} alt="" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* Section 1 */}
        <br />
        <section id="Home" className="relative z-10 text-center">
          <div className="w-full max-w-5xl px-4 mx-auto">
            <img
              className="w-full max-w-[936px] h-auto mx-auto transition-transform duration-300 hover:scale-105"
              src={ArtEx}
              alt="Digital Art Exhibition"
            />

            <div className="mt-6 w-[15rem] max-w-s mx-auto bg-gradient-to-b from-[#32779a] to-[#61acb7] rounded-full hover:scale-105 hover:shadow-xl shadow flex justify-center items-center gap-1.5 transition-all duration-300 ease-in-out py-3 px-4">
              <img className="w-4 h-4" src={MM} alt="" />
              <button
                className="text-white text-lg font-normal font-yatra"
                onClick={handleScrollUnlock}
              >
                Mulai Menjelajah!
              </button>
            </div>

            <img
              className="w-5 h-5 md:w-[25px] md:h-[27px] mx-auto mt-8 animate-bounce"
              src={pb2}
              alt="Arrow Down"
            />
          </div>
        </section>

        {/* Section 2 */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <section id="Fotografi" className="relative z-10 pt-20 px-10">
          <br />
          <br />
          <br />

          {/* Contoh daftar karya */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {loading ? (
              <div className="flex justify-center items-center h-64 col-span-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            ) : karya.length > 0 ? (
              karya.map((item) => (
                <div
                  key={item.id_karya}
                  className="bg-gray-100 p-4 rounded-lg shadow"
                >
                  <img
                    src={item.image_url}
                    alt={item.judul_karya}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h3 className="text-lg font-bold mt-2">{item.judul_karya}</h3>
                  <p className="text-sm text-gray-600">{item.deskripsi}</p>
                  <p className="text-sm text-gray-500">Ukuran: {item.ukuran}</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">
                Belum ada karya yang tersedia.
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default UserGallery;
