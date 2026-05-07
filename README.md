# Finder Mobile

Mobile app project built with **Expo + React Native**.

`lqD2zaniX2ZUJhYG`

## Menjalankan Project

### 1) Prasyarat
- Node.js LTS (disarankan versi terbaru LTS)
- npm
- Expo Go (untuk testing di device) atau Android Studio / Xcode (untuk emulator)

### 2) Install dependency
```bash
npm install
```

### 3) Jalankan aplikasi
```bash
npx expo start
```

Setelah Metro bundler terbuka:
- tekan `a` untuk Android emulator
- tekan `i` untuk iOS simulator
- tekan `w` untuk Web
- atau scan QR dari Expo Go di device

### 4) Linting
```bash
npm run lint
```

## Panduan Kontribusi

### Alur kontribusi
1. Fork repository ini (jika bukan collaborator langsung).
2. Buat branch baru dari branch utama.
3. Kerjakan perubahan dalam branch tersebut.
4. Commit perubahan yang jelas dan terarah.
5. Buka Pull Request (PR) ke repository ini.

### Rekomendasi penamaan branch
Gunakan format yang mudah dilacak ke issue:
```text
FU-xx
```

Contoh:
```text
FU-12
FU-13
```

### Rekomendasi format commit
Gunakan commit message yang ringkas dan konsisten:
```text
type(scope): message
```

Contoh:
```text
feat(home): add initial home screen layout
docs(readme): add contribution and setup guide
fix(navbar): correct active tab highlight
```

### Aturan sebelum membuat PR
- Pastikan aplikasi dapat dijalankan lokal.
- Pastikan lint tidak error (`npm run lint`).
- Kaitkan PR dengan issue terkait (misal `FU-12`).
- Jelaskan perubahan, dampak, dan screenshot (untuk perubahan UI).

### Panduan membuat Pull Request yang benar
1. **Sinkronkan branch utama terlebih dahulu**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Buat branch kerja sesuai format**
   ```bash
   git checkout -b FU-xx
   ```
3. **Lakukan perubahan, lalu commit dengan pesan yang jelas**
   ```bash
   git add .
   git commit -m "feat(scope): deskripsi perubahan"
   ```
4. **Push branch ke remote**
   ```bash
   git push -u origin FU-xx
   ```
5. **Buat PR dari branch `FU-xx` ke `main`** dengan isi minimal:
   - Ringkasan perubahan
   - Referensi issue (contoh: `Closes #15`)
   - Screenshot/video jika ada perubahan UI
   - Catatan testing singkat
6. **Pastikan PR fokus pada satu issue** agar review lebih cepat dan jelas.
