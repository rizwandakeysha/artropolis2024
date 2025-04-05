import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import colorful from "../src2/resources/bg_colorful.png";
import ArtEx from "../src2/resources/digital art ex text.png";

function VisitorForm() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    document.cookie = `visitorName=${name}; path=/; max-age=${
      60 * 60 * 24 * 365
    };`;

    try {
      const { data, error } = await supabase
        .from("visitor")
        .insert([{ nama_visitor: name }]);

      if (error) {
        console.error("Error inserting visitor:", error);
        alert(`Terjadi kesalahan saat menyimpan data: ${error.message}`);
        return;
      }

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Unexpected error:", err.message);
      alert("Terjadi kesalahan tak terduga saat menyimpan data. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4">
          <title>Welcome! - Artropolis 2024</title>
      {/* Background Image */}
      <img
        src={colorful}
        className="absolute right-0 left-0 top-0 z-0 w-full h-full object-cover"
        alt=""
      />

      {/* Konten utama */}
      <div className="relative z-10 w-full max-w-[994px] flex flex-col items-center justify-center gap-6 animate-fade-in">
        {/* Teks Selamat Datang */}
        <div className="text-center text-[#32779a] text-[clamp(28px,4vw,48px)] font-normal font-yatra">
          Selamat Datang di
        </div>

        {/* Gambar ArtEx */}
        <img
          className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[680px] h-auto transition-all duration-500"
          src={ArtEx}
          alt="Artropolis Welcome"
        />

        {/* Form Input Nama */}
        <form
  onSubmit={handleSubmit}
  className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2"
>
  {/* Input Nama */}
  <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Masukkan nama kamu"
  className={`w-full sm:flex-grow px-4 py-[14px] text-[clamp(20px,3vw,24px)] text-center font-yatra outline-none rounded-[20px] shadow backdrop-blur-sm placeholder-gray-400 bg-white/80
    ${name.length > 0 ? "text-[#32779a] border-[#32779a]/50" : "text-[#ededed] border-[#e6e6e6]"}
    border-2 transition-all duration-300 caret-[#32779a]

  `}
/>

  {/* Tombol Submit */}
  <button
    type="submit"
    className="w-1/2 sm:w-[225px] py-3 bg-[#32779a] text-white text-[clamp(18px,2.5vw,24px)] font-yatra rounded-[20px] hover:bg-[#286085] transition-all duration-300"
  >
    Submit
  </button>
</form>

      </div>
    </div>
  );
}

export default VisitorForm;
