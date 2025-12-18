import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { submitComplaint } from '../services/db';

export default function Complaints() {
  const [formData, setFormData] = useState({
    name: '',
    userID: '',
    waNumber: '',
    complaintText: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitComplaint(formData);
      setSubmitted(true);
      setFormData({ name: '', userID: '', waNumber: '', complaintText: '' });
    } catch (error) {
      alert('Gagal mengirim keluhan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <Card className="max-w-xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-green-500 mb-4">Keluhan Terkirim!</h2>
          <p className="text-slate-300 mb-6">Terima kasih, tim kami akan segera menghubungi Anda melalui WhatsApp.</p>
          <Button onClick={() => setSubmitted(false)}>Kirim Keluhan Lain</Button>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">LAYANAN PENGADUAN / KELUHAN</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:ring-primary focus:border-primary"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">User ID</label>
                <input
                  type="text"
                  name="userID"
                  required
                  className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white"
                  value={formData.userID}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  name="waNumber"
                  required
                  placeholder="628..."
                  className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white"
                  value={formData.waNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Isi Keluhan</label>
              <textarea
                name="complaintText"
                required
                rows="5"
                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white"
                value={formData.complaintText}
                onChange={handleChange}
              ></textarea>
            </div>

            <Button type="submit" className="w-full py-3" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'KIRIM KELUHAN'}
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
