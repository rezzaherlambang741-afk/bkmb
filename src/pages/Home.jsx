import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { subscribeToStaff, subscribeToSettings } from '../services/db';

export default function Home() {
  const [csList, setCsList] = useState([]);
  const [selectedCs, setSelectedCs] = useState('');
  const [settings, setSettings] = useState({
    bannerImages: [],
    downloadLink: '#',
    memberLink: '#'
  });

  useEffect(() => {
    // Real-time subscriptions
    const unsubStaff = subscribeToStaff((data) => setCsList(data));
    const unsubSettings = subscribeToSettings((data) => {
      setSettings(prev => ({ ...prev, ...data }));
    });

    return () => {
      unsubStaff();
      unsubSettings();
    };
  }, []);

  const handleContact = () => {
    if (!selectedCs) return alert('Silakan pilih CS terlebih dahulu!');
    const cs = csList.find(c => c.id === selectedCs);
    if (cs && cs.waNumber) {
      window.open(`https://wa.me/${cs.waNumber}`, '_blank');
    }
  };

  return (
    <Layout>
      {/* Banner Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left: Action Panel */}
        <div className="md:col-span-1 space-y-4">
          <Card className="h-full flex flex-col justify-center space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">PUNYA KENDALA?</h2>
            <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded w-max mx-auto">
              CUSTOMER SERVICE ONLINE 24JAM
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Pilihan CS:
              </label>
              <select
                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
                value={selectedCs}
                onChange={(e) => setSelectedCs(e.target.value)}
              >
                <option value="">-- Pilih CS --</option>
                {csList.map(cs => (
                  <option key={cs.id} value={cs.id}>{cs.name}</option>
                ))}
              </select>
            </div>

            <Button onClick={handleContact} className="w-full py-3 text-lg bg-red-700 hover:bg-red-800">
              HUBUNGI SEKARANG
            </Button>

            <div className="pt-4 border-t border-slate-700 space-y-3">
              <a href={settings.downloadLink} target="_blank" rel="noreferrer" className="block w-full">
                 <Button variant="secondary" className="w-full">DOWNLOAD APLIKASI</Button>
              </a>
              <a href={settings.memberLink} target="_blank" rel="noreferrer" className="block w-full">
                 <Button variant="outline" className="w-full">DAFTAR JADI MEMBER</Button>
              </a>
            </div>
          </Card>
        </div>

        {/* Right: Banner Auto Slide */}
        <div className="md:col-span-2">
          <div className="relative h-64 md:h-full bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            {/* Simple Mock Banner Slider */}
            {settings.bannerImages && settings.bannerImages.length > 0 ? (
               <img
                 src={settings.bannerImages[0]}
                 alt="Banner"
                 className="w-full h-full object-cover"
               />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                BANNER AUTO SLIDE AREA
              </div>
            )}
            {/* Note: In a real implementation, we'd add a carousel library or custom interval logic here */}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="bg-primary/20 border border-primary text-primary p-4 rounded-lg text-center font-bold animate-pulse">
        CUSTOMER SERVICE RESMI & TERPERCAYA
      </div>
    </Layout>
  );
}
