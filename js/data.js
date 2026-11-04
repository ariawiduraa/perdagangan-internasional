// ============================================================
// DATA DUMMY - Tempat menyimpan semua data materi dan kuis
// ============================================================


// ----- DATA MATERI PEMBELAJARAN -----
const dataMateri = [
  {
    id: 1,
    judul: "Pengertian Perdagangan Internasional",
    ikon: "globe",
    warna: "#4A90D9",
    deskripsi: "Memahami konsep dasar perdagangan antar negara dan mengapa hal itu penting.",
    isi: [
      {
        tipe: "teks",
        konten: `
          <h3>Apa Itu Perdagangan Internasional?</h3>
          <p>Perdagangan internasional adalah kegiatan jual beli barang dan jasa yang dilakukan 
          antar negara. Kegiatan ini sudah berlangsung sejak zaman dahulu, mulai dari jalur 
          sutra hingga era digital saat ini.</p>
          <p>Perdagangan internasional terjadi karena setiap negara memiliki sumber daya 
          dan kemampuan produksi yang berbeda-beda. Tidak ada satu negara pun yang bisa 
          memenuhi semua kebutuhannya sendiri.</p>
        `
      },
      {
        tipe: "teks",
        konten: `
          <h3>Mengapa Perdagangan Internasional Penting?</h3>
          <p>Beberapa alasan mengapa perdagangan internasional menjadi penting:</p>
          <ul>
            <li><strong>Perbedaan sumber daya alam</strong> — Indonesia kaya akan kelapa sawit, 
            sementara Jepang unggul dalam teknologi.</li>
            <li><strong>Efisiensi produksi</strong> — Negara dapat fokus memproduksi barang 
            yang paling dikuasainya.</li>
            <li><strong>Memperluas pasar</strong> — Produsen bisa menjual ke lebih banyak konsumen.</li>
            <li><strong>Transfer teknologi</strong> — Negara berkembang bisa belajar dari 
            negara maju melalui perdagangan.</li>
          </ul>
        `
      },
      {
        tipe: "video",
        judul: "Video: Pengantar Perdagangan Internasional",
        url: "https://www.youtube.com/embed/OwGBGu4cJfg"
      },
      {
        tipe: "teks",
        konten: `
          <h3>Catatan Penting</h3>
          <div class="info-box">
            <p><strong>Contoh nyata:</strong> Indonesia mengekspor minyak kelapa sawit ke India 
            dan mengimpor mesin-mesin industri dari Jerman. Ini adalah bentuk perdagangan 
            internasional yang saling menguntungkan kedua belah pihak.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 2,
    judul: "Ekspor dan Impor",
    ikon: "truck",
    warna: "#2EAD6D",
    deskripsi: "Mengenal kegiatan ekspor dan impor sebagai komponen utama perdagangan internasional.",
    isi: [
      {
        tipe: "teks",
        konten: `
          <h3>Pengertian Ekspor</h3>
          <p>Ekspor adalah kegiatan mengirim atau menjual barang dan jasa dari dalam negeri 
          ke luar negeri. Negara yang melakukan ekspor disebut <strong>negara eksportir</strong>.</p>
          <p>Contoh ekspor Indonesia:</p>
          <ul>
            <li>Minyak kelapa sawit (CPO) ke India dan Tiongkok</li>
            <li>Batu bara ke Jepang dan Korea Selatan</li>
            <li>Karet alam ke Amerika Serikat</li>
            <li>Tekstil dan garmen ke Eropa</li>
            <li>Kopi dan kakao ke berbagai negara</li>
          </ul>
        `
      },
      {
        tipe: "teks",
        konten: `
          <h3>Pengertian Impor</h3>
          <p>Impor adalah kegiatan membeli atau mendatangkan barang dan jasa dari luar negeri 
          ke dalam negeri. Negara yang melakukan impor disebut <strong>negara importir</strong>.</p>
          <p>Contoh impor Indonesia:</p>
          <ul>
            <li>Mesin industri dari Jerman dan Jepang</li>
            <li>Gandum dari Australia dan Kanada</li>
            <li>Kedelai dari Amerika Serikat</li>
            <li>Elektronik dari Tiongkok dan Korea Selatan</li>
            <li>Bahan baku farmasi dari India</li>
          </ul>
        `
      },
      {
        tipe: "teks",
        konten: `
          <h3>Neraca Perdagangan</h3>
          <p>Neraca perdagangan adalah selisih antara nilai ekspor dan nilai impor suatu negara 
          dalam periode tertentu.</p>
          <ul>
            <li><strong>Surplus</strong> — terjadi jika nilai ekspor lebih besar dari impor.</li>
            <li><strong>Defisit</strong> — terjadi jika nilai impor lebih besar dari ekspor.</li>
            <li><strong>Seimbang</strong> — terjadi jika nilai ekspor sama dengan impor.</li>
          </ul>
          <div class="info-box">
            <p><strong>Perlu diketahui:</strong> Surplus perdagangan tidak selalu berarti baik, 
            dan defisit tidak selalu berarti buruk. Yang penting adalah komposisi dan kualitas 
            barang yang diperdagangkan.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 3,
    judul: "Kebijakan Perdagangan Internasional",
    ikon: "shield",
    warna: "#E67E22",
    deskripsi: "Memahami berbagai kebijakan yang mengatur perdagangan antar negara.",
    isi: [
      {
        tipe: "teks",
        konten: `
          <h3>Kebijakan Perdagangan Bebas (Free Trade)</h3>
          <p>Perdagangan bebas adalah kebijakan di mana pemerintah tidak membatasi 
          arus barang dan jasa antar negara. Tujuannya adalah menciptakan efisiensi 
          ekonomi global.</p>
          <p>Keuntungan perdagangan bebas:</p>
          <ul>
            <li>Konsumen mendapat lebih banyak pilihan barang</li>
            <li>Harga barang menjadi lebih kompetitif</li>
            <li>Mendorong inovasi dan efisiensi produksi</li>
            <li>Meningkatkan pertumbuhan ekonomi</li>
          </ul>
        `
      },
      {
        tipe: "teks",
        konten: `
          <h3>Kebijakan Proteksionisme</h3>
          <p>Proteksionisme adalah kebijakan pemerintah untuk melindungi industri dalam negeri 
          dari persaingan produk luar negeri. Instrumen yang digunakan antara lain:</p>
          <ul>
            <li><strong>Tarif (Bea Masuk)</strong> — Pajak yang dikenakan pada barang impor 
            sehingga harganya menjadi lebih mahal.</li>
            <li><strong>Kuota</strong> — Pembatasan jumlah barang yang boleh diimpor dalam 
            periode tertentu.</li>
            <li><strong>Subsidi</strong> — Bantuan keuangan dari pemerintah kepada produsen 
            dalam negeri agar bisa bersaing.</li>
            <li><strong>Larangan Impor (Embargo)</strong> — Pelarangan total terhadap impor 
            barang tertentu.</li>
          </ul>
        `
      },
      {
        tipe: "video",
        judul: "Video: Kebijakan Perdagangan",
        url: "https://www.youtube.com/embed/p3St51F4kE8"
      },
      {
        tipe: "teks",
        konten: `
          <h3>Organisasi Perdagangan Dunia (WTO)</h3>
          <p>WTO (<em>World Trade Organization</em>) adalah organisasi internasional yang 
          mengatur aturan perdagangan antar negara. Didirikan pada tahun 1995 dan bermarkas 
          di Jenewa, Swiss.</p>
          <div class="info-box">
            <p><strong>Fungsi utama WTO:</strong> Menjadi forum negosiasi perdagangan, 
            menyelesaikan sengketa dagang antar negara, dan memastikan aturan perdagangan 
            berjalan dengan adil dan transparan.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 4,
    judul: "Alat Pembayaran Internasional",
    ikon: "credit-card",
    warna: "#8E44AD",
    deskripsi: "Mengenal berbagai alat dan mekanisme pembayaran dalam perdagangan antar negara.",
    isi: [
      {
        tipe: "teks",
        konten: `
          <h3>Valuta Asing (Valas)</h3>
          <p>Valuta asing adalah mata uang yang digunakan dalam transaksi perdagangan 
          internasional. Nilai tukar antar mata uang disebut <strong>kurs</strong>.</p>
          <p>Jenis-jenis kurs:</p>
          <ul>
            <li><strong>Kurs beli</strong> — harga yang ditetapkan bank saat membeli valuta asing.</li>
            <li><strong>Kurs jual</strong> — harga yang ditetapkan bank saat menjual valuta asing.</li>
            <li><strong>Kurs tengah</strong> — rata-rata antara kurs beli dan kurs jual.</li>
          </ul>
        `
      },
      {
        tipe: "teks",
        konten: `
          <h3>Metode Pembayaran Internasional</h3>
          <p>Beberapa metode pembayaran yang umum digunakan:</p>
          <ul>
            <li><strong>Letter of Credit (L/C)</strong> — Surat jaminan dari bank bahwa 
            pembayaran akan dilakukan setelah syarat tertentu terpenuhi. Metode paling aman.</li>
            <li><strong>Telegraphic Transfer (T/T)</strong> — Transfer uang melalui bank 
            secara elektronik.</li>
            <li><strong>Wesel (Bill of Exchange)</strong> — Surat perintah pembayaran dari 
            penjual kepada pembeli.</li>
            <li><strong>Konsinyasi</strong> — Pembayaran dilakukan setelah barang terjual 
            di negara tujuan.</li>
          </ul>
        `
      },
      {
        tipe: "teks",
        konten: `
          <h3>Devisa Negara</h3>
          <p>Devisa adalah semua aset yang dimiliki suatu negara dalam bentuk mata uang asing. 
          Devisa digunakan untuk membiayai impor, membayar utang luar negeri, dan menjaga 
          stabilitas nilai tukar rupiah.</p>
          <div class="info-box">
            <p><strong>Sumber devisa Indonesia:</strong> Ekspor barang dan jasa, pariwisata, 
            remitansi tenaga kerja Indonesia (TKI) di luar negeri, dan investasi asing.</p>
          </div>
        `
      }
    ]
  }
];


// ----- DATA KUIS / EVALUASI -----
const dataKuis = [
  {
    id: 1,
    judul: "Konsep Dasar Perdagangan Internasional",
    ikon: "globe",
    warna: "#4A90D9",
    deskripsi: "Uji pemahamanmu tentang konsep dasar perdagangan internasional.",
    soal: [
      {
        pertanyaan: "Perdagangan internasional adalah kegiatan jual beli yang dilakukan...",
        pilihan: ["Antar provinsi", "Antar negara", "Antar kota", "Antar desa"],
        jawaban: 1,
        penjelasan: "Perdagangan internasional adalah kegiatan jual beli barang dan jasa yang dilakukan antar negara."
      },
      {
        pertanyaan: "Apa penyebab utama terjadinya perdagangan internasional?",
        pilihan: [
          "Semua negara memiliki sumber daya yang sama", 
          "Perbedaan sumber daya dan kemampuan produksi antar negara", 
          "Keinginan untuk berperang", 
          "Tidak ada penyebab khusus"
        ],
        jawaban: 1,
        penjelasan: "Perdagangan internasional terjadi karena adanya perbedaan sumber daya alam, teknologi, dan kemampuan produksi antar negara."
      },
      {
        pertanyaan: "Manfaat perdagangan internasional bagi negara berkembang adalah...",
        pilihan: [
          "Mengurangi jumlah penduduk", 
          "Transfer teknologi dari negara maju", 
          "Menutup semua industri dalam negeri", 
          "Menghentikan produksi lokal"
        ],
        jawaban: 1,
        penjelasan: "Melalui perdagangan internasional, negara berkembang dapat memperoleh transfer teknologi dan pengetahuan dari negara maju."
      },
      {
        pertanyaan: "Organisasi dunia yang mengatur perdagangan internasional adalah...",
        pilihan: ["WHO", "UNESCO", "WTO", "FIFA"],
        jawaban: 2,
        penjelasan: "WTO (World Trade Organization) adalah organisasi yang mengatur aturan perdagangan antar negara, didirikan tahun 1995."
      },
      {
        pertanyaan: "Istilah untuk jalur perdagangan kuno yang menghubungkan Asia dan Eropa adalah...",
        pilihan: ["Jalur Emas", "Jalur Sutra", "Jalur Rempah", "Jalur Laut"],
        jawaban: 1,
        penjelasan: "Jalur Sutra (Silk Road) adalah jaringan rute perdagangan kuno yang menghubungkan Tiongkok dengan Eropa."
      }
    ]
  },
  {
    id: 2,
    judul: "Ekspor dan Impor",
    ikon: "truck",
    warna: "#2EAD6D",
    deskripsi: "Seberapa paham kamu tentang kegiatan ekspor dan impor?",
    soal: [
      {
        pertanyaan: "Kegiatan menjual barang ke luar negeri disebut...",
        pilihan: ["Impor", "Ekspor", "Transit", "Dumping"],
        jawaban: 1,
        penjelasan: "Ekspor adalah kegiatan mengirim atau menjual barang dan jasa dari dalam negeri ke luar negeri."
      },
      {
        pertanyaan: "Komoditas ekspor utama Indonesia adalah...",
        pilihan: ["Gandum", "Minyak kelapa sawit (CPO)", "Kedelai", "Elektronik"],
        jawaban: 1,
        penjelasan: "Minyak kelapa sawit (CPO) merupakan salah satu komoditas ekspor unggulan Indonesia ke berbagai negara."
      },
      {
        pertanyaan: "Jika nilai ekspor lebih besar dari impor, maka neraca perdagangan mengalami...",
        pilihan: ["Defisit", "Surplus", "Stagnasi", "Inflasi"],
        jawaban: 1,
        penjelasan: "Surplus perdagangan terjadi ketika nilai ekspor melebihi nilai impor dalam suatu periode."
      },
      {
        pertanyaan: "Indonesia mengimpor gandum dari Australia. Dalam hal ini, Indonesia berperan sebagai...",
        pilihan: ["Eksportir", "Importir", "Distributor", "Produsen"],
        jawaban: 1,
        penjelasan: "Importir adalah pihak atau negara yang membeli dan mendatangkan barang dari luar negeri."
      },
      {
        pertanyaan: "Berikut yang BUKAN merupakan contoh barang impor Indonesia adalah...",
        pilihan: ["Mesin industri dari Jerman", "Gandum dari Australia", "Karet alam ke AS", "Kedelai dari Amerika"],
        jawaban: 2,
        penjelasan: "Karet alam ke AS adalah kegiatan ekspor, bukan impor. Indonesia adalah eksportir karet alam."
      }
    ]
  },
  {
    id: 3,
    judul: "Kebijakan Perdagangan",
    ikon: "shield",
    warna: "#E67E22",
    deskripsi: "Tes pengetahuanmu tentang kebijakan perdagangan internasional.",
    soal: [
      {
        pertanyaan: "Pajak yang dikenakan pada barang impor disebut...",
        pilihan: ["Subsidi", "Kuota", "Tarif atau bea masuk", "Embargo"],
        jawaban: 2,
        penjelasan: "Tarif atau bea masuk adalah pajak yang dikenakan pemerintah pada barang yang masuk dari luar negeri."
      },
      {
        pertanyaan: "Pembatasan jumlah barang impor dalam periode tertentu disebut...",
        pilihan: ["Tarif", "Kuota", "Dumping", "Subsidi"],
        jawaban: 1,
        penjelasan: "Kuota adalah kebijakan pembatasan jumlah maksimal barang yang boleh diimpor dalam periode waktu tertentu."
      },
      {
        pertanyaan: "Kebijakan untuk melindungi industri dalam negeri dari persaingan produk asing disebut...",
        pilihan: ["Liberalisasi", "Proteksionisme", "Deregulasi", "Privatisasi"],
        jawaban: 1,
        penjelasan: "Proteksionisme adalah kebijakan pemerintah untuk melindungi industri dalam negeri dari persaingan produk luar negeri."
      },
      {
        pertanyaan: "Pelarangan total terhadap impor barang tertentu disebut...",
        pilihan: ["Kuota", "Tarif", "Embargo", "Dumping"],
        jawaban: 2,
        penjelasan: "Embargo adalah pelarangan total terhadap kegiatan perdagangan (impor atau ekspor) dengan negara tertentu."
      },
      {
        pertanyaan: "Di mana markas WTO berada?",
        pilihan: ["New York, AS", "Jenewa, Swiss", "London, Inggris", "Tokyo, Jepang"],
        jawaban: 1,
        penjelasan: "WTO bermarkas di Jenewa, Swiss sejak didirikan pada tahun 1995."
      }
    ]
  },
  {
    id: 4,
    judul: "Alat Pembayaran Internasional",
    ikon: "credit-card",
    warna: "#8E44AD",
    deskripsi: "Uji pemahamanmu tentang sistem pembayaran perdagangan internasional.",
    soal: [
      {
        pertanyaan: "Mata uang asing yang digunakan dalam perdagangan internasional disebut...",
        pilihan: ["Devisa", "Valuta asing", "Obligasi", "Saham"],
        jawaban: 1,
        penjelasan: "Valuta asing (valas) adalah mata uang yang digunakan sebagai alat pembayaran dalam transaksi internasional."
      },
      {
        pertanyaan: "Nilai tukar antar mata uang disebut...",
        pilihan: ["Inflasi", "Deflasi", "Kurs", "Bunga"],
        jawaban: 2,
        penjelasan: "Kurs adalah perbandingan nilai tukar mata uang suatu negara terhadap mata uang negara lain."
      },
      {
        pertanyaan: "Metode pembayaran internasional yang dianggap paling aman adalah...",
        pilihan: ["Tunai", "Letter of Credit (L/C)", "Konsinyasi", "Wesel"],
        jawaban: 1,
        penjelasan: "Letter of Credit (L/C) dianggap paling aman karena bank menjamin pembayaran setelah syarat-syarat terpenuhi."
      },
      {
        pertanyaan: "Semua aset negara dalam bentuk mata uang asing disebut...",
        pilihan: ["Modal", "Devisa", "Investasi", "Tabungan"],
        jawaban: 1,
        penjelasan: "Devisa adalah semua aset yang dimiliki suatu negara dalam bentuk mata uang asing, digunakan untuk transaksi internasional."
      },
      {
        pertanyaan: "Berikut yang merupakan sumber devisa Indonesia, KECUALI...",
        pilihan: ["Ekspor barang", "Pariwisata", "Impor barang", "Remitansi TKI"],
        jawaban: 2,
        penjelasan: "Impor justru menggunakan devisa, bukan menghasilkan devisa. Sumber devisa antara lain ekspor, pariwisata, dan remitansi."
      }
    ]
  }
];


// ----- DATA PROFIL PENYUSUN -----
const dataProfil = {
  nama: "Tim Pengembang Finigina",
  jabatan: "Guru & Pengembang Media Pembelajaran",
  deskripsi: "Website pembelajaran interaktif ini dibuat untuk membantu siswa memahami materi perdagangan internasional dengan cara yang mudah dan menyenangkan.",
  anggota: [
    {
      nama: "Anisa Rahmawati",
      peran: "Penyusun Materi",
      inisial: "AR",
      bio: "Guru Ekonomi dengan pengalaman 5 tahun yang fokus pada metode pembelajaran aktif."
    },
    {
      nama: "Budi Santoso",
      peran: "Desainer & Developer",
      inisial: "BS",
      bio: "Pengembang website yang berpengalaman dalam membuat media pembelajaran digital."
    },
    {
      nama: "Citra Dewi",
      peran: "Penyusun Evaluasi",
      inisial: "CD",
      bio: "Ahli kurikulum yang fokus pada pengembangan instrumen penilaian berbasis kompetensi."
    }
  ],
  kontak: {
    email: "finigina.belajar@gmail.com",
    sekolah: "SMA Cerdas Gemilang",
    tahun: "2024"
  }
};
