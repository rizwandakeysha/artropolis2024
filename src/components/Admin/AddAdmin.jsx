// src/components/Admin/AddAdmin.jsx
import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAddAdmin = () => {
    axios
      .post('/admin/add', { username, password }) // endpoint backend untuk menambah admin baru
      .then(response => {
        alert('Admin baru berhasil ditambahkan');
        navigate('/admin');
      })
      .catch(error => {
        console.error("Error menambah admin:", error);
        alert('Gagal menambah admin baru');
      });
  };

  return (
    <div>
      <h2>Tambah Admin Baru</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAddAdmin}>Tambah Admin</button>
    </div>
  );
};

export default AddAdmin;
