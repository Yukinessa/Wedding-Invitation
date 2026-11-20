# Wedding Invitation — Design Spec

Sumber aturan tunggal untuk seluruh halaman. Setiap section WAJIB mengikuti dokumen ini.
Kalau ada kebutuhan di luar aturan ini, ubah dokumen ini dulu, baru kodenya.

## 1. Konsep

**Taman bunga dengan palet matcha & strawberry.**
Matcha strawberry adalah **tema warna**, bukan motif. Motif visualnya bunga khas pernikahan:
mawar, lily, peony, bunga putih kecil, daun & eucalyptus hijau matcha.
**Bunga matahari** (favorit mempelai wanita) diselipkan sebagai aksen ±5–10% dari total bunga.
Jangan memakai motif buah stroberi atau daun teh.
Gaya referensi (backdrop engagement): kolase 3D lembut, amplop terbuka + kartu arch, segel lilin,
pita satin, badge tanggal bertassel, tile monogram berenda, kupu-kupu, line-art di latar.
Satu halaman, scroll vertikal, tidak ada pindah halaman.

## 2. Warna (hanya ini, tidak boleh menambah)

| Token | Hex | Pakai untuk |
|---|---|---|
| `--paper` | `#FAF6EF` | Latar utama (kertas cat air) |
| `--blush` | `#F6D5D9` | Latar section bernuansa stroberi, wash cat air pink |
| `--sage` | `#C9D8B6` | Latar section bernuansa matcha, wash cat air hijau |
| `--matcha` | `#5E7D47` | Judul, ikon, garis ornamen |
| `--berry` | `#B5536B` | Tombol, link, aksen penting (maks. 1 elemen aksen per layar) |
| `--ink` | `#3E3A34` | Teks isi |

Pengecualian: kuning `#F2C14E` hanya untuk bunga matahari, tidak untuk UI atau teks.

Aturan: teks selalu `--ink` atau `--matcha` di atas `--paper`/`--blush`/`--sage`. Pink/hijau muda tidak pernah dipakai untuk teks.

## 3. Tipografi

| Peran | Font | Aturan |
|---|---|---|
| Nama mempelai | Pinyon Script | HANYA untuk nama mempelai. Tidak dipakai di tempat lain. |
| Judul section | Cormorant Garamond 500, italic opsional | Satu ukuran untuk semua judul section |
| Label kecil (eyebrow) | Jost 500, UPPERCASE, letter-spacing 0.2em | Di atas setiap judul |
| Isi | Jost 400 | Ukuran isi tunggal; minimal 16px di mobile |
| Arab | Amiri | Hanya untuk ayat/basmalah |

## 4. Anatomi section (wajib sama di semua section)

```
[ornamen botanical kecil di sudut — parallax ]
  LABEL KECIL (eyebrow)
  Judul Section
  ── ornamen pemisah (ranting daun) ──
  Isi
```

- Lebar konten maks. 560px (rasa kartu undangan), center.
- Padding vertikal section: `clamp(96px, 16vh, 160px)`.
- Skala spasi: 4 · 8 · 16 · 24 · 40 · 64 · 96 px. Tidak ada nilai lain.

## 5. Bingkai foto

- Bentuk tunggal: **arch** (atas melengkung, bawah lurus). Semua foto memakai arch, kecuali
  saat efek "foto membesar" mencapai layar penuh.
- Setiap bingkai punya tepi wash cat air tipis (`--sage` atau `--blush`, bergantian).
- Slot kosong tampil sebagai placeholder kertas + nomor slot; slot tanpa file disembunyikan
  di production. Disediakan 15 slot, berfungsi dengan 5–15 foto.

## 6. Kosakata gerak (hanya 4 ini)

| Nama | Perilaku | Dipakai di |
|---|---|---|
| **Reveal** | fade + naik 24px, 700ms, `cubic-bezier(.22,1,.36,1)`, stagger 80ms | Semua teks & kartu |
| **Bloom** | foto arch membesar menjadi layar penuh saat section di-pin | Hero, 1–2 momen galeri |
| **Drift** | ornamen botanical parallax 0.85x–1.15x | Semua section |
| **Wash** | latar berganti `--paper` → `--blush` → `--sage` seperti cat air menyebar | Pergantian antar bab |

- `prefers-reduced-motion`: semua gerak dimatikan, konten langsung tampil.
- Mobile: gerak sama, jarak & skala diperkecil; tidak ada efek yang bergantung hover.

## 7. Alur section

| # | Section | Bahasa | Latar |
|---|---|---|---|
| 0 | Cover — "Kepada Yth. {nama tamu}" + tombol **Buka Undangan** (memulai musik) | ID | paper |
| 1 | Hero — nama mempelai, tanggal, Bloom | ID | paper |
| 2 | Basmalah + QS. Ar-Rum: 21 | AR + ID | blush |
| 3 | Mempelai — profil + orang tua | ID | paper |
| 4 | Love Story — timeline | **EN** | sage |
| 5 | Acara — Akad Nikah & Resepsi, countdown, Maps, simpan ke kalender | ID | paper |
| 6 | Galeri — slot foto prewedding, Bloom | ID | blush |
| 7 | RSVP & Ucapan — tersimpan ke Google Sheets | ID | paper |
| 8 | Amplop Digital — rekening + tombol salin | ID | sage |
| 9 | Penutup — doa, terima kasih, nama keluarga | ID | paper |

## 8. Fitur

- **Nama tamu**: dari URL `?to=Nama+Tamu`; tanpa parameter → "Bapak/Ibu/Saudara/i".
- **Musik**: mulai saat "Buka Undangan" diklik, fade-in volume; tombol play/pause melayang;
  otomatis pause saat tab tidak aktif.
- **RSVP**: kirim ke Google Apps Script Web App → Google Sheets.
- **Konten**: semua teks, tanggal, foto, rekening, URL sheet di satu file `config.js`.

## 9. Teknis

HTML/CSS/JS statis · GSAP + ScrollTrigger · Lenis · tekstur & tepi cat air via SVG filter
(feTurbulence/feDisplacementMap) · font Google Fonts · deploy statis (Vercel/Netlify).
Target: responsif dari 360px, layout mobile-first.
