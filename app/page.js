import Image from 'next/image';
import Link from 'next/link';
import {
  House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse,
  Search, CalendarCheck, KeyRound, ArrowRight, ArrowUpRight, Sparkles, TrendingUp, Columns3,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import HeroSearch from '@/components/HeroSearch';
import KprCalculator from '@/components/KprCalculator';
import Rekomendasi from '@/components/Rekomendasi';
import { stats, kategori, properti, hargaLabel, formatHarga, cicilanBulanan } from '@/lib/data';

const ICONS = { House, Home: House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse };
const TRENDING = [
  { l: 'Rumah di bawah Rp 1 M', href: '/properti?status=Dijual&harga=j1' },
  { l: 'Kost', href: '/properti?jenis=Kost' },
  { l: 'Apartemen', href: '/properti?jenis=Apartemen' },
  { l: 'Sewa di bawah Rp 5 Jt', href: '/properti?status=Disewakan&harga=s5' },
];
const STEPS = [
  { icon: Search, title: 'Saring', desc: 'Filter harga memisahkan beli dan sewa; sewa tahunan otomatis dihitung per bulan.' },
  { icon: Columns3, title: 'Bandingkan', desc: 'Taruh dua atau tiga pilihan berdampingan — cicilan, uang muka, harga per m².' },
  { icon: CalendarCheck, title: 'Lihat langsung', desc: 'Pilih jam di halaman properti, datang atau lewat video call.' },
];
// Contoh perbandingan di beranda: dua rumah termurah yang dijual.
const rumah = properti.filter((p) => p.status === 'Dijual' && p.jenisProperti === 'Rumah').sort((a, b) => a.harga - b.harga);
const DUA = rumah.slice(0, 2);
const cicil = (p) => cicilanBulanan(p.harga * 0.8, 7.5, 15);

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* Hero — app/proptech */}
      <section className="px-4 pt-12 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-forest">
              <Sparkles size={14} /> Untuk pembeli & penyewa pertama
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] text-ink md:text-7xl">
              Cari rumah, <span className="text-forest">semudah</span> geser layar.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Rumah, apartemen, dan kost dengan harga per m², estimasi cicilan, dan sewa yang disetarakan per bulan — lalu bandingkan berdampingan.
            </p>
            <div className="mt-8"><HeroSearch /></div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-muted"><TrendingUp size={15} /> Populer:</span>
              {TRENDING.map((t) => (
                <Link key={t.l} href={t.href} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-ink transition hover:border-forest hover:text-forest">{t.l}</Link>
              ))}
            </div>
          </div>

          {/* Bento image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src="/images/properti/rumah-kotak.webp" alt="" fill priority sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src="/images/properti/kamar-kost.webp" alt="" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src="/images/properti/apartemen-putih.webp" alt="" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-6 flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-xl">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest/10 text-forest"><KeyRound size={18} /></span>
              <div><p className="font-display text-lg font-bold text-ink">±{formatHarga(cicil(rumah[0]))}/bln</p><p className="text-xs text-muted">cicilan rumah termurah, DP 20% · 15 thn</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 rounded-[1.75rem] bg-forest p-6 text-white md:grid-cols-4 md:p-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/90">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kategori pills */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Telusuri kategori</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {kategori.map((k) => {
              const Icon = ICONS[k.icon] || House;
              return (
                <Link key={k.jenis} href={`/properti?jenis=${k.jenis}`} className="flex items-center gap-2 rounded-2xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-forest/30 hover:text-forest">
                  <Icon size={18} className="text-forest" /> {k.jenis}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rekomendasi w/ toggle */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Listing pilihan</h2>
              <p className="mt-2 text-muted">Pilih tab beli atau sewa.</p>
            </div>
            <Link href="/properti" className="hidden items-center gap-1 text-sm font-semibold text-forest hover:underline sm:inline-flex">Lihat semua <ArrowUpRight size={16} /></Link>
          </div>
          <div className="mt-8"><Rekomendasi /></div>
        </div>
      </section>

      {/* KPR Calculator */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"><Reveal><KprCalculator /></Reveal></div>
      </section>

      {/* How it works */}
      <section className="bg-sand/60 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center"><h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Saring, bandingkan, lihat</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                  <span className="absolute right-6 top-6 font-display text-5xl font-bold numeral-outline" aria-hidden="true">0{i + 1}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-white"><s.icon size={22} /></span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cuplikan perbandingan */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Mana yang lebih masuk akal?</h2>
            <p className="mt-2 max-w-2xl text-muted">Dua rumah termurah saat ini, dengan asumsi yang sama: uang muka 20%, bunga 7,5%, tenor 15 tahun.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {DUA.map((p) => {
              const luas = p.spesifikasi.luasBangunan;
              return (
                <Reveal key={p.id}>
                  <Link href={`/properti/${p.id}`} className="flex h-full gap-4 rounded-3xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-forest/30">
                    <span className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl sm:w-36"><Image src={p.media.foto[0]} alt="" fill sizes="144px" className="object-cover" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{p.judul}</span>
                      <span className="mt-1 block font-display text-xl font-bold text-forest">{hargaLabel(p)}</span>
                      <span className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <span className="text-muted">Cicilan</span><span className="font-semibold text-ink">±{formatHarga(cicil(p))}/bln</span>
                        <span className="text-muted">Per m²</span><span className="font-semibold text-ink">{formatHarga(p.harga / luas)}</span>
                        <span className="text-muted">Bangunan</span><span className="font-semibold text-ink">{luas} m² · {p.spesifikasi.kamarTidur} KT</span>
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <Link href={`/bandingkan?id=${DUA.map((p) => p.id).join(',')}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:bg-forest-soft"><Columns3 size={16} /> Bandingkan lengkap</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest to-forest-soft p-10 text-white md:grid-cols-2 md:p-16">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">Punya rumah atau kamar untuk disewakan?</h2>
              <p className="mt-4 text-white/90">Pasang listing tanpa biaya di muka. Kami bantu menghitung harga per m² dan sewa setaranya supaya penawaranmu mudah dibandingkan.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/kontak?topik=jual" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-forest transition hover:bg-sand">Ajukan listing <ArrowRight size={16} /></Link>
                <Link href="/properti" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10">Jelajahi</Link>
              </div>
            </div>
            <div className="relative hidden h-48 md:block">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-xl" aria-hidden="true" />
              <div className="absolute inset-0 grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-2xl"><Image src="/images/properti/rumah-satu-lantai.webp" alt="" fill sizes="20vw" className="object-cover" /></div>
                <div className="relative mt-8 overflow-hidden rounded-2xl"><Image src="/images/properti/kamar-studio.webp" alt="" fill sizes="20vw" className="object-cover" /></div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
