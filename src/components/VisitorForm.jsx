import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import colorful from "../src2/resources/bg_colorful.png";
import ArtEx from "../src2/resources/digital art ex text.png";

function VisitorForm() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Mencegah scroll pada halaman
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Mengembalikan scroll saat komponen dilepas
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi nama tidak boleh kosong
    if (!name.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    // Simpan nama ke cookies selama 1 tahun
    document.cookie = `visitorName=${name}; path=/; max-age=${
      60 * 60 * 24 * 365
    };`;

    try {
      console.log("Menyimpan nama visitor ke Supabase:", name);

      // Simpan data ke tabel visitor di Supabase
      const { data, error } = await supabase
        .from("visitor")
        .insert([{ nama_visitor: name }]);

      if (error) {
        console.error("Error inserting visitor:", error);
        alert(`Terjadi kesalahan saat menyimpan data: ${error.message}`);
        return;
      }

      console.log("Visitor berhasil ditambahkan:", data);

      // Redirect ke halaman utama setelah berhasil menyimpan data
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Unexpected error:", err.message);
      alert(
        "Terjadi kesalahan tak terduga saat menyimpan data. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Background Image */}
      <img
        src={colorful}
        className="absolute right-0 left-0 top-0 z-0 bg-cover bg-no-repeat"
        alt=""
      />

<div className="Group1000005016 w-[994.25px] h-[600px] relative flex flex-col items-center justify-center gap-[20px]">
  {/* Teks Selamat Datang */}
  <div className="SelamatDatangDi text-center text-[#32779a] text-[47.04px] font-normal font-yatra">
    Selamat Datang di
  </div>

  {/* Gambar Artropolis */}
  <img
    className="DigitalArtExText3 w-[685.89px] h-[305.94px]"
    src={ArtEx}
    alt="Artropolis Welcome"
  />

  {/* Form Input Nama */}
  <form
    onSubmit={handleSubmit}
    className="Frame1111 w-full h-[90.39px] bg-[#fcfcfc] rounded-[19.37px] shadow border-4 border-[#e6e6e6] flex items-center justify-between p-[10px] gap-[10px]"
  >
    {/* Input Nama */}
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Masukkan nama kamu"
      className="MasukkanNamaKamu flex-grow px-4 py-2 text-[#b6b6b6] text-[32px] font-normal font-yatra outline-none bg-transparent placeholder-gray-400 focus:text-[#32779a]"
    />

    {/* Tombol Submit */}
    <button
      type="submit"
      className="w-[225px] h-full bg-[#32779a] text-white text-[24px] font-yatra rounded-[19.37px] hover:bg-[#286085] transition-all duration-300 flex items-center justify-center"
    >
      Submit
    </button>
  </form>
</div>

    </div>
  );
}

export default VisitorForm;
