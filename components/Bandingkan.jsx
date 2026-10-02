'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Plus, X, Trophy } from 'lucide-react';
import { properti, formatHarga, hargaLabel, sewaPerBulan, cicilanBulanan } from '@/lib/data';

const MAKS = 3;
const ambil = (id) => properti.find((p) => p.id === id);

// Satu baris perbandingan: teks yang ditampilkan + angka (untuk menandai yang terbaik).
function baris({ dp, tenor, bunga }) {
  const luasAcuan = (p) => p.spesifikasi.luasBangunan || p.spesifikasi.luasTanah;
  return [
    { label: 'Harga', teks: (p) => hargaLabel(p) },
    {
      label: 'Keluar per bulan', terbaik: 'min', tanda: 'Paling ringan',
      angka: (p) => (p.status === 'Dijual' ? (p.jenisProperti === 'Tanah' ? null : cicilanBulanan(p.harga * (1 - dp / 100), bunga, tenor)) : sewaPerBulan(p)),
      teks: (p, n) => (n == null ? '—' : `${formatHarga(n)}${p.status === 'Dijual' ? ' cicilan' : ' sewa'}`),
    },
    {
      label: 'Bayar di awal', terbaik: 'min', tanda: 'Paling kecil',
      angka: (p) => (p.status === 'Dijual' ? (p.jenisProperti === 'Tanah' ? p.harga : p.harga * (dp / 100)) : p.harga),
      teks: (p, n) => `${formatHarga(n)} ${p.status === 'Dijual' ? (p.jenisProperti === 'Tanah' ? 'tunai' : `uang muka ${dp}%`) : p.periode === 'tahun' ? 'sewa setahun' : 'sewa sebulan'}`,
    },
    {
      label: 'Harga per m²', terbaik: 'min', tanda: 'Paling murah',
      angka: (p) => (p.status === 'Dijual' && luasAcuan(p) ? p.harga / luasAcuan(p) : null),
      teks: (p, n) => (n == null ? '—' : `${formatHarga(n)} ${p.spesifikasi.luasBangunan ? 'bangunan' : 'tanah'}`),
    },
    { label: 'Luas bangunan', terbaik: 'max', tanda: 'Paling luas', angka: (p) => p.spesifikasi.luasBangunan || null, teks: (p, n) => (n ? `${n} m²` : '—') },
    { label: 'Luas tanah', terbaik: 'max', tanda: 'Paling luas', angka: (p) => p.spesifikasi.luasTanah || null, teks: (p, n) => (n ? `${n} m²` : '—') },
    { label: 'Kamar tidur', terbaik: 'max', tanda: 'Paling banyak', angka: (p) => p.spesifikasi.kamarTidur || null, teks: (p, n) => n || '—' },
    { label: 'Kamar mandi', terbaik: 'max', tanda: 'Paling banyak', angka: (p) => p.spesifikasi.kamarMandi || null, teks: (p, n) => n || '—' },
    { label: 'Lokasi', teks: (p) => `${p.lokasi.kecamatan}, ${p.lokasi.kota}` },
    { label: 'Sertifikat', teks: (p) => (p.sertifikat === '-' ? '—' : p.sertifikat) },
    { label: 'Tahun dibangun', terbaik: 'max', tanda: 'Paling baru', angka: (p) => p.tahun || null, teks: (p, n) => n || '—' },
  ];
}

function terbaikDari(b, list) {
  if (!b.terbaik) return null;
  const nilai = list.map((p) => b.angka(p));
  const ada = nilai.filter((n) => n != null);
  if (ada.length < 2 || new Set(ada).size === 1) return null;
  const t = b.terbaik === 'min' ? Math.min(...ada) : Math.max(...ada);
  return nilai.indexOf(t);
}

export default function Bandingkan() {
  const sp = useSearchParams();
  const [ids, setIds] = useState([]);
  const [dp, setDp] = useState(20);
  const [tenor, setTenor] = useState(15);
  const [bunga, setBunga] = useState(7.5);

  // Baca ?id= sekali saat dibuka; satu id dilengkapi listing serupa.
  useEffect(() => {
    const awal = (sp.get('id') || '').split(',').map(Number).filter(ambil).slice(0, MAKS);
    if (awal.length === 1) {
      const a = ambil(awal[0]);
      const b = properti.find((p) => p.id !== a.id && p.status === a.status && p.jenisProperti === a.jenisProperti) || properti.find((p) => p.id !== a.id && p.status === a.status);
      if (b) awal.push(b.id);
    }
    setIds(awal.length >= 2 ? awal : [1, 2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simpan = (baru) => {
    setIds(baru);
    window.history.replaceState(null, '', `/bandingkan?id=${baru.join(',')}`);
  };
  const ganti = (i, id) => simpan(ids.map((x, j) => (j === i ? id : x)));
  const hapus = (i) => simpan(ids.filter((_, j) => j !== i));
  const tambah = () => {
    const sisa = properti.find((p) => !ids.includes(p.id));
    if (sisa) simpan([...ids, sisa.id]);
  };

  if (!ids.length) return <p className="py-20 text-center text-muted">Memuat perbandingan…</p>;

  const list = ids.map(ambil);
  const rows = baris({ dp, tenor, bunga });
  const campur = new Set(list.map((p) => p.status)).size > 1;
  const sel = 'rounded-xl border border-black/10 bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-forest';

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <p className="w-full text-sm font-semibold text-ink sm:w-auto sm:flex-1">Asumsi cicilan untuk listing dijual</p>
        <label className="text-xs font-semibold text-muted">Uang muka
          <select value={dp} onChange={(e) => setDp(+e.target.value)} className={`${sel} mt-1 block`}>{[10, 20, 30].map((v) => <option key={v} value={v}>{v}%</option>)}</select>
        </label>
        <label className="text-xs font-semibold text-muted">Tenor
          <select value={tenor} onChange={(e) => setTenor(+e.target.value)} className={`${sel} mt-1 block`}>{[10, 15, 20, 25].map((v) => <option key={v} value={v}>{v} tahun</option>)}</select>
        </label>
        <label className="text-xs font-semibold text-muted">Bunga/thn
          <input type="number" min={0} max={20} step={0.25} value={bunga} onChange={(e) => setBunga(+e.target.value)} className={`${sel} mt-1 block w-24`} />
        </label>
      </div>

      {campur && (
        <p className="mt-4 rounded-xl bg-sand px-4 py-3 text-sm text-ink/85">
          Kamu membandingkan listing dijual dan disewakan. Baris <strong>Keluar per bulan</strong> menaruh cicilan dan sewa di ukuran yang sama — tapi cicilan membangun kepemilikan, sewa tidak.
        </p>
      )}

      <div className="relative mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">Perbandingan {list.length} listing</caption>
          <thead>
            <tr>
              <td className="w-36 p-4 align-bottom">
                {ids.length < MAKS && (
                  <button type="button" onClick={tambah} className="inline-flex items-center gap-1.5 rounded-full border border-forest/40 px-3 py-1.5 text-xs font-semibold text-forest transition hover:bg-forest/10"><Plus size={14} /> Tambah kolom</button>
                )}
              </td>
              {list.map((p, i) => (
                <th key={i} scope="col" className="min-w-[180px] p-4 align-top font-normal">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                    <Image src={p.media.foto[0]} alt="" fill sizes="240px" className="object-cover" />
                    {ids.length > 2 && (
                      <button type="button" onClick={() => hapus(i)} aria-label={`Hapus ${p.judul} dari perbandingan`} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-ink shadow transition hover:text-forest"><X size={16} /></button>
                    )}
                  </div>
                  <label className="mt-3 block">
                    <span className="sr-only">Ganti listing kolom {i + 1}</span>
                    <select value={p.id} onChange={(e) => ganti(i, +e.target.value)} className={`${sel} w-full`}>
                      {['Dijual', 'Disewakan'].map((st) => (
                        <optgroup key={st} label={st}>
                          {properti.filter((x) => x.status === st && (x.id === p.id || !ids.includes(x.id))).map((x) => <option key={x.id} value={x.id}>{x.judul}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                  <Link href={`/properti/${p.id}`} className="mt-2 inline-block text-xs font-semibold text-forest underline-offset-4 hover:underline">Lihat detail</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => {
              const best = terbaikDari(b, list);
              return (
                <tr key={b.label} className="border-t border-black/5">
                  <th scope="row" className="p-4 font-semibold text-ink">{b.label}</th>
                  {list.map((p, i) => {
                    const n = b.angka ? b.angka(p) : undefined;
                    return (
                      <td key={i} className={`p-4 align-top text-ink/85 ${best === i ? 'bg-forest/10' : ''}`}>
                        <span className="font-medium">{b.teks(p, n)}</span>
                        {best === i && <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-forest"><Trophy size={12} aria-hidden="true" /> {b.tanda}</span>}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="border-t border-black/5">
              <th scope="row" className="p-4 align-top font-semibold text-ink">Fasilitas</th>
              {list.map((p, i) => (
                <td key={i} className="p-4 align-top">
                  <ul className="space-y-1 text-ink/85">{p.fasilitas.map((x) => <li key={x}>{x}</li>)}</ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">Cicilan memakai bunga tetap {String(bunga).replace('.', ',')}% selama {tenor} tahun dan belum termasuk BPHTB, notaris, serta asuransi. Sewa tahunan dibagi 12.</p>
    </div>
  );
}
