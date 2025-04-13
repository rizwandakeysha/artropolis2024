// Component GenericGallerySection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function GaleriSection({
  id,
  kategoriNama,
  keterangan,
  karya,
  loading,
}) {
  const navigate = useNavigate();

  const filteredKarya = karya.filter(
    (item) => item.kategori?.nama_kategori === kategoriNama
  );

  return (
    <section id={id} className="relative z-10 px-4 md:px-10 xl:px-20 mt-20 transition-all duration-1000 ease-out transform will-change-transform opacity-0 translate-y-10 group-[.visible]:opacity-100 group-[.visible]:translate-y-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-left text-3xl md:text-4xl text-[#32779a] mb-2">
          <span
            className="font-semibold text-[#236587] underline cursor-pointer"
            onClick={() => navigate(`/kategori/${kategoriNama.toLowerCase().replace(/ /g, '-')}`)}
          >
            {kategoriNama}
          </span>
        </h2>
        <h4 className="text-left text-md md:text-xl text-[#818181] lg:text-[#B2B4B6] mb-6">
          {keterangan}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {loading ? (
            <div className="flex justify-center items-center h-64 col-span-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1d5892]"></div>
            </div>
          ) : filteredKarya.length > 0 ? (
            filteredKarya.slice(0, 4).map((item) => (
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
                    {item.sub_kategori?.nama_sub_kategori || "Subkategori"}
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
          onClick={() => navigate(`/kategori/${kategoriNama.toLowerCase().replace(/ /g, '-')}`)}
        >
          Lihat {kategoriNama.toLowerCase() === 'karya fisik' ? 'seni ' : ''}
          {kategoriNama.toLowerCase()} lainnya
        </button>
      </div>
    </section>
  );
}

export default GaleriSection;