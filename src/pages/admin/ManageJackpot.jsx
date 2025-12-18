import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { subscribeToJackpot, addJackpot, deleteJackpot } from '../../services/db';

export default function ManageJackpot() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    imageURL: ''
  });

  useEffect(() => {
    const unsubscribe = subscribeToJackpot((data) => {
      setImages(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addJackpot(formData);
    setIsModalOpen(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      imageURL: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await deleteJackpot(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Jackpot Proof</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Image</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group bg-slate-800 p-2 rounded border border-slate-700">
            <div className="aspect-[9/16] overflow-hidden rounded bg-black mb-2 relative">
               <img
                 src={img.imageURL}
                 alt={img.date}
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-sm text-slate-400">{img.date}</span>
              <button
                onClick={() => handleDelete(img.id)}
                className="text-red-500 hover:text-red-400 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-3 text-center py-10 text-slate-500">
            No jackpot images found.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Jackpot Image</h2>
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
                <label className="text-sm text-slate-400">Image URL (Link)</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-slate-700 p-2 rounded text-white"
                  value={formData.imageURL}
                  onChange={e => setFormData({...formData, imageURL: e.target.value})}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Paste link from image host (e.g. studiointermedia.com)</p>
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
