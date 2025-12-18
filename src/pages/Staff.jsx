import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { getStaff } from '../services/db';

export default function Staff() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getStaff().then(setStaff);
  }, []);

  const cowoStaff = staff.filter(s => s.gender === 'cowo');
  const ceweStaff = staff.filter(s => s.gender === 'cewe');

  const StaffGrid = ({ title, list }) => (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-slate-700 pb-2 inline-block">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {list.map((cs) => (
          <div key={cs.id} className="group relative bg-surface border border-slate-700 rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl">
             <div className="aspect-[3/4] bg-slate-800 relative">
               <img
                 src={cs.photoURL}
                 alt={cs.name}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Button
                   onClick={() => window.open(`https://wa.me/${cs.waNumber}`, '_blank')}
                   className="rounded-full px-6"
                 >
                   Chat Now
                 </Button>
               </div>
             </div>
             <div className="p-4 text-center">
               <h3 className="font-bold text-lg text-white">{cs.name}</h3>
               <span className={`text-xs px-2 py-1 rounded-full ${cs.status === 'online' ? 'bg-green-900 text-green-300' : 'bg-slate-700 text-slate-400'}`}>
                 {cs.status === 'online' ? 'ONLINE' : 'OFFLINE'}
               </span>
             </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-slate-500">No staff available.</p>}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-red-600 text-white font-bold text-center py-4 rounded-t-lg text-2xl mb-8">
        CUSTOMER SERVICE STAFF
      </div>

      <StaffGrid title="CS COWO" list={cowoStaff} />
      <StaffGrid title="CS CEWE" list={ceweStaff} />
    </Layout>
  );
}
