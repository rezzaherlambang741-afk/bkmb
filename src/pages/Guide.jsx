import React from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';

export default function Guide() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">PANDUAN WEBSITE</h1>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-white mb-2">1. Cara Menghubungi CS</h2>
            <p className="text-slate-300">
              Pilih nama Customer Service yang tersedia di halaman depan atau halaman Staff, lalu klik tombol "Hubungi Sekarang" atau "Chat Now". Anda akan diarahkan langsung ke WhatsApp.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-white mb-2">2. Cara Melihat Hasil</h2>
            <p className="text-slate-300">
              Buka menu "DATA RESULT". Anda dapat memfilter hasil berdasarkan pasaran yang diinginkan. Hasil Prize 1 akan ditampilkan beserta jam result.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-white mb-2">3. Layanan Pengaduan</h2>
            <p className="text-slate-300">
              Jika mengalami kendala, silakan isi form di halaman "KELUHAN" dengan data yang valid. Tim kami akan segera memproses laporan Anda.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
