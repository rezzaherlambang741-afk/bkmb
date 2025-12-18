import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { subscribeToSettings, updateSettings } from '../../services/db';

export default function Settings() {
  const [formData, setFormData] = useState({
    promosiLink: '',
    downloadLink: '',
    memberLink: '',
    bannerImages: [] // Not implementing banner upload in this turn unless asked, focusing on links
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      setFormData(prev => ({ ...prev, ...data }));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved(false);
    await updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="text-white">Loading settings...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Global Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold text-white mb-4">Link Redirects</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Link Promosi (Navbar)</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white"
                value={formData.promosiLink || ''}
                onChange={e => setFormData({...formData, promosiLink: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Link Download Aplikasi (Home)</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white"
                value={formData.downloadLink || ''}
                onChange={e => setFormData({...formData, downloadLink: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Link Daftar Member (Home)</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white"
                value={formData.memberLink || ''}
                onChange={e => setFormData({...formData, memberLink: e.target.value})}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
