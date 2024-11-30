import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import Navbar from "../resources/Navbar-Colorful";
import "../../src2/tailwind.css";

const validCategories = [
  "fotografi",
  "karya-fisik",
  "kerajinan-tangan",
  "karya-digital",
  "video-dan-sinematografi",
  "karya-sastra",
];

const KategoriPage = () => {
  const { kategori } = useParams();
  const [karya, setKarya] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengecek apakah kategori valid
  const isValidCategory = validCategories.includes(kategori);

  useEffect(() => {
    if (isValidCategory) {
      fetchKarya();
    }
  }, [kategori]);

  const fetchKarya = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("karya")
        .select("id_karya, subkategori, judul_karya, pembuat, deskripsi, image_url")
        .eq("kategori", kategori); // Fetch karya sesuai kategori

      if (error) {
        console.error("Error fetching karya:", error);
        return;
      }
      setKarya(data);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Redirect ke halaman 404 jika kategori tidak valid
  if (!isValidCategory) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="min-w-screen min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
          Kategori: {kategori.replace(/-/g, " ")}
        </h1>

        {/* Galeri Karya */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center items-center col-span-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          ) : karya.length > 0 ? (
            karya.map((item) => (
              <div
                key={item.id_karya}
                className="bg-white shadow-md rounded-lg overflow-hidden relative"
              >
                {/* Gambar */}
                <div className="relative">
                  <img
                    src={item.image_url}
                    alt={item.judul_karya}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                </div>

                {/* Informasi Karya */}
                <div className="p-4">
                  <p className="text-sm text-gray-500 uppercase">
                    Subkategori: {item.subkategori}
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mt-2">
                    {item.judul_karya}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pembuat: {item.pembuat}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">{item.deskripsi}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              Belum ada karya untuk kategori ini.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KategoriPage;
