// Konten terpusat Homigo — marketplace rumah pertama & sewa (fiktif).
// Listing, agen, dan harga adalah contoh purwarupa desain. Alamat sengaja hanya
// sampai tingkat kawasan; tidak ada nomor telepon sungguhan.

export const site = {
  name: 'Homigo',
  tagline: 'Rumah pertama dan tempat sewa, dibandingkan dengan angka yang sama',
  email: 'halo@homigo.example',
  jam: 'Setiap hari, 08.00–20.00 WIB',
  url: 'https://properti-homigo.vercel.app',
  survei: { judul: 'Atur jadwal lihat', catatan: 'Alamat lengkap dikirim setelah jadwal dikonfirmasi.' },
  katalog: { judul: 'Semua listing, satu ukuran', sub: 'Harga sewa tahunan ikut dihitung per bulan saat disaring, supaya bisa dibandingkan dengan sewa bulanan.' },
  kontak: { judul: 'Tanya dulu, putuskan nanti', sub: 'Pertanyaan soal KPR, sewa, atau listing tertentu — tulis saja. Untuk melihat unit, pakai formulir jadwal di halaman propertinya.' },
};

export const nav = [
  { label: 'Beranda', href: '/' },
  { label: 'Properti', href: '/properti' },
  { label: 'Bandingkan', href: '/bandingkan' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kontak', href: '/kontak' },
];

export function formatHarga(n) {
  if (n >= 1e9) return 'Rp ' + (n / 1e9).toLocaleString('id-ID', { maximumFractionDigits: 2 }) + ' M';
  if (n >= 1e6) return 'Rp ' + (n / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' Jt';
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}
export const rp = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');
export const hargaLabel = (p) => formatHarga(p.harga) + (p.status === 'Disewakan' ? `/${p.periode === 'tahun' ? 'thn' : 'bln'}` : '');
// Sewa tahunan disetarakan per bulan agar bisa dibandingkan.
export const sewaPerBulan = (p) => (p.periode === 'tahun' ? p.harga / 12 : p.harga);

export function cicilanBulanan(pokok, bungaTahunan, tenorTahun) {
  const r = bungaTahunan / 100 / 12;
  const n = tenorTahun * 12;
  return r ? (pokok * r) / (1 - Math.pow(1 + r, -n)) : pokok / n;
}

const agen = {
  rizky: { nama: 'Rizky Pratama', kode: 'HG-21', wilayah: 'Jabodetabek' },
  sinta: { nama: 'Sinta Maharani', kode: 'HG-08', wilayah: 'Yogyakarta & Semarang' },
  fajar: { nama: 'Fajar Nugroho', kode: 'HG-15', wilayah: 'Malang' },
};
const f = (n) => `/images/properti/${n}.webp`;

export const properti = [
  {
    id: 1, judul: 'Rumah dua kamar dekat tol di Cibubur', jenisProperti: 'Rumah', status: 'Dijual', harga: 1150000000, featured: true,
    spesifikasi: { luasTanah: 90, luasBangunan: 72, kamarTidur: 2, kamarMandi: 1, jumlahLantai: 2 },
    lokasi: { alamat: 'Kawasan perumahan Cibubur', kota: 'Bogor', kecamatan: 'Gunung Putri' },
    agen: agen.rizky, media: { foto: [f('rumah-kotak'), f('ruang-tamu-sofa'), f('kamar-studio')], video: null },
    sertifikat: 'SHM', tahun: 2021,
    deskripsi: 'Rumah dua lantai yang ringkas untuk pasangan muda. Lima menit ke gerbang tol, lantai atas masih bisa ditambah satu kamar.',
    fasilitas: ['Carport 1 mobil', 'Listrik 2.200 W', 'Air PAM', 'One gate system', 'Dekat tol'],
  },
  {
    id: 2, judul: 'Rumah satu lantai di Sawangan', jenisProperti: 'Rumah', status: 'Dijual', harga: 785000000, featured: true,
    spesifikasi: { luasTanah: 105, luasBangunan: 60, kamarTidur: 2, kamarMandi: 1, jumlahLantai: 1 },
    lokasi: { alamat: 'Kawasan perumahan Sawangan', kota: 'Depok', kecamatan: 'Sawangan' },
    agen: agen.rizky, media: { foto: [f('rumah-satu-lantai'), f('dapur-terang'), f('kamar-hangat')], video: null },
    sertifikat: 'SHM', tahun: 2019,
    deskripsi: 'Halaman belakang 30 m² masih kosong — cukup untuk dapur tambahan atau kamar ketiga. Angkot ke stasiun Depok sekitar 25 menit.',
    fasilitas: ['Halaman belakang', 'Carport', 'Listrik 1.300 W', 'Sumur bor', 'Dekat sekolah'],
  },
  {
    id: 3, judul: 'Apartemen studio dekat stasiun di Jatinegara', jenisProperti: 'Apartemen', status: 'Disewakan', harga: 3800000, periode: 'bulan', featured: true,
    spesifikasi: { luasTanah: 0, luasBangunan: 24, kamarTidur: 1, kamarMandi: 1, jumlahLantai: 1 },
    lokasi: { alamat: 'Kawasan Jatinegara', kota: 'Jakarta Timur', kecamatan: 'Jatinegara' },
    agen: agen.rizky, media: { foto: [f('kamar-studio'), f('apartemen-gedung'), f('kamar-kota')], video: null },
    sertifikat: 'Strata Title', tahun: 2016,
    deskripsi: 'Studio lantai 11, berjalan kaki tujuh menit ke stasiun. Sewa minimal tiga bulan; listrik token, air dan IPL sudah termasuk.',
    fasilitas: ['Furnished', 'Akses KRL', 'Kolam renang', 'Keamanan 24 jam', 'Minimarket di lobi'],
  },
  {
    id: 4, judul: 'Kamar kost dengan kamar mandi dalam di Jalan Kaliurang', jenisProperti: 'Kost', status: 'Disewakan', harga: 1650000, periode: 'bulan', featured: true,
    spesifikasi: { luasTanah: 0, luasBangunan: 15, kamarTidur: 1, kamarMandi: 1, jumlahLantai: 1 },
    lokasi: { alamat: 'Kawasan Jalan Kaliurang km 5', kota: 'Sleman', kecamatan: 'Depok' },
    agen: agen.sinta, media: { foto: [f('kamar-kost'), f('kamar-hangat')], video: null },
    sertifikat: '-', tahun: 2020,
    deskripsi: 'Kost campur dengan dapur bersama dan parkir motor beratap. Sepuluh menit bersepeda ke kampus; listrik sudah termasuk sampai 60 kWh.',
    fasilitas: ['Kamar mandi dalam', 'Wi-Fi', 'Dapur bersama', 'Parkir motor', 'Laundry berbayar'],
  },
  {
    id: 5, judul: 'Rumah dua lantai tiga kamar di Bekasi Utara', jenisProperti: 'Rumah', status: 'Dijual', harga: 1890000000, featured: false,
    spesifikasi: { luasTanah: 120, luasBangunan: 135, kamarTidur: 3, kamarMandi: 2, jumlahLantai: 2 },
    lokasi: { alamat: 'Kawasan perumahan Harapan Indah', kota: 'Bekasi', kecamatan: 'Medan Satria' },
    agen: agen.rizky, media: { foto: [f('rumah-dua-lantai'), f('ruang-tamu-terang'), f('kamar-kota')], video: null },
    sertifikat: 'SHM', tahun: 2018,
    deskripsi: 'Tiga kamar dengan satu kamar di lantai bawah untuk orang tua. Dapur sudah diperluas ke belakang; pemilik pindah kota sehingga bisa nego.',
    fasilitas: ['Garasi 1 mobil', 'Kamar di lantai bawah', 'Listrik 3.500 W', 'Air PAM', 'Bisa nego'],
  },
  {
    id: 6, judul: 'Rumah sewa tahunan di Lowokwaru', jenisProperti: 'Rumah', status: 'Disewakan', harga: 42000000, periode: 'tahun', featured: false,
    spesifikasi: { luasTanah: 110, luasBangunan: 90, kamarTidur: 3, kamarMandi: 2, jumlahLantai: 1 },
    lokasi: { alamat: 'Kawasan Soekarno-Hatta', kota: 'Malang', kecamatan: 'Lowokwaru' },
    agen: agen.fajar, media: { foto: [f('rumah-modern'), f('ruang-teras-kayu'), f('dapur-terang')], video: null },
    sertifikat: 'SHM', tahun: 2014,
    deskripsi: 'Cocok untuk keluarga kecil atau tiga mahasiswa pascasarjana. Kontrak minimal satu tahun, bayar di muka; pemilik tinggal di kota yang sama.',
    fasilitas: ['Semi furnished', 'Carport', 'Listrik 2.200 W', 'Dekat kampus', 'Teras belakang'],
  },
  {
    id: 7, judul: 'Apartemen dua kamar di Semarang Tengah', jenisProperti: 'Apartemen', status: 'Dijual', harga: 895000000, featured: false,
    spesifikasi: { luasTanah: 0, luasBangunan: 46, kamarTidur: 2, kamarMandi: 1, jumlahLantai: 1 },
    lokasi: { alamat: 'Kawasan Simpang Lima', kota: 'Semarang', kecamatan: 'Semarang Tengah' },
    agen: agen.sinta, media: { foto: [f('apartemen-putih'), f('ruang-tamu-sofa'), f('kamar-kota')], video: null },
    sertifikat: 'Strata Title', tahun: 2019,
    deskripsi: 'Unit sudut dengan dua sisi jendela. IPL sekitar Rp 650 ribu per bulan; penyewa lama baru keluar sehingga unit langsung siap huni.',
    fasilitas: ['Unit sudut', 'Kolam renang', 'Parkir basement', 'Akses kartu', 'Dekat pusat kota'],
  },
  {
    id: 8, judul: 'Gudang 400 m² di Cikarang', jenisProperti: 'Gudang', status: 'Disewakan', harga: 168000000, periode: 'tahun', featured: false,
    spesifikasi: { luasTanah: 600, luasBangunan: 400, kamarTidur: 0, kamarMandi: 1, jumlahLantai: 1 },
    lokasi: { alamat: 'Kawasan pergudangan Cikarang', kota: 'Bekasi', kecamatan: 'Cikarang Utara' },
    agen: agen.rizky, media: { foto: [f('gudang')], video: null },
    sertifikat: 'HGB', tahun: 2015,
    deskripsi: 'Tinggi plafon 7 meter, akses kontainer 40 kaki, dan kantor kecil di depan. Sewa minimal dua tahun.',
    fasilitas: ['Akses kontainer 40 ft', 'Plafon 7 m', 'Listrik 23.000 W', 'Kantor kecil', 'Keamanan kawasan'],
  },
  {
    id: 9, judul: 'Tanah kavling 150 m² di Godean', jenisProperti: 'Tanah', status: 'Dijual', harga: 435000000, featured: false,
    spesifikasi: { luasTanah: 150, luasBangunan: 0, kamarTidur: 0, kamarMandi: 0, jumlahLantai: 0 },
    lokasi: { alamat: 'Kawasan Godean', kota: 'Sleman', kecamatan: 'Godean' },
    agen: agen.sinta, media: { foto: [f('lahan')], video: null },
    sertifikat: 'SHM', tahun: null,
    deskripsi: 'Kavling pekarangan, bukan sawah — bisa langsung diajukan PBG. Jalan depan cukup untuk dua mobil berpapasan.',
    fasilitas: ['SHM pekarangan', 'Jalan 5 m', 'Listrik tersedia', 'Lingkungan perumahan'],
  },
  {
    id: 10, judul: 'Rumah minimalis dua kamar di Ungaran', jenisProperti: 'Rumah', status: 'Dijual', harga: 620000000, featured: false,
    spesifikasi: { luasTanah: 84, luasBangunan: 45, kamarTidur: 2, kamarMandi: 1, jumlahLantai: 1 },
    lokasi: { alamat: 'Kawasan perumahan Ungaran', kota: 'Semarang', kecamatan: 'Ungaran Barat' },
    agen: agen.sinta, media: { foto: [f('rumah-modern'), f('ruang-tamu-terang')], video: null },
    sertifikat: 'SHM', tahun: 2023,
    deskripsi: 'Rumah baru dari pengembang kecil, belum pernah dihuni. Udara Ungaran lebih sejuk; 30 menit ke pusat Semarang lewat tol.',
    fasilitas: ['Belum pernah dihuni', 'Carport', 'Listrik 1.300 W', 'Taman depan', 'Dekat tol'],
  },
];

export const jenisList = ['Semua', ...Array.from(new Set(properti.map((p) => p.jenisProperti)))];
export const statusList = ['Semua', 'Dijual', 'Disewakan'];
export const kotaList = ['Semua', ...Array.from(new Set(properti.map((p) => p.lokasi.kota)))];
export const hargaFilter = [
  { v: 'j1', label: 'Beli di bawah Rp 1 M', status: 'Dijual', max: 1e9 },
  { v: 'j2', label: 'Beli Rp 1–2 M', status: 'Dijual', min: 1e9, max: 2e9 },
  { v: 's2', label: 'Sewa di bawah Rp 2 Jt/bln', status: 'Disewakan', max: 2e6, perBulan: true },
  { v: 's5', label: 'Sewa Rp 2–5 Jt/bln', status: 'Disewakan', min: 2e6, max: 5e6, perBulan: true },
  { v: 's9', label: 'Sewa di atas Rp 5 Jt/bln', status: 'Disewakan', min: 5e6, perBulan: true },
];

const IKON = { Rumah: 'Home', Apartemen: 'Building2', Villa: 'Palmtree', Tanah: 'Trees', Kost: 'BedDouble', Gudang: 'Warehouse', Ruko: 'Store' };
export const kategori = jenisList.slice(1).map((j) => ({ jenis: j, icon: IKON[j] || 'Home' }));

const dijual = properti.filter((p) => p.status === 'Dijual' && p.jenisProperti !== 'Tanah');
export const stats = [
  { value: String(properti.length), label: 'Listing aktif' },
  { value: String(new Set(properti.map((p) => p.lokasi.kota)).size), label: 'Kota' },
  { value: formatHarga(Math.min(...dijual.map((p) => p.harga))), label: 'Rumah termurah' },
  { value: formatHarga(Math.min(...properti.filter((p) => p.status === 'Disewakan').map(sewaPerBulan))) + '/bln', label: 'Sewa termurah' },
];

export const faqs = [
  { q: 'Bagaimana sewa tahunan dibandingkan dengan sewa bulanan?', a: 'Di filter dan halaman Bandingkan, sewa tahunan dibagi 12. Ingat bahwa sewa tahunan biasanya dibayar di muka sekaligus.' },
  { q: 'Asumsi apa yang dipakai untuk estimasi cicilan?', a: 'Uang muka 20%, tenor 15 tahun, bunga 7,5% per tahun tetap. Kamu bisa mengubahnya di halaman Bandingkan dan di kalkulator beranda.' },
  { q: 'Apakah ada biaya untuk penyewa atau pembeli?', a: 'Tidak. Komisi dibayar pemilik setelah transaksi selesai.' },
  { q: 'Bisa lihat unit lewat video call?', a: 'Bisa. Pilih "Video call" saat mengatur jadwal di halaman properti.' },
];

export const tentang = {
  judul: 'Membandingkan rumah seharusnya semudah membandingkan ponsel',
  subjudul: 'Angka yang sama untuk setiap listing',
  cerita: [
    'Homigo dibuat untuk orang yang baru pertama kali membeli atau menyewa: pasangan muda, pekerja yang pindah kota, mahasiswa.',
    'Setiap listing punya harga per meter persegi, estimasi cicilan dengan asumsi yang sama, dan sewa yang disetarakan per bulan — supaya dua pilihan bisa diletakkan berdampingan tanpa kalkulator terpisah.',
  ],
  foto: f('ruang-tamu-sofa'),
  nilai: [
    ['Satu ukuran', 'Harga per m² dan sewa per bulan dihitung dengan cara yang sama untuk semua listing.'],
    ['Asumsi terbuka', 'Bunga, tenor, dan uang muka untuk estimasi cicilan selalu ditulis dan bisa diubah.'],
    ['Lihat dulu', 'Datang langsung atau video call — dijadwalkan, bukan dikejar.'],
  ],
  cta: 'Taruh dua pilihanmu berdampingan',
};

export const halamanEkstra = [];
export const tautanDetail = (p) => ({ label: 'Bandingkan dengan listing lain', sub: 'Harga per m², cicilan, fasilitas', href: `/bandingkan?id=${p.id}` });

export const getProperti = (id) => properti.find((p) => String(p.id) === String(id));
export const propertiSerupa = (item, n = 3) =>
  properti.filter((p) => p.id !== item.id && (p.status === item.status && (p.jenisProperti === item.jenisProperti || p.lokasi.kota === item.lokasi.kota))).slice(0, n);
