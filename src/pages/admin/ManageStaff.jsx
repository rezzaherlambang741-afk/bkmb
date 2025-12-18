import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { getStaff, addStaff } from '../../services/db'; // In real app, import delete/update too

export default function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'cowo',
    photoURL: 'https://placehold.co/400x600/1e293b/FFF?text=New+Staff',
    waNumber: '',
    status: 'online'
  });

  useEffect(() => {
    getStaff().then(setStaff);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addStaff(formData);
    setStaff(await getStaff());
    setIsModalOpen(false);
    setFormData({ ...formData, name: '', waNumber: '' });
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
                <td className="px-6 py-4 whitespace-nowrap text-white">{s.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{s.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{s.waNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2 py-1 rounded-full text-xs ${s.status === 'online' ? 'bg-green-900 text-green-200' : 'bg-slate-700 text-slate-400'}`}>
                     {s.status}
                   </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-blue-400 mr-3">Edit</button>
                  <button className="text-red-500 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Staff</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                placeholder="Name"
                className="w-full bg-slate-700 p-2 rounded text-white"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <select
                className="w-full bg-slate-700 p-2 rounded text-white"
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value})}
              >
                <option value="cowo">Cowo</option>
                <option value="cewe">Cewe</option>
              </select>
              <input
                placeholder="WA Number (e.g. 628...)"
                className="w-full bg-slate-700 p-2 rounded text-white"
                value={formData.waNumber}
                onChange={e => setFormData({...formData, waNumber: e.target.value})}
                required
              />
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
