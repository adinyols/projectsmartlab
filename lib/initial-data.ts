import { ToolData } from '@/types/tool';

export const INITIAL_TOOLS: ToolData[] = [
  // 1. TANG KRIMPING
  {
    id: 'tool-tang-krimping',
    slug: 'tang-krimping',
    name: 'Tang Krimping (Crimping Tool RJ45 / RJ11)',
    category: 'Perkakas Terminasi Kabel',
    code: 'LAB-CBL-01',
    location: 'Meja Praktikum Perkabelan - Laci Alat Jarkom A-1',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Perkakas tangan mekanikal presisi yang dirancang khusus untuk memotong kabel UTP, mengupas jaket pelindung luar, dan menekan (mengkrimping) pin konektor modular RJ45/RJ11 agar menembus dan mengunci kawat tembaga secara permanen.',
    functionSummary: 'Digunakan untuk memotong kabel UTP, mengupas isolasi luar kabel secara aman tanpa melukai kawat inti, dan menekan pin tembaga konektor RJ45 hingga mengunci kawat kabel LAN.',
    specs: [
      'Slot Krimping: 8P8C (RJ-45) & 6P4C/6P6C (RJ-11 / RJ-12)',
      'Fitur Terintegrasi: Cable Stripper (Pengupas), Cable Cutter (Pemotong), & Crimper Die',
      'Material Bodi: Baja Karbon Tinggi (Heavy Duty Carbon Steel)',
      'Handle: Karet Ergonomis bertekstur anti-slip',
      'Mekanisme: Ratchet safety release untuk daya tekan presisi seragam'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    moduleSummary: 'Pengenalan anatomi tang krimping: mata pisau cutter, pemutar stripper kabel UTP, dan slot penekan 8P8C serta prinsip strain-relief saat menjepit konektor RJ45.',
    moduleContent: `
### Anatomi dan Bagian Utama Tang Krimping
1. **Mata Pisau Pemotong (Cable Cutter)**:
   Terletak di bagian tengah untuk memotong kabel UTP secara tegak lurus (90 derajat) agar kedelapan kawat tembaga memiliki panjang yang sama rata.
2. **Mata Pisau Pengupas (Stripper)**:
   Pisau melingkar dengan pembatas jarak khusus untuk mengerat jaket luar PVC kabel UTP tanpa melukai atau memutus kawat konduktor bagian dalam.
3. **Mata Penekan Konektor (Crimper Slot 8P)**:
   Bagian mulut tang berprofil 8 gigi tembaga untuk menancapkan pin emas RJ45 ke kawat konduktor sekaligus menekan bantalan plastik penahan kabel (strain relief).
4. **Kunci Pengaman / Ratchet**:
   Memastikan tang harus ditekan hingga batas maksimal sebelum dapat terbuka kembali demi menjamin kualitas crimping yang kuat dan merata.
    `.trim(),
    steps: [
      {
        id: 'crimper-step-1',
        stepNumber: 1,
        title: 'Kupas Jaket Kabel UTP',
        description: 'Masukkan ujung kabel UTP ke lubang stripper tang krimping sekitar 2-3 cm dari ujung. Putar tang 1 hingga 2 putaran perlahan, lalu tarik jaket pembungkus kabel hingga lepas.',
        tip: 'Jangan menekan terlalu keras saat memutar tang agar kawat warna di bagian dalam tidak tergores.'
      },
      {
        id: 'crimper-step-2',
        stepNumber: 2,
        title: 'Urai dan Luruskan 8 Kawat Konduktor',
        description: 'Buka lilitan 4 pasang kawat (twist), lalu luruskan setiap helai kawat menggunakan jemari agar tidak melengkung atau kusut saat dimasukkan ke konektor.',
        tip: 'Makin lurus kawat, makin mudah disusun dan didorong masuk ke lubang RJ45.'
      },
      {
        id: 'crimper-step-3',
        stepNumber: 3,
        title: 'Potong Kawat Rata Tegak Lurus',
        description: 'Setelah warna kawat disusun sesuai standar (T568B/T568A), jepit dan potong kawat menggunakan pisau cutter tang krimping sehingga sisa panjang kawat sekitar 1,2 cm secara rata.',
        tip: 'Pastikan potongan rata sejajar 90 derajat agar semua ujung kawat menyentuh dinding depan RJ45 secara bersamaan.'
      },
      {
        id: 'crimper-step-4',
        stepNumber: 4,
        title: 'Lakukan Pengepresan (Crimping)',
        description: 'Masukkan konektor RJ45 yang sudah terpasang kabel ke slot 8P pada tang krimping. Tekan tuas pegangan tang sekuat tenaga sampai mentok dan pin tembaga tertanam rata.',
        tip: 'Periksa bagian belakang konektor; jaket pelindung kabel luar harus ikut terjepit di dalam konektor RJ45.'
      }
    ],
    practiceTasks: [
      {
        id: 'crimper-prac-1',
        order: 1,
        title: 'Latihan Mengupas Jaket Tanpa Melukai Kawat Inti',
        instruction: 'Gunakan pisau stripper tang krimping untuk mengupas jaket kabel sepanjang 2,5 cm. Periksa dengan teliti: pastikan tidak ada isolasi kawat warna yang robek atau kawat tembaga yang tampak.',
        expectedResult: 'Jaket terlepas sempurna dan seluruh 8 kawat warna dalam kondisi mulus utuh.'
      },
      {
        id: 'crimper-prac-2',
        order: 2,
        title: 'Pemotongan Presisi 90 Derajat',
        instruction: 'Gunakan pisau pemotong cutter tang krimping untuk memotong 8 helai kawat dengan panjang sisa tepat 1,2 cm.',
        expectedResult: 'Kedelapan ujung kawat membentuk garis lurus rata sempurna tanpa ada yang lebih panjang atau pendek.'
      },
      {
        id: 'crimper-prac-3',
        order: 3,
        title: 'Crimping Konektor RJ45 ke Slot 8P',
        instruction: 'Masukkan konektor RJ45 ke dalam lubang 8P tang krimping dan tekan handel tang hingga terdengar bunyi klik ratchet pengunci.',
        expectedResult: 'Kedelapan pin tembaga rata menembus kabel dan jaket luar terkunci kuat saat kabel ditarik perlahan.'
      }
    ],
    quizzes: [
      {
        id: 'crimper-quiz-1',
        question: 'Slot lubang manakah pada tang krimping yang digunakan untuk mengepres konektor kabel LAN RJ45?',
        options: ['Slot 4P (Kabel Telepon mikro)', 'Slot 6P (Kabel Telepon RJ11)', 'Slot 8P / 8P8C (Kabel Jaringan RJ45)', 'Slot BNC Coaxial'],
        correctAnswer: 2,
        explanation: 'Konektor LAN RJ45 memiliki format 8P8C (8 Posisi, 8 Kontak), sehingga wajib menggunakan slot 8P pada tang krimping.'
      },
      {
        id: 'crimper-quiz-2',
        question: 'Apa dampak buruk jika jaket pelindung luar kabel tidak ikut masuk ke dalam badan konektor saat dikrimping?',
        options: [
          'Kabel menjadi lebih cepat mengirimkan data',
          'Kawat konduktor mudah putus atau tercabut saat kabel ditarik karena tidak ada penahan tarikan (strain relief)',
          'Aliran listrik LAN tester akan meledak',
          'Tidak berdampak apapun pada keandalan kabel'
        ],
        correctAnswer: 1,
        explanation: 'Jaket luar harus dijepit oleh baji plastik konektor sebagai strain relief penahan beban mekanis agar kawat halus di dalam tidak mudah putus/longgar.'
      },
      {
        id: 'crimper-quiz-3',
        question: 'Berapa perkiraan panjang sisa kawat konduktor yang ideal sebelum dimasukkan ke dalam RJ45 setelah diratakan?',
        options: ['Sekitar 1,2 cm sampai 1,4 cm', 'Sekitar 4 cm sampai 5 cm', 'Kurang dari 0,2 cm', '10 cm'],
        correctAnswer: 0,
        explanation: 'Panjang 1,2 cm - 1,4 cm adalah ukuran standar agar ujung kawat menyentuh dinding kontak tembaga sementara jaket luar kabel tetap berada di dalam baji pengunci.'
      }
    ],
    troubleshoots: [
      {
        id: 'crimper-tb-1',
        problem: 'Pin tembaga RJ45 tidak tertanam rata setelah dikrimping',
        symptom: 'Sebagian pin masih menonjol di luar bodi konektor dan tidak rata.',
        solution: '1. Pastikan konektor RJ45 didorong sampai mentok ke ujung slot 8P tang krimping sebelum gagang ditekan.\n2. Tekan gagang tang krimping dengan kedua tangan sekuat tenaga hingga batas maksimal penekanan.\n3. Periksa apakah ada kotoran atau sisa plastik yang mengganjal di gigi penekan tang.',
        preventive: 'Gunakan tang krimping berfitur ratchet yang tidak akan terbuka sebelum tekanan mencapai titik optimal.'
      },
      {
        id: 'crimper-tb-2',
        problem: 'Kawat inti terpotong atau tembaga terkelupas saat mengupas jaket luar',
        symptom: 'Saat jaket ditarik, terlihat kawat tembaga terbuka atau salah satu kawat terputus.',
        solution: '1. Potong ulang bagian kabel yang rusak tersebut.\n2. Jangan menekan mata pisau stripper terlalu dalam; cukup putar tang secara ringan 1-2 putaran saja.\n3. Tekuk kabel sedikit untuk mematahkan jaket luar tanpa melukai kawat.',
        preventive: 'Atur kedalaman pisau stripper atau gunakan alat pengupas kabel model putar mini (yellow punch-down tool).'
      }
    ],
    challenges: [
      {
        id: 'crimper-chal-1',
        title: 'Tantangan Mandiri: Terminasi Presisi 3 Menit',
        level: 'Menengah',
        description: 'Selesaikan proses pengupasan kabel, perataan kawat, dan crimping konektor RJ45 dalam waktu maksimal 3 menit dengan kondisi jaket kabel terkunci sempurna di dalam bodi RJ45.',
        criteria: [
          'Jaket luar kabel masuk minimal 5mm ke dalam badan konektor RJ45',
          'Kedelapan kawat tembaga menyentuh dinding depan konektor',
          'Kedelapan pin tembaga tertanam rata dan kokoh saat diuji tarik'
        ]
      }
    ]
  },

  // 2. KONEKTOR RJ45
  {
    id: 'tool-konektor-rj45',
    slug: 'konektor-rj45',
    name: 'Konektor RJ45 (Registered Jack 45 - 8P8C)',
    category: 'Komponen Pasif Jaringan',
    code: 'LAB-CBL-02',
    location: 'Meja Praktikum Perkabelan - Kotak Komponen Pasif K-2',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    description: 'Konektor modular 8 pin (8P8C) standar internasional yang digunakan sebagai antarmuka fisik penghubung kabel twisted pair (UTP/STP Cat5e/Cat6) ke kartu jaringan (NIC), switch, router, maupun access point.',
    functionSummary: 'Sebagai titik kontak antarmuka fisik data yang menghubungkan 8 jalur konduktor kabel UTP ke port Ethernet perangkat jaringan.',
    specs: [
      'Standar Tipe: 8P8C (8 Positions, 8 Contacts)',
      'Kompatibilitas Kabel: UTP Cat 5e / Cat 6 (Solid & Stranded Wire)',
      'Bahan Kontak Pin: Tembaga murni berpelapis emas (Gold Plated 50 Micron)',
      'Bahan Housing: Polikarbonat transparan tahan pecah (Clear High-Impact Polycarbonate)',
      'Fitur Fisik: Pengait Pengunci (Locking Latch Clip) & Strain Relief Wedge'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    moduleSummary: 'Standar susunan warna internasional TIA/EIA-568A dan TIA/EIA-568B, fungsi masing-masing pin pada koneksi Fast Ethernet (100Mbps) dan Gigabit Ethernet (1Gbps).',
    moduleContent: `
### Standar Urutan Warna TIA/EIA-568B (Paling Umum Digunakan):
Pegang konektor RJ45 dengan **pengait pengunci menghadap ke bawah** dan **pin tembaga menghadap ke atas/ke arah Anda**. Nomor urut dihitung dari **kiri (Pin 1) ke kanan (Pin 8)**:
1. **Pin 1**: Putih - Oranye *(Transmit +)*
2. **Pin 2**: Oranye *(Transmit -)*
3. **Pin 3**: Putih - Hijau *(Receive +)*
4. **Pin 4**: Biru *(PoE / Data Gigabit)*
5. **Pin 5**: Putih - Biru *(PoE / Data Gigabit)*
6. **Pin 6**: Hijau *(Receive -)*
7. **Pin 7**: Putih - Cokelat *(PoE / Data Gigabit)*
8. **Pin 8**: Cokelat *(PoE / Data Gigabit)*

### Tipe Kabel Berdasarkan Susunan:
- **Straight-Through Cable**: Kedua ujung menggunakan standar yang sama (Ujung A: T568B, Ujung B: T568B). Digunakan untuk menghubungkan perangkat berbeda level (misal: PC ke Switch, Switch ke Router).
- **Crossover Cable**: Ujung A menggunakan T568A, Ujung B menggunakan T568B. Digunakan untuk menghubungkan perangkat setara (PC ke PC, Switch ke Switch tanpa Auto-MDIX).
    `.trim(),
    steps: [
      {
        id: 'rj-step-1',
        stepNumber: 1,
        title: 'Pahami Posisi Pin 1 RJ45',
        description: 'Pegang konektor RJ45 dengan lidah klip pengunci berada di sisi bawah (menghadap ke meja). Pin tembaga berada di sisi atas. Pin nomor 1 adalah lubang paling kiri, dan pin nomor 8 adalah lubang paling kanan.',
        tip: 'Jangan sampai terbalik memegang konektor saat memasukkan kawat warna.'
      },
      {
        id: 'rj-step-2',
        stepNumber: 2,
        title: 'Susun Kawat Berdasarkan Standar T568B',
        description: 'Urutkan kawat secara berurutan: Putih-Oranye, Oranye, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat.',
        tip: 'Perhatikan pasangan kawat hijau yang dipisahkan oleh pasangan kawat biru (Pin 3 = Putih-Hijau, Pin 6 = Hijau).'
      },
      {
        id: 'rj-step-3',
        stepNumber: 3,
        title: 'Masukkan Kawat ke Jalur RJ45',
        description: 'Dorong kedelapan kawat bersamaan ke dalam lubang konektor RJ45. Pastikan tiap kawat meluncur masuk ke masing-masing parit jalurnya sendiri tanpa bersilangan.',
        tip: 'Kawat harus didorong sampai ujungnya menyentuh dinding depan tembus pandang konektor.'
      },
      {
        id: 'rj-step-4',
        stepNumber: 4,
        title: 'Verifikasi Visual Sebelum Menjepit',
        description: 'Lihat konektor dari arah depan dan samping. Pastikan ujung tembaga dari kedelapan kawat terlihat jelas menempel di ujung depan dan jaket luar berada di dalam area jepit.',
        tip: 'Jika ada kawat yang tertukar urutannya, tarik kembali sebelum dilakukan pengepresan dengan tang krimping.'
      }
    ],
    practiceTasks: [
      {
        id: 'rj-prac-1',
        order: 1,
        title: 'Menyusun Urutan Warna T568B Tanpa Melihat Contekan',
        instruction: 'Luruskan dan susun 8 kawat kabel UTP sesuai urutan standar T568B secara mandiri dan cepat.',
        expectedResult: 'Urutan kawat dari kiri ke kanan: Putih-Oranye, Oranye, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat.'
      },
      {
        id: 'rj-prac-2',
        order: 2,
        title: 'Memasukkan Kawat ke Dalam Bodi RJ45',
        instruction: 'Dorong susunan kawat ke dalam konektor RJ45 dengan klip menghadap ke bawah hingga ujung kawat menyentuh dasar depan.',
        expectedResult: 'Semua 8 ujung kawat terlihat di bibir depan konektor transparan dan urutan warna tidak bergeser.'
      }
    ],
    quizzes: [
      {
        id: 'rj-quiz-1',
        question: 'Pada standar pengkabelan TIA/EIA-568B, warna kawat apakah yang harus berada pada Pin nomor 3 dan Pin nomor 6?',
        options: ['Putih-Oranye dan Oranye', 'Putih-Hijau dan Hijau', 'Biru dan Putih-Biru', 'Putih-Cokelat dan Cokelat'],
        correctAnswer: 1,
        explanation: 'Pada standar T568B, pasangan kawat hijau dipisahkan: Pin 3 diisi Putih-Hijau, sedangkan Pin 6 diisi Hijau.'
      },
      {
        id: 'rj-quiz-2',
        question: 'Bagaimana cara menentukan Pin 1 pada konektor RJ45 secara benar?',
        options: [
          'Klip pengait menghadap ke atas, pin tembaga di bawah, hitung dari kanan',
          'Klip pengait menghadap ke bawah, pin tembaga menghadap ke Anda, Pin 1 berada di sebelah paling kiri',
          'Nomor pin acak bebas sesuai selera teknisi',
          'Pin 1 berada di bagian kabel yang paling panjang'
        ],
        correctAnswer: 1,
        explanation: 'Aturan standar industri: klip pengunci di bawah, pin tembaga di atas, pin nomor 1 dihitung dari ujung paling kiri ke kanan (pin 8).'
      },
      {
        id: 'rj-quiz-3',
        question: 'Pin nomor berapa saja pada RJ45 yang aktif mentransmisikan data pada standar Ethernet 100 Mbps (Fast Ethernet)?',
        options: ['Pin 1, 2, 3, dan 6', 'Pin 4, 5, 7, dan 8', 'Hanya Pin 1 dan Pin 8', 'Seluruh 8 pin wajib ada sinyalnya'],
        correctAnswer: 0,
        explanation: 'Fast Ethernet (100BASE-TX) hanya menggunakan 2 pasang kawat: Pin 1 & 2 untuk Transmit (Tx), serta Pin 3 & 6 untuk Receive (Rx).'
      }
    ],
    troubleshoots: [
      {
        id: 'rj-tb-1',
        problem: 'Kawat tertukar posisi saat didorong masuk (terutama pin 3 dan 4)',
        symptom: 'Warna biru dan putih-hijau bersilangan di dalam konektor.',
        solution: '1. Tarik kabel keluar dari konektor RJ45 sebelum dikrimping.\n2. Rapatkan kembali kawat dengan jempol dan telunjuk, jepit kawat kuat-kuat agar tetap sejajar.\n3. Potong ulang sedikit ujungnya agar tetap lurus dan dorong kembali secara hati-hati.',
        preventive: 'Gunakan konektor RJ45 tipe Pass-Through (tembus ujung) jika tersedia di laboratorium.'
      },
      {
        id: 'rj-tb-2',
        problem: 'Salah satu kawat tidak sampai ke ujung depan konektor',
        symptom: 'Ada salah satu kawat yang terhenti di tengah lorong konektor.',
        solution: '1. Tarik kabel keluar.\n2. Pastikan potongan 8 kawat rata tegak lurus sempurna.\n3. Jangan biarkan ada kawat yang tertekuk di dalam.',
        preventive: 'Potong kawat dengan pisau cutter tajam dalam satu kali gerakan potong bersih.'
      }
    ],
    challenges: [
      {
        id: 'rj-chal-1',
        title: 'Tantangan Mandiri: Menghafal & Merakit Kabel Straight',
        level: 'Pemula',
        description: 'Pasang konektor RJ45 pada kedua ujung kabel LAN dengan standar T568B tanpa ada satu pun warna yang tertukar atau tidak menyentuh ujung pin.',
        criteria: [
          'Kedua ujung kabel menggunakan standar T568B yang identik',
          'Seluruh kawat menyentuh dinding depan konektor tembus pandang',
          'Klip pengunci utuh tidak patah dan berfungsi dengan baik'
        ]
      }
    ]
  },

  // 3. LAN TESTER
  {
    id: 'tool-lan-tester',
    slug: 'lan-tester',
    name: 'LAN Tester (Cable Tester RJ45 / RJ11)',
    category: 'Alat Ukur & Diagnostik Jaringan',
    code: 'LAB-CBL-03',
    location: 'Meja Praktikum Perkabelan - Rak Uji Kabel T-1',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    description: 'Instrumen uji diagnostik elektronik portabel yang digunakan untuk menguji kontinuitas konduktor kabel jaringan UTP/STP, mendeteksi kawat putus (open), hubungan pendek (short), kawat tertukar (miswired), dan polaritas terbalik.',
    functionSummary: 'Memverifikasi secara visual apakah seluruh 8 kawat tembaga kabel LAN terhubung sempurna dari ujung Master ke ujung Remote secara berurutan dari nomor 1 sampai 8.',
    specs: [
      'Port Uji: 2x RJ-45 (Network) & 2x RJ-11/RJ-12 (Telepon)',
      'Modul: Master Unit (Pemancar Pulsa) & Detachable Remote Unit (Penerima)',
      'Indikator Display: 8 LED Nomor Kawat (1 - 8) + 1 LED Grounding / Shield (G)',
      'Pilihan Mode Kecepatan: OFF - ON (Kecepatan Normal) - S (Slow Scan)',
      'Daya Operasional: Baterai Kotak 9V (Tipe 6F22)'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    moduleSummary: 'Cara membaca ritme nyala lampu LED tester pada kabel Straight-Through, kabel Crossover, serta mendeteksi gejala Open Circuit, Short Circuit, dan Miswire.',
    moduleContent: `
### Membaca Pola Lampu Indikator LAN Tester

#### 1. Kabel Straight-Through yang Normal (T568B - T568B):
- **Master Unit**: 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8
- **Remote Unit**: 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8
*(Lampu menyala berurutan satu per satu secara serempak dan berpasangan).*

#### 2. Kabel Crossover yang Normal (T568A - T568B):
- **Master Unit**: 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8
- **Remote Unit**: 3 - 6 - 1 - 4 - 5 - 2 - 7 - 8
*(Pin 1 berpasangan dengan pin 3; Pin 2 berpasangan dengan pin 6).*

#### 3. Kondisi Kerusakan Kabel:
- **Kawat Putus (Open Circuit)**: Lampu pada nomor kawat tersebut mati di Remote Unit.
- **Kawat Tertukar (Crossed/Miswired)**: Urutan lampu di Remote Unit menyala melompat tidak berurutan (misal: 1, 2, 4, 3, 5...).
- **Hubungan Pendek (Short Circuit)**: Dua lampu LED menyala redup bersamaan di Remote Unit.
    `.trim(),
    steps: [
      {
        id: 'tester-step-1',
        stepNumber: 1,
        title: 'Pasang Baterai 9V & Cek Daya',
        description: 'Buka tutup kompartemen baterai di bagian belakang Master Unit. Pasang baterai 9V dengan kutub yang tepat (+ dan -). Geser sakelar ke ON untuk memastikan lampu indikator menyala.',
        tip: 'Jika lampu LED redup atau berkedip lambat tidak wajar, ganti baterai 9V dengan yang baru.'
      },
      {
        id: 'tester-step-2',
        stepNumber: 2,
        title: 'Sambungkan Kedua Ujung Kabel',
        description: 'Colokkan ujung konektor kabel RJ45 pertama ke port RJ45 pada Master Unit hingga terdengar bunyi klik pengait. Colokkan ujung kabel kedua ke port RJ45 pada Remote Unit.',
        tip: 'Remote unit dapat dilepas (slide-out) dari master unit jika Anda menguji kabel panjang yang berada di ruangan berbeda.'
      },
      {
        id: 'tester-step-3',
        stepNumber: 3,
        title: 'Pilih Mode Kecepatan Scan',
        description: 'Geser sakelar daya ke mode "ON" untuk scan kecepatan normal, atau pilih posisi "S" (Slow Scan) untuk pergantian lampu yang lebih lambat agar mudah diamati mata.',
        tip: 'Gunakan mode "S" saat menguji kabel pertama kali agar tidak melewatkan lampu yang mati.'
      },
      {
        id: 'tester-step-4',
        stepNumber: 4,
        title: 'Analisis Urutan Nyala Lampu 1 sampai 8',
        description: 'Amati nyala lampu LED pada Master dan Remote dari nomor 1 sampai 8. Pastikan seluruh lampu menyala hijau terang berurutan dari angka 1 hingga 8.',
        tip: 'Lampu G (Ground) hanya akan menyala jika Anda menguji kabel STP (Shielded Twisted Pair).'
      }
    ],
    practiceTasks: [
      {
        id: 'tester-prac-1',
        order: 1,
        title: 'Uji Mandiri Kabel Straight-Through',
        instruction: 'Hubungkan kabel buatan Anda ke port Master dan Remote LAN Tester. Aktifkan sakelar ke posisi "ON". Amati siklus lampu 1 sampai 8.',
        expectedResult: 'Kedelapan lampu LED pada Master dan Remote menyala berurutan dari 1 sampai 8 secara sinkron tanpa ada yang mati.'
      },
      {
        id: 'tester-prac-2',
        order: 2,
        title: 'Pemeriksaan Mode Slow Scan (S)',
        instruction: 'Geser sakelar ke mode "S" (Slow). Perhatikan jeda tiap pin untuk memastikan pin 3 dan pin 6 menyala tepat pada pasangannya.',
        expectedResult: 'Lampu berganti perlahan setiap ~1 detik, memudahkan validasi urutan pin satu demi satu.'
      }
    ],
    quizzes: [
      {
        id: 'tester-quiz-1',
        question: 'Jika saat pengujian kabel Straight, lampu nomor 5 pada Master menyala namun lampu nomor 5 pada Remote mati total, kerusakan apa yang terjadi?',
        options: [
          'Kawat pada pin 5 terhubung singkat (short circuit)',
          'Kawat pada pin 5 terputus (open circuit) atau pin tembaga tidak menembus konduktor',
          'Baterai LAN tester sudah rusak',
          'Kabel tersebut otomatis berubah menjadi kabel Crossover'
        ],
        correctAnswer: 1,
        explanation: 'Jika lampu di master menyala (sinyal terkirim) tapi di remote mati (sinyal tidak sampai), berarti jalur kawat pada nomor pin tersebut putus (open circuit).'
      },
      {
        id: 'tester-quiz-2',
        question: 'Pada pengujian kabel LAN standar UTP Cat5e tanpa pelindung (Unshielded), apakah lampu indikator bertanda "G" normal jika tidak menyala?',
        options: [
          'Ya, normal, karena kabel UTP tidak memiliki kawat pelindung ground/shield (hanya aktif pada kabel STP/FTP)',
          'Tidak normal, kabel harus dipotong ulang',
          'Berarti ada kebocoran arus listrik tegangan tinggi',
          'Tester mengalami korsleting'
        ],
        correctAnswer: 0,
        explanation: 'Lampu "G" (Ground) hanya menyala pada kabel STP (Shielded Twisted Pair) yang memiliki pelindung foil/kawat ground yang terkoneksi ke RJ45 berlapis logam.'
      },
      {
        id: 'tester-quiz-3',
        question: 'Jika urutan lampu di Master berjalan 1-2-3-4-5-6-7-8, namun di Remote menyala dengan urutan 1-2-4-3-5-6-7-8, masalah apa yang terjadi?',
        options: [
          'Kabel putus total',
          'Kawat pin 3 dan pin 4 tertukar posisinya (Crossed / Miswire)',
          'Kabel berhasil menjadi standar Gigabit',
          'Konektor RJ45 dipasang terbalik 180 derajat'
        ],
        correctAnswer: 1,
        explanation: 'Urutan lampu yang melompat menandakan ada kawat yang tertukar posisinya (miswire) saat dimasukkan ke dalam konektor RJ45.'
      }
    ],
    troubleshoots: [
      {
        id: 'tester-tb-1',
        problem: 'Salah satu lampu (misal nomor 7) tidak menyala di remote unit',
        symptom: 'Lampu 1-6 dan 8 menyala, tetapi lampu 7 terlewat/padam.',
        solution: '1. Tekan kembali konektor RJ45 di ujung tersebut menggunakan tang krimping; seringkali pin tembaga belum menembus kulit kawat nomor 7 secara penuh.\n2. Jika tetap mati, potong konektor dan pasang konektor RJ45 yang baru dengan memastikan kawat nomor 7 terdorong sampai ujung.',
        preventive: 'Selalu lakukan pengecekan visual di ujung konektor sebelum menjepit dengan tang krimping.'
      },
      {
        id: 'tester-tb-2',
        problem: 'Seluruh lampu LED menyala sangat redup atau tester tidak bergerak maju',
        symptom: 'Lampu nomor 1 menyala redup terus-menerus dan tidak berganti ke nomor 2.',
        solution: 'Tegangan baterai 9V sudah di bawah 7 Volt. Segera ganti baterai kotak 9V di modul master.',
        preventive: 'Matikan sakelar ke posisi OFF setiap kali selesai praktikum agar baterai tidak terkuras.'
      }
    ],
    challenges: [
      {
        id: 'tester-chal-1',
        title: 'Tantangan Mandiri: Sertifikasi Kabel 100% Lulus Uji',
        level: 'Mahir',
        description: 'Buat 1 set kabel jaringan UTP Straight-Through lengkap (panjang minimal 1 meter) dan uji menggunakan LAN tester di depan asisten laboratorium hingga seluruh lampu 1 sampai 8 menyala hijau sempurna.',
        criteria: [
          'Seluruh lampu 1 sampai 8 menyala sinkron berpasangan Master dan Remote',
          'Tidak ada lampu yang mati (bebas open circuit)',
          'Tidak ada urutan yang melompat (bebas miswired)',
          'Kedua ujung konektor memiliki jaket kabel yang terkunci kuat di dalam bodi RJ45'
        ]
      }
    ]
  }
];
