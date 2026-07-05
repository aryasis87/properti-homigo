import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Maximize, MapPin } from 'lucide-react';
import { formatHarga } from '@/lib/data';

export default function PropertyCard({ item }) {
  const s = item.spesifikasi;
  const luas = s.luasBangunan || s.luasTanah;
  return (
    <Link href={`/properti/${item.id}`} className="group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden">
        <Image src={item.media.foto[0]} alt={item.judul} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${item.status === 'Dijual' ? 'bg-forest' : 'bg-gold'}`}>{item.status}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-xl font-bold text-forest">{formatHarga(item.harga)}</p>
          <span className="rounded-lg bg-sand px-2.5 py-1 text-[11px] font-semibold text-forest">{item.jenisProperti}</span>
        </div>
        <h3 className="mt-2 line-clamp-1 font-semibold text-ink transition-colors group-hover:text-forest">{item.judul}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted"><MapPin size={14} /> {item.lokasi.kecamatan}, {item.lokasi.kota}</p>
        <div className="mt-3 flex items-center gap-4 border-t border-black/5 pt-3 text-sm text-ink/70">
          {s.kamarTidur > 0 && <span className="flex items-center gap-1"><BedDouble size={15} /> {s.kamarTidur}</span>}
          {s.kamarMandi > 0 && <span className="flex items-center gap-1"><Bath size={15} /> {s.kamarMandi}</span>}
          <span className="flex items-center gap-1"><Maximize size={15} /> {luas} m²</span>
        </div>
      </div>
    </Link>
  );
}
