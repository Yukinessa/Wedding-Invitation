# Undangan Kun & Destyana

Satu halaman: `index.html`. Semua data ada di blok `CONFIG` di bagian atas file itu.

## 1. Ganti data
Buka `index.html` dan cari `const CONFIG`. Baris yang bertanda `// TODO` masih berisi data contoh:
nama orang tua, Instagram, zona waktu, tanggal, jam, tempat, link Maps, susunan acara, cerita love story,
rekening, alamat kado, nomor WhatsApp, dan lagu.

## 2. Taruh foto & lagu di folder `assets/`
| File | Dipakai di |
|---|---|
| `story-1.jpg` … `story-4.jpg` | Love Story (3 cerita + kartu "Pernikahan") |
| `gallery-1.jpg` … `gallery-6.jpg` | Our Gallery (boleh lebih atau kurang, sesuaikan daftar `gallery`) |
| `couple.png` | Foto/ilustrasi berdua di penutup (PNG transparan paling bagus) |
| `cover.jpg` | Gambar pratinjau saat link dibagikan di WhatsApp |
| `music.mp3` | Lagu latar |

Kalau file foto belum ada, yang tampil kotak bertuliskan "Foto". Kalau `couple.png` belum ada, bagian itu disembunyikan.
Kompres foto dulu (lebar ±1200px, di bawah 300KB) supaya undangan cepat dibuka.

## 3. Link per tamu
Tambahkan `?to=` di belakang link, spasi diganti `+`:
```
https://alamat-undanganmu.com/?to=Bapak+Budi+Santoso
```
Tanpa `?to=`, sampul menampilkan "Tamu Undangan".

## 4. RSVP & ucapan (Google Sheets)
Tanpa pengaturan, RSVP dibuka sebagai pesan WhatsApp ke `CONFIG.whatsapp`, dan ucapan hanya tersimpan di HP tamu
itu sendiri (tamu lain tidak bisa melihatnya).
Supaya RSVP & ucapan tersimpan di satu tempat dan bisa dilihat semua tamu, ikuti petunjuk di
`google-apps-script.js`, lalu isi `CONFIG.endpoint` dengan URL Web App-nya.

## 5. Ornamen
Bunga, kupu-kupu, pita, tirai, dan bingkai saat ini digambar dengan kode (SVG/CSS).
Kalau nanti punya PNG ornamen berlisensi (watercolor floral pink/burgundy), simpan di `assets/` dan
elemen `<svg class="o deco …"><use href="#…"/></svg>` bisa diganti `<img src="assets/…png">` dengan class yang sama.

## 6. Hosting (gratis)
Upload isi folder ini (`index.html` + `assets/`) ke salah satu:
- **Netlify Drop**: app.netlify.com/drop, cukup seret foldernya.
- **GitHub Pages**: buat repo, upload, aktifkan Pages.
- **Cloudflare Pages** / **Vercel**.

File `google-apps-script.js` dan `README.md` tidak perlu ikut di-upload.
