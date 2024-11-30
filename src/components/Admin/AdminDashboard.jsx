import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

const AdminDashboard = () => {
  const [totalKarya, setTotalKarya] = useState(0);
  const [totalPembuat, setTotalPembuat] = useState(0);
  const [totalVisitor, setTotalVisitor] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch jumlah karya
      const { data: karyaData, error: karyaError } = await supabase.from('karya').select('*');
      if (karyaError) console.error('Error fetching karya:', karyaError);
      setTotalKarya(karyaData ? karyaData.length : 0);

      // Fetch jumlah pembuat
      const { data: pembuatData, error: pembuatError } = await supabase.from('pembuat').select('*');
      if (pembuatError) console.error('Error fetching pembuat:', pembuatError);
      setTotalPembuat(pembuatData ? pembuatData.length : 0);

      // Fetch jumlah visitor
      const { data: visitorData, error: visitorError } = await supabase.from('visitor').select('*');
      if (visitorError) console.error('Error fetching visitors:', visitorError);
      setTotalVisitor(visitorData ? visitorData.length : 0);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Karya */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{totalKarya} Karya</h2>
            <Link to="/admin/karya">
              <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition duration-300">
                Lihat Karya
              </button>
            </Link>
          </div>

          {/* Card Pembuat */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{totalPembuat} Pembuat Karya</h2>
            <Link to="/admin/pembuat">
              <button className="bg-white text-green-500 font-semibold py-2 px-4 rounded hover:bg-green-100 transition duration-300">
                Lihat Pembuat Karya
              </button>
            </Link>
          </div>

          {/* Card Visitor */}
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{totalVisitor} Visitor</h2>
            <Link to="/admin/visitor">
              <button className="bg-white text-purple-500 font-semibold py-2 px-4 rounded hover:bg-purple-100 transition duration-300">
                Lihat Visitor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
