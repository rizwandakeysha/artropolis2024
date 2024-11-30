// src/components/Admin/AdminKarya.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import AddKarya from './AddKarya';

const AdminKarya = () => {
  const [karyaList, setKaryaList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editKaryaData, setEditKaryaData] = useState({
    id_karya: '',
    judul_karya: '',
    deskripsi: '',
    ukuran: '',
    image_url: '',
    id_pembuat: '',
    id_kategori: '',
    id_sub_kategori: '',
  });

  const fetchKarya = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('karya')
      .select(`
        id_karya,
        judul_karya,
        deskripsi,
        ukuran,
        image_url,
        pembuat (nama_pembuat, id_pembuat),
        kategori (nama_kategori, id_kategori),
        sub_kategori (nama_sub_kategori, id_sub_kategori)
      `)
      .order('id_karya', { ascending: true });

    if (error) {
      console.error('Error fetching karya:', error);
      alert('Gagal memuat data karya.');
    } else {
      setKaryaList(data || []);
    }
    setLoading(false);
  };

  const deleteKarya = async (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus karya ini?')) {
      const { error } = await supabase.from('karya').delete().eq('id_karya', id);
      if (error) {
        console.error('Error deleting karya:', error);
        alert('Gagal menghapus karya.');
      } else {
        fetchKarya();
      }
    }
  };

  const updateKarya = async () => {
    const { id_karya, judul_karya, deskripsi, ukuran } = editKaryaData;
    const { error } = await supabase
      .from('karya')
      .update({ judul_karya, deskripsi, ukuran })
      .eq('id_karya', id_karya);

    if (error) {
      console.error('Error updating karya:', error);
      alert('Gagal memperbarui karya.');
    } else {
      fetchKarya();
      resetEditForm();
    }
  };

  const startEditKarya = (karya) => {
    setEditKaryaData({
      id_karya: karya.id_karya,
      judul_karya: karya.judul_karya,
      deskripsi: karya.deskripsi,
      ukuran: karya.ukuran,
      image_url: karya.image_url,
      id_pembuat: karya.pembuat?.id_pembuat || '',
      id_kategori: karya.kategori?.id_kategori || '',
      id_sub_kategori: karya.sub_kategori?.id_sub_kategori || '',
    });
    setIsEditing(true);
  };

  const resetEditForm = () => {
    setEditKaryaData({
      id_karya: '',
      judul_karya: '',
      deskripsi: '',
      ukuran: '',
      image_url: '',
      id_pembuat: '',
      id_kategori: '',
      id_sub_kategori: '',
    });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchKarya();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Data Karya</h1>

      {!isEditing && <AddKarya fetchKarya={fetchKarya} />}

      {isEditing && (
        <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Karya</h2>
          <input
            type="text"
            placeholder="Judul Karya"
            className="w-full p-2 mb-3 border rounded"
            value={editKaryaData.judul_karya}
            onChange={(e) => setEditKaryaData({ ...editKaryaData, judul_karya: e.target.value })}
          />
          <textarea
            placeholder="Deskripsi"
            className="w-full p-2 mb-3 border rounded"
            value={editKaryaData.deskripsi}
            onChange={(e) => setEditKaryaData({ ...editKaryaData, deskripsi: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ukuran"
            className="w-full p-2 mb-3 border rounded"
            value={editKaryaData.ukuran}
            onChange={(e) => setEditKaryaData({ ...editKaryaData, ukuran: e.target.value })}
          />
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={updateKarya}
            >
              Simpan Perubahan
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={resetEditForm}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Daftar Karya</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6">Judul</th>
                <th className="py-3 px-6">Pembuat</th>
                <th className="py-3 px-6">Kategori</th>
                <th className="py-3 px-6">Sub-Kategori</th>
                <th className="py-3 px-6">Deskripsi</th>
                <th className="py-3 px-6">Ukuran</th>
                <th className="py-3 px-6">Gambar</th>
                <th className="py-3 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {karyaList.map((karya) => (
                <tr key={karya.id_karya} className="text-center border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{karya.judul_karya}</td>
                  <td className="py-3 px-6">{karya.pembuat?.nama_pembuat || '-'}</td>
                  <td className="py-3 px-6">{karya.kategori?.nama_kategori || '-'}</td>
                  <td className="py-3 px-6">{karya.sub_kategori?.nama_sub_kategori || '-'}</td>
                  <td className="py-3 px-6">{karya.deskripsi}</td>
                  <td className="py-3 px-6">{karya.ukuran}</td>
                  <td className="py-3 px-6">
                    {karya.image_url ? (
                      <img src={karya.image_url} alt={karya.judul_karya} className="w-24 mx-auto" />
                    ) : (
                      <p>Tidak ada gambar</p>
                    )}
                  </td>
                  <td className="py-3 px-6 space-y-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                      onClick={() => startEditKarya(karya)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      onClick={() => deleteKarya(karya.id_karya)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminKarya;
