import confetti from 'canvas-confetti';

/* ==========================================================================
   ROMANTIC 3D BIRTHDAY EXPERIENCE - TEJAMMA'S 6 LIFE ERAS ENGINE
   ========================================================================== */

// STATE MANAGEMENT
const STATE = {
  partnerName: localStorage.getItem('partnerName') || 'Tejamma',
  senderName: localStorage.getItem('senderName') || 'Your Sweetheart',
  age: parseInt(localStorage.getItem('age') || '26'),
  theme: localStorage.getItem('theme') || 'theme-nebula',
  letterText: localStorage.getItem('letterText') || `My Dearest Tejamma,

From the moment you entered my world, everything became brighter, warmer, and endlessly beautiful. Watching you grow into the incredible, passionate, and brilliant woman you are today has been the greatest gift of my life.

On your 26th Birthday, I wish you infinite laughter, unshakeable peace, and every single dream your heart desires. Thank you for being my anchor, my spark, and my favorite adventure.

I love you more than words, code, or stars can ever express. Happy 26th Birthday, my love, Tejamma! ✨`,
  isMusicPlaying: false,
  activeChapter: 'gateway',
  blownCandlesCount: 0,
  currentReasonIndex: 0,
  activeAge: 0,
  userPhotos: JSON.parse(localStorage.getItem('userPhotos') || '{}')
};

// 6 ELEGANT LIFE ERAS DATASET (FEATURING TEJAMMA'S REAL CHILDHOOD PHOTOS)
const LIFE_JOURNEY_DATA = [
  // ERA I: THE DAWN OF WONDER & INNOCENCE (Ages 0 - 5) - FEATURING TEJAMMA'S CHILDHOOD PHOTOS
  { age: 0, title: "A Star is Born ✨", category: "dawn", eraLabel: "CHAPTER I • DAWN OF WONDER", year: "Birth Year (Age 0)", text: "The universe gained its brightest light. The journey of an extraordinary soul, Tejamma, begins!", img: "/childhood_1.jpeg" },
  { age: 1, title: "First Steps & Sweet Smiles 👶", category: "dawn", eraLabel: "CHAPTER I • DAWN OF WONDER", year: "Age 1", text: "Taking those tiny first steps, filling the home with giggles and endless curiosity.", img: "/childhood_2.jpeg" },
  { age: 2, title: "Little Explorer 🎈", category: "dawn", eraLabel: "CHAPTER I • DAWN OF WONDER", year: "Age 2", text: "Exploring the world with wide eyes, discovering colors, songs, and happy moments.", img: "/childhood_1.jpeg" },
  { age: 3, title: "Fairy Tale Dreams 🧚", category: "dawn", eraLabel: "CHAPTER I • DAWN OF WONDER", year: "Age 3", text: "Playing pretend, bedtime stories, and dreaming of magical adventures.", img: "/childhood_2.jpeg" },
  { age: 4, title: "Little Sunshine ☀️", category: "dawn", eraLabel: "CHAPTER I • DAWN OF WONDER", year: "Age 4", text: "Always smiling, singing favorite songs, and bringing joy to everyone around.", img: "/childhood_1.jpeg" },
  { age: 5, title: "Kindergarten Days 🎒", category: "dawn", eraLabel: "CHAPTER I • DAWN OF WONDER", year: "Age 5", text: "Making first best friends, painting colorful artwork, and starting primary school!", img: "/childhood_2.jpeg" },

  // ERA II: THE AWAKENING & SELF-DISCOVERY (Ages 6 - 17)
  { age: 6, title: "Primary School Spark ✨", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 6", text: "Learning to read stories, writing letters, and showing her clever, sharp mind.", img: "/memory_sunset.png" },
  { age: 7, title: "Little Artist 🎨", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 7", text: "Doodling in notebooks, building castles, and loving nature.", img: "/memory_sunset.png" },
  { age: 8, title: "Big Heart & Kindness 💖", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 8", text: "Known everywhere for her gentle kindness, caring for friends and family.", img: "/memory_sunset.png" },
  { age: 9, title: "Chapter of Discovery 📚", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 9", text: "Reading adventure novels, excelling in science projects, and growing fast!", img: "/memory_sunset.png" },
  { age: 10, title: "Double Digits Milestone 🔟", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 10", text: "Officially 10 years old! A milestone birthday filled with party balloons and laughter.", img: "/memory_sunset.png" },
  { age: 11, title: "Dancing Through Life 💃", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 11", text: "Discovering music, dance, sports, and expressing her unique style.", img: "/memory_sunset.png" },
  { age: 12, title: "Middle School Memories 🏫", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 12", text: "Building lifelong friendships, late-night phone chats, and growing independent.", img: "/memory_sunset.png" },
  { age: 13, title: "Official Teenager 🎉", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 13", text: "Welcome to teenage years! Passionate about fashion, songs, and big aspirations.", img: "/memory_sunset.png" },
  { age: 14, title: "High School Journey 🌟", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 14", text: "Stepping into high school with grace, intelligence, and magnetic charisma.", img: "/memory_sunset.png" },
  { age: 15, title: "Sweet 15 👑", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 15", text: "Radiant, elegant, and glowing. A queen in the making!", img: "/memory_sunset.png" },
  { age: 16, title: "Sweet Sixteen 🎂", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 16", text: "Sixteen candles shining bright! Learning to drive, making unforgettable memories.", img: "/memory_sunset.png" },
  { age: 17, title: "Senior Year & Big Dreams 🎓", category: "awakening", eraLabel: "CHAPTER II • THE AWAKENING", year: "Age 17", text: "Preparing for the future, studying hard, and looking towards university horizons.", img: "/memory_sunset.png" },

  // ERA III: THE ACADEMIC RENAISSANCE (Undergraduate / College Era: Ages 18 - 21)
  { age: 18, title: "Undergraduate Arrival 🏛️", category: "college", eraLabel: "CHAPTER III • ACADEMIC RENAISSANCE", year: "Age 18 • College Year 1", text: "Entering university grounds with independence, ambition, and a thirst for knowledge!", img: "/memory_sunset.png" },
  { age: 19, title: "Campus Leadership & Passions 📚", category: "college", eraLabel: "CHAPTER III • ACADEMIC RENAISSANCE", year: "Age 19 • College Year 2", text: "Excelling in lectures, joining societies, and discovering her true calling.", img: "/memory_sunset.png" },
  { age: 20, title: "Roaring 20s Milestone 🥂", category: "college", eraLabel: "CHAPTER III • ACADEMIC RENAISSANCE", year: "Age 20 • College Year 3", text: "Entering the 20s with confidence, deep friendships, and brilliant achievements.", img: "/memory_sunset.png" },
  { age: 21, title: "Bachelor's Degree Triumph 🎓", category: "college", eraLabel: "CHAPTER III • ACADEMIC RENAISSANCE", year: "Age 21 • College Graduation", text: "Graduating with honors! A stellar achievement marking the end of her undergraduate era.", img: "/memory_sunset.png" },

  // ERA IV: THE SCHOLAR'S MASTERY (Master's Degree Era: Ages 22 - 23)
  { age: 22, title: "Master's Journey Begins 📜", category: "mastery", eraLabel: "CHAPTER IV • SCHOLAR'S MASTERY", year: "Age 22 • Master's Year 1", text: "Pursuing higher postgraduate studies, diving deep into research, innovation, and expertise.", img: "/memory_sunset.png" },
  { age: 23, title: "Master's Degree Distinction 🎓✨", category: "mastery", eraLabel: "CHAPTER IV • SCHOLAR'S MASTERY", year: "Age 23 • Master's Graduation", text: "Conquering her Master's Degree with distinction! An intellectual powerhouse and master of her craft.", img: "/memory_sunset.png" },

  // ERA V: THE PROFESSIONAL ASCENSION (Post-Master's Phase: Ages 24 - 25)
  { age: 24, title: "Career Triumphs & Leadership 💼", category: "ascension", eraLabel: "CHAPTER V • PROFESSIONAL ASCENSION", year: "Age 24 • Post-Master's Phase", text: "Stepping into the professional arena with authority, leadership, and remarkable vision.", img: "/memory_sunset.png" },
  { age: 25, title: "Silver Quarter Century & Love Sparks 💕", category: "ascension", eraLabel: "CHAPTER V • PROFESSIONAL ASCENSION", year: "Age 25 • Post-Master's Phase", text: "A year of immense personal growth, deep connections, and the moment our paths crossed forever.", img: "/memory_sunset.png" },

  // ERA VI: THE RADIANT REVIVAL & GOLDEN ERA (Age 26 Today!)
  { age: 26, title: "Happy 26th Birthday Today, Tejamma! 💖👑", category: "revival", eraLabel: "CHAPTER VI • RADIANT REVIVAL", year: "Age 26 • Today!", text: "Today Tejamma turns 26! Surrounded by endless love, glowing wishes, and a breathtaking golden future ahead!", img: "/cake.png" }
];

// REASONS FOR DECK
const REASONS_LIST = [
  { num: 1, title: "Tejamma's Radiant Smile", text: "Tejamma's smile has the power to melt away any bad day and instantly light up the room." },
  { num: 2, title: "Her Infinite Kindness", text: "The gentle, loving way Tejamma cares for everyone around her inspires me every single day." },
  { num: 3, title: "Her Brilliant Mind", text: "Tejamma's intelligence, quick wit, and deep conversations are my favorite part of life." },
  { num: 4, title: "The Way She Laughs", text: "Hearing Tejamma's genuine, full-hearted laugh is the sweetest sound in the universe." },
  { num: 5, title: "Our Shared Dreams", text: "Building a future with Tejamma is the greatest dream I could ever ask for." },
  { num: 6, title: "Her Inner Strength", text: "Tejamma faces every challenge with courage, poise, and remarkable resilience." },
  { num: 7, title: "Tejamma Is My Home", text: "Wherever Tejamma is, that is where I belong. She is my safe haven." }
];

// WEB AUDIO SYNTHESIZER FOR ROMANTIC AMBIENT HARMONY
class RomanticAudioSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playChordSequence() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 349.23], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isPlaying) return;
      const currentChord = chords[step % chords.length];
      currentChord.forEach((freq, idx) => {
        this.playTone(freq, 2.5, idx * 0.15);
      });
      step++;
    };

    playNext();
    this.intervalId = setInterval(playNext, 3200);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) clearInterval(this.intervalId);
  }

  playTone(freq, duration, delay = 0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, this.ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + delay + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  }

  playClickSound() {
    if (!this.ctx) this.init();
    this.playTone(523.25, 0.2);
  }
}

const synth = new RomanticAudioSynth();

// 3D CANVAS PARTICLE ENGINE
class GalaxyCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    this.resize();
    this.initParticles();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('click', (e) => this.addBurst(e.clientX, e.clientY));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 8000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.4 ? '#ff2e93' : '#00f2fe',
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  addBurst(x, y) {
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      this.fireworks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        color: ['#ff2e93', '#00f2fe', '#ffd700', '#9d4edd'][Math.floor(Math.random() * 4)],
        life: 1,
        decay: Math.random() * 0.03 + 0.015
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x += dx * 0.02;
        p.y += dy * 0.02;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    this.fireworks.forEach((fw, index) => {
      fw.x += fw.vx;
      fw.y += fw.vy;
      fw.life -= fw.decay;

      if (fw.life <= 0) {
        this.fireworks.splice(index, 1);
      } else {
        this.ctx.save();
        this.ctx.globalAlpha = fw.life;
        this.ctx.fillStyle = fw.color;
        this.ctx.beginPath();
        this.ctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    });

    requestAnimationFrame(() => this.render());
  }
}

// APPLICATION CONTROLLER
document.addEventListener('DOMContentLoaded', () => {
  const galaxy = new GalaxyCanvas('galaxy-canvas');
  galaxy.render();

  applyState();
  setupNavigation();
  setupChildhoodVanishOnScroll();
  setupScrollytellingEngine();
  setupTimelineStepper();
  setupCandles();
  setupMicrophoneSensor();
  setupReasonsDeck();
  setupCustomizerDrawer();
  setupDirectPhotoUpload();
});

// SCROLL-DRIVEN CHILDHOOD PHOTO VANISH EFFECT
function setupChildhoodVanishOnScroll() {
  const showcase = document.getElementById('childhood-showcase');
  if (!showcase) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Calculate vanish progress between 100px and 500px scroll offset
    const startScroll = 120;
    const endScroll = 550;

    if (scrollY < startScroll) {
      showcase.style.opacity = '1';
      showcase.style.transform = 'translateY(0px) scale(1)';
      showcase.style.pointerEvents = 'auto';
    } else if (scrollY >= startScroll && scrollY <= endScroll) {
      const progress = (scrollY - startScroll) / (endScroll - startScroll);
      showcase.style.opacity = `${1 - progress}`;
      showcase.style.transform = `translateY(-${progress * 60}px) scale(${1 + progress * 0.08})`;
      showcase.style.pointerEvents = progress > 0.8 ? 'none' : 'auto';
    } else {
      showcase.style.opacity = '0';
      showcase.style.transform = 'translateY(-60px) scale(1.08)';
      showcase.style.pointerEvents = 'none';
    }
  });
}

// APPLY STATE TO UI
function applyState() {
  document.body.className = STATE.theme;
  
  const headerName = document.getElementById('header-name');
  const heroName = document.getElementById('hero-partner-name');
  const senderName = document.getElementById('letter-sender-name');

  if (headerName) headerName.textContent = STATE.partnerName;
  if (heroName) heroName.textContent = STATE.partnerName;
  if (senderName) senderName.textContent = STATE.senderName + ' 💖';

  typewriterEffect(STATE.letterText);
}

// TYPEWRITER EFFECT
function typewriterEffect(text) {
  const container = document.getElementById('letter-text-container');
  if (!container) return;

  container.innerHTML = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      container.innerHTML += text.charAt(index) === '\n' ? '<br>' : text.charAt(index);
      index++;
      setTimeout(type, 18);
    }
  }
  type();
}

// NAVIGATION CONTROLLER
function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.chapter-section');
  const bgViewport = document.getElementById('scrolly-bg-viewport');

  function switchChapter(chapterId) {
    STATE.activeChapter = chapterId;
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.chapter === chapterId);
    });
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === `chapter-${chapterId}`);
    });

    if (bgViewport) {
      bgViewport.classList.toggle('active', chapterId === 'scrolly');
    }

    synth.playClickSound();
  }

  // Set initial viewport active state
  if (bgViewport) bgViewport.classList.add('active');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchChapter(btn.dataset.chapter));
  });

  const unlockBtn = document.getElementById('unlock-experience-btn');
  const directScrollyBtn = document.getElementById('direct-scrolly-btn');
  const giftTrigger = document.getElementById('gift-box-trigger');

  if (unlockBtn) unlockBtn.addEventListener('click', () => switchChapter('letter'));
  if (directScrollyBtn) directScrollyBtn.addEventListener('click', () => switchChapter('scrolly'));
  if (giftTrigger) giftTrigger.addEventListener('click', () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    switchChapter('letter');
  });

  const musicBtn = document.getElementById('music-toggle-btn');
  const musicStatusText = document.getElementById('music-status-text');

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (STATE.isMusicPlaying) {
        synth.stop();
        STATE.isMusicPlaying = false;
        musicStatusText.textContent = "Music Paused";
        musicBtn.classList.remove('primary-glow');
      } else {
        synth.playChordSequence();
        STATE.isMusicPlaying = true;
        musicStatusText.textContent = "Ambient Romantic Harmony Synth (Playing)";
        musicBtn.classList.add('primary-glow');
      }
    });
  }
}

// SCROLL-DRIVEN SCROLLYTELLING ENGINE (6 ELEGANT LIFE ERAS - FULLSCREEN BACKGROUND REVEAL)
function setupScrollytellingEngine() {
  const storyColumn = document.getElementById('scrolly-story-column');
  const bgImg = document.getElementById('scrolly-bg-img');
  const floatingBadge = document.getElementById('scrolly-floating-badge');
  const eraTabs = document.querySelectorAll('.era-filter-tabs .era-tab-btn');

  if (!storyColumn || !bgImg) return;

  function renderScrollyStory(filter = 'all') {
    storyColumn.innerHTML = '';

    const filteredData = filter === 'all'
      ? LIFE_JOURNEY_DATA
      : LIFE_JOURNEY_DATA.filter(item => item.category === filter);

    filteredData.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `scrolly-story-item ${idx === 0 ? 'active' : ''}`;
      card.dataset.age = item.age;
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="scrolly-card-header">
          <span class="scrolly-item-badge">${item.eraLabel}</span>
          <span class="scrolly-item-year">${item.year}</span>
        </div>
        <h3 class="scrolly-item-title">${item.title}</h3>
        <p class="scrolly-item-text">${item.text}</p>
        <div class="scrolly-item-footer">
          <span>✨ Fullscreen Background Reveal</span>
        </div>
      `;
      storyColumn.appendChild(card);
    });

    const cards = storyColumn.querySelectorAll('.scrolly-story-item');
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach(c => c.classList.remove('active'));
          entry.target.classList.add('active');

          const age = parseInt(entry.target.dataset.age);
          const item = LIFE_JOURNEY_DATA.find(i => i.age === age);

          if (item) {
            bgImg.classList.add('transitioning');
            setTimeout(() => {
              const customImg = STATE.userPhotos[`age-${age}`] || item.img;
              bgImg.src = customImg;
              if (floatingBadge) floatingBadge.textContent = item.eraLabel;
              bgImg.classList.remove('transitioning');
            }, 200);

            if (Math.random() > 0.45) {
              confetti({ particleCount: 12, spread: 35, origin: { x: 0.5, y: 0.5 } });
            }
          }
        }
      });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
  }

  eraTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      eraTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderScrollyStory(tab.dataset.era);
    });
  });

  renderScrollyStory('all');
}

// 26-YEAR LIFE JOURNEY TIMELINE STEPPER
function setupTimelineStepper() {
  const stepperTrack = document.getElementById('timeline-stepper');
  const activeCardContainer = document.getElementById('active-milestone-card');
  const categoryTabs = document.querySelectorAll('.timeline-category-tabs .tab-btn');

  if (!stepperTrack || !activeCardContainer) return;

  function renderStepper(filter = 'all') {
    stepperTrack.innerHTML = '';

    const filteredData = filter === 'all' 
      ? LIFE_JOURNEY_DATA 
      : LIFE_JOURNEY_DATA.filter(item => item.category === filter);

    filteredData.forEach(item => {
      const btn = document.createElement('div');
      btn.className = `step-node ${item.age === STATE.activeAge ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="step-age">Age ${item.age}</span>
      `;
      btn.addEventListener('click', () => {
        STATE.activeAge = item.age;
        renderStepper(filter);
        renderActiveMilestone(item);
        synth.playClickSound();
      });
      stepperTrack.appendChild(btn);
    });

    const activeItem = LIFE_JOURNEY_DATA.find(i => i.age === STATE.activeAge) || LIFE_JOURNEY_DATA[26];
    renderActiveMilestone(activeItem);
  }

  function renderActiveMilestone(item) {
    const customImg = STATE.userPhotos[`age-${item.age}`] || item.img;

    activeCardContainer.innerHTML = `
      <div class="milestone-media">
        <img src="${customImg}" alt="Age ${item.age} Milestone" class="milestone-img">
        <span class="milestone-badge-age">AGE ${item.age}</span>
      </div>
      <div class="milestone-info">
        <div class="milestone-year">${item.eraLabel} • ${item.year}</div>
        <h3>${item.title}</h3>
        <p class="milestone-text">${item.text}</p>
      </div>
    `;
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderStepper(tab.dataset.filter);
    });
  });

  renderStepper('all');
}

// 26 CANDLES SETUP FOR BIRTHDAY CAKE
function setupCandles() {
  const candlesContainer = document.getElementById('candles-container');
  if (!candlesContainer) return;

  candlesContainer.innerHTML = '';
  for (let i = 0; i < 26; i++) {
    const flame = document.createElement('div');
    flame.className = 'flame-particle';
    flame.dataset.index = i;
    candlesContainer.appendChild(flame);
  }

  const manualBlowBtn = document.getElementById('manual-blow-btn');
  if (manualBlowBtn) {
    manualBlowBtn.addEventListener('click', () => blowOutCandles());
  }
}

// BLOW OUT CANDLES LOGIC
function blowOutCandles() {
  const flames = document.querySelectorAll('.flame-particle');
  flames.forEach(f => f.classList.add('extinguished'));

  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.5 }
  });

  synth.playClickSound();

  setTimeout(() => {
    const wishModal = document.getElementById('wish-modal');
    if (wishModal) wishModal.classList.add('open');
  }, 1000);
}

// MICROPHONE BREATH SENSOR
function setupMicrophoneSensor() {
  const startMicBtn = document.getElementById('start-mic-btn');
  const micStatus = document.getElementById('mic-text');
  const breathLevelFill = document.getElementById('breath-level-fill');

  if (!startMicBtn) return;

  startMicBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      microphone.connect(analyser);

      micStatus.textContent = "🎙️ Listening for your breath... Blow now! 💨";
      startMicBtn.disabled = true;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function checkBreath() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        if (breathLevelFill) {
          breathLevelFill.style.width = Math.min(100, average * 2) + '%';
        }

        if (average > 45) {
          blowOutCandles();
        } else {
          requestAnimationFrame(checkBreath);
        }
      }
      checkBreath();

    } catch (err) {
      alert("Microphone permission was denied or not available. You can use the 'Click to Blow' button fallback!");
    }
  });

  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      document.getElementById('wish-modal').classList.remove('open');
    });
  }
}

// REASONS FLIP CARD
function setupReasonsDeck() {
  const card = document.getElementById('reason-flip-card');
  const trigger = document.getElementById('reasons-card-trigger');
  const nextBtn = document.getElementById('next-reason-btn');
  const aiWishBtn = document.getElementById('ai-generate-wish-btn');

  if (!card) return;

  let index = 0;

  function updateCard(r) {
    document.getElementById('card-num-badge').textContent = `Reason #${r.num}`;
    document.getElementById('card-front-title').textContent = r.title;
    document.getElementById('card-back-text').textContent = `"${r.text}"`;
  }

  if (trigger) {
    trigger.addEventListener('click', () => {
      card.classList.toggle('flipped');
      synth.playClickSound();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      card.classList.remove('flipped');
      setTimeout(() => {
        index = (index + 1) % REASONS_LIST.length;
        updateCard(REASONS_LIST[index]);
      }, 400);
    });
  }

  if (aiWishBtn) {
    aiWishBtn.addEventListener('click', () => {
      card.classList.remove('flipped');
      setTimeout(() => {
        const randomWish = {
          num: '✨ Special Wish',
          title: 'May Your 26th Year Sparkle',
          text: `May every sunrise bring you fresh joy, every challenge reveal your inner strength, and every night fill your heart with peace. Happy Birthday ${STATE.partnerName}!`
        };
        updateCard(randomWish);
      }, 400);
    });
  }

  updateCard(REASONS_LIST[0]);
}

// CUSTOMIZER DRAWER
function setupCustomizerDrawer() {
  const openBtn = document.getElementById('customizer-open-btn');
  const closeBtn = document.getElementById('customizer-close-btn');
  const drawer = document.getElementById('customizer-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const saveBtn = document.getElementById('save-customizer-btn');

  if (!drawer) return;

  function toggleDrawer(open) {
    drawer.classList.toggle('open', open);
  }

  if (openBtn) openBtn.addEventListener('click', () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));
  if (overlay) overlay.addEventListener('click', () => toggleDrawer(false));

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      STATE.partnerName = document.getElementById('input-partner-name').value || 'Tejamma';
      STATE.senderName = document.getElementById('input-sender-name').value || 'Your Sweetheart';
      STATE.letterText = document.getElementById('input-letter-text').value || STATE.letterText;
      STATE.theme = document.getElementById('input-theme-select').value;

      localStorage.setItem('partnerName', STATE.partnerName);
      localStorage.setItem('senderName', STATE.senderName);
      localStorage.setItem('letterText', STATE.letterText);
      localStorage.setItem('theme', STATE.theme);

      applyState();
      toggleDrawer(false);
      alert('Customization saved successfully!');
    });
  }
}

// DIRECT PHOTO UPLOAD HELPER
function setupDirectPhotoUpload() {
  const uploadBtn = document.getElementById('upload-photo-direct-btn');
  const fileInput = document.getElementById('direct-file-input');

  if (!uploadBtn || !fileInput) return;

  uploadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        STATE.userPhotos[`age-${STATE.activeAge}`] = event.target.result;
        localStorage.setItem('userPhotos', JSON.stringify(STATE.userPhotos));
        
        setupScrollytellingEngine();
        setupTimelineStepper();
        alert(`Photo set for Age ${STATE.activeAge}!`);
      };
      reader.readAsDataURL(file);
    }
  });
}
