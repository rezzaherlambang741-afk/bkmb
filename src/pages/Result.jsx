import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { getResults } from '../services/db';

export default function Result() {
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [pasarans, setPasarans] = useState([]);

  useEffect(() => {
    getResults().then(data => {
      setResults(data);
      // Extract unique pasarans
      const uniquePasarans = [...new Set(data.map(item => item.pasaran))];
      setPasarans(uniquePasarans);
    });
  }, []);

  const filteredResults = filter === 'ALL'
    ? results
    : results.filter(r => r.pasaran === filter);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">DATA HASIL / RESULT</h1>

        <Card className="mb-6">
          <label className="block text-sm font-medium text-slate-400 mb-2">Pilih Pasaran:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/3 bg-slate-800 border border-slate-600 rounded p-2 text-white"
          >
            <option value="ALL">SEMUA PASARAN</option>
            {pasarans.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </Card>

        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="min-w-full divide-y divide-slate-700 bg-surface">
            <thead className="bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Pasaran</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tanggal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Hari</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">Prize 1</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Jam Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredResults.map((row) => {
                 // Simple day derivation
                 const dateObj = new Date(row.date);
                 const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                 const dayName = days[dateObj.getDay()];

                 return (
                  <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">{row.pasaran}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{dayName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-amber-500 text-lg">{row.prize1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{row.jam_result}</td>
                  </tr>
                 );
              })}
              {filteredResults.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-slate-500">Tidak ada data result.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
