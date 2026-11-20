/**
 * ============================================================================
 * TRADE QUEST - BANK SOAL & DATA PERMAINAN PERDAGANGAN INTERNASIONAL (KELAS X)
 * ============================================================================
 * File ini berisi seluruh daftar pertanyaan, skenario simulasi, dan kunci jawaban
 * untuk media pembelajaran interaktif Trade Quest.
 *
 * Guru / Pengembang dapat dengan mudah:
 * 1. Mengubah teks pertanyaan atau pilihan ganda.
 * 2. Menambah soal baru pada array yang diinginkan.
 * 3. Menghapus atau mengatur urutan soal.
 *
 * Sistem di script.js secara otomatis menghitung skor, persentase, dan tracker
 * secara dinamis berdasarkan panjang array di file ini.
 */

const TRADE_QUEST_DATA = {
  // ==========================================================================
  // 1. MINI KUIS EKSPLORASI MODUL
  // ==========================================================================
  miniQuizData: {
  q_mod1: {
    question: 'Mengapa negara Indonesia tetap melakukan impor gandum dari luar negeri meskipun merupakan negara agraris?',
    options: [
      { text: 'A. Karena selera masyarakat Indonesia hanya menyukai produk luar negeri', correct: false },
      { text: 'B. Karena iklim tropis Indonesia tidak cocok secara komparatif untuk budidaya gandum massal', correct: true },
      { text: 'C. Karena biaya impor gandum selalu lebih mahal dari beras', correct: false },
      { text: 'D. Karena peraturan internasional mewajibkan setiap negara mengimpor gandum', correct: false }
    ],
    explanation: 'Benar! Faktor kondisi geografis dan iklim membuat Indonesia tidak efisien membudidayakan gandum dibanding negara empat musim. Indonesia fokus memproduksi kelapa sawit dan rempah (keunggulan komparatif).'
  },
  q_mod2: {
    question: 'Strategi pemerintah Indonesia yang melarang ekspor bijih nikel mentah (raw nickel) ke luar negeri dan mewajibkan smelter di dalam negeri merupakan contoh dari...',
    options: [
      { text: 'A. Praktik politik dumping', correct: false },
      { text: 'B. Kebijakan larangan ekspor untuk hilirisasi industri bernilai tambah', correct: true },
      { text: 'C. Kebijakan kuota impor bebas', correct: false },
      { text: 'D. Kebijakan subsidi ekspor barang mentah', correct: false }
    ],
    explanation: 'Tepat sekali! Larangan ekspor bijih mentah dilakukan agar nikel diolah menjadi feronikel dan baterai di dalam negeri (hilirisasi), meningkatkan devisa dan membuka lapangan kerja.'
  },
  q_mod3: {
    question: 'Siapakah pihak yang paling diuntungkan ketika pemerintah menetapkan tarif bea masuk yang tinggi atas produk pakaian jadi (tekstil) impor?',
    options: [
      { text: 'A. Produsen tekstil dan konveksi dalam negeri', correct: true },
      { text: 'B. Konsumen yang mencari pakaian impor murah', correct: false },
      { text: 'C. Eksportir asing dari negara mitra', correct: false },
      { text: 'D. Perusahaan jasa ekspedisi luar negeri', correct: false }
    ],
    explanation: 'Tepat! Tarif bea masuk membuat harga pakaian impor naik, sehingga produk konveksi produsen lokal menjadi lebih kompetitif dan diminati di pasar domestik.'
  }
},

  // ==========================================================================
  // 2. SKENARIO SIMULASI TRADE LAB (RUANG MENTERI PERDAGANGAN)
  // ==========================================================================
  tradeLabScenarios: {
  scen1: {
    id: 'scen1',
    title: 'Skenario 1: Produk Lokal Terdesak Impor Murah',
    icon: '👔',
    tag: 'Kasus Tekstil & Pakaian Jadi',
    desc: 'Pasar domestik dibanjiri pakaian jadi impor dengan harga sangat murah dari negara tetangga. Ribuan pelaku UMKM konveksi lokal di Bandung dan Solo mengalami penurunan penjualan drastis hingga terancam gulung tikar. Apa langkah Anda sebagai Menteri Perdagangan?',
    choices: [
      {
        id: 'A',
        name: 'Menaikkan Tarif Bea Masuk Pakaian Impor sebesar 25%',
        desc: 'Mengenakan pajak impor tambahan agar harga pakaian impor di pasaran menjadi lebih mahal.',
        meters: { produsen: 85, konsumen: 60, ketersediaan: 80, devisa: 88 },
        status: 'optimal',
        statusLabel: 'Kebijakan Proteksi Terukur',
        consequence: 'Produsen tekstil lokal terlindungi karena harga produk impor naik. Kas negara mendapat tambahan penerimaan bea masuk. Konsumen mengalami sedikit kenaikan harga pakaian impor, namun pasar tetap seimbang.'
      },
      {
        id: 'B',
        name: 'Menerapkan Kuota Impor Ketat Maksimal 50.000 Ton/Tahun',
        desc: 'Membatasi kuantitas fisik pakaian jadi yang boleh masuk ke dalam negeri.',
        meters: { produsen: 90, konsumen: 45, ketersediaan: 55, devisa: 65 },
        status: 'moderate',
        statusLabel: 'Protektif Ketat - Waspada Kelangkaan',
        consequence: 'UMKM lokal sangat terlindungi. Namun, pembatasan ketat memicu risiko lonjakan harga di tingkat konsumen serta potensi penyelundupan ilegal (*black market*).'
      },
      {
        id: 'C',
        name: 'Bebaskan Impor Penuh Tanpa Tarif (Free Market)',
        desc: 'Membiarkan persaingan pasar bebas sepenuhnya demi menekan harga serendah mungkin.',
        meters: { produsen: 20, konsumen: 95, ketersediaan: 95, devisa: 30 },
        status: 'risky',
        statusLabel: 'Krisis Industri Lokal',
        consequence: 'Konsumen menikmati pakaian super murah. Akan tetapi, pabrik dan UMKM garmen lokal gulung tikar massal, menimbulkan PHK puluhan ribu buruh dan neraca dagang defisit!'
      },
      {
        id: 'D',
        name: 'Beri Subsidi Mesin & Pelatihan Desain bagi UMKM Tekstil',
        desc: 'Fokus memperkuat daya saing efisiensi dan kualitas produsen dalam negeri.',
        meters: { produsen: 90, konsumen: 80, ketersediaan: 85, devisa: 75 },
        status: 'optimal',
        statusLabel: 'Strategi Daya Saing Jangka Panjang',
        consequence: 'Sangat efektif dalam jangka panjang! Efisiensi dan mutu produk lokal meningkat tanpa menekan daya beli konsumen, meskipun membutuhkan anggaran subsidi dari kas negara.'
      }
    ]
  },
  scen2: {
    id: 'scen2',
    title: 'Skenario 2: Kebutuhan Barang Pokok Meningkat',
    icon: '🌾',
    tag: 'Kasus Pasokan Beras & Pangan',
    desc: 'Fenomena El Nino ekstrem memicu gagal panen di sejumlah lumbung padi nasional. Menjelang hari raya, stok beras menipis dan harga eceran tertinggi melonjak 30%, memicu keresahan masyarakat. Kebijakan apa yang Anda ambil?',
    choices: [
      {
        id: 'A',
        name: 'Impor Beras Terukur melalui Perum BULOG untuk Operasi Pasar',
        desc: 'Mendatangkan cadangan beras pemerintah dari Vietnam/Thailand khusus untuk menstabilkan harga.',
        meters: { produsen: 70, konsumen: 92, ketersediaan: 95, devisa: 75 },
        status: 'optimal',
        statusLabel: 'Stabilisasi Pangan Berhasil',
        consequence: 'Ketersediaan pangan terjamin aman, harga beras terkendali kembali normal sehingga inflasi pangan dapat diredam. Dilakukan saat panen raya belum tiba agar tidak mematikan harga gabah petani.'
      },
      {
        id: 'B',
        name: 'Melarang Total Seluruh Impor Beras demi Proteksi Petani',
        desc: 'Menolak opsi impor apapun dan memaksa hanya mengandalkan stok lokal yang tersisa.',
        meters: { produsen: 80, konsumen: 20, ketersediaan: 25, devisa: 80 },
        status: 'risky',
        statusLabel: 'Bencana Inflasi & Kelangkaan',
        consequence: 'Petani yang panen menikmati harga tinggi, namun masyarakat luas menderita lonjakan harga ekstrem dan kelangkaan bahan pokok. Rawan memicu gejolak sosial!'
      },
      {
        id: 'C',
        name: 'Mengenakan Tarif Bea Masuk Sangat Tinggi pada Beras Impor',
        desc: 'Pajak impor 60% untuk menghalangi beras luar negeri masuk.',
        meters: { produsen: 75, konsumen: 35, ketersediaan: 40, devisa: 60 },
        status: 'risky',
        statusLabel: 'Beban Harga Tambahan',
        consequence: 'Beras impor yang masuk justru menjadi semakin mahal di toko-toko. Tujuan menstabilkan harga gagal dan konsumen semakin terbebani di masa paceklik.'
      },
      {
        id: 'D',
        name: 'Bantuan Pangan Beras & Pembebasan Bea Masuk Sementara',
        desc: 'Menghapus sementara tarif impor bahan pangan pokok selama 3 bulan krisis.',
        meters: { produsen: 65, konsumen: 90, ketersediaan: 92, devisa: 70 },
        status: 'optimal',
        statusLabel: 'Respons Darurat Efektif',
        consequence: 'Harga cepat meredam dan pasokan masuk lancar. Setelah masa darurat panen lokal pulih, bea masuk dapat diberlakukan kembali untuk melindungi petani.'
      }
    ]
  },
  scen3: {
    id: 'scen3',
    title: 'Skenario 3: Produk Ekspor Sulit Bersaing di Pasar Global',
    icon: '🪵',
    tag: 'Kasus Furnitur & Kerajinan UMKM',
    desc: 'Produk furnitur ukir kayu jati dan rotan khas Indonesia kalah bersaing di pasar Eropa dan Amerika Serikat akibat ongkos logistik kapal yang mahal dan persyaratan sertifikasi lingkungan yang rumit. Apa keputusan Anda?',
    choices: [
      {
        id: 'A',
        name: 'Beri Subsidi Pengiriman Ekspor & Pendampingan Sertifikasi Ramah Lingkungan',
        desc: 'Pemerintah membantu sebagian biaya sertifikasi SVLK dan logistik kontainer.',
        meters: { produsen: 95, konsumen: 80, ketersediaan: 80, devisa: 92 },
        status: 'optimal',
        statusLabel: 'Peningkatan Daya Saing Ekspor',
        consequence: 'Eksportir furnitur Indonesia mampu memenuhi standar sertifikasi hijau Eropa dan harga jual ekspor menjadi lebih kompetitif. Nilai ekspor dan cadangan devisa nasional melonjak!'
      },
      {
        id: 'B',
        name: 'Menutup Pasar Ekspor dan Mewajibkan Penjualan Domestik Saja',
        desc: 'Menghentikan pengiriman ke luar negeri dan menjual semua produk di dalam negeri.',
        meters: { produsen: 30, konsumen: 75, ketersediaan: 90, devisa: 20 },
        status: 'risky',
        statusLabel: 'Kehilangan Devisa Berharga',
        consequence: 'Pasar dalam negeri kelebihan pasokan (*oversupply*), harga furnitur anjlok, pengrajin merugi, dan negara kehilangan potensi devisa ratusan juta dolar.'
      },
      {
        id: 'C',
        name: 'Menerapkan Pajak Ekspor Tinggi untuk Menekan Produsen',
        desc: 'Menarik pungutan ekspor tambahan pada komoditas olahan kayu.',
        meters: { produsen: 25, konsumen: 60, ketersediaan: 80, devisa: 35 },
        status: 'risky',
        statusLabel: 'Mematikan Minat Ekspor',
        consequence: 'Pungutan tambahan membuat harga produk di luar negeri semakin tidak kompetitif. Pembeli luar negeri beralih ke produsen Vietnam dan Malaysia.'
      },
      {
        id: 'D',
        name: 'Diplomasi Perjanjian Dagang Bilateral (FTA/CEPA) Tarif Nol Persen',
        desc: 'Negosiasi penurunan tarif bea masuk khusus dengan negara-negara tujuan ekspor.',
        meters: { produsen: 90, konsumen: 85, ketersediaan: 85, devisa: 94 },
        status: 'optimal',
        statusLabel: 'Kemitraan Strategis Global',
        consequence: 'Perjanjian dagang melenyapkan hambatan tarif di negara tujuan, membuka akses pasar bebas bagi produk ekspor kreatif Indonesia.'
      }
    ]
  },
  scen4: {
    id: 'scen4',
    title: 'Skenario 4: Dugaan Praktik Dumping pada Baja Impor',
    icon: '🏗️',
    tag: 'Kasus Industri Baja & Material Nasional',
    desc: 'Komite Anti Dumping Indonesia (KADI) menemukan bukti kuat bahwa produk baja canai dingin impor dijual di Indonesia dengan harga 35% lebih rendah dibandingkan harga di negara produsen asalnya. Pabrik baja nasional (seperti PT Krakatau Steel) terancam lumpuh. Apa langkah Anda?',
    choices: [
      {
        id: 'A',
        name: 'Pemberlakuan Bea Masuk Anti-Dumping (BMAD) Berdasarkan Regulasi WTO',
        desc: 'Mengenakan pungutan khusus setara margin dumping untuk memulihkan harga wajar.',
        meters: { produsen: 92, konsumen: 75, ketersediaan: 80, devisa: 85 },
        status: 'optimal',
        statusLabel: 'Penegakan Hukum Perdagangan yang Sah',
        consequence: 'Praktik perdagangan tidak sehat (*unfair trade*) berhasil dinetralkan. Industri baja nasional kembali memiliki persaingan yang adil tanpa melanggar traktat perdagangan dunia (WTO).'
      },
      {
        id: 'B',
        name: 'Membiarkan Praktik Tersebut Berlanjut demi Bahan Bangunan Murah',
        desc: 'Mendiamkan dugaan dumping agar sektor konstruksi dapat membeli baja murah.',
        meters: { produsen: 20, konsumen: 85, ketersediaan: 85, devisa: 35 },
        status: 'risky',
        statusLabel: 'Ketergantungan Asing Fatal',
        consequence: 'Pabrik baja dalam negeri bangkrut dan tutup. Setelah produsen lokal mati, negara pengekspor dapat menaikkan harga monopoli sesuka hati, melumpuhkan kedaulatan industri dasar nasional!'
      },
      {
        id: 'C',
        name: 'Melarang Total Seluruh Barang dari Negara Pengekspor Tanpa Investigasi',
        desc: 'Tindakan boikot sepihak secara emosional.',
        meters: { produsen: 60, konsumen: 30, ketersediaan: 40, devisa: 25 },
        status: 'risky',
        statusLabel: 'Sengketa Dagang Internasional',
        consequence: 'Negara mitra melayangkan gugatan ke pengadilan WTO. Indonesia terancam sanksi retaliasi dagang di mana produk ekspor unggulan kita (seperti CPO dan karet) dibalas boikot.'
      },
      {
        id: 'D',
        name: 'BMAD Terukur Disertai Restrukturisasi Mesin Pabrik Baja Lokal',
        desc: 'Menerapkan bea anti-dumping sekaligus mendorong modernisasi pabrik dalam negeri.',
        meters: { produsen: 95, konsumen: 78, ketersediaan: 82, devisa: 88 },
        status: 'optimal',
        statusLabel: 'Kemenangan Mutlak Industri Nasional',
        consequence: 'Kombinasi terbaik! Industri baja dalam negeri terlindung dari serbuan dumping, sekaligus terpacu untuk meningkatkan efisiensi dan daya saing teknologi secara mandiri.'
      }
    ]
  }
},

  // ==========================================================================
  // 3. GAME 1: TEBAK KONSEP & KEBIJAKAN (15 Soal Kasus Nyata)
  // ==========================================================================
  game1Questions: [
  {
    tag: 'Studi Kasus 1',
    q: 'Pemerintah menetapkan batas maksimal kuantitas impor daging sapi sebanyak 100.000 ton untuk tahun 2026. Kebijakan ini disebut...',
    options: ['A. Kuota Impor', 'B. Subsidi Ekspor', 'C. Politik Dumping', 'D. Bea Keluar'],
    correct: 0,
    exp: 'Kuota impor adalah kebijakan perdagangan luar negeri yang membatasi jumlah fisik maksimum barang tertentu yang boleh diimpor selama masa tertentu.'
  },
  {
    tag: 'Studi Kasus 2',
    q: 'Negara Alpha menjual produk elektronik di pasar Indonesia dengan harga $100, padahal harga di pasar dalam negerinya adalah $160. Praktik ini dinamakan...',
    options: ['A. Tarif Bebas', 'B. Politik Dumping', 'C. Proteksionisme Murni', 'D. Devaluasi'],
    correct: 1,
    exp: 'Politik dumping adalah tindakan menjual barang di pasar luar negeri dengan harga lebih murah daripada harga di dalam negerinya untuk merebut pangsa pasar.'
  },
  {
    tag: 'Studi Kasus 3',
    q: 'Pemerintah memberikan bantuan dana sebesar 10% dari biaya produksi kepada perajin batik lokal agar batik Indonesia bisa diekspor dengan harga murah. Ini adalah...',
    options: ['A. Embargo Ekspor', 'B. Bea Cukai', 'C. Subsidi Ekspor', 'D. Kuota Tarif'],
    correct: 2,
    exp: 'Subsidi ekspor adalah bantuan finansial atau insentif pemerintah kepada produsen domestik untuk menurunkan biaya ekspor sehingga lebih kompetitif.'
  },
  {
    tag: 'Studi Kasus 4',
    q: 'Pajak sebesar 15% yang dikenakan oleh Ditjen Bea Cukai atas setiap unit ponsel pintar yang diimpor dari luar negeri dinamakan...',
    options: ['A. Tarif / Bea Masuk', 'B. Premi Dagang', 'C. Pajak Bumi & Bangunan', 'D. Larangan Impor'],
    correct: 0,
    exp: 'Tarif atau bea masuk adalah pajak yang dipungut atas barang yang melintasi daerah pabean untuk masuk ke dalam wilayah suatu negara.'
  },
  {
    tag: 'Studi Kasus 5',
    q: 'Larangan mutlak pengiriman bijih mentah bauksit dan nikel ke luar negeri untuk memacu hilirisasi di dalam negeri adalah contoh...',
    options: ['A. Larangan Ekspor', 'B. Pasar Bebas', 'C. Dumping Predator', 'D. Subsidi Konsumsi'],
    correct: 0,
    exp: 'Larangan ekspor adalah regulasi yang secara mutlak melarang penjualan komoditas tertentu ke mancanegara untuk kepentingan strategis nasional.'
  },
  {
    tag: 'Studi Kasus 6',
    q: 'Kebijakan yang membiarkan arus barang dan jasa antarnegara bergerak tanpa hambatan tarif maupun non-tarif disebut...',
    options: ['A. Proteksionisme', 'B. Perdagangan Bebas (Free Trade)', 'C. Autarki', 'D. Merkantilisme'],
    correct: 1,
    exp: 'Perdagangan bebas menghendaki penghapusan restriksi tarif dan regulasi pembatas dalam transaksi perdagangan internasional.'
  },
  {
    tag: 'Studi Kasus 7',
    q: 'Pemberlakuan bea tambahan oleh negara pengimpor atas barang yang terbukti dijual di bawah harga wajar asal disebut...',
    options: ['A. Bea Masuk Tindakan Pengamanan', 'B. Bea Masuk Imbalan', 'C. Bea Masuk Anti-Dumping (BMAD)', 'D. Diskon Tarif'],
    correct: 2,
    exp: 'BMAD (Bea Masuk Anti-Dumping) dipungut untuk memulihkan kerugian industri domestik akibat serbuan produk berharga dumping.'
  },
  {
    tag: 'Studi Kasus 8',
    q: 'Filosofi kebijakan ekonomi yang sengaja membatasi impor untuk melindungi lapangan kerja dan industri baru (*infant industry*) di dalam negeri dinamakan...',
    options: ['A. Proteksionisme', 'B. Globalisasi Neoliberal', 'C. Monopoli Asing', 'D. Laissez-faire'],
    correct: 0,
    exp: 'Proteksionisme bertujuan memayungi produsen lokal dari tekanan persaingan luar negeri melalui instrumen tarif, kuota, dan regulasi ketat.'
  },
  {
    tag: 'Studi Kasus 9',
    q: 'Pemberian penghargaan atau bonus tunai dari pemerintah kepada eksportir yang berhasil menembus pasar baru disebut...',
    options: ['A. Premi Ekspor', 'B. Kuota Ekspor', 'C. Pajak Ekspor', 'D. Devaluasi'],
    correct: 0,
    exp: 'Premi ekspor merupakan insentif khusus yang diberikan kepada produsen yang melampaui target ekspor atau berprestasi di kancah global.'
  },
  {
    tag: 'Studi Kasus 10',
    q: 'Ketika Indonesia dan Jepang menyepakati pengurangan bea masuk menjadi 0% untuk produk otomotif dan pertanian secara timbal balik, kesepakatan ini berwujud...',
    options: ['A. Perjanjian Dagang Bebas Bilateral (FTA/EPA)', 'B. Embargo Total', 'C. Kartel Perdagangan', 'D. Diskriminasi Sanksi'],
    correct: 0,
    exp: 'Free Trade Agreement (FTA) / Economic Partnership Agreement (EPA) adalah pakta bilateral/multilateral untuk menurunkan tarif dagang bersama.'
  }  ,
  {
    tag: 'Studi Kasus 11',
    q: 'Pemerintah secara sengaja menurunkan nilai kurs mata uang domestik (Rupiah) terhadap valuta asing (Dolar AS) agar harga komoditas ekspor lebih murah dan kompetitif di luar negeri. Tindakan ini disebut...',
    options: ['A. Devaluasi', 'B. Revaluasi', 'C. Depresiasi Alami', 'D. Inflasi Terkendali'],
    correct: 0,
    exp: 'Devaluasi adalah kebijakan resmi pemerintah untuk menurunkan nilai mata uang sendiri terhadap valuta asing guna mendorong ekspor dan menekan impor.'
  },
  {
    tag: 'Studi Kasus 12',
    q: 'Pemerintah memberikan penghargaan finansial atau bonus kepada eksportir yang berhasil melampaui target volume ekspor kopi tertentu dalam satu tahun anggaran. Kebijakan ini dikenal dengan...',
    options: ['A. Premi Ekspor', 'B. Tarif Spesifik', 'C. Kuota Impor', 'D. Dumping'],
    correct: 0,
    exp: 'Premi ekspor adalah pemberian hadiah atau insentif finansial oleh pemerintah kepada produsen/eksportir atas pencapaian kuantitas atau kualitas ekspor tertentu.'
  },
  {
    tag: 'Studi Kasus 13',
    q: 'Suatu negara mengenakan tarif bea masuk sebesar 5% bagi produk otomotif dari sesama anggota ASEAN, namun mengenakan tarif 25% bagi produk yang sama dari negara non-anggota. Instrumen ini dinamakan...',
    options: ['A. Tarif Preferensial / Diskriminasi Tarif', 'B. Embargo Menyeluruh', 'C. Larangan Impor Mutlak', 'D. Subsidi Produksi'],
    correct: 0,
    exp: 'Tarif preferensial atau diskriminasi harga antarnegara adalah pengenaan tingkat tarif berbeda untuk komoditas serupa berdasarkan perjanjian dagang kawasan (seperti AFTA/ATIGA).'
  },
  {
    tag: 'Studi Kasus 14',
    q: 'Catatan sistematis yang merangkum seluruh transaksi ekonomi dan keuangan antara penduduk suatu negara dengan penduduk negara lain selama kurun waktu satu tahun disebut...',
    options: ['A. Neraca Pembayaran Internasional (Balance of Payments)', 'B. Anggaran Pendapatan dan Belanja Negara (APBN)', 'C. Laporan Arus Kas Bank Sentral', 'D. Indeks Harga Konsumen (IHK)'],
    correct: 0,
    exp: 'Neraca Pembayaran (Balance of Payments) adalah ikhtisar sistematis seluruh transaksi ekonomi (barang, jasa, modal, dan transfer) antarnegara dalam kurun waktu tertentu.'
  },
  {
    tag: 'Studi Kasus 15',
    q: 'Pemerintah menetapkan aturan bahwa importir daging sapi wajib memiliki izin resmi dan sertifikasi halal serta karantina ketat sebelum mendatangkan barang. Kebijakan ini tergolong ke dalam...',
    options: ['A. Hambatan Non-Tarif (Non-Tariff Barriers)', 'B. Tarif Ad Valorem Murni', 'C. Politik Autarki Penuh', 'D. Subsidi Ekspor Terbuka'],
    correct: 0,
    exp: 'Hambatan non-tarif (NTB) meliputi regulasi teknis, lisensi impor, standar kesehatan (sanitari), dan karantina yang berfungsi mengontrol aliran barang impor tanpa menggunakan pajak bea masuk.'
  }
  ],

  // ==========================================================================
  // 4. GAME 2: JODOHKAN ISTILAH & DEFINISI (8 Pasang Kartu Istilah)
  // ==========================================================================
  tradeMatchingData: [
  { id: 'm1', term: 'Tarif / Bea Masuk', def: 'Pajak atas barang impor untuk menaikkan harga jualnya di pasar domestik.' },
  { id: 'm2', term: 'Kuota Impor', def: 'Pembatasan jumlah fisik maksimum komoditas asing yang boleh masuk dalam periode tertentu.' },
  { id: 'm3', term: 'Subsidi Ekspor', def: 'Bantuan dana pemerintah kepada produsen dalam negeri agar harga ekspornya lebih murah.' },
  { id: 'm4', term: 'Politik Dumping', def: 'Praktik menjual barang di pasar luar negeri lebih murah dibanding di pasar dalam negeri.' },
  { id: 'm5', term: 'Proteksionisme', def: 'Kebijakan pemerintah untuk melindungi industri domestik dari persaingan impor bebas.' },
  { id: 'm6', term: 'Larangan Ekspor', def: 'Kebijakan larangan mutlak mengeluarkan komoditas tertentu demi hilirisasi nasional.' }  ,
  { id: 'm7', term: 'Letter of Credit (L/C)', def: 'Jaminan pembayaran dari bank devisa kepada eksportir selama dokumen pengapalan barang sesuai persyaratan.' },
  { id: 'm8', term: 'Cadangan Devisa', def: 'Aset simpanan moneter luar negeri (valas, emas) yang dipegang bank sentral untuk transaksi internasional.' }
  ],

  // ==========================================================================
  // 5. GAME 3: BENAR ATAU SALAH (TRUE OR FALSE) CEPAT (15 Pernyataan)
  // ==========================================================================
  tfData: [
  {
    stmt: 'Ekspor menghasilkan penerimaan devisa bagi negara eksportir.',
    answer: true,
    exp: 'Benar! Pembeli asing membayar komoditas ekspor menggunakan mata uang asing/devisa yang masuk ke cadangan devisa nasional.'
  },
  {
    stmt: 'Menerapkan tarif bea masuk yang sangat tinggi selalu menguntungkan konsumen karena harga barang di pasar menjadi lebih murah.',
    answer: false,
    exp: 'Salah! Tarif bea masuk justru menaikkan harga jual barang impor di pasar sehingga konsumen harus membayar lebih mahal.'
  },
  {
    stmt: 'David Ricardo adalah tokoh pencetus Teori Keunggulan Mutlak (Absolute Advantage).',
    answer: false,
    exp: 'Salah! Teori Keunggulan Mutlak dicetuskan oleh Adam Smith, sedangkan David Ricardo mencetuskan Teori Keunggulan Komparatif.'
  },
  {
    stmt: 'Kebijakan kuota impor membatasi secara fisik kuantitas barang asing yang diizinkan masuk ke dalam negeri.',
    answer: true,
    exp: 'Benar! Kuota impor menetapkan batas maksimum tonase atau unit barang impor selama kurun waktu tertentu.'
  },
  {
    stmt: 'Politik dumping diperbolehkan secara bebas dan tidak pernah ditentang oleh organisasi perdagangan dunia (WTO).',
    answer: false,
    exp: 'Salah! Dumping dianggap praktik perdagangan tidak sehat (*unfair trade*) sehingga negara yang dirugikan berhak menerapkan Bea Masuk Anti-Dumping (BMAD).'
  },
  {
    stmt: 'Indonesia melarang ekspor bijih nikel mentah untuk mendorong hilirisasi industri di dalam negeri.',
    answer: true,
    exp: 'Benar! Larangan ekspor bijih mentah mewajibkan pengolahan melalui smelter domestik agar bernilai tambah tinggi.'
  },
  {
    stmt: 'Perdagangan internasional hanya dapat dilakukan oleh pemerintah antarnegara dan tidak boleh dilakukan oleh individu atau swasta.',
    answer: false,
    exp: 'Salah! Pelaku perdagangan internasional meliputi individu, perusahaan swasta, BUMN, maupun antar-pemerintah.'
  },
  {
    stmt: 'Letter of Credit (L/C) adalah sistem jaminan pembayaran perdagangan internasional yang diterbitkan oleh pihak bank.',
    answer: true,
    exp: 'Benar! L/C memberikan kepastian pembayaran kepada eksportir begitu dokumen pengapalan barang tervalidasi sah.'
  },
  {
    stmt: 'Proteksionisme adalah paham yang mendukung penghapusan total seluruh bea masuk dan tarif di seluruh dunia.',
    answer: false,
    exp: 'Salah! Itu adalah konsep Perdagangan Bebas (Free Trade). Proteksionisme justru membatasi impor untuk memayungi industri lokal.'
  },
  {
    stmt: 'Spesialisasi produksi berdasarkan keunggulan komparatif dapat meningkatkan efisiensi total output dunia.',
    answer: true,
    exp: 'Benar! Tiap negara memproduksi barang dengan biaya peluang (*opportunity cost*) terendah sehingga sumber daya dunia teralokasi optimal.'
  }  ,
  {
    stmt: 'Penetapan kuota impor akan selalu menurunkan harga barang di pasar dalam negeri karena pasokan barang dari luar negeri menjadi dibatasi.',
    answer: false,
    exp: 'Salah! Pembatasan kuota impor justru mengurangi pasokan barang impor di pasar dalam negeri, sehingga harga barang di pasar domestik cenderung naik, bukan turun.'
  },
  {
    stmt: 'Cadangan devisa suatu negara akan meningkat jika nilai ekspor barang dan jasanya lebih tinggi daripada nilai impornya (surplus neraca perdagangan).',
    answer: true,
    exp: 'Benar! Ketika ekspor melampaui impor, aliran masuk devisa dari pembeli asing lebih besar daripada devisa yang keluar untuk membayar impor, sehingga cadangan devisa bertambah.'
  },
  {
    stmt: 'Teori Keunggulan Komparatif yang menyatakan perdagangan tetap menguntungkan kedua negara selama terdapat rasio efisiensi yang berbeda dikemukakan oleh David Ricardo.',
    answer: true,
    exp: 'Benar! David Ricardo menyempurnakan teori Adam Smith dengan membuktikan bahwa perdagangan internasional tetap menguntungkan melalui spesialisasi pada komoditas yang memiliki keunggulan komparatif terbesar.'
  },
  {
    stmt: 'Kebijakan hilirisasi pertambangan melarang ekspor bijih mentah bertujuan untuk meningkatkan nilai tambah komoditas dan devisa dari produk olahan.',
    answer: true,
    exp: 'Benar! Hilirisasi mengolah bahan mentah menjadi barang setengah jadi atau jadi (misal bijih nikel menjadi feronikel/baterai), sehingga nilai jual melonjak tinggi dan devisa bertambah.'
  },
  {
    stmt: 'Letter of Credit (L/C) merupakan cara pembayaran internasional yang sangat berisiko bagi eksportir karena bank sama sekali tidak menjamin pembayaran.',
    answer: false,
    exp: 'Salah! Letter of Credit (L/C) justru merupakan metode pembayaran paling aman bagi eksportir karena bank devisa (issuing bank) memberikan garansi pembayaran selama syarat dokumen dipenuhi.'
  }
  ],

  // ==========================================================================
  // 6. GAME 4: KOTAK MISTERI DEVISA (8 Kotak Peti Misteri)
  // ==========================================================================
  mysteryBoxesData: [
  {
    boxNum: 1,
    title: 'Kotak 1: Peti Kayu Tropis',
    diff: 'Mudah',
    xpReward: 50,
    icon: '📦',
    question: 'Jika nilai ekspor suatu negara lebih besar daripada nilai impornya, maka neraca perdagangan negara tersebut mengalami...',
    options: ['A. Defisit Dagang', 'B. Surplus Dagang', 'C. Devaluasi Moneter', 'D. Inflasi Domestik'],
    correct: 1,
    exp: 'Ketika ekspor > impor, neraca perdagangan surplus dan menambah cadangan devisa.'
  },
  {
    boxNum: 2,
    title: 'Kotak 2: Peti Logam Kembar',
    diff: 'Mudah',
    xpReward: 50,
    icon: '🎁',
    question: 'Mata uang asing yang diakui secara luas di seluruh dunia sebagai alat pembayaran internasional yang kuat disebut...',
    options: ['A. Soft Currency', 'B. Hard Currency (Devisa Keras)', 'C. Kripto Spekulasi', 'D. Uang Giral Daerah'],
    correct: 1,
    exp: 'Contoh hard currency meliputi US Dollar, Euro, Japanese Yen, dan British Pound.'
  },
  {
    boxNum: 3,
    title: 'Kotak 3: Peti Perunggu Pabean',
    diff: 'Sedang',
    xpReward: 80,
    icon: '🧰',
    question: 'Jika pemerintah mendevaluasi mata uang Rupiah terhadap Dollar AS, dampak langsung yang diharapkan pada sektor perdagangan adalah...',
    options: ['A. Ekspor menjadi lebih murah di mata asing sehingga meningkat', 'B. Impor menjadi lebih murah dan melonjak tajam', 'C. Cadangan devisa langsung berkurang', 'D. Perdagangan internasional terhenti total'],
    correct: 0,
    exp: 'Devaluasi membuat barang domestik berharga lebih murah bagi pembeli luar negeri sehingga mendorong daya saing ekspor.'
  },
  {
    boxNum: 4,
    title: 'Kotak 4: Peti Perak Diplomasi',
    diff: 'Sedang',
    xpReward: 80,
    icon: '🪙',
    question: 'Tindakan penolakan atau larangan berdagang dengan negara tertentu karena alasan konflik politik/pelanggaran HAM internasional disebut...',
    options: ['A. Kuota Pangan', 'B. Subsidi Silang', 'C. Embargo Ekonomi', 'D. Kartel Komoditas'],
    correct: 2,
    exp: 'Embargo adalah larangan resmi perniagaan atau perdagangan dengan negara tertentu sebagai sanksi ekonomi.'
  },
  {
    boxNum: 5,
    title: 'Kotak 5: Peti Emas Samudera',
    diff: 'Sulit',
    xpReward: 120,
    icon: '👑',
    question: 'Menurut David Ricardo, dasar utama terjadinya perdagangan internasional yang saling menguntungkan adalah perbedaan...',
    options: ['A. Biaya peluang (opportunity cost) produksi antarnegara', 'B. Jumlah mata uang yang dicetak masing-masing bank sentral', 'C. Jumlah utang luar negeri', 'D. Luas wilayah daratan negara semata'],
    correct: 0,
    exp: 'Teori Keunggulan Komparatif berpijak pada efisiensi biaya peluang pengorbanan komoditas alternatif.'
  },
  {
    boxNum: 6,
    title: 'Kotak 6: Peti Kristal Nusantara',
    diff: 'Sulit',
    xpReward: 120,
    icon: '💎',
    question: 'Instrumen pembayaran internasional di mana barang dikirim terlebih dahulu oleh eksportir dan pembayaran dilunasi setelah barang tiba di importir disebut...',
    options: ['A. Cash in Advance', 'B. Open Account', 'C. Commercial Letter of Credit', 'D. Barter Konsinyasi'],
    correct: 1,
    exp: 'Open account memberikan risiko tinggi bagi eksportir karena pelunasan terjadi pasca barang diterima pembeli.'
  }  ,
  {
    boxNum: 7,
    title: 'Kotak 7: Peti Logam Emas Halmahera',
    diff: 'Sedang',
    xpReward: 90,
    icon: '🪙',
    question: 'Jika mata uang Rupiah mengalami apresiasi kuat (menguat tajam terhadap Dolar AS), maka dampak langsung yang terjadi pada arus perdagangan adalah...',
    options: [
      'A. Harga barang impor menjadi relatif lebih murah dan produk ekspor Indonesia menjadi relatif lebih mahal bagi pembeli asing',
      'B. Produk ekspor Indonesia melonjak drastis karena harganya murah di pasar dunia',
      'C. Nilai impor langsung turun drastis ke titik nol',
      'D. Cadangan devisa otomatis berkurang menjadi nol'
    ],
    correct: 0,
    exp: 'Apresiasi mata uang domestik menyebabkan harga komoditas impor menjadi lebih murah di dalam negeri, sementara harga barang ekspor kita menjadi lebih mahal bagi pasar luar negeri.'
  },
  {
    boxNum: 8,
    title: 'Kotak 8: Peti Intan Samudera Pasifik',
    diff: 'Sulit',
    xpReward: 120,
    icon: '💎',
    question: 'Organisasi perdagangan dunia (WTO) memiliki prinsip utama "Most-Favoured-Nation" (MFN) yang bermakna bahwa...',
    options: [
      'A. Setiap keistimewaan atau penurunan tarif yang diberikan pada satu negara anggota harus diberlakukan secara setara kepada seluruh negara anggota lainnya tanpa diskriminasi',
      'B. Negara maju wajib memberikan seluruh cadangan devisanya kepada negara berkembang secara gratis',
      'C. Setiap negara bebas menerapkan embargo tanpa pemberitahuan resmi',
      'D. Tarif impor untuk komoditas pertanian harus dipatok nol persen di seluruh dunia'
    ],
    correct: 0,
    exp: 'Prinsip Most-Favoured-Nation (MFN) adalah pilar WTO yang menjamin nondiskriminasi: perlakuan dagang istimewa yang diberikan kepada suatu mitra harus diberikan kepada semua anggota WTO.'
  }
  ],

  // ==========================================================================
  // 7. FINAL MISSION: EVALUASI AKHIR TERSTANDAR (20 Soal Terstandar)
  // ==========================================================================
  finalExamQuestions: [
  {
    q: 'Manakah di bawah ini yang merupakan pengertian paling tepat dari perdagangan internasional?',
    options: [
      'A. Transaksi jual beli barang dan jasa yang dilakukan antarpenduduk suatu negara dengan penduduk negara lain atas dasar kesepakatan bersama',
      'B. Kegiatan konsumsi komoditas dalam negeri oleh masyarakat pedesaan dan perkotaan',
      'C. Pembelian surat utang negara oleh Bank Indonesia untuk mengendalikan suku bunga',
      'D. Pertukaran mata uang rupiah lama dengan rupiah emisi baru di pasar valas'
    ],
    correct: 0,
    exp: 'Perdagangan internasional adalah proses pertukaran barang dan jasa yang melintasi batas-batas teritorial wilayah hukum kepabeanan antarnegara.'
  },
  {
    q: 'Tokoh ekonom klasik yang mengemukakan Teori Keunggulan Komparatif (Comparative Advantage) pada tahun 1817 adalah...',
    options: [
      'A. Adam Smith',
      'B. David Ricardo',
      'C. John Maynard Keynes',
      'D. Alfred Marshall'
    ],
    correct: 1,
    exp: 'David Ricardo mengemukakan teori keunggulan komparatif dalam bukunya On the Principles of Political Economy and Taxation.'
  },
  {
    q: 'Pajak yang dipungut atas barang impor dengan tujuan meningkatkan penerimaan kas negara serta melindungi produk domestik disebut...',
    options: [
      'A. Tarif atau Bea Masuk',
      'B. Pajak Pertambahan Nilai Domestik',
      'C. Subsidi Pembelian',
      'D. Premi Risiko Usaha'
    ],
    correct: 0,
    exp: 'Tarif/bea masuk dikenakan di pelabuhan pabean saat barang luar negeri tiba untuk menaikkan harga jualnya agar produk lokal terlindungi.'
  },
  {
    q: 'Pembatasan kuantitas fisik maksimum komoditas impor yang diperbolehkan masuk ke suatu negara dalam jangka waktu tertentu disebut...',
    options: [
      'A. Kuota Impor',
      'B. Politik Dumping',
      'C. Diskriminasi Harga',
      'D. Devaluasi'
    ],
    correct: 0,
    exp: 'Kuota impor membatasi volume fisik (tonase/unit) barang luar negeri untuk mencegah banjir pasokan di dalam negeri.'
  },
  {
    q: 'Kebijakan di mana produsen menjual produk di luar negeri dengan harga lebih murah daripada di pasar domestik dikenal sebagai...',
    options: [
      'A. Embargo',
      'B. Kuota Impor',
      'C. Politik Dumping',
      'D. Tarif Preferensial'
    ],
    correct: 2,
    exp: 'Dumping merupakan praktik diskriminasi harga internasional di mana harga ekspor sengaja dipatok lebih rendah dari harga domestik.'
  },
  {
    q: 'Bea Masuk Anti-Dumping (BMAD) diberlakukan oleh pemerintah bertujuan untuk...',
    options: [
      'A. Memberikan subsidi kepada importir luar negeri',
      'B. Menetralkan efek kerugian industri lokal akibat produk impor yang dijual di bawah harga wajar',
      'C. Menghilangkan seluruh pengawasan bea cukai di perbatasan laut',
      'D. Mendorong masyarakat membeli barang impor sebanyak-banyaknya'
    ],
    correct: 1,
    exp: 'BMAD adalah instrumen sah di bawah aturan WTO untuk mengembalikan level persaingan yang adil dari gempuran barang dumping.'
  },
  {
    q: 'Manakah berikut ini yang BUKAN merupakan sumber penerimaan devisa bagi negara Indonesia?',
    options: [
      'A. Ekspor minyak kelapa sawit (CPO) dan batu bara',
      'B. Pengeluaran devisa untuk membayar pokok dan bunga utang luar negeri',
      'C. Belanja wisatawan mancanegara yang berwisata ke destinasi Indonesia',
      'D. Remitansi uang dari Tenaga Kerja Indonesia (TKI) di luar negeri'
    ],
    correct: 1,
    exp: 'Pembayaran utang ke luar negeri adalah arus PENGELUARAN/PENGURANGAN devisa, bukan sumber penerimaan devisa.'
  },
  {
    q: 'Surat jaminan pembayaran yang dikeluarkan oleh bank pembuka (issuing bank) atas permintaan importir kepada eksportir disebut...',
    options: [
      'A. Letter of Credit (L/C)',
      'B. Bill of Lading (B/L)',
      'C. Wesel Tagih Domestik',
      'D. Cek Mundur'
    ],
    correct: 0,
    exp: 'Letter of Credit (L/C) adalah instrumen pembayaran paling aman karena pihak perbankan menjamin pelunasan jika syarat dokumen terpenuhi.'
  },
  {
    q: 'Jika nilai ekspor suatu negara lebih kecil daripada nilai impornya, kondisi neraca perdagangan negara tersebut dinamakan...',
    options: [
      'A. Surplus',
      'B. Defisit',
      'C. Seimbang Murni',
      'D. Ekuilibrium Global'
    ],
    correct: 1,
    exp: 'Defisit neraca perdagangan terjadi ketika nilai impor melampaui nilai ekspor (Impor > Ekspor).'
  },
  {
    q: 'Kebijakan pemerintah Indonesia melarang ekspor bijih nikel mentah ke luar negeri memiliki tujuan utama yaitu...',
    options: [
      'A. Mengurangi pasokan listrik di dalam negeri',
      'B. Mendorong hilirisasi industri agar Indonesia mengekspor produk jadi/setengah jadi berharga tinggi',
      'C. Memaksa negara mitra menghentikan hubungan diplomatik',
      'D. Mengosongkan cadangan tambang mineral nasional'
    ],
    correct: 1,
    exp: 'Hilirisasi nikel meningkatkan nilai tambah puluhan kali lipat, menyerap tenaga kerja lokal, dan menggenjot penerimaan pajak serta devisa.'
  },
  {
    q: 'Dampak negatif dari penerapan kebijakan proteksionisme tarif impor yang terlampau tinggi bagi konsumen adalah...',
    options: [
      'A. Konsumen harus membayar harga barang yang lebih mahal dan pilihan produk menjadi terbatas',
      'B. Konsumen memperoleh barang berkualitas tinggi secara gratis',
      'C. Pendapatan riil konsumen otomatis meningkat dua kali lipat',
      'D. Daya beli masyarakat miskin terlindungi secara mutlak'
    ],
    correct: 0,
    exp: 'Tarif tinggi mengerek harga barang impor dan produk pengganti lokal, sehingga surplus konsumen berkurang (*consumer burden*).'
  },
  {
    q: 'Bantuan finansial yang disalurkan pemerintah kepada produsen lokal agar mampu memasarkan produknya dengan harga murah di luar negeri disebut...',
    options: [
      'A. Kuota Impor',
      'B. Subsidi Ekspor',
      'C. Bea Keluar Fiskal',
      'D. Pajak Penjualan'
    ],
    correct: 1,
    exp: 'Subsidi ekspor meringankan ongkos produksi eksportir domestik sehingga mampu memenangkan persaingan di pasar internasional.'
  },
  {
    q: 'Hubungan perdagangan yang disepakati oleh dua negara secara langsung untuk memfasilitasi pertukaran barang disebut perdagangan...',
    options: [
      'A. Bilateral',
      'B. Multilateral',
      'C. Regional',
      'D. Unilateral'
    ],
    correct: 0,
    exp: 'Perdagangan bilateral melibatkan tepat dua negara mitra (misal: Indonesia dengan Jepang atau Indonesia dengan Australia).'
  },
  {
    q: 'Salah satu faktor pendorong terjadinya perdagangan internasional yang berkaitan dengan kondisi alamiah adalah...',
    options: [
      'A. Keseragaman iklim dan struktur tanah di semua benua',
      'B. Perbedaan kekayaan Sumber Daya Alam (SDA) dan letak geografis',
      'C. Kesamaan budaya dan selera masyarakat global',
      'D. Penghapusan mata uang nasional di seluruh dunia'
    ],
    correct: 1,
    exp: 'Perbedaan kekayaan alamiah (seperti rempah tropis di Indonesia vs gandum di subtropis) memicu kebutuhan saling menukar hasil bumi.'
  },
  {
    q: 'Manakah di bawah ini mata uang yang tergolong sebagai "Hard Currency" dalam cadangan devisa internasional?',
    options: [
      'A. Rupiah Indonesia dan Peso Filipina',
      'B. US Dollar (USD) dan Euro (EUR)',
      'C. Dong Vietnam dan Kip Laos',
      'D. Kyat Myanmar dan Riel Kamboja'
    ],
    correct: 1,
    exp: 'US Dollar dan Euro memiliki stabilitas tinggi dan diterima secara universal sebagai alat likuiditas pembayaran dunia.'
  }  ,
  {
    q: 'Pemerintah Indonesia melakukan devaluasi nilai tukar Rupiah terhadap Dolar AS dari Rp15.000 menjadi Rp16.500 per USD. Dampak ekonomis yang diharapkan terjadi pada kinerja perdagangan luar negeri Indonesia adalah...',
    options: [
      'A. Volume ekspor Indonesia meningkat karena harga komoditas lokal lebih murah bagi importir luar negeri',
      'B. Volume impor Indonesia melonjak pesat karena harga barang luar negeri menjadi sangat murah',
      'C. Cadangan devisa nasional terkuras habis karena importir memborong barang luar negeri',
      'D. Nilai utang luar negeri dalam mata uang Rupiah otomatis mengalami penurunan drastis'
    ],
    correct: 0,
    exp: 'Devaluasi membuat barang domestik lebih murah di mata pembeli asing sehingga volume ekspor terdorong naik, sementara barang impor menjadi lebih mahal sehingga impor ditekan.'
  },
  {
    q: 'Dalam transaksi ekspor-impor internasional, importir mengajukan penerbitan Letter of Credit (L/C) kepada bank devisa di negaranya. Pihak bank penerbit L/C tersebut bertindak sebagai...',
    options: [
      'A. Penjamin pembayaran kepada eksportir apabila seluruh dokumen pengapalan sesuai persyaratan (Issuing Bank)',
      'B. Agen pengiriman kapal kargo yang bertugas mengantar kontainer melintasi samudra',
      'C. Pihak asuransi yang menanggung kerusakan fisik komoditas selama pelayaran',
      'D. Pembeli akhir barang yang menggunakan komoditas secara langsung'
    ],
    correct: 0,
    exp: 'Issuing bank (bank penerbit L/C) bertindak sebagai penjamin pembayaran bagi eksportir, asalkan dokumen-dokumen pengapalan barang (seperti Bill of Lading, faktur, sertifikat) memenuhi ketentuan L/C.'
  },
  {
    q: 'Perhatikan data produksi per satuan tenaga kerja: Negara Alpha mampu memproduksi 10 unit gandum atau 5 unit kain. Negara Beta mampu memproduksi 4 unit gandum atau 4 unit kain. Berdasarkan Teori Keunggulan Komparatif David Ricardo...',
    options: [
      'A. Negara Alpha memiliki keunggulan komparatif pada gandum, sedangkan Negara Beta pada kain',
      'B. Negara Beta memiliki keunggulan komparatif pada gandum dan kain sekaligus',
      'C. Tidak ada keuntungan dari perdagangan karena Negara Alpha unggul mutlak di kedua barang',
      'D. Negara Alpha harus menghentikan seluruh produksi dan mengimpor semua barang dari Beta'
    ],
    correct: 0,
    exp: 'Opportunity cost 1 kain di Alpha = 2 gandum. Di Beta, 1 kain = 1 gandum. Karena opportunity cost memproduksi kain di Beta lebih murah (1 < 2), Beta memiliki keunggulan komparatif pada kain, dan Alpha pada gandum.'
  },
  {
    q: 'Pemberlakuan tarif bea masuk atas produk baja impor menyebabkan harga baja impor di pasar domestik naik. Dampak kesejahteraan ekonomi dari kebijakan ini adalah...',
    options: [
      'A. Surplus produsen baja lokal meningkat, pendapatan pemerintah dari tarif bertambah, namun surplus konsumen menurun',
      'B. Surplus konsumen baja domestik melonjak tinggi karena kualitas baja impor terjamin',
      'C. Penerimaan kas negara berkurang drastis karena tidak ada penerimaan pajak',
      'D. Produsen baja lokal mengalami kebangkrutan massal akibat persaingan harga'
    ],
    correct: 0,
    exp: 'Tarif impor melindungi produsen lokal sehingga surplus produsen naik dan pemerintah memperoleh pendapatan tarif. Namun konsumen domestik membayar harga lebih mahal (surplus konsumen turun) dan timbul deadweight loss.'
  },
  {
    q: 'Kebijakan larangan ekspor bijih nikel (raw minerals) yang diiringi kewajiban pembangunan smelter pengolahan di Indonesia berhasil mengubah struktur ekspor nasional. Bukti nyata keberhasilan hilirisasi tersebut adalah...',
    options: [
      'A. Terjadinya lompatan nilai tambah ekspor dari produk feronikel dan bahan baku baterai serta terbukanya lapangan kerja industri',
      'B. Indonesia kembali menjadi negara pengimpor nikel terbesar di kawasan Asia Tenggara',
      'C. Menurunnya penerimaan pajak dan royalti pertambangan bagi kas negara',
      'D. Seluruh pabrik pengolahan di dalam negeri menghentikan aktivitas operasionalnya'
    ],
    correct: 0,
    exp: 'Hilirisasi menaikkan nilai tambah (added value) komoditas berlipat ganda, mendiversifikasi ekspor dari barang mentah menjadi produk bernilai tinggi (seperti stainless steel dan baterai EV), serta menyerap tenaga kerja lokal.'
  }
  ]
};

// Ekspor ke window global untuk diakses oleh script.js secara instan dan aman (bebas CORS)
if (typeof window !== 'undefined') {
  window.TRADE_QUEST_DATA = TRADE_QUEST_DATA;
}

// Dukungan untuk modul Node.js bila digunakan untuk unit testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TRADE_QUEST_DATA;
}
