import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getJackpotImages } from '../services/db';

export default function Jackpot() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getJackpotImages().then(setImages);
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-2">BUKTI JACKPOT</h1>
      <p className="text-center text-slate-400 mb-8">Galeri pemenang jackpot terbaru kami</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group overflow-hidden rounded-lg border border-slate-700 aspect-video">
            <img
              src={img.imageURL}
              alt={`Jackpot ${img.date}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-sm text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
              {img.date}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-20 bg-surface rounded-lg border border-slate-700 text-slate-500">
          Belum ada bukti jackpot saat ini.
        </div>
      )}
    </Layout>
  );
}
