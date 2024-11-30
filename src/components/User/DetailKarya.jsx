import React from 'react';
import { useParams } from 'react-router-dom';

const DetailKarya = () => {
  const { kategori, judul_karya } = useParams();
  return (
    <div>
      <h1>Detail Karya: {judul_karya}</h1>
      <p>Kategori: {kategori}</p>
      <p>Halaman ini akan menampilkan detail karya lengkap.</p>
    </div>
  );
};

export default DetailKarya;
 