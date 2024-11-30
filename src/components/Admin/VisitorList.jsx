import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const VisitorList = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      const { data, error } = await supabase
        .from('visitor')
        .select('id_visitor, nama_visitor');

      if (error) {
        console.error('Error fetching visitors:', error);
      } else {
        setVisitors(data);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Daftar Visitor</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="p-2 border">No</th>
              <th className="p-4 border">Nama Visitor</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map((visitor, index) => (
                <tr
                  key={visitor.id_visitor}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="p-4 border text-center">{index + 1}</td>
                  <td className="p-4 border">{visitor.nama_visitor}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 border text-center text-gray-500">
                  Belum ada visitor yang terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorList;
