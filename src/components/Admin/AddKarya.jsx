import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

function AddKarya() {
  const [judul, setJudul] = useState("");
  const [pembuat, setPembuat] = useState("");
  const [kategori, setKategori] = useState("");
  const [subKategori, setSubKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const [pembuatOptions, setPembuatOptions] = useState([]);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [subKategoriOptions, setSubKategoriOptions] = useState([]);

  // Load data pembuat dan kategori saat komponen dimuat
  useEffect(() => {
    const fetchPembuat = async () => {
      const { data, error } = await supabase.from("pembuat").select("*");
      if (error) console.error("Error fetching pembuat:", error);
      else setPembuatOptions(data);
    };

    const fetchKategori = async () => {
      const { data, error } = await supabase.from("kategori").select("*");
      if (error) console.error("Error fetching kategori:", error);
      else setKategoriOptions(data);
    };

    fetchPembuat();
    fetchKategori();
  }, []);

  // Load sub-kategori setiap kali kategori berubah
  useEffect(() => {
    const fetchSubKategori = async () => {
      if (kategori) {
        const { data, error } = await supabase
          .from("sub_kategori")
          .select("*")
          .eq("id_kategori", kategori);

        if (error) console.error("Error fetching sub-kategori:", error);
        else setSubKategoriOptions(data);
      } else {
        setSubKategoriOptions([]); // Kosongkan jika kategori tidak dipilih
      }
    };

    fetchSubKategori();
  }, [kategori]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("karya").insert([
        {
          judul_karya: judul,
          id_pembuat: pembuat,
          id_kategori: kategori,
          id_sub_kategori: subKategori,
          deskripsi,
          ukuran,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        console.error("Error adding karya:", error);
        setMessage("Error adding karya");
      } else {
        setMessage("Karya berhasil ditambahkan!");
        // Clear form setelah submit berhasil
        setJudul("");
        setPembuat("");
        setKategori("");
        setSubKategori("");
        setDeskripsi("");
        setUkuran("");
        setImageUrl("");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("Unexpected error occurred");
    }
  };

  return (
    <div className="min-w-full mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Tambah Karya</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Judul */}
        <input
          type="text"
          placeholder="Judul Karya"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Dropdown Pembuat */}
        <select
          value={pembuat}
          onChange={(e) => setPembuat(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Pembuat</option>
          {pembuatOptions.map((p) => (
            <option key={p.id_pembuat} value={p.id_pembuat}>
              {p.nama_pembuat}
            </option>
          ))}
        </select>

        {/* Dropdown Kategori */}
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Kategori</option>
          {kategoriOptions.map((k) => (
            <option key={k.id_kategori} value={k.id_kategori}>
              {k.nama_kategori}
            </option>
          ))}
        </select>

        {/* Dropdown Sub-Kategori */}
        <select
          value={subKategori}
          onChange={(e) => setSubKategori(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Sub-Kategori</option>
          {subKategoriOptions.map((sk) => (
            <option key={sk.id_sub_kategori} value={sk.id_sub_kategori}>
              {sk.nama_sub_kategori}
            </option>
          ))}
        </select>

        {/* Input Deskripsi */}
        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Input Ukuran */}
        <input
          type="text"
          placeholder="Ukuran"
          value={ukuran}
          onChange={(e) => setUkuran(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Input URL Gambar */}
        <input
          type="text"
          placeholder="Link Gambar"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
        >
          Tambah Karya
        </button>
      </form>

      {/* Pesan Notifikasi */}
      {message && (
        <p className="mt-4 text-center text-lg font-medium text-green-600">{message}</p>
      )}
    </div>
  );
}

export default AddKarya;
