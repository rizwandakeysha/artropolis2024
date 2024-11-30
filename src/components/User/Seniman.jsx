import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../resources/Navbar-Colorful";
import "../../src2/tailwind.css";
import colorfull from "../../src2/resources/colorfulbg.png";
import dafsen from "../../src2/resources/daftar seniman.png";
import MM from "../../src2/resources/mulai menjelajah.png";
import pb2 from "../../src2/resources/panah bawha 2.png";

function Seniman() {
  const [senimanData, setSenimanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visitorName, setVisitorName] = useState("");
  const navigate = useNavigate();

  // Cek nama pengunjung dari cookie
  useEffect(() => {
    const nameFromCookie = Cookies.get("visitorName");
    if (!nameFromCookie) {
      navigate("/visitor");
    } else {
      setVisitorName(nameFromCookie);
    }
  }, [navigate]);

  // Ambil data seniman dari Supabase
  const fetchSeniman = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("pembuat") // Ganti dengan nama tabel yang benar
        .select(`
          nama_pembuat,
          karya (
            judul_karya
          )
        `);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setSenimanData(data);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeniman();
  }, []);

  // Scroll ke section SenimanSection
  const handleScrollToSection = () => {
    const section = document.getElementById("SenimanSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar visitorName={visitorName} />

      {/* Main content */}
      <div className="min-w-screen min-h-screen pt-[130px] px-6 font-yatra relative bg-repeat-y">
        {/* Background */}
        <div className="absolute right-0 left-0 top-0 z-0 bg-cover bg-repeat-y bg-top">
          <img src={colorfull} alt="Background" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {/* Section 1 */}
        <section id="Home" className="relative z-10 text-center">
          <div className="Group1000005017 w-full max-w-[680px] mx-auto">
            <img
              className="DigitalArtExText2 w-full h-auto mx-auto transition-transform duration-300 hover:scale-105 mb-6"
              src={dafsen}
              alt="Daftar Seniman"
            />

            <div className="Frame1111 w-[383px] h-24 mx-auto bg-gradient-to-b from-[#32779a] to-[#61acb7] rounded-[49px] hover:scale-110 hover:shadow-xl shadow flex justify-center items-center gap-2.5 transition-all duration-300 ease-in-out">
              <img
                className="MulaiMenjelajah1 w-[29px] h-[31px]"
                src={MM}
                alt="Mulai Menjelajah"
              />
              <button
                className="MulaiMenjelajah text-white text-3xl font-normal font-yatra"
                onClick={handleScrollToSection}
              >
                Lihat Seniman
              </button>
            </div>
            <br />
            <br />
            <img
              className="PanahBawha21 w-[33px] h-[35px] mx-auto mt-5 animate-bounce"
              src={pb2}
              alt="Arrow Down"
            />
          </div>
        </section>

        <section id="SenimanSection" className="relative z-10 pt-20 px-10">
          <br />
          <br />
          <br />
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {loading ? (
              <div className="flex justify-center items-center h-64 col-span-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            ) : senimanData.length > 0 ? (
              senimanData.map((seniman, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg shadow-lg overflow-hidden relative group"
                >
                  {/* Nama Pembuat */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {seniman.nama_pembuat}
                    </h3>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                      {seniman.karya.map((karya, karyaIndex) => (
                        <li key={karyaIndex}>{karya.judul_karya}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Layer */}
                  <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="px-4 py-2 bg-blue-500 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                      onClick={() => openModal(seniman.karya)}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">
                Belum ada data seniman yang tersedia.
              </p>
            )}
          </div>

          {/* Modal */}
          {modalData && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
              onClick={closeModal}
            >
              <div
                className="bg-white rounded-lg shadow-lg p-6 max-w-xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  ×
                </button>
                <h3 className="text-lg font-bold mb-4">Detail Karya</h3>
                <div className="grid grid-cols-1 gap-4">
                  {modalData.map((karya, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <img
                        src={karya.image_url ? (
                          <img src={karya.image_url} alt={karya.judul_karya} className="w-auto mx-auto" />
                        ) : (
                          <p>Tidak ada gambar</p>
                        )}
                        alt={karya.judul_karya}
                        className="rounded-lg w-full h-48 object-cover mb-2"
                      />
                      <h4 className="text-md font-semibold">
                        {karya.judul_karya}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Kategori: {karya.kategori}
                      </p>
                      <p className="text-sm text-gray-600">
                        Subkategori: {karya.sub_kategori}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Seniman;
