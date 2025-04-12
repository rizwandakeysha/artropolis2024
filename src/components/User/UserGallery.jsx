import React, { useEffect, useRef, useState } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    const nameFromCookie = Cookies.get("visitorName");
    if (!nameFromCookie) {
      navigate("/visitor");
    } else {
      setVisitorName(nameFromCookie);
    }
  }, [navigate]);

  const fetchKarya = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("karya").select(
        `
          id_karya,
          judul_karya,
          deskripsi,
          ukuran,
          image_url,
          pembuat ( nama_pembuat ),
          kategori ( nama_kategori ),
          sub_kategori ( nama_sub_kategori )
        `
      );

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setKarya(data);
      const shuffled = shuffleArray(data); // 🔀 Acak semua karya
      setKarya(shuffled); // simpan semua hasil acak
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKarya();
  }, []);

  // 🔁 Acak array (Fisher-Yates Shuffle)
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const handleScrollUnlock = () => {
    const target = document.getElementById("Fotografi");
    const offset = window.innerHeight * 0.25;
    if (target) {
      const topPos =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  };

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      <title>Home - Artropolis 2024</title>
      <div className="min-h-screen pt-[5%] px-6 font-yatra relative bg-repeat-y bg-cover bg-top pb-32">
        {/* Section 1 */}
        <section
          id="Home"
          className="min-h-screen relative flex z-10 text-center justify-center items-center"
        >
          <div className="max-w-2xl mx-auto">
            <img
              className="w-full max-w-[120%] h-auto mx-auto transition-transform duration-300 hover:scale-105"
              src={ArtEx}
              alt="Digital Art Exhibition"
            />
            <div
              className="mt-6 w-[15rem] h-[4rem] xl:w-[20rem] xl:h-[5rem] mx-auto bg-gradient-to-b from-[#32779a] to-[#61acb7] rounded-full hover:scale-105 hover:shadow-xl shadow flex justify-center items-center cursor-pointer gap-2 transition-all duration-300 ease-in-out py-3 px-4"
              onClick={handleScrollUnlock}
            >
              <img
                className="w-6 md:w-8 h-auto"
                src={MM}
                alt="Mulai Menjelajah"
              />
              <button className="text-white text-lg xl:text-2xl font-normal">
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

        {/* Section 2 - Gallery */}
        <section
          ref={sectionRef}
          id="Fotografi"
          className={`
            relative z-10 px-4 md:px-10 xl:px-20 
            transition-all duration-1000 ease-out transform will-change-transform
            opacity-0 translate-y-10 
            ${isVisible ? "opacity-100 translate-y-0" : ""}
          `}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-left text-3xl md:text-4xl text-[#32779a] mb-2">
              <span
                className="font-semibold text-[#236587] underline cursor-pointer"
                onClick={() => navigate("/kategori/fotografi")}
              >
                Fotografi
              </span>
            </h2>
            <h4 className="text-left text-md md:text-xl text-[#818181] lg:text-[#B2B4B6] mb-6">
              Momen-momen kehidupan terabadikan indah dalam potret kamera
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
              {loading ? (
                <div className="flex justify-center items-center h-64 col-span-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1d5892]"></div>
                </div>
              ) : karya.length > 0 ? (
                karya
                  .filter(
                    (item) => item.kategori?.nama_kategori === "Fotografi"
                  )
                  .slice(0, 4)
                  .map((item) => (
                    <div
                      key={item.id_karya}
                      className="relative w-full md:max-w-[300px] h-[250px] px-[10px] py-[10px] bg-gradient-to-br from-white/40 to-white/0 rounded-[20px] outline outline-[3.5px] outline-black/50 backdrop-blur-2xl flex justify-center items-center overflow-hidden group transition-all duration-300 ease-in-out hover:scale-110"
                    >
                      <img
                        src={item.image_url}
                        alt={item.judul_karya}
                        className="w-full h-full object-cover rounded-[15px] z-0"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-br from-[#e3e0df] to-[#c7efe9] backdrop-blur-md rounded-b-[20px] rounded-t-none px-3 pt-4 text-[#1f1f1f] border-[10px] border-[#069ca1]/55 border-t-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
                        <p className="text-sm text-[#9F6A65] mb-1">
                          {item.sub_kategori?.nama_sub_kategori ||
                            "Subkategori"}
                        </p>
                        <h1 className="text-2xl text-[#387D9D] mb-1">
                          {item.judul_karya}
                        </h1>
                        <p className="text-sm text-[#7f4c3e] mb-2">
                          oleh {item.pembuat?.nama_pembuat || "Pembuat"}
                        </p>
                        <p className="text-xs text-[#6f6f6f] line-clamp-3 mb-2">
                          {item.deskripsi}
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

            <button
              className="mt-6 h-[4rem] w-full xl:h-[3.5rem] mx-auto bg-gradient-to-b from-[#32779a] to-[#61acb7] rounded-full hover:shadow-xl shadow flex justify-center items-center cursor-pointer gap-2 transition-all duration-300 ease-in-out py-3 px-4 text-white text-lg"
              onClick={() => navigate("/kategori/fotografi")}
            >
              Lihat karya fotografi lainnya
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default UserGallery;
