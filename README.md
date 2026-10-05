# Smart Lab Berbasis QR Code (Digital Lab Assistant)

Platform asisten belajar digital laboratorium berbasis QR Code yang memandu mahasiswa secara mandiri saat berhadapan langsung dengan perangkat laboratorium fisik.

---

## 💡 Konsep Utama

Setiap alat laboratorium ditempeli stiker **QR Code**. Ketika mahasiswa memindai QR tersebut:
- Mahasiswa **langsung mengakses materi lengkap alat yang dipindai** secara terisolasi tanpa menu web lain yang mendistraksi.
- Menyediakan **alur belajar terstruktur 7 tahapan**:
  1. 🔍 **Kenali Alat**: Identitas perangkat, kode lab, lokasi, foto, fungsi utama, dan spesifikasi teknis.
  2. 📺 **Pelajari**: Video pengantar / tutorial singkat dan modul teori ringkas.
  3. 🛠️ **Cara Menggunakan**: Panduan langkah demi langkah terstruktur dilengkapi tips keselamatan alat.
  4. ✍️ **Coba Sendiri**: Praktik mandiri (hands-on lab) dengan checklist pelacakan progres.
  5. 🧠 **Tes Pemahaman**: Kuis interaktif pilihan ganda dengan skor instan dan pembahasan.
  6. ⚠️ **Troubleshooting**: Mahasiswa memilih kendala yang dihadapi dan mendapatkan panduan solusinya.
  7. 🏆 **Challenge**: Tantangan mandiri dengan kriteria kelulusan untuk melatih kemandirian praktikan.

---

## 🎨 Desain & Gaya

- **Tema**: Simple, modern, dan bernuansa monokrom hitam-putih (*high-contrast minimalist*).
- **Akses Siswa/Mahasiswa**: Langsung ke rute `/tool/[slug]` atau `/t/[slug]` yang ramah layar smartphone.
- **Akses Admin**: Dilindungi kode sandi rahasia di `/admin` untuk kustomisasi seluruh materi 7 tahapan serta mencetak stiker QR siap tempel.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS v4
- **ORM & Database**: [Prisma](https://www.prisma.io/) + [Supabase](https://supabase.com/) (PostgreSQL)
- **Komponen QR Code**: `qrcode.react` (Mendukung preview interaktif dan print stiker)
- **Ikon**: `lucide-react`

---

## 🚀 Memulai Proyek (Getting Started)

### 1. Jalankan Development Server
```bash
npm run dev
```

Buka peramban Anda di:
- **Halaman Utama & Simulator QR**: [http://localhost:3000](http://localhost:3000)
- **1. Tang Krimping**: [http://localhost:3000/tool/tang-krimping](http://localhost:3000/tool/tang-krimping)
- **2. Konektor RJ45**: [http://localhost:3000/tool/konektor-rj45](http://localhost:3000/tool/konektor-rj45)
- **3. LAN Tester**: [http://localhost:3000/tool/lan-tester](http://localhost:3000/tool/lan-tester)
- **Portal Admin**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Kode Sandi Default: `admin123`)*

---

## 📁 Struktur Direktori Proyek (Tanpa Folder src)

```text
├── prisma/
│   └── schema.prisma         # Skema database relasional alat & 7 tahapan
├── app/                      # Next.js App Router (Rute langsung di root)
│   ├── admin/                # Dashboard Admin & halaman login passcode
│   ├── api/admin/            # API rute autentikasi & CRUD alat
│   ├── t/[slug]/             # URL pendek pengarah QR Code
│   ├── tool/[slug]/          # Antarmuka mandiri mahasiswa saat scan QR
│   ├── globals.css           # Tailwind CSS v4 & styling monokrom + print
│   ├── layout.tsx            # Root layout Next.js
│   └── page.tsx              # Beranda & simulator scan QR 3 alat
├── components/
│   ├── qr-sticker-modal.tsx   # Modal cetak stiker label QR fisik
│   ├── tool-editor-modal.tsx  # Form editor kustomisasi 7 tahap
│   └── tool-learning-view.tsx # Komponen interaktif mahasiswa
├── lib/
│   ├── initial-data.ts       # Data 3 alat: Tang Krimping, RJ45, LAN Tester
│   ├── prisma.ts             # Singleton client Prisma
│   └── store.ts              # Layanan data dan verifikasi sandi admin
├── types/
│   └── tool.ts               # Definisi antarmuka TypeScript 7 tahapan
├── .env                      # Konfigurasi variabel lingkungan lokal
└── .env.example              # Template variabel lingkungan
```

---

## 🗄️ Menghubungkan Supabase & Prisma

Proyek telah dilengkapi dengan schema Prisma di `prisma/schema.prisma` yang mencakup seluruh relasi 7 tahap pembelajaran.

Untuk menghubungkan ke project database Supabase Anda:

1. Buat proyek baru di [Supabase](https://supabase.com).
2. Masuk ke menu **Project Settings > Database > Connection String**.
3. Buka file `.env` di proyek ini dan masukkan URL koneksi:
   ```env
   # Transaction Pooler (Port 6543)
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

   # Session Pooler (Port 5432)
   DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

   # Passcode Admin Anda
   ADMIN_SECRET_KEY="admin123"
   ```
4. Jalankan sinkronisasi tabel Prisma ke database Supabase:
   ```bash
   npx prisma db push
   ```
5. Buat Prisma Client terbaru jika ada perubahan skema:
   ```bash
   npx prisma generate
   ```
