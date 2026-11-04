// ============================================================
// APP.JS - Logika utama website (navigasi & render halaman)
// ============================================================

let halamanAktif = 'home';


// ===== SVG ICON HELPER =====
// Kumpulan ikon SVG sederhana agar tidak pakai emoji

const ikon = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>',
  truck: '<svg viewBox="0 0 24 24"><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0H3m10 0a2 2 0 104 0m-4 0a2 2 0 114 0m6-4v4m0 0a2 2 0 104 0m-4 0a2 2 0 114 0M9 6h6l3 4h2a1 1 0 011 1v3"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  creditCard: '<svg viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  building: '<svg viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h1m4 0h1m-5 4h1m4 0h1M9 7h1m4 0h1"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>',
};

// Ambil ikon berdasarkan nama
function getIkon(nama) {
  return ikon[nama] || ikon.globe;
}


// ===== FUNGSI NAVIGASI =====

function pindahHalaman(halaman) {
  halamanAktif = halaman;

  // Update menu aktif
  document.querySelectorAll('.bottom-nav a').forEach(link => {
    link.classList.remove('active');
  });
  const linkAktif = document.querySelector(`[data-halaman="${halaman}"]`);
  if (linkAktif) linkAktif.classList.add('active');

  // Render halaman
  const konten = document.getElementById('konten-utama');
  konten.classList.remove('page-enter');

  switch (halaman) {
    case 'home':     tampilkanHome(); break;
    case 'materi':   tampilkanDaftarMateri(); break;
    case 'evaluasi': tampilkanDaftarKuis(); break;
    case 'profil':   tampilkanProfil(); break;
  }

  void konten.offsetWidth;
  konten.classList.add('page-enter');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ===== HALAMAN HOME =====

function tampilkanHome() {
  const konten = document.getElementById('konten-utama');
  konten.innerHTML = `
    <div class="hero">
      <h1>Belajar Perdagangan Internasional</h1>
      <p>Pahami konsep perdagangan antar negara melalui materi yang terstruktur dan evaluasi interaktif.</p>
      <button class="hero-btn" onclick="pindahHalaman('materi')">Mulai Belajar</button>
    </div>

    <div class="fitur-grid">
      <div class="fitur-card" onclick="pindahHalaman('materi')">
        <div class="card-icon">
          ${getIkon('book')}
        </div>
        <h3>Materi Lengkap</h3>
        <p>Pelajari konsep perdagangan internasional mulai dari dasar hingga kebijakan dan alat pembayaran.</p>
      </div>
      <div class="fitur-card" onclick="pindahHalaman('evaluasi')">
        <div class="card-icon">
          ${getIkon('play')}
        </div>
        <h3>Evaluasi Interaktif</h3>
        <p>Uji pemahamanmu melalui kuis pilihan ganda dengan penjelasan di setiap jawaban.</p>
      </div>
      <div class="fitur-card" onclick="pindahHalaman('profil')">
        <div class="card-icon">
          ${getIkon('user')}
        </div>
        <h3>Profil Penyusun</h3>
        <p>Kenali tim penyusun yang mengembangkan materi dan evaluasi pembelajaran ini.</p>
      </div>
    </div>
  `;
}


// ===== HALAMAN MATERI =====

function tampilkanDaftarMateri() {
  const konten = document.getElementById('konten-utama');

  let cardsHTML = '';
  dataMateri.forEach(materi => {
    cardsHTML += `
      <div class="materi-card" onclick="tampilkanDetailMateri(${materi.id})">
        <div class="card-dot" style="background: ${materi.warna};"></div>
        <div>
          <h3>${materi.judul}</h3>
          <p>${materi.deskripsi}</p>
        </div>
      </div>
    `;
  });

  konten.innerHTML = `
    <h2 class="section-title">Materi Pembelajaran</h2>
    <p class="section-subtitle">Pilih materi yang ingin dipelajari</p>
    <div class="materi-grid">${cardsHTML}</div>
  `;
}


function tampilkanDetailMateri(id) {
  const materi = dataMateri.find(m => m.id === id);
  if (!materi) return;

  const konten = document.getElementById('konten-utama');

  let isiHTML = '';
  materi.isi.forEach(bagian => {
    if (bagian.tipe === 'teks') {
      isiHTML += `<div class="materi-section">${bagian.konten}</div>`;
    } else if (bagian.tipe === 'video') {
      isiHTML += `
        <div class="materi-section video-container">
          <h4>${bagian.judul}</h4>
          <iframe src="${bagian.url}" allowfullscreen loading="lazy"></iframe>
        </div>
      `;
    }
  });

  konten.innerHTML = `
    <button class="btn-kembali" onclick="tampilkanDaftarMateri()">
      &larr; Kembali ke daftar materi
    </button>
    <div class="materi-detail">
      <h2>${materi.judul}</h2>
      ${isiHTML}
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ===== HALAMAN EVALUASI =====

function tampilkanDaftarKuis() {
  const konten = document.getElementById('konten-utama');

  let cardsHTML = '';
  dataKuis.forEach(kuis => {
    cardsHTML += `
      <div class="kuis-card" onclick="mulaiKuis(${kuis.id})">
        <h3>${kuis.judul}</h3>
        <p>${kuis.deskripsi}</p>
        <span class="badge-soal">${kuis.soal.length} soal</span>
      </div>
    `;
  });

  konten.innerHTML = `
    <h2 class="section-title">Evaluasi</h2>
    <p class="section-subtitle">Pilih kuis untuk menguji pemahamanmu</p>
    <div class="kuis-grid">${cardsHTML}</div>
  `;
}


// ===== HALAMAN PROFIL =====

function tampilkanProfil() {
  const konten = document.getElementById('konten-utama');

  let anggotaHTML = '';
  dataProfil.anggota.forEach(a => {
    anggotaHTML += `
      <div class="anggota-card">
        <div class="inisial">${a.inisial}</div>
        <h3>${a.nama}</h3>
        <p class="peran">${a.peran}</p>
        <p class="bio">${a.bio}</p>
      </div>
    `;
  });

  konten.innerHTML = `
    <div class="profil-header">
      <h2>${dataProfil.nama}</h2>
      <p class="jabatan">${dataProfil.jabatan}</p>
      <p class="deskripsi">${dataProfil.deskripsi}</p>
    </div>

    <h2 class="section-title">Anggota Tim</h2>
    <p class="section-subtitle">Tim yang berperan dalam pengembangan media ini</p>
    <div class="anggota-grid">${anggotaHTML}</div>

    <div class="kontak-box">
      <h3>Kontak</h3>
      <div class="kontak-item">
        ${getIkon('mail')}
        <span>${dataProfil.kontak.email}</span>
      </div>
      <div class="kontak-item">
        ${getIkon('building')}
        <span>${dataProfil.kontak.sekolah}</span>
      </div>
      <div class="kontak-item">
        ${getIkon('calendar')}
        <span>Tahun ${dataProfil.kontak.tahun}</span>
      </div>
    </div>
  `;
}


// ===== INISIALISASI =====

document.addEventListener('DOMContentLoaded', function () {
  tampilkanHome();
});
