<p align="center">
  <img src="assets/images/icon.png" width="120" alt="Finder Mobile Logo">
</p>

<h1 align="center">Finder Mobile</h1>

<p align="center">
  <em>Aplikasi Kehilangan dan Ditemukan (Lost and Found) berbasis Mobile untuk komunitas kampus UMKT</em>
</p>

---

## 📖 Tentang Aplikasi

**Finder Mobile** adalah platform yang dirancang khusus untuk memfasilitasi pelaporan barang hilang (*Lost*) dan barang temuan (*Found*). Aplikasi ini memberikan ruang bagi mahasiswa dan warga kampus untuk saling membantu menemukan kembali barang yang hilang dengan fitur-fitur seperti pelaporan instan, pelacakan status laporan otomatis, dan fasilitas obrolan (*chat room*) terenkripsi untuk mempertemukan pemilik barang dengan sang penemu.

### ✨ Fitur Utama
- **Autentikasi Eksklusif:** Menggunakan Google Login yang dibatasi secara spesifik hanya untuk domain universitas (`@umkt.ac.id`).
- **Papan Laporan Berbasis Gambar:** Formulir pelaporan intuitif untuk barang hilang maupun temuan lengkap dengan detail lokasi, deksripsi, serta unggahan foto barang.
- **Sistem Status Transparan:** Melacak status laporan dari *Lost* atau *Found* hingga berubah menjadi *Claimed* (Selesai).
- **Chat Real-time Terfokus:** Ruang obrolan langsung (yang otomatis *read-only* setelah 2 hari dan kedaluwarsa setelah 7 hari) bagi penemu dan pemilik untuk berkomunikasi mengatur titik temu dengan privasi terjaga.
- **Desain Estetis & Dinamis:** Antarmuka responsif berbasis *Dark Mode* modern yang dirancang dengan utilitas Tailwind dari NativeWind.

## 🛠 Tech Stack

- **Framework:** [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS untuk React Native)
- **Komponen UI:** [React Native Paper](https://callstack.github.io/react-native-paper/)
- **Data Fetching:** [Axios](https://axios-http.com/) dengan pengelolaan State menggunakan Context API

---

## 🚀 Menjalankan Project

### 1) Prasyarat
- Node.js LTS (disarankan versi terbaru LTS)
- npm / yarn
- **Expo Go** (untuk testing langsung di device fisik) atau Android Studio / Xcode (untuk emulator)

### 2) Install Dependency
```bash
npm install
```

### 3) Konfigurasi Environment
Buat file `.env` pada *root directory* dan masukkan konfigurasi API:
```env
EXPO_PUBLIC_API_BASE_URL=http://.../api/v1
EXPO_PUBLIC_CLIENT_ID=...
```

### 4) Jalankan Aplikasi
```bash
npx expo start
```
Setelah Metro bundler terbuka:
- tekan `a` untuk membuka di Android emulator
- tekan `i` untuk membuka di iOS simulator
- tekan `w` untuk Web
- atau *scan QR code* melalui aplikasi **Expo Go** di perangkat fisik Anda.

### 5) Pengecekan Kode (Linting)
Gunakan perintah berikut untuk memeriksa standarisasi kode dan meminimalisir error (*rules of hooks, unused variables, dsb*):
```bash
npm run lint
```

---

## 🤝 Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada Finder Mobile! Untuk panduan lengkap tentang cara berkontribusi, termasuk:
- 📋 Cara membuat *issue* dengan format yang benar
- 🔄 Cara mengambil/assign *issue*
- 💬 *Guidelines commit message*
- 🚀 Cara membuat *Pull Request*
- 📚 *Development workflow* lengkap

Silakan baca secara menyeluruh di dokumen **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

### 🏃‍♂️ Quick Start untuk Kontribusi

1. *Fork repository* ini (jika bukan *collaborator* langsung).
2. Buat *branch* baru dengan penamaan dari ID Jira/Issue: `git checkout -b FU-xx` (Ganti `xx` dengan nomor issue).
3. Lakukan perubahan dan commit dengan format pesan yang sesuai standar.
4. Push ke branch Anda dan buka *Pull Request* baru ke repository utama.

---
© 2026 Finder Mobile Team - Universitas Muhammadiyah Kalimantan Timur
