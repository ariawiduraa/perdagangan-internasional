// ============================================================
// QUIZ.JS - Logika permainan kuis / evaluasi
// ============================================================

let kuisAktif = null;
let soalSekarang = 0;
let skor = 0;
let sudahJawab = false;


function mulaiKuis(id) {
  kuisAktif = dataKuis.find(k => k.id === id);
  if (!kuisAktif) return;

  soalSekarang = 0;
  skor = 0;
  sudahJawab = false;

  tampilkanSoal();
}


function tampilkanSoal() {
  const konten = document.getElementById('konten-utama');
  const soal = kuisAktif.soal[soalSekarang];
  const totalSoal = kuisAktif.soal.length;
  const persentase = ((soalSekarang) / totalSoal) * 100;

  let pilihanHTML = '';
  soal.pilihan.forEach((pilihan, index) => {
    const huruf = ['A', 'B', 'C', 'D'][index];
    pilihanHTML += `
      <button class="pilihan-btn" onclick="cekJawaban(${index})">
        <strong>${huruf}.</strong>&nbsp; ${pilihan}
      </button>
    `;
  });

  konten.innerHTML = `
    <button class="btn-kembali" onclick="tampilkanDaftarKuis()">
      &larr; Kembali ke daftar kuis
    </button>

    <div class="kuis-area">
      <div class="kuis-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${persentase}%"></div>
        </div>
        <span class="progress-text">Soal ${soalSekarang + 1} dari ${totalSoal}</span>
      </div>

      <p class="kuis-pertanyaan">${soal.pertanyaan}</p>

      <div class="kuis-pilihan">${pilihanHTML}</div>

      <div class="kuis-penjelasan" id="penjelasan"></div>

      <button class="btn-lanjut" id="btn-lanjut" onclick="soalBerikutnya()">
        ${soalSekarang < totalSoal - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
      </button>
    </div>
  `;

  sudahJawab = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function cekJawaban(index) {
  if (sudahJawab) return;
  sudahJawab = true;

  const soal = kuisAktif.soal[soalSekarang];
  const jawabanBenar = soal.jawaban;
  const tombolPilihan = document.querySelectorAll('.pilihan-btn');
  const penjelasan = document.getElementById('penjelasan');
  const btnLanjut = document.getElementById('btn-lanjut');

  tombolPilihan.forEach(btn => btn.disabled = true);

  if (index === jawabanBenar) {
    skor++;
    tombolPilihan[index].classList.add('benar');
    penjelasan.className = 'kuis-penjelasan tampil benar';
    penjelasan.innerHTML = `<strong>Benar.</strong> ${soal.penjelasan}`;
  } else {
    tombolPilihan[index].classList.add('salah');
    tombolPilihan[jawabanBenar].classList.add('tunjuk-benar');
    penjelasan.className = 'kuis-penjelasan tampil salah';
    penjelasan.innerHTML = `<strong>Belum tepat.</strong> ${soal.penjelasan}`;
  }

  btnLanjut.classList.add('tampil');
}


function soalBerikutnya() {
  soalSekarang++;

  if (soalSekarang < kuisAktif.soal.length) {
    tampilkanSoal();
  } else {
    tampilkanHasil();
  }
}


function tampilkanHasil() {
  const konten = document.getElementById('konten-utama');
  const totalSoal = kuisAktif.soal.length;
  const persen = Math.round((skor / totalSoal) * 100);

  let pesan;
  if (persen === 100) {
    pesan = 'Sempurna! Kamu menguasai materi ini.';
  } else if (persen >= 80) {
    pesan = 'Bagus sekali! Pemahaman kamu sudah baik.';
  } else if (persen >= 60) {
    pesan = 'Cukup baik. Coba pelajari lagi bagian yang salah.';
  } else if (persen >= 40) {
    pesan = 'Masih perlu belajar lagi. Baca kembali materinya.';
  } else {
    pesan = 'Jangan menyerah. Pelajari materinya dan coba lagi.';
  }

  konten.innerHTML = `
    <div class="kuis-area">
      <div class="kuis-hasil">
        <h2>Hasil Evaluasi</h2>
        <div class="skor-besar">${skor} / ${totalSoal}</div>
        <p>${pesan}<br>Skor: ${persen}%</p>

        <div class="btn-group">
          <button class="btn-ulang" onclick="mulaiKuis(${kuisAktif.id})">Coba Lagi</button>
          <button class="btn-kembali-kuis" onclick="tampilkanDaftarKuis()">Kuis Lain</button>
        </div>
      </div>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
