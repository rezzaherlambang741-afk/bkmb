import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { getResults, addResult, deleteResult } from '../../services/db';

export default function ManageResults() {
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    pasaran: 'SINGAPORE',
    prize1: '',
    jam_result: '17:45'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getResults();
    setResults(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addResult(formData);
    await loadData();
    setIsModalOpen(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      pasaran: 'SINGAPORE',
      prize1: '',
      jam_result: '17:45'
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      await deleteResult(id);
      await loadData();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Results</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Result</Button>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Pasaran</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase">Prize 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Jam</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {results.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{r.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-white font-bold">{r.pasaran}</td>
                <td className="px-6 py-4 whitespace-nowrap text-amber-500 font-bold">{r.prize1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400">{r.jam_result}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-slate-500">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Result</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Date</label>
                <input
                  type="date"
                  className="w-full bg-slate-700 p-2 rounded text-white"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Pasaran</label>
                <select
                  className="w-full bg-slate-700 p-2 rounded text-white"
                  value={formData.pasaran}
                  onChange={e => setFormData({...formData, pasaran: e.target.value})}
                >
                  <option value="SINGAPORE">SINGAPORE</option>
                  <option value="HONGKONG">HONGKONG</option>
                  <option value="SYDNEY">SYDNEY</option>
                  <option value="CAMBODIA">CAMBODIA</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400">Prize 1</label>
                <input
                  type="number"
                  placeholder="1234"
                  className="w-full bg-slate-700 p-2 rounded text-white font-bold text-lg"
                  value={formData.prize1}
                  onChange={e => setFormData({...formData, prize1: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Jam Result</label>
                <input
                  type="text"
                  placeholder="HH:mm"
                  className="w-full bg-slate-700 p-2 rounded text-white"
                  value={formData.jam_result}
                  onChange={e => setFormData({...formData, jam_result: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
