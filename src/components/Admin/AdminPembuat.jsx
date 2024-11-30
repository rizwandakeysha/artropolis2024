import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

const AdminPembuat = () => {
  const [namaPembuat, setNamaPembuat] = useState('');
  const [pembuatList, setPembuatList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPembuatData, setEditPembuatData] = useState({
    id_pembuat: '',
    nama_pembuat: '',
  });

  // Fetch data pembuat beserta karya yang dibuatnya
  const fetchPembuatKarya = async () => {
    const { data, error } = await supabase
      .from('pembuat')
      .select(`
        id_pembuat,
        nama_pembuat,
        karya (
          id_karya,
          judul_karya,
          deskripsi,
          ukuran,
          image_url,
          kategori (nama_kategori),
          sub_kategori (nama_sub_kategori)
        )
      `)
      .order('id_pembuat', { ascending: true });

    if (error) {
      console.error('Error fetching pembuat dan karya:', error);
    } else {
      setPembuatList(data);
    }
  };

  // Tambah Pembuat
  const addPembuat = async () => {
    if (namaPembuat.trim()) {
      await supabase.from('pembuat').insert({ nama_pembuat: namaPembuat });
      fetchPembuatKarya();
      setNamaPembuat('');
    }
  };

  // Hapus Pembuat
  const deletePembuat = async (id) => {
    await supabase.from('pembuat').delete().eq('id_pembuat', id);
    fetchPembuatKarya();
  };

  // Memulai proses edit
  const startEditPembuat = (pembuat) => {
    setEditPembuatData({
      id_pembuat: pembuat.id_pembuat,
      nama_pembuat: pembuat.nama_pembuat,
    });
    setIsEditing(true);
  };

  // Update Pembuat
  const updatePembuat = async () => {
    const { id_pembuat, nama_pembuat } = editPembuatData;
    const { error } = await supabase
      .from('pembuat')
      .update({ nama_pembuat })
      .eq('id_pembuat', id_pembuat);

    if (error) {
      console.error('Error updating pembuat:', error);
    } else {
      fetchPembuatKarya();
      resetEditForm();
    }
  };

  // Reset form edit
  const resetEditForm = () => {
    setEditPembuatData({ id_pembuat: '', nama_pembuat: '' });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchPembuatKarya();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Data Pembuat Karya</h1>

      {/* Form Tambah Pembuat */}
      {!isEditing && (
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Nama Pembuat"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={namaPembuat}
            onChange={(e) => setNamaPembuat(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={addPembuat}
          >
            Tambah Pembuat
          </button>
        </div>
      )}

      {/* Form Edit Pembuat */}
      {isEditing && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Pembuat</h2>
          <input
            type="text"
            placeholder="Nama Pembuat"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 mb-4"
            value={editPembuatData.nama_pembuat}
            onChange={(e) =>
              setEditPembuatData({ ...editPembuatData, nama_pembuat: e.target.value })
            }
          />
          <div className="flex gap-4">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              onClick={updatePembuat}
            >
              Simpan Perubahan
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              onClick={resetEditForm}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Tabel Pembuat dan Karyanya */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="p-4">Nama Pembuat</th>
              <th className="p-4">Judul Karya</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Sub-Kategori</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Ukuran</th>
              <th className="p-5">Foto</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pembuatList.map((pembuat) => (
              <React.Fragment key={pembuat.id_pembuat}>
                {pembuat.karya.length === 0 && (
                  <tr>
                    <td className="p-4 border">{pembuat.nama_pembuat}</td>
                    <td colSpan={6} className="p-4 border text-center">Tidak ada karya</td>
                    <td className="p-4 border">
                      <button
                        className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                        onClick={() => startEditPembuat(pembuat)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => deletePembuat(pembuat.id_pembuat)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                )}
                {pembuat.karya.map((karya, index) => (
                  <tr key={karya.id_karya}>
                    {index === 0 && (
                      <td rowSpan={pembuat.karya.length} className="p-4 border">
                        {pembuat.nama_pembuat}
                      </td>
                    )}
                    <td className="p-4 border">{karya.judul_karya}</td>
                    <td className="p-4 border">{karya.kategori?.nama_kategori || '-'}</td>
                    <td className="p-4 border">{karya.sub_kategori?.nama_sub_kategori || '-'}</td>
                    <td className="p-4 border">{karya.deskripsi}</td>
                    <td className="p-4 border">{karya.ukuran}</td>
                    <td className="p-4 border">
                      {karya.image_url ? (
                        <img src={karya.image_url} alt={karya.judul_karya} className="w-24" />
                      ) : (
                        'Tidak ada foto'
                      )}
                    </td>
                    {index === 0 && (
                      <td rowSpan={pembuat.karya.length} className="p-4 border">
                        <button
                          className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                          onClick={() => startEditPembuat(pembuat)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded"
                          onClick={() => deletePembuat(pembuat.id_pembuat)}
                        >
                          Hapus
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPembuat;
