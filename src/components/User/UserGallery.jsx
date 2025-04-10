import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../src2/tailwind.css";
import ArtEx from "../../src2/resources/digital art ex text.png";
import MM from "../../src2/resources/mulai menjelajah.png";
import pb2 from "../../src2/resources/panah bawha 2.png";

function UserGallery() {
  const [karya, setKarya] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visitorName, setVisitorName] = useState("");
  // const [allowScroll, setAllowScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const nameFromCookie = Cookies.get("visitorName");
    if (!nameFromCookie) {
      navigate("/visitor");
    } else {
      setVisitorName(nameFromCookie);
    }
  }, [navigate]);

  // useEffect(() => {
  //   document.body.style.overflow = allowScroll ? "auto" : "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto"; // Reset overflow on component unmount
  //   };
  // }, [allowScroll]);

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
    document.getElementById("Fotografi").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <title>Home - Artropolis 2024</title>
      {/* Main Content */}
      <div className="min-h-screen pt-[130px] px-6 font-yatra relative bg-repeat-y bg-cover bg-top">
        {/* Section 1 */}
        <section id="Home" className="relative flex z-10 text-center justify-center items-center pt-28">
        <div className="max-w-2xl mx-auto">
            <img
              className="w-full max-w-[120%] h-auto mx-auto transition-transform duration-300 hover:scale-105"
              src={ArtEx}
              alt="Digital Art Exhibition"
            />

            <div className="mt-6 w-[15rem] h-[4rem] xl:w-[20rem] xl:h-[5rem] mx-auto bg-gradient-to-b from-[#32779a] to-[#61acb7] rounded-full hover:scale-105 hover:shadow-xl shadow flex justify-center items-center cursor-pointer gap-2 transition-all duration-300 ease-in-out py-3 px-4" onClick={handleScrollUnlock}>
              <img className="w-6 md:w-8 h-auto" src={MM} alt="Mulai Menjelajah" />
              <button
                className="text-white text-lg xl:text-2xl font-normal"
              >
                Mulai Menjelajah!
              </button>
            </div>

            <img
              className="w-5 h-5 md:w-6 md:h-6 mx-auto mt-8 animate-bounce"
              src={pb2}
              alt="Scroll Down"
            />
          </div>
        </section>

        {/* Section 2 */}
        <section
          id="Fotografi"
          className="relative z-10 py-52 px-4 md:px-10 xl:px-20"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-left text-3xl md:text-4xl text-[#32779a] mb-2">
              Terabadikan Indah melalui <span className="font-semibold text-[#236587] underline cursor-pointer" onClick={() => navigate("/kategori/fotografi")}>Fotografi</span>
            </h2>
            <h4 className="text-left text-xl md:text-xl text-[#B2B4B6] mb-6">
            Momen-momen kehidupan terabadikan indah dalam potret kamera
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="flex justify-center items-center h-64 col-span-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
              ) : karya.length > 0 ? (
                karya.map((item) => (
                  <div
                    key={item.id_karya}
                    className="bg-white/70 backdrop-blur-md p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={item.image_url}
                      alt={item.judul_karya}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="mt-3">
                      <h3 className="text-lg font-bold text-[#00525e]">
                        {item.judul_karya}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {item.deskripsi}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Ukuran: {item.ukuran}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  Belum ada karya yang tersedia.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UserGallery;
