'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import { properti } from '@/lib/data';

export default function Rekomendasi() {
  const tabs = ['Dijual', 'Disewakan'];
  const [tab, setTab] = useState('Dijual');
  const list = properti.filter((p) => p.status === tab).slice(0, 6);

  return (
    <div>
      <div className="inline-flex rounded-full border border-black/10 bg-white p-1">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === t ? 'bg-forest text-white' : 'text-muted hover:text-ink'}`}>{t === 'Disewakan' ? 'Disewa' : 'Dijual'}</button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}>
              <PropertyCard item={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
