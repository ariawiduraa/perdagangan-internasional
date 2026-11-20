/**
 * TRADE QUEST: Misi Menjelajahi Dunia Perdagangan
 * Logika Utama JavaScript Murni (Vanilla JS)
 * Terintegrasi dengan Bank Soal Eksternal (questions.js)
 * Fitur: SPA Routing, State & LocalStorage, Web Audio API,
 * 3 Modul + Mini Quiz, Trade Lab (4 Skenario Simulasi Menteri),
 * 4 Challenge Games Dinamis, Final Mission (Evaluasi Terstandar),
 * Sistem Gamifikasi Terpadu (Level, XP, 10 Badges).
 */

// ==========================================================================
// 1. DATA PERTANYAAN & SOAL (DIMUAT DARI questions.js DENGAN FALLBACK AMAN)
// ==========================================================================
const questSource = (typeof window !== 'undefined' && window.TRADE_QUEST_DATA) ? window.TRADE_QUEST_DATA : {};

const miniQuizData = questSource.miniQuizData || {};
const tradeLabScenarios = questSource.tradeLabScenarios || {};
const game1Questions = questSource.game1Questions || [];
const tradeMatchingData = questSource.tradeMatchingData || [];
const tfData = questSource.tfData || [];
const mysteryBoxesData = questSource.mysteryBoxesData || [];
const finalExamQuestions = questSource.finalExamQuestions || [];

// ==========================================================================
// 2. STATE & STORAGE MANAGEMENT
// ==========================================================================
const STORAGE_KEY = 'trade_quest_data_v1';

const defaultState = {
  xp: 0,
  level: 1,
  completedActivities: [], // Menyimpan ID aktivitas agar XP tidak diduplikasi
  unlockedBadges: [],
  modulesDone: {
    mod1: false,
    mod2: false,
    mod3: false
  },
  labDone: {
    scen1: false,
    scen2: false,
    scen3: false,
    scen4: false
  },
  gamesPlayed: {
    tebak: false,
    match: false,
    tf: false,
    mystery: false
  },
  mysteryBoxesOpened: [],
  finalExamScore: null,
  soundEnabled: true
};

let appState = { ...defaultState };

function ensureMysteryBoxesState() {
  const count = (mysteryBoxesData && mysteryBoxesData.length) ? mysteryBoxesData.length : 8;
  if (!Array.isArray(appState.mysteryBoxesOpened)) {
    appState.mysteryBoxesOpened = new Array(count).fill(false);
  } else if (appState.mysteryBoxesOpened.length < count) {
    while (appState.mysteryBoxesOpened.length < count) {
      appState.mysteryBoxesOpened.push(false);
    }
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      appState = Object.assign({}, defaultState, JSON.parse(saved));
    }
  } catch (err) {
    console.error('Gagal memuat state dari localStorage', err);
    appState = { ...defaultState };
  }
  ensureMysteryBoxesState();
  updateUI();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (err) {
    console.error('Gagal menyimpan state ke localStorage', err);
  }
}

function resetAllProgress() {
  appState = JSON.parse(JSON.stringify(defaultState));
  ensureMysteryBoxesState();
  saveState();
  updateUI();
  closeModal('resetModal');

  // Reset semua tampilan game ke posisi awal
  resetGame1();
  initTradeMatchingGame();
  resetTF();
  renderMysteryBoxesGrid();
  selectLabScenario('scen1');

  // Reset tampilan Final Mission ke pengantar
  const introSec = document.getElementById('examIntroSection');
  const activeCard = document.getElementById('examActiveCard');
  const resCard = document.getElementById('examResultsCard');
  if (introSec) introSec.style.display = 'block';
  if (activeCard) activeCard.style.display = 'none';
  if (resCard) resCard.classList.remove('show');

  showToast('Seluruh progres belajar berhasil direset!', '🔄');
  navigateTo('home');
}

// Tambah XP dengan proteksi anti-exploit
function awardXP(amount, activityId, activityName) {
  if (activityId && appState.completedActivities.includes(activityId)) {
    return false;
  }

  if (activityId) {
    appState.completedActivities.push(activityId);
  }

  appState.xp += amount;
  playSound('correct');
  showToast(`+${amount} XP: ${activityName || 'Aktivitas Selesai'}!`, '⭐');

  checkLevelUp();
  checkBadges();
  saveState();
  updateUI();
  return true;
}

// Konfigurasi Level & Pangkat
const LEVEL_THRESHOLDS = [
  { level: 1, name: 'Calon Pedagang', minXP: 0, maxXP: 250, emblem: '🌱' },
  { level: 2, name: 'Nahkoda Niaga', minXP: 251, maxXP: 600, emblem: '⚓' },
  { level: 3, name: 'Atase Perdagangan', minXP: 601, maxXP: 1050, emblem: '📜' },
  { level: 4, name: 'Diplomat Ekonomi', minXP: 1051, maxXP: 1500, emblem: '🌐' },
  { level: 5, name: 'Sang Menteri Perdagangan', minXP: 1501, maxXP: 999999, emblem: '👑' }
];

function checkLevelUp() {
  let currentLvl = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (appState.xp >= LEVEL_THRESHOLDS[i].minXP) {
      currentLvl = LEVEL_THRESHOLDS[i].level;
      break;
    }
  }

  if (currentLvl > appState.level) {
    appState.level = currentLvl;
    playSound('fanfare');
    const lvlInfo = LEVEL_THRESHOLDS.find(l => l.level === currentLvl);
    showToast(`Level Up! Selamat, kamu naik pangkat menjadi ${lvlInfo.name} ${lvlInfo.emblem}!`, '🎉');
  }
}

// Konfigurasi 10 Badge Prestasi
const BADGES_CONFIG = [
  {
    id: 'badge_bronze',
    name: 'Bronze Trader',
    desc: 'Meraih nilai 60–69 pada Final Mission.',
    icon: '🥉',
    check: () => appState.finalExamScore !== null && appState.finalExamScore >= 60 && appState.finalExamScore < 70
  },
  {
    id: 'badge_silver',
    name: 'Silver Trader',
    desc: 'Meraih nilai 70–84 pada Final Mission.',
    icon: '🥈',
    check: () => appState.finalExamScore !== null && appState.finalExamScore >= 70 && appState.finalExamScore < 85
  },
  {
    id: 'badge_gold',
    name: 'Gold Trader',
    desc: 'Meraih nilai 85–94 pada Final Mission.',
    icon: '🥇',
    check: () => appState.finalExamScore !== null && appState.finalExamScore >= 85 && appState.finalExamScore < 95
  },
  {
    id: 'badge_master',
    name: 'Master Trader',
    desc: 'Meraih nilai 95–100 pada Final Mission.',
    icon: '👑',
    check: () => appState.finalExamScore !== null && appState.finalExamScore >= 95
  },
  {
    id: 'badge_pelaut',
    name: 'Pelaut Perintis',
    desc: 'Menyelesaikan Modul 1 (Pengenalan Perdagangan Internasional).',
    icon: '🧭',
    check: () => appState.modulesDone.mod1 === true
  },
  {
    id: 'badge_diplomat',
    name: 'Diplomat Regulasi',
    desc: 'Menyelesaikan Modul 2 & 3 (Jenis Kebijakan & Dampak).',
    icon: '📜',
    check: () => appState.modulesDone.mod2 === true && appState.modulesDone.mod3 === true
  },
  {
    id: 'badge_menteri',
    name: 'Menteri Teladan',
    desc: 'Menyelesaikan seluruh 4 skenario simulasi di Trade Lab.',
    icon: '🏛️',
    check: () => appState.labDone.scen1 && appState.labDone.scen2 && appState.labDone.scen3 && appState.labDone.scen4
  },
  {
    id: 'badge_matching',
    name: 'Kolektor Istilah',
    desc: 'Menyelesaikan Game Trade Matching dengan sempurna.',
    icon: '🧩',
    check: () => appState.completedActivities.includes('game_matching_master')
  },
  {
    id: 'badge_mystery',
    name: 'Penjelajah Misteri',
    desc: 'Membuka dan menjawab seluruh Kotak Misteri Devisa.',
    icon: '🎁',
    check: () => {
      const total = mysteryBoxesData.length;
      return appState.mysteryBoxesOpened &&
             appState.mysteryBoxesOpened.length >= total &&
             appState.mysteryBoxesOpened.slice(0, total).every(Boolean);
    }
  },
  {
    id: 'badge_challenge_champ',
    name: 'Juara Tantangan',
    desc: 'Memainkan dan menyelesaikan seluruh 4 Game di Challenge Zone.',
    icon: '🏆',
    check: () => appState.gamesPlayed.tebak && appState.gamesPlayed.match && appState.gamesPlayed.tf && appState.gamesPlayed.mystery
  }
];

function checkBadges() {
  BADGES_CONFIG.forEach(badge => {
    if (!appState.unlockedBadges.includes(badge.id)) {
      if (badge.check()) {
        appState.unlockedBadges.push(badge.id);
        playSound('fanfare');
        showToast(`Badge Baru Terbuka: [${badge.name}] ${badge.icon}!`, '🎖️');
      }
    }
  });
}

function calculateOverallProgress() {
  let points = 0;
  // 3 Modul = 30 poin (10 per modul)
  if (appState.modulesDone.mod1) points += 10;
  if (appState.modulesDone.mod2) points += 10;
  if (appState.modulesDone.mod3) points += 10;

  // 4 Lab = 20 poin (5 per lab)
  if (appState.labDone.scen1) points += 5;
  if (appState.labDone.scen2) points += 5;
  if (appState.labDone.scen3) points += 5;
  if (appState.labDone.scen4) points += 5;

  // 4 Game = 20 poin (5 per game)
  if (appState.gamesPlayed.tebak) points += 5;
  if (appState.gamesPlayed.match) points += 5;
  if (appState.gamesPlayed.tf) points += 5;
  if (appState.gamesPlayed.mystery) points += 5;

  // Final Exam = 30 poin
  if (appState.finalExamScore !== null) points += 30;

  return Math.min(100, Math.round(points));
}

function updateUI() {
  // Update XP navbar badge
  const navXP = document.getElementById('navXpDisplay');
  if (navXP) navXP.innerText = `${appState.xp} XP`;

  // Update Progress Bar Global (Home & Stats)
  const pct = calculateOverallProgress();
  const homeProgBar = document.getElementById('homeProgressBar');
  const homeProgText = document.getElementById('homeProgressText');
  if (homeProgBar) homeProgBar.style.width = `${pct}%`;
  if (homeProgText) homeProgText.innerText = `${pct}% Selesai`;

  // Update Stat Boxes Home
  const statModules = document.getElementById('statModulesCount');
  if (statModules) {
    const doneCount = Object.values(appState.modulesDone).filter(Boolean).length;
    statModules.innerText = `${doneCount}/3`;
  }

  const statLab = document.getElementById('statLabCount');
  if (statLab) {
    const labCount = Object.values(appState.labDone).filter(Boolean).length;
    statLab.innerText = `${labCount}/4`;
  }

  const statBadges = document.getElementById('statBadgesCount');
  if (statBadges) {
    statBadges.innerText = `${appState.unlockedBadges.length}/10`;
  }

  // Update Module Complete Buttons
  ['mod1', 'mod2', 'mod3'].forEach((mKey) => {
    const btn = document.getElementById(`btnComplete-${mKey}`);
    const tabBadge = document.getElementById(`tabBadge-${mKey}`);
    if (appState.modulesDone[mKey]) {
      if (btn) {
        btn.classList.add('completed');
        btn.innerHTML = '<span>Modul Selesai</span> <span class="badge-done">✓</span>';
      }
      if (tabBadge) tabBadge.style.display = 'inline-block';
    } else {
      if (btn) {
        btn.classList.remove('completed');
        btn.innerHTML = '<span>Tandai Selesai</span> (+100 XP)';
      }
      if (tabBadge) tabBadge.style.display = 'none';
    }
  });

  // Update Achievement Page Elements
  const lvlInfo = LEVEL_THRESHOLDS.find(l => l.level === appState.level) || LEVEL_THRESHOLDS[0];
  const achLevelName = document.getElementById('achLevelName');
  const achLevelEmblem = document.getElementById('achLevelEmblem');
  const achLevelSub = document.getElementById('achLevelSub');
  const achLevelXpBar = document.getElementById('achLevelXpBar');
  const achLevelXpCur = document.getElementById('achLevelXpCur');
  const achLevelXpMax = document.getElementById('achLevelXpMax');

  if (achLevelName) achLevelName.innerText = `Level ${appState.level}: ${lvlInfo.name}`;
  if (achLevelEmblem) achLevelEmblem.innerText = lvlInfo.emblem;
  if (achLevelSub) achLevelSub.innerText = 'Kumpulkan XP dengan menyelesaikan modul, simulasi lab, dan game!';

  if (achLevelXpBar && achLevelXpCur && achLevelXpMax) {
    const nextLvl = LEVEL_THRESHOLDS.find(l => l.level === appState.level + 1);
    const max = nextLvl ? nextLvl.minXP : lvlInfo.maxXP;
    achLevelXpCur.innerText = `${appState.xp} XP`;
    achLevelXpMax.innerText = nextLvl ? `Target: ${max} XP` : 'Pangkat Maksimal!';
    const lvlPct = nextLvl ? Math.min(100, Math.round(((appState.xp - lvlInfo.minXP) / (max - lvlInfo.minXP)) * 100)) : 100;
    achLevelXpBar.style.width = `${lvlPct}%`;
  }

  // Render Badges in Achievement Page
  renderBadgesGrid();
}

function renderBadgesGrid() {
  const container = document.getElementById('badgesGridContainer');
  if (!container) return;

  container.innerHTML = '';
  BADGES_CONFIG.forEach(badge => {
    const isUnlocked = appState.unlockedBadges.includes(badge.id);
    const card = document.createElement('div');
    card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="badge-icon-box">${badge.icon}</div>
      <h5>${badge.name}</h5>
      <p>${badge.desc}</p>
      <span class="badge-status-pill ${isUnlocked ? 'pill-unlocked' : 'pill-locked'}">
        ${isUnlocked ? 'Terbuka' : 'Terkunci'}
      </span>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// 3. WEB AUDIO API SYNTHESIZER (Tanpa File Eksternal)
// ==========================================================================
let audioContext = null;

function initAudio() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
}

function playSound(type) {
  if (!appState.soundEnabled) return;
  try {
    initAudio();
    if (!audioContext) return;
    if (audioContext.state === 'suspended') audioContext.resume();

    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.14); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.22);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'fanfare') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const nOsc = audioContext.createOscillator();
        const nGain = audioContext.createGain();
        nOsc.connect(nGain);
        nGain.connect(audioContext.destination);
        nOsc.frequency.setValueAtTime(freq, now + i * 0.09);
        nGain.gain.setValueAtTime(0.12, now + i * 0.09);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.28);
        nOsc.start(now + i * 0.09);
        nOsc.stop(now + i * 0.09 + 0.28);
      });
    }
  } catch (e) {
    console.warn('Audio synthesis not supported or blocked:', e);
  }
}

function toggleSound() {
  appState.soundEnabled = !appState.soundEnabled;
  saveState();
  const icon = document.getElementById('soundIcon');
  if (icon) {
    icon.innerText = appState.soundEnabled ? '🔊' : '🔇';
  }
  showToast(appState.soundEnabled ? 'Suara Diaktifkan' : 'Suara Dimatikan', '🔔');
}

// ==========================================================================
// 4. SPA ROUTING & NAVIGATION
// ==========================================================================
const ALL_VIEWS = ['home', 'explore', 'tradelab', 'challenge', 'finalmission', 'achievement', 'profile'];

function navigateTo(viewId) {
  if (!ALL_VIEWS.includes(viewId)) return;
  playSound('click');

  ALL_VIEWS.forEach(id => {
    const viewEl = document.getElementById(`view-${id}`);
    const navBtn = document.getElementById(`nav-${id}`);
    const mobBtn = document.getElementById(`mob-${id}`);

    if (viewEl) viewEl.classList.remove('active-view');
    if (navBtn) navBtn.classList.remove('active');
    if (mobBtn) mobBtn.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewId}`);
  const targetNav = document.getElementById(`nav-${viewId}`);
  const targetMob = document.getElementById(`mob-${viewId}`);

  if (targetView) targetView.classList.add('active-view');
  if (targetNav) targetNav.classList.add('active');
  if (targetMob) targetMob.classList.add('active');

  // Tutup mobile drawer jika sedang terbuka
  const mobileNav = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  if (mobileNav) mobileNav.classList.remove('open');
  if (mobileBackdrop) mobileBackdrop.classList.remove('show');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateUI();
}

function toggleMobileNav() {
  playSound('click');
  const mobileNav = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  if (mobileNav) {
    const isOpen = mobileNav.classList.toggle('open');
    if (mobileBackdrop) {
      if (isOpen) mobileBackdrop.classList.add('show');
      else mobileBackdrop.classList.remove('show');
    }
  }
}

// ==========================================================================
// 5. TOAST & MODAL HELPERS
// ==========================================================================
let toastTimeout = null;

function showToast(message, icon = '✨') {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  if (!toast || !toastText) return;

  if (toastIcon) toastIcon.innerText = icon;
  toastText.innerText = message;

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function openModal(modalId) {
  playSound('click');
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('show');
}

function closeModal(modalId) {
  playSound('click');
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}

// ==========================================================================
// 6. EXPLORE VIEW (3 Modul Pembelajaran & Mini Quiz)
// ==========================================================================
function switchModuleTab(modKey) {
  playSound('click');
  ['mod1', 'mod2', 'mod3', 'video'].forEach(k => {
    const tab = document.getElementById(`tabBtn-${k}`);
    const pane = document.getElementById(`pane-${k}`);
    if (tab) tab.classList.remove('active');
    if (pane) pane.classList.remove('active');
  });

  const activeTab = document.getElementById(`tabBtn-${modKey}`);
  const activePane = document.getElementById(`pane-${modKey}`);
  if (activeTab) activeTab.classList.add('active');
  if (activePane) activePane.classList.add('active');
}

function completeModule(modKey) {
  if (appState.modulesDone[modKey]) {
    showToast('Modul ini sudah pernah kamu selesaikan!', 'ℹ️');
    return;
  }

  appState.modulesDone[modKey] = true;
  const modNames = {
    mod1: 'Modul 1: Pengenalan & Kebijakan',
    mod2: 'Modul 2: Jenis Kebijakan Perdagangan',
    mod3: 'Modul 3: Dampak Kebijakan Perdagangan'
  };

  awardXP(100, `complete_${modKey}`, modNames[modKey]);
  updateUI();
}

function answerMiniQuiz(quizKey, optIndex, btnElement) {
  const quiz = miniQuizData[quizKey];
  if (!quiz) return;

  const parent = btnElement.parentElement;
  const buttons = parent.querySelectorAll('.mini-opt-btn');
  const feedbackEl = document.getElementById(`feedback-${quizKey}`);

  // Matikan tombol agar tidak di-spam
  buttons.forEach(b => b.disabled = true);

  const isCorrect = quiz.options[optIndex].correct;

  if (isCorrect) {
    btnElement.classList.add('correct');
    playSound('correct');
    awardXP(30, `mini_quiz_${quizKey}`, 'Mini Kuis Modul');
    if (feedbackEl) {
      feedbackEl.className = 'mini-quiz-feedback show success';
      feedbackEl.innerHTML = `<strong>Jawaban Benar!</strong> ${quiz.explanation}`;
    }
  } else {
    btnElement.classList.add('wrong');
    playSound('wrong');
    if (feedbackEl) {
      feedbackEl.className = 'mini-quiz-feedback show fail';
      feedbackEl.innerHTML = `<strong>Kurang Tepat.</strong> ${quiz.explanation}`;
    }
  }
}

// ==========================================================================
// 7. TRADE LAB (Simulasi Kebijakan Menteri Perdagangan Indonesia)
// ==========================================================================
let currentLabScenario = 'scen1';
let selectedPolicyChoice = null;

function selectLabScenario(scenKey) {
  playSound('click');
  currentLabScenario = scenKey;
  selectedPolicyChoice = null;

  ['scen1', 'scen2', 'scen3', 'scen4'].forEach(k => {
    const pill = document.getElementById(`pill-${k}`);
    if (pill) pill.classList.remove('active');
  });

  const activePill = document.getElementById(`pill-${scenKey}`);
  if (activePill) activePill.classList.add('active');

  renderLabScenario();
}

function renderLabScenario() {
  const scen = tradeLabScenarios[currentLabScenario];
  if (!scen) return;

  const briefingTag = document.getElementById('labBriefingTag');
  const briefingTitle = document.getElementById('labBriefingTitle');
  const briefingDesc = document.getElementById('labBriefingDesc');
  const choiceContainer = document.getElementById('labPolicyChoices');
  const reportCard = document.getElementById('labReportCard');

  if (briefingTag) briefingTag.innerText = scen.tag;
  if (briefingTitle) briefingTitle.innerText = scen.title;
  if (briefingDesc) briefingDesc.innerText = scen.desc;

  if (reportCard) reportCard.classList.remove('active');

  // Render Pilihan Kebijakan
  if (choiceContainer) {
    choiceContainer.innerHTML = '';
    scen.choices.forEach(ch => {
      const card = document.createElement('div');
      card.className = `policy-choice-card ${selectedPolicyChoice === ch.id ? 'selected' : ''}`;
      card.onclick = () => choosePolicy(ch.id, card);
      card.innerHTML = `
        <div class="choice-radio"></div>
        <div class="choice-info">
          <h5>Opsi ${ch.id}: ${ch.name}</h5>
          <p>${ch.desc}</p>
        </div>
      `;
      choiceContainer.appendChild(card);
    });
  }
}

function choosePolicy(choiceId, targetCard) {
  playSound('click');
  selectedPolicyChoice = choiceId;
  const scen = tradeLabScenarios[currentLabScenario];
  const choice = scen.choices.find(c => c.id === choiceId);
  if (!choice) return;

  const cards = document.querySelectorAll('.policy-choice-card');
  cards.forEach(c => c.classList.remove('selected'));
  if (targetCard) {
    targetCard.classList.add('selected');
  }

  // Tampilkan hasil simulasi & meter indikator
  const reportCard = document.getElementById('labReportCard');
  if (reportCard) {
    reportCard.classList.add('active');

    const statusInd = document.getElementById('labStatusIndicator');
    if (statusInd) {
      statusInd.className = `status-indicator status-${choice.status}`;
      statusInd.innerText = choice.statusLabel;
    }

    setMeterValue('meterProdusen', 'valProdusen', choice.meters.produsen);
    setMeterValue('meterKonsumen', 'valKonsumen', choice.meters.konsumen);
    setMeterValue('meterKetersediaan', 'valKetersediaan', choice.meters.ketersediaan);
    setMeterValue('meterDevisa', 'valDevisa', choice.meters.devisa);

    const conText = document.getElementById('labConsequenceText');
    if (conText) conText.innerText = choice.consequence;

    reportCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  appState.labDone[currentLabScenario] = true;
  awardXP(80, `lab_${currentLabScenario}_${choiceId}`, `Simulasi Lab: ${scen.title}`);
  updateUI();
}

function setMeterValue(barId, valId, score) {
  const bar = document.getElementById(barId);
  const val = document.getElementById(valId);
  if (val) val.innerText = `${score}/100`;

  if (bar) {
    bar.style.width = `${score}%`;
    bar.className = 'meter-fill';
    if (score >= 75) bar.classList.add('fill-emerald');
    else if (score >= 50) bar.classList.add('fill-amber');
    else bar.classList.add('fill-rose');
  }
}

// ==========================================================================
// 8. CHALLENGE ZONE (4 Permainan Edukatif Dinamis)
// ==========================================================================
function switchChallengeGame(gameId) {
  playSound('click');
  ['tebak', 'matching', 'tf', 'mystery'].forEach(g => {
    const tab = document.getElementById(`tabGame-${g}`);
    const stage = document.getElementById(`stage-${g}`);
    if (tab) tab.classList.remove('active');
    if (stage) stage.classList.remove('active-game');
  });

  const activeTab = document.getElementById(`tabGame-${gameId}`);
  const activeStage = document.getElementById(`stage-${gameId}`);
  if (activeTab) activeTab.classList.add('active');
  if (activeStage) activeStage.classList.add('active-game');

  // Inisialisasi kartu matching jika belum pernah dimuat
  if (gameId === 'matching') {
    const termsCol = document.getElementById('matchTermsCol');
    if (!termsCol || termsCol.children.length === 0) {
      initTradeMatchingGame();
    }
  }
}

// --- GAME 1: TEBAK KONSEP & KEBIJAKAN ---
let g1Index = 0;
let g1Score = 0;

function renderGame1Question() {
  if (!game1Questions || game1Questions.length === 0) return;
  const q = game1Questions[g1Index];
  const tagEl = document.getElementById('g1Tag');
  const textEl = document.getElementById('g1QuestionText');
  const optContainer = document.getElementById('g1OptionsContainer');
  const feedbackEl = document.getElementById('g1FeedbackBox');
  const trackerEl = document.getElementById('g1Tracker');
  const nextBtn = document.getElementById('g1NextBtn');

  if (trackerEl) trackerEl.innerText = `Soal ${g1Index + 1} / ${game1Questions.length}`;
  if (tagEl) tagEl.innerText = q.tag;
  if (textEl) textEl.innerText = q.q;
  if (feedbackEl) {
    feedbackEl.className = 'g1-feedback-box';
    feedbackEl.innerHTML = '';
    feedbackEl.style.display = 'none';
  }
  if (nextBtn) nextBtn.style.display = 'none';

  if (optContainer) {
    optContainer.innerHTML = '';
    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'g1-opt-btn';
      btn.innerText = optText;
      btn.onclick = () => answerGame1(idx, btn);
      optContainer.appendChild(btn);
    });
  }
}

function answerGame1(optIndex, btnEl) {
  const q = game1Questions[g1Index];
  const buttons = document.querySelectorAll('.g1-opt-btn');
  const feedbackEl = document.getElementById('g1FeedbackBox');
  const nextBtn = document.getElementById('g1NextBtn');

  buttons.forEach(b => b.disabled = true);

  if (optIndex === q.correct) {
    btnEl.classList.add('correct');
    playSound('correct');
    g1Score++;
    const currentScore = Math.round((g1Score / game1Questions.length) * 100);
    const scoreDisplay = document.getElementById('g1ScoreDisplay');
    if (scoreDisplay) scoreDisplay.innerText = `Skor: ${currentScore}`;

    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = 'g1-feedback-box show success';
      feedbackEl.innerHTML = `<strong>Tepat Sekali!</strong> ${q.exp}`;
    }
  } else {
    btnEl.classList.add('wrong');
    playSound('wrong');
    if (buttons[q.correct]) buttons[q.correct].classList.add('correct');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = 'g1-feedback-box show fail';
      feedbackEl.innerHTML = `<strong>Jawaban Kurang Tepat.</strong> ${q.exp}`;
    }
  }

  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    nextBtn.innerText = g1Index === game1Questions.length - 1 ? 'Lihat Hasil Akhir' : 'Soal Selanjutnya →';
  }
}

function nextGame1Question() {
  playSound('click');
  g1Index++;
  if (g1Index < game1Questions.length) {
    renderGame1Question();
  } else {
    finishGame1();
  }
}

function finishGame1() {
  playSound('fanfare');
  appState.gamesPlayed.tebak = true;
  const totalQuestions = game1Questions.length;
  const percentage = Math.round((g1Score / totalQuestions) * 100);
  const totalXP = g1Score * 15;
  awardXP(totalXP, 'game_tebak_kebijakan', 'Game Tebak Kebijakan');

  const container = document.getElementById('g1GameplayView');
  const resultCard = document.getElementById('g1ResultCard');

  if (container) container.style.display = 'none';
  if (resultCard) {
    resultCard.style.display = 'block';
    const finalScoreEl = document.getElementById('g1FinalScore');
    const finalDetailEl = document.getElementById('g1FinalDetail');
    if (finalScoreEl) finalScoreEl.innerText = `${percentage} / 100`;
    if (finalDetailEl) finalDetailEl.innerText = `Kamu menjawab ${g1Score} dari ${totalQuestions} skenario kebijakan perdagangan internasional dengan benar!`;
  }
  updateUI();
}

function resetGame1() {
  playSound('click');
  g1Index = 0;
  g1Score = 0;
  const scoreDisplay = document.getElementById('g1ScoreDisplay');
  if (scoreDisplay) scoreDisplay.innerText = 'Skor: 0';
  const gameplayView = document.getElementById('g1GameplayView');
  const resultCard = document.getElementById('g1ResultCard');
  if (gameplayView) gameplayView.style.display = 'block';
  if (resultCard) resultCard.style.display = 'none';
  renderGame1Question();
}

// --- GAME 2: JODOHKAN ISTILAH & DEFINISI ---
let selectedTermId = null;
let selectedDefId = null;
let matchCount = 0;
let isCheckingMatch = false;

function initTradeMatchingGame() {
  matchCount = 0;
  selectedTermId = null;
  selectedDefId = null;
  isCheckingMatch = false;
  const totalPairs = tradeMatchingData.length;
  const counterEl = document.getElementById('matchCounter');
  if (counterEl) counterEl.innerText = `0 / ${totalPairs}`;
  const victoryNotice = document.getElementById('matchVictoryNotice');
  if (victoryNotice) victoryNotice.style.display = 'none';

  const termsCol = document.getElementById('matchTermsCol');
  const defsCol = document.getElementById('matchDefsCol');

  const shuffledTerms = [...tradeMatchingData].sort(() => Math.random() - 0.5);
  const shuffledDefs = [...tradeMatchingData].sort(() => Math.random() - 0.5);

  if (termsCol) {
    termsCol.innerHTML = '';
    shuffledTerms.forEach(item => {
      const card = document.createElement('div');
      card.id = `term-${item.id}`;
      card.className = 'matching-card';
      card.innerHTML = `<span class="match-text">${item.term}</span> <span class="match-status" style="color: var(--slate-400);">○</span>`;
      card.onclick = () => selectMatchingTerm(item.id, card);
      termsCol.appendChild(card);
    });
  }

  if (defsCol) {
    defsCol.innerHTML = '';
    shuffledDefs.forEach(item => {
      const card = document.createElement('div');
      card.id = `def-${item.id}`;
      card.className = 'matching-card';
      card.innerHTML = `<span class="match-text">${item.def}</span> <span class="match-status" style="color: var(--slate-400);">○</span>`;
      card.onclick = () => selectMatchingDef(item.id, card);
      defsCol.appendChild(card);
    });
  }
}

function selectMatchingTerm(id, cardEl) {
  if (isCheckingMatch) return;
  playSound('click');
  if (cardEl.classList.contains('matched')) return;

  document.querySelectorAll('#matchTermsCol .matching-card').forEach(c => {
    if (!c.classList.contains('matched')) c.classList.remove('selected');
  });

  selectedTermId = id;
  cardEl.classList.add('selected');
  checkMatchingPair();
}

function selectMatchingDef(id, cardEl) {
  if (isCheckingMatch) return;
  playSound('click');
  if (cardEl.classList.contains('matched')) return;

  document.querySelectorAll('#matchDefsCol .matching-card').forEach(c => {
    if (!c.classList.contains('matched')) c.classList.remove('selected');
  });

  selectedDefId = id;
  cardEl.classList.add('selected');
  checkMatchingPair();
}

function checkMatchingPair() {
  if (!selectedTermId || !selectedDefId || isCheckingMatch) return;

  const termEl = document.getElementById(`term-${selectedTermId}`);
  const defEl = document.getElementById(`def-${selectedDefId}`);
  if (!termEl || !defEl) return;

  const totalPairs = tradeMatchingData.length;

  if (selectedTermId === selectedDefId) {
    // Cocok!
    playSound('correct');
    matchCount++;
    const counterEl = document.getElementById('matchCounter');
    if (counterEl) counterEl.innerText = `${matchCount} / ${totalPairs}`;

    termEl.classList.remove('selected');
    defEl.classList.remove('selected');
    termEl.classList.add('matched');
    defEl.classList.add('matched');

    const termStatus = termEl.querySelector('.match-status');
    const defStatus = defEl.querySelector('.match-status');
    if (termStatus) {
      termStatus.style.color = '#10b981';
      termStatus.innerText = '✓';
    }
    if (defStatus) {
      defStatus.style.color = '#10b981';
      defStatus.innerText = '✓';
    }

    selectedTermId = null;
    selectedDefId = null;

    if (matchCount === totalPairs) {
      playSound('fanfare');
      appState.gamesPlayed.match = true;
      awardXP(120, 'game_matching_master', 'Game Trade Matching Selesai');
      const victoryNotice = document.getElementById('matchVictoryNotice');
      if (victoryNotice) victoryNotice.style.display = 'block';
      updateUI();
    }
  } else {
    // Salah
    isCheckingMatch = true;
    playSound('wrong');
    termEl.classList.add('mismatched');
    defEl.classList.add('mismatched');

    setTimeout(() => {
      if (!termEl.classList.contains('matched')) {
        termEl.classList.remove('selected', 'mismatched');
      }
      if (!defEl.classList.contains('matched')) {
        defEl.classList.remove('selected', 'mismatched');
      }
      selectedTermId = null;
      selectedDefId = null;
      isCheckingMatch = false;
    }, 500);
  }
}

// --- GAME 3: BENAR ATAU SALAH (TRUE OR FALSE) CEPAT ---
let tfIndex = 0;
let tfScore = 0;

function renderTFStatement() {
  if (!tfData || tfData.length === 0) return;
  const item = tfData[tfIndex];
  const trackerEl = document.getElementById('tfTracker');
  const stmtEl = document.getElementById('tfStatementText');
  const feedbackEl = document.getElementById('tfFeedbackBox');
  const nextBtn = document.getElementById('tfNextBtn');
  const btnRow = document.getElementById('tfButtonRow');

  if (trackerEl) trackerEl.innerText = `Pernyataan ${tfIndex + 1} / ${tfData.length}`;
  if (stmtEl) stmtEl.innerText = `\"${item.stmt}\"`;
  if (feedbackEl) {
    feedbackEl.className = 'tf-feedback';
    feedbackEl.innerHTML = '';
    feedbackEl.style.display = 'none';
  }
  if (nextBtn) nextBtn.style.display = 'none';

  if (btnRow) {
    btnRow.querySelectorAll('button').forEach(b => b.disabled = false);
  }
}

function answerTF(userChoice) {
  const item = tfData[tfIndex];
  const isCorrect = userChoice === item.answer;
  const feedbackEl = document.getElementById('tfFeedbackBox');
  const nextBtn = document.getElementById('tfNextBtn');
  const btnRow = document.getElementById('tfButtonRow');

  if (btnRow) {
    btnRow.querySelectorAll('button').forEach(b => b.disabled = true);
  }

  if (isCorrect) {
    playSound('correct');
    tfScore++;
    const currentScore = Math.round((tfScore / tfData.length) * 100);
    const scoreDisplay = document.getElementById('tfScoreDisplay');
    if (scoreDisplay) scoreDisplay.innerText = `Skor: ${currentScore}`;

    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = 'tf-feedback show success';
      feedbackEl.innerHTML = `<strong>Tepat!</strong> ${item.exp}`;
    }
  } else {
    playSound('wrong');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = 'tf-feedback show fail';
      feedbackEl.innerHTML = `<strong>Kurang Tepat.</strong> ${item.exp}`;
    }
  }

  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    nextBtn.innerText = tfIndex === tfData.length - 1 ? 'Selesai & Lihat Skor' : 'Lanjut →';
  }
}

function nextTF() {
  playSound('click');
  tfIndex++;
  if (tfIndex < tfData.length) {
    renderTFStatement();
  } else {
    finishTF();
  }
}

function finishTF() {
  playSound('fanfare');
  appState.gamesPlayed.tf = true;
  const totalStatements = tfData.length;
  const percentage = Math.round((tfScore / totalStatements) * 100);
  const totalXP = tfScore * 12;
  awardXP(totalXP, 'game_tf_complete', 'Game True or False');

  const playView = document.getElementById('tfPlayView');
  const resCard = document.getElementById('tfResultCard');
  if (playView) playView.style.display = 'none';
  if (resCard) {
    resCard.style.display = 'block';
    const scoreEl = document.getElementById('tfFinalScore');
    const detailEl = document.getElementById('tfFinalDetail');
    if (scoreEl) scoreEl.innerText = `${percentage} / 100`;
    if (detailEl) detailEl.innerText = `Kamu berhasil menjawab ${tfScore} dari ${totalStatements} pernyataan dengan tepat!`;
  }
  updateUI();
}

function resetTF() {
  playSound('click');
  tfIndex = 0;
  tfScore = 0;
  const scoreDisplay = document.getElementById('tfScoreDisplay');
  if (scoreDisplay) scoreDisplay.innerText = 'Skor: 0';
  const playView = document.getElementById('tfPlayView');
  const resCard = document.getElementById('tfResultCard');
  if (playView) playView.style.display = 'block';
  if (resCard) resCard.style.display = 'none';
  renderTFStatement();
}

// --- GAME 4: KOTAK MISTERI DEVISA ---
let activeMysteryBox = null;

function renderMysteryBoxesGrid() {
  const grid = document.getElementById('mysteryBoxesGrid');
  if (!grid || !mysteryBoxesData) return;

  grid.innerHTML = '';
  mysteryBoxesData.forEach((box, idx) => {
    const isOpened = !!appState.mysteryBoxesOpened[idx];
    const item = document.createElement('div');
    item.className = `mystery-box-item ${isOpened ? 'opened' : ''}`;
    item.onclick = () => openMysteryModal(idx);

    const diffClass = box.diff === 'Mudah' ? 'diff-easy' : box.diff === 'Sedang' ? 'diff-med' : 'diff-hard';

    item.innerHTML = `
      <div class="box-icon-wrap">${isOpened ? '🔓' : box.icon}</div>
      <h5>${box.title}</h5>
      <span class="diff-badge ${diffClass}">${box.diff} (+${box.xpReward} XP)</span>
      <p style="font-size: 0.78rem; margin-top: 8px; color: var(--slate-600);">${isOpened ? 'Sudah Terbuka ✓' : 'Klik untuk Membuka'}</p>
    `;
    grid.appendChild(item);
  });
}

function openMysteryModal(boxIndex) {
  playSound('click');
  const box = mysteryBoxesData[boxIndex];
  if (!box) return;
  activeMysteryBox = boxIndex;

  const modal = document.getElementById('mysteryModalBackdrop');
  const titleEl = document.getElementById('mysteryModalTitle');
  const diffEl = document.getElementById('mysteryModalDiff');
  const qEl = document.getElementById('mysteryModalQ');
  const optEl = document.getElementById('mysteryModalOptions');
  const fbEl = document.getElementById('mysteryModalFeedback');

  if (titleEl) titleEl.innerText = box.title;
  if (diffEl) diffEl.innerText = `Tingkat: ${box.diff} • Hadiah: ${box.xpReward} XP`;
  if (qEl) qEl.innerText = box.question;
  if (fbEl) {
    fbEl.style.display = 'none';
    fbEl.innerHTML = '';
  }

  if (optEl) {
    optEl.innerHTML = '';
    box.options.forEach((optText, i) => {
      const btn = document.createElement('button');
      btn.className = 'g1-opt-btn';
      btn.style.width = '100%';
      btn.style.marginBottom = '8px';
      btn.innerText = optText;
      btn.onclick = () => solveMysteryBox(i, btn);
      optEl.appendChild(btn);
    });
  }

  if (modal) modal.classList.add('show');
}

function solveMysteryBox(optIdx, btnEl) {
  const box = mysteryBoxesData[activeMysteryBox];
  if (!box) return;

  const buttons = document.querySelectorAll('#mysteryModalOptions button');
  const fbEl = document.getElementById('mysteryModalFeedback');

  buttons.forEach(b => b.disabled = true);

  if (optIdx === box.correct) {
    playSound('correct');
    btnEl.classList.add('correct');
    appState.mysteryBoxesOpened[activeMysteryBox] = true;
    appState.gamesPlayed.mystery = true;
    awardXP(box.xpReward, `mystery_box_${activeMysteryBox}`, `Mystery ${box.title}`);

    if (fbEl) {
      fbEl.style.display = 'block';
      fbEl.className = 'mystery-feedback success';
      fbEl.innerHTML = `<strong>Peti Berhasil Dibuka!</strong> ${box.exp}`;
    }
  } else {
    playSound('wrong');
    btnEl.classList.add('wrong');
    if (buttons[box.correct]) buttons[box.correct].classList.add('correct');
    if (fbEl) {
      fbEl.style.display = 'block';
      fbEl.className = 'mystery-feedback fail';
      fbEl.innerHTML = `<strong>Kunci Gagal.</strong> ${box.exp}`;
    }
  }

  renderMysteryBoxesGrid();
  updateUI();
}

function closeMysteryModal() {
  playSound('click');
  const modal = document.getElementById('mysteryModalBackdrop');
  if (modal) modal.classList.remove('show');
}

function resetMysteryBoxes() {
  playSound('click');
  const total = mysteryBoxesData.length;
  appState.mysteryBoxesOpened = new Array(total).fill(false);
  saveState();
  renderMysteryBoxesGrid();
  showToast('Semua kotak misteri berhasil diatur ulang!', '🔄');
}

// ==========================================================================
// 9. FINAL MISSION (Evaluasi Akhir Terstandar SMA Kelas X)
// ==========================================================================
let currentExamQIdx = 0;
let examAnswers = {};

function startFinalExam() {
  playSound('click');
  examAnswers = {};
  currentExamQIdx = 0;

  const intro = document.getElementById('examIntroSection');
  const results = document.getElementById('examResultsCard');
  const active = document.getElementById('examActiveCard');

  if (intro) intro.style.display = 'none';
  if (results) results.classList.remove('show');
  if (active) active.style.display = 'block';

  renderExamQuestionPalette();
  renderExamCurrentQuestion();
}

function renderExamQuestionPalette() {
  const container = document.getElementById('examQuestionPalette');
  if (!container) return;

  container.innerHTML = '';
  finalExamQuestions.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.className = `q-palette-btn ${currentExamQIdx === idx ? 'current' : ''} ${examAnswers[idx] !== undefined ? 'answered' : ''}`;
    btn.innerText = idx + 1;
    btn.onclick = () => jumpToExamQuestion(idx);
    container.appendChild(btn);
  });
}

function jumpToExamQuestion(idx) {
  playSound('click');
  currentExamQIdx = idx;
  renderExamQuestionPalette();
  renderExamCurrentQuestion();
}

function renderExamCurrentQuestion() {
  const totalQ = finalExamQuestions.length;
  const q = finalExamQuestions[currentExamQIdx];
  const qTextEl = document.getElementById('examQuestionText');
  const optListEl = document.getElementById('examOptionsList');
  const counterEl = document.getElementById('examCounterBadge');
  const barEl = document.getElementById('examProgressBarFill');
  const prevBtn = document.getElementById('examPrevBtn');
  const nextBtn = document.getElementById('examNextBtn');
  const submitBtn = document.getElementById('examSubmitBtn');

  if (counterEl) counterEl.innerText = `Soal ${currentExamQIdx + 1} dari ${totalQ}`;
  if (barEl) barEl.style.width = `${((currentExamQIdx + 1) / totalQ) * 100}%`;
  if (qTextEl) qTextEl.innerText = q.q;

  // Prev & Next Buttons state
  if (prevBtn) prevBtn.style.visibility = currentExamQIdx === 0 ? 'hidden' : 'visible';
  if (nextBtn) nextBtn.style.display = currentExamQIdx === totalQ - 1 ? 'none' : 'inline-flex';
  if (submitBtn) submitBtn.style.display = currentExamQIdx === totalQ - 1 ? 'inline-flex' : 'none';

  if (optListEl) {
    optListEl.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, optIdx) => {
      const isSelected = examAnswers[currentExamQIdx] === optIdx;
      const card = document.createElement('div');
      card.className = `exam-option-card ${isSelected ? 'selected' : ''}`;
      card.onclick = () => selectExamOption(optIdx);

      card.innerHTML = `
        <div class="opt-letter-circle">${letters[optIdx]}</div>
        <div class="opt-text">${optText}</div>
      `;
      optListEl.appendChild(card);
    });
  }
}

function selectExamOption(optIdx) {
  playSound('click');
  examAnswers[currentExamQIdx] = optIdx;
  renderExamQuestionPalette();
  renderExamCurrentQuestion();
}

function examPrevQuestion() {
  if (currentExamQIdx > 0) {
    playSound('click');
    currentExamQIdx--;
    renderExamQuestionPalette();
    renderExamCurrentQuestion();
  }
}

function examNextQuestion() {
  if (currentExamQIdx < finalExamQuestions.length - 1) {
    playSound('click');
    currentExamQIdx++;
    renderExamQuestionPalette();
    renderExamCurrentQuestion();
  }
}

function submitFinalExam() {
  playSound('click');
  const totalQ = finalExamQuestions.length;
  const answeredCount = Object.keys(examAnswers).length;
  if (answeredCount < totalQ) {
    if (!confirm(`Kamu baru menjawab ${answeredCount} dari ${totalQ} soal. Yakin ingin mengumpulkan ujian sekarang?`)) {
      return;
    }
  }

  // Hitung Nilai: (Benar / totalQ) * 100
  let correctCount = 0;
  finalExamQuestions.forEach((q, idx) => {
    if (examAnswers[idx] === q.correct) {
      correctCount++;
    }
  });

  const finalScore = Math.round((correctCount / totalQ) * 100);
  appState.finalExamScore = finalScore;

  // Berikan XP sesuai perolehan nilai
  awardXP(finalScore * 2, 'final_exam_eval', 'Final Mission Evaluasi Akhir');

  // Cek Badge & simpan
  checkBadges();
  saveState();
  updateUI();

  // Tampilkan Hasil Ujian
  displayExamResults(correctCount, finalScore);
}

function displayExamResults(correctCount, score) {
  playSound('fanfare');
  const activeCard = document.getElementById('examActiveCard');
  const resCard = document.getElementById('examResultsCard');
  if (activeCard) activeCard.style.display = 'none';
  if (!resCard) return;

  resCard.classList.add('show');
  const scoreNumEl = document.getElementById('examScoreNumber');
  if (scoreNumEl) scoreNumEl.innerText = score;

  // Predikat & Badge Pill
  const pillEl = document.getElementById('examBadgeEarnedPill');
  const titleEl = document.getElementById('examResultTitle');
  const descEl = document.getElementById('examResultDesc');

  let badgeName = '';
  if (score >= 95) {
    badgeName = 'Master Trader 👑';
    if (titleEl) titleEl.innerText = 'Luar Biasa Sempurna!';
    if (descEl) descEl.innerText = 'Penguasaan konsep perdagangan internasionalmu setara Menteri Perdagangan profesional.';
  } else if (score >= 85) {
    badgeName = 'Gold Trader 🥇';
    if (titleEl) titleEl.innerText = 'Sangat Membanggakan!';
    if (descEl) descEl.innerText = 'Kamu memahami seluruh regulasi, instrumen tarif, dan teori komparatif dengan sangat baik.';
  } else if (score >= 70) {
    badgeName = 'Silver Trader 🥈';
    if (titleEl) titleEl.innerText = 'Hasil Memuaskan!';
    if (descEl) descEl.innerText = 'Sebagian besar materi ekonomi telah dikuasai dengan baik. Terus pertahankan prestasimu!';
  } else if (score >= 60) {
    badgeName = 'Bronze Trader 🥉';
    if (titleEl) titleEl.innerText = 'Cukup Baik!';
    if (descEl) descEl.innerText = 'Kamu telah melewati batas ketuntasan minimum. Pelajari kembali materi modul untuk skor maksimal!';
  } else {
    badgeName = 'Calon Diplomat Perlu Latihan 🌱';
    if (titleEl) titleEl.innerText = 'Perlu Pendalaman Materi';
    if (descEl) descEl.innerText = 'Jangan patah semangat! Pelajari kembali Modul 1, 2, dan 3 lalu ulangi evaluasi akhir ini.';
  }

  if (pillEl) {
    pillEl.innerHTML = `<span>Penghargaan:</span> <strong>${badgeName}</strong>`;
  }

  // Render Pembahasan Lengkap seluruh soal
  const reviewContainer = document.getElementById('examReviewList');
  if (reviewContainer) {
    reviewContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    finalExamQuestions.forEach((q, idx) => {
      const userAnsIdx = examAnswers[idx];
      const isCorrect = userAnsIdx === q.correct;

      const userText = userAnsIdx !== undefined ? `${letters[userAnsIdx]}. ${q.options[userAnsIdx]}` : 'Tidak dijawab';
      const correctText = `${letters[q.correct]}. ${q.options[q.correct]}`;

      const item = document.createElement('div');
      item.className = `review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`;
      item.innerHTML = `
        <div class="review-q-title">
          <span style="font-weight: 800; color: ${isCorrect ? 'var(--emerald-success)' : 'var(--rose-danger)'};">
            ${isCorrect ? '✓ Benar' : '✗ Salah'}
          </span> — Soal ${idx + 1}: ${q.q}
        </div>
        <div class="review-detail">
          <p><strong>Jawaban Anda:</strong> ${userText}</p>
          ${!isCorrect ? `<p style="color: #065f46;"><strong>Kunci Jawaban:</strong> ${correctText}</p>` : ''}
          <p style="margin-top: 6px; font-style: italic; color: var(--slate-600);"><strong>Pembahasan:</strong> ${q.exp}</p>
        </div>
      `;
      reviewContainer.appendChild(item);
    });
  }

  window.scrollTo({ top: resCard.offsetTop - 80, behavior: 'smooth' });
}

function retakeFinalExam() {
  playSound('click');
  const resCard = document.getElementById('examResultsCard');
  if (resCard) resCard.classList.remove('show');
  startFinalExam();
}

// ==========================================================================
// 10. EVENT LISTENERS & INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();

  const icon = document.getElementById('soundIcon');
  if (icon) {
    icon.innerText = appState.soundEnabled ? '🔊' : '🔇';
  }

  // Inisialisasi tampilan default
  selectLabScenario('scen1');
  renderGame1Question();
  initTradeMatchingGame();
  renderTFStatement();
  renderMysteryBoxesGrid();

  // Tutup modal jika mengklik area backdrop
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('show');
    }
    if (e.target.classList.contains('mystery-modal-backdrop')) {
      e.target.classList.remove('show');
    }
    if (e.target.classList.contains('mobile-nav-backdrop')) {
      const mobileNav = document.getElementById('mobileNavDrawer');
      if (mobileNav) mobileNav.classList.remove('open');
      e.target.classList.remove('show');
    }
  });

  // Unlock AudioContext pada interaksi sentuh pertama di perangkat mobile
  const unlockAudio = () => {
    initAudio();
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('click', unlockAudio, { passive: true });
  document.addEventListener('touchstart', unlockAudio, { passive: true });

  console.log('TRADE QUEST: Misi Menjelajahi Dunia Perdagangan v2.0 Ready.');
});
