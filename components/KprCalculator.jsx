'use client';
import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { formatHarga } from '@/lib/data';

export default function KprCalculator() {
  const [harga, setHarga] = useState(800000000);
  const [dp, setDp] = useState(20);
  const [tenor, setTenor] = useState(15);
  const [bunga, setBunga] = useState(7.5);

  const pokok = harga * (1 - dp / 100);
  const r = bunga / 100 / 12;
  const n = tenor * 12;
  const cicilan = r > 0 ? (pokok * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : pokok / n;

  const Row = ({ label, value, children }) => (
    <div>
      <div className="flex items-center justify-between text-sm"><span className="text-muted">{label}</span><span className="font-semibold text-ink">{value}</span></div>
      <div className="mt-2">{children}</div>
    </div>
  );
  const slider = 'w-full accent-forest';

  return (
    <div className="grid gap-8 rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest"><Calculator size={14} /> Kalkulator KPR</span>
        <h2 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">Berapa cicilan yang realistis?</h2>
        <p className="mt-2 text-muted">Geser untuk simulasi. Bunga dianggap tetap sepanjang tenor; KPR sungguhan biasanya tetap beberapa tahun lalu mengambang.</p>
        <div className="mt-6 space-y-5">
          <Row label="Harga properti" value={formatHarga(harga)}>
            <input type="range" min="200000000" max="3000000000" step="25000000" value={harga} onChange={(e) => setHarga(+e.target.value)} className={slider} aria-label="Harga properti" />
          </Row>
          <Row label="Uang muka (DP)" value={`${dp}%`}>
            <input type="range" min="5" max="50" step="1" value={dp} onChange={(e) => setDp(+e.target.value)} className={slider} aria-label="Uang muka" />
          </Row>
          <Row label="Tenor" value={`${tenor} tahun`}>
            <input type="range" min="1" max="30" step="1" value={tenor} onChange={(e) => setTenor(+e.target.value)} className={slider} aria-label="Tenor" />
          </Row>
          <Row label="Bunga / tahun" value={`${bunga}%`}>
            <input type="range" min="3" max="14" step="0.25" value={bunga} onChange={(e) => setBunga(+e.target.value)} className={slider} aria-label="Bunga per tahun" />
          </Row>
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-3xl bg-forest p-8 text-center text-white">
        <p className="text-sm text-white/90">Estimasi cicilan / bulan</p>
        <p className="mt-2 font-display text-4xl font-bold md:text-5xl">{formatHarga(Math.round(cicilan))}</p>
        <div className="mt-8 space-y-3 text-left text-sm">
          <p className="text-xs text-white/90">Penghasilan bersih yang disarankan: ±{formatHarga(Math.round(cicilan / 0.3))}/bulan (cicilan ≤ 30%).</p>
          <div className="flex justify-between border-t border-white/15 pt-3"><span className="text-white/90">Uang muka</span><span className="font-semibold">{formatHarga(harga * dp / 100)}</span></div>
          <div className="flex justify-between border-t border-white/15 pt-3"><span className="text-white/90">Total pinjaman</span><span className="font-semibold">{formatHarga(pokok)}</span></div>
          <div className="flex justify-between border-t border-white/15 pt-3"><span className="text-white/90">Lama cicilan</span><span className="font-semibold">{n} bulan</span></div>
        </div>
      </div>
    </div>
  );
}
