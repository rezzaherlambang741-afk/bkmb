import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { subscribeToStaff, addStaff, deleteStaff } from '../../services/db';

export default function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'cowo',
    photoURL: '',
    waNumber: '',
    status: 'online'
  });

  useEffect(() => {
    const unsubscribe = subscribeToStaff((data) => {
      setStaff(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    // Use default placeholder if empty
    const dataToSubmit = {
      ...formData,
      photoURL: formData.photoURL || 'https://placehold.co/400x600/1e293b/FFF?text=No+Image'
    };
    await addStaff(dataToSubmit);
    setIsModalOpen(false);
    setFormData({
      name: '',
      gender: 'cowo',
      photoURL: '',
      waNumber: '',
      status: 'online'
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      await deleteStaff(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Staff</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Staff</Button>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">WA Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {staff.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={s.photoURL} alt="" className="h-10 w-10 rounded-full object-cover bg-slate-700" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-white">{s.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{s.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{s.waNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2 py-1 rounded-full text-xs ${s.status === 'online' ? 'bg-green-900 text-green-200' : 'bg-slate-700 text-slate-400'}`}>
                     {s.status}
                   </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Staff</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                 <label className="text-sm text-slate-400">Name</label>
                 <input
                   className="w-full bg-slate-700 p-2 rounded text-white"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   required
                 />
              </div>

              <div>
                <label className="text-sm text-slate-400">Gender</label>
                <select
                  className="w-full bg-slate-700 p-2 rounded text-white"
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="cowo">Cowo</option>
                  <option value="cewe">Cewe</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400">Photo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full bg-slate-700 p-2 rounded text-white"
                  value={formData.photoURL}
                  onChange={e => setFormData({...formData, photoURL: e.target.value})}
                />
                <p className="text-xs text-slate-500 mt-1">
                  rekomendasi: foto portrait (misal 400x600). gunakan link dari hosting gambar.
                </p>
              </div>

              <div>
                <label className="text-sm text-slate-400">WA Number</label>
                <input
                  placeholder="628..."
                  className="w-full bg-slate-700 p-2 rounded text-white"
                  value={formData.waNumber}
                  onChange={e => setFormData({...formData, waNumber: e.target.value})}
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
