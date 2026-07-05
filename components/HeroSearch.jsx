'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { jenisList } from '@/lib/data';

export default function HeroSearch() {
  const router = useRouter();
  const tabs = [{ k: 'Dijual', l: 'Beli' }, { k: 'Disewakan', l: 'Sewa' }, { k: 'baru', l: 'Properti Baru' }];
  const [tab, setTab] = useState('Dijual');
  const [q, setQ] = useState('');
  const [jenis, setJenis] = useState('Semua');

  const go = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (tab !== 'baru') p.set('status', tab);
    if (q.trim()) p.set('q', q.trim());
    if (jenis !== 'Semua') p.set('jenis', jenis);
    const qs = p.toString();
    router.push('/properti' + (qs ? `?${qs}` : ''));
  };

  return (
    <div className="rounded-[1.75rem] border border-black/5 bg-white p-2 shadow-2xl shadow-forest/10">
      <div className="flex gap-1 px-1 pt-1">
        {tabs.map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === t.k ? 'bg-forest text-white' : 'text-muted hover:text-ink'}`}>{t.l}</button>
        ))}
      </div>
      <form onSubmit={go} className="mt-1 grid gap-2 p-1 md:grid-cols-[1.7fr_1fr_auto]">
        <div className="relative">
          <MapPin size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-forest" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kota, area, atau kata kunci…" className="w-full rounded-2xl bg-sand px-4 py-4 pl-10 text-sm text-ink outline-none transition focus:ring-2 focus:ring-forest/30" />
        </div>
        <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="rounded-2xl bg-sand px-4 py-4 text-sm font-medium text-ink outline-none focus:ring-2 focus:ring-forest/30" aria-label="Jenis">
          {jenisList.map((j) => <option key={j} value={j}>{j === 'Semua' ? 'Semua Jenis' : j}</option>)}
        </select>
        <button type="submit" className="flex items-center justify-center gap-2 rounded-2xl bg-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-forest-soft"><Search size={18} /> Cari</button>
      </form>
    </div>
  );
}
