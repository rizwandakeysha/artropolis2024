import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

const AdminLogin = () => {
  const [namaAdmin, setNamaAdmin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('nama_admin', namaAdmin)
        .eq('password', password)
        .single();

      if (error || !data) {
        alert('Nama admin atau password salah');
        return;
      }

      // Simpan status login di localStorage
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin'); // Arahkan ke halaman AdminDashboard
    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      alert('Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login Admin</h2>
        
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Nama Admin</label>
          <input
            type="text"
            placeholder="Masukkan nama admin"
            value={namaAdmin}
            onChange={(e) => setNamaAdmin(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Login
        </button>

        {/* Tambahkan catatan kecil di bawah tombol */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Hanya untuk administrator.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
