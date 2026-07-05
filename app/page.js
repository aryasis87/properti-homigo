import Image from 'next/image';
import Link from 'next/link';
import {
  House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse,
  Search, MessagesSquare, KeyRound, ArrowRight, ArrowUpRight, Star, Sparkles, TrendingUp,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import HeroSearch from '@/components/HeroSearch';
import KprCalculator from '@/components/KprCalculator';
import Rekomendasi from '@/components/Rekomendasi';
import { site, stats, kategori, testimonials, waLink } from '@/lib/data';

const ICONS = { House, Home: House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse };
const TRENDING = ['Jakarta Selatan', 'Apartemen', 'Rumah < Rp 1M', 'Bali', 'Ruko'];
const STEPS = [
  { icon: Search, title: 'Cari & filter', desc: 'Pakai filter cerdas untuk menemukan properti yang benar-benar pas.' },
  { icon: MessagesSquare, title: 'Hubungi agen', desc: 'Chat agen terverifikasi langsung via WhatsApp, respon cepat.' },
  { icon: KeyRound, title: 'Survei & deal', desc: 'Atur survei, nego, dan dampingi sampai serah terima kunci.' },
];

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* Hero — app/proptech */}
      <section className="px-4 pt-12 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-forest">
              <Sparkles size={14} /> Properti untuk generasi digital
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] text-ink md:text-7xl">
              Cari rumah, <span className="text-forest">semudah</span> geser layar.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Ribuan listing terverifikasi, filter pintar, agen responsif, dan kalkulator KPR — semua dalam satu aplikasi.
            </p>
            <div className="mt-8"><HeroSearch /></div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-muted"><TrendingUp size={15} /> Populer:</span>
              {TRENDING.map((t) => (
                <Link key={t} href={`/properti?q=${encodeURIComponent(t)}`} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-ink transition hover:border-forest hover:text-forest">{t}</Link>
              ))}
            </div>
          </div>

          {/* Bento image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src="/images/rm4.jpg" alt="" fill priority sizes="25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src="/images/rm5.jpg" alt="" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src="/images/rm9.jpg" alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-6 flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-xl">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest/10 text-forest"><Star size={18} className="fill-forest" /></span>
              <div><p className="font-display text-lg font-bold text-ink">4,9 / 5</p><p className="text-xs text-muted">8.300+ ulasan</p></div>
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
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
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
              <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Rekomendasi untukmu</h2>
              <p className="mt-2 text-muted">Pilihan teratas, diperbarui tiap hari.</p>
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
          <Reveal className="text-center"><h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Tiga langkah, beres</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                  <span className="absolute right-6 top-6 font-display text-5xl font-bold numeral-outline">0{i + 1}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-white"><s.icon size={22} /></span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Mereka sudah pindah rumah</h2></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.nama} delay={i * 0.1}>
                <figure className="h-full rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
                  <div className="mb-3 flex gap-0.5 text-forest">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={15} className="fill-forest" />)}</div>
                  <blockquote className="text-ink/85">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm"><span className="font-semibold text-ink">{t.nama}</span> <span className="text-muted">· {t.peran}</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest to-forest-soft p-10 text-white md:grid-cols-2 md:p-16">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">Punya properti? Pasang & jangkau ribuan pembeli.</h2>
              <p className="mt-4 text-white/85">Iklan dasar gratis. Listing tampil ke calon pembeli serius setiap hari.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={waLink(site.wa, 'Halo Homigo, saya mau pasang iklan properti.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-forest transition hover:bg-sand">Pasang Iklan <ArrowRight size={16} /></a>
                <Link href="/properti" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10">Jelajahi</Link>
              </div>
            </div>
            <div className="relative hidden h-48 md:block">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-xl" />
              <div className="absolute inset-0 grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-2xl"><Image src="/images/rm8.jpg" alt="" fill sizes="20vw" className="object-cover" /></div>
                <div className="relative mt-8 overflow-hidden rounded-2xl"><Image src="/images/rm2.jpg" alt="" fill sizes="20vw" className="object-cover" /></div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
