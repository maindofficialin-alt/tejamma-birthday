import React, { useState, useEffect, useRef } from 'react';

// ==========================================================================
// EDITABLE CONTENT CONFIG (EXACT 10 MOMENTS FOR TEJAMMA)
// ==========================================================================
const CONFIG = {
  NAME: "Tejamma",
  PHOTOS: [
    // PHOTO 1
    {
      src: "/photos/1.jpg",
      era: "MOMENT 1",
      title: "Where It All Began 🌱",
      card: "Sathupally's chinni star.",
      about: "Born in Sathupally, Khammam, with tiny steps, curious eyes, and a heart full of wonder. Even as a chinnari, she was meant for something beautiful."
    },
    // PHOTO 2
    {
      src: "/photos/2.jpg",
      era: "MOMENT 2",
      title: "The College Chapter 🎒",
      card: "Finding her style, her voice, her spark.",
      about: "Friendships, fashion, and fearless choices. Ikkade modalayyindi, this is where she truly started becoming her."
    },
    // PHOTO 3
    {
      src: "/photos/3.jpg",
      era: "MOMENT 3",
      title: "Hello, New Jersey ✈️",
      card: "New Jersey calling. Same fire.",
      about: "From Sathupally to New Jersey, she packed her dreams and crossed oceans. Leaving home takes chala dhairyam, and she had plenty."
    },
    // PHOTO 4
    {
      src: "/photos/4.jpg",
      era: "MOMENT 4",
      title: "The Quiet Grind 📚",
      card: "Late nights. Hard work. Zero excuses.",
      about: "Behind every win were days no one saw: deadlines, doubts, and a refusal to give up. Kashtaniki phalitham eppudu untundi."
    },
    // PHOTO 5
    {
      src: "/photos/5.jpg",
      era: "MOMENT 5",
      title: "The Graduate 🎓",
      card: "Dreamt it. Earned it. Wore it well.",
      about: "Master's from Pace University. Every sleepless night turned into this one proud moment. Gelupu ante idhe."
    },
    // PHOTO 6
    {
      src: "/photos/6.jpg",
      era: "MOMENT 6",
      title: "The Professional Era 💼",
      card: "From classrooms to boardrooms.",
      about: "Multiple MNCs, real responsibility, and a name built on hard work. She didn't wait for chances. She created them."
    },
    // PHOTO 7
    {
      src: "/photos/7.jpg",
      era: "MOMENT 7",
      title: "The Renaissance 🌸",
      card: "Stronger. Wiser. Glowing different.",
      about: "Every chapter shaped her, but this one revealed her. A calmer heart, a sharper mind, and a kotha velugu in her eyes."
    },
    // PHOTO 8
    {
      src: "/photos/8.jpg",
      era: "MOMENT 8",
      title: "Her Today ✨",
      card: "Fit, fierce, and effortlessly gorgeous.",
      about: "Active mornings, flawless style, and a smile that lights up every room. Andam, attitude, anni unnay."
    },
    // PHOTO 9
    {
      src: "/photos/9.jpg",
      era: "MOMENT 9",
      title: "Pegasus 🕊️",
      card: "Born to rise. Made to fly.",
      about: "Some people walk through life. She was always meant to soar, higher than anyone expected and exactly where she belongs."
    },
    // PHOTO 10
    {
      src: "/photos/10.jpg",
      era: "MOMENT 10",
      title: "Infinity ♾️",
      card: "26 never looked this special.",
      about: "Happy 26th birthday, Tejamma. 🤍 Here's to endless dreams, endless strength, and endless navvulu."
    }
  ],
  MESSAGE: `Happy Birthday, Tejamma 🤍
Beautiful. Gorgeous. Cutest. Prettiest. Hottest.
And the damn sexiest woman in the entire universe. 🤍`
};

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function App() {
  const trackRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  // Total Beats: Beat 0 (Caution), Beat 1 (Intro Video), Beats 2-11 (Photos 1-10), Beat 12 (Finale)
  const totalBeats = CONFIG.PHOTOS.length + 3;
  const beatLength = 1 / totalBeats;

  // RequestAnimationFrame lerp smoothing loop with rock-solid window.scrollY calculation
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lerpFactor = isReducedMotion ? 1.0 : 0.08;

    let animationFrameId;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const totalHeight = trackRef.current ? trackRef.current.offsetHeight : document.documentElement.scrollHeight;
      const scrollableDistance = totalHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const raw = Math.max(0, Math.min(1, scrollY / scrollableDistance));
      targetProgressRef.current = raw;
    };

    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * lerpFactor;
        setProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(currentProgressRef.current);
      }
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    handleScroll();
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 0. Caution Beat (Beat 0)
  const cautionOpacity = Math.max(0, Math.min(1, 1 - (progress - beatLength * 0.15) / (beatLength * 0.85)));
  const cautionTranslateY = -50 * (progress / beatLength);
  const cautionBgOpacity = Math.max(0, Math.min(1, 1 - (progress - beatLength * 0.3) / (beatLength * 0.7)));

  // 1. Intro Video Beat (Beat 1)
  const videoStart = beatLength * 0.6;
  const videoEnd = beatLength * 2.3;
  let videoOpacity = 0;
  if (progress >= videoStart && progress < videoEnd) {
    if (progress < beatLength * 1.2) {
      videoOpacity = (progress - videoStart) / (beatLength * 0.6);
    } else {
      videoOpacity = Math.max(0, 1 - (progress - beatLength * 1.2) / (beatLength * 1.1));
    }
  }

  let introOpacity = 0;
  const introStart = beatLength * 0.8;
  const introEnd = beatLength * 2.2;
  if (progress >= introStart && progress < introEnd) {
    if (progress < beatLength * 1.3) {
      introOpacity = (progress - introStart) / (beatLength * 0.5);
    } else {
      introOpacity = Math.max(0, 1 - (progress - beatLength * 1.3) / (beatLength * 0.9));
    }
  }
  const introTranslateY = -40 * Math.max(0, (progress - beatLength * 1.3) / (beatLength * 0.9));

  // 2. Finale Beat (Beat 12)
  const finaleStart = (CONFIG.PHOTOS.length + 1.8) * beatLength;
  const finaleRaw = Math.max(0, Math.min(1, (progress - finaleStart) / (beatLength * 1.2)));
  const finaleEase = easeOutCubic(finaleRaw);
  const finaleOpacity = finaleEase;
  const finaleScale = 0.88 + 0.12 * finaleEase;
  const finaleTranslateY = 25 * (1 - finaleEase);

  // Flying Celestial Unicorn trajectory during photo beats (Beats 2 to 11)
  const photoStartProgress = beatLength * 1.6;
  const photoEndProgress = finaleStart;
  let unicornOpacity = 0;
  let unicornX = -25;
  if (progress > photoStartProgress && progress < photoEndProgress) {
    const norm = (progress - photoStartProgress) / (photoEndProgress - photoStartProgress);
    if (norm < 0.08) {
      unicornOpacity = (norm / 0.08) * 0.95;
    } else if (norm > 0.92) {
      unicornOpacity = ((1 - norm) / 0.08) * 0.95;
    } else {
      unicornOpacity = 0.95;
    }
    unicornX = -25 + norm * 140;
  }
  const unicornY = Math.sin(progress * 22) * 28;
  const unicornRotate = Math.sin(progress * 14) * 6;

  return (
    <>
      {/* Fullscreen Embedded Background Stage */}
      <div className="bg-photos-container">
        
        {/* 0. CAUTION BACKGROUND IMAGE (Beat 0) */}
        {progress < beatLength * 1.4 && (
          <div
            className="fullscreen-media-container"
            style={{ opacity: cautionBgOpacity }}
          >
            <img
              src="/caution.png"
              alt=""
              className="fullscreen-bg-blur"
            />
            <img
              src="/caution.png"
              alt="Caution Warning Sign"
              className="fullscreen-fit-media"
              style={{
                maxHeight: '62vh',
                filter: 'brightness(0.92) contrast(1.1) drop-shadow(0 20px 40px rgba(0,0,0,0.85))'
              }}
            />
          </div>
        )}

        {/* 1. INTRO VIDEO (100% Full Screen Edge-to-Edge with 4K Clarity) */}
        {videoOpacity > 0.005 && (
          <video
            src="/intro-video-hd.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="fullscreen-video-media"
            style={{
              opacity: videoOpacity,
              transform: `scale(${1.03 - 0.03 * (progress / (beatLength * 2))})`
            }}
          />
        )}

        {/* 2. 10 PHOTO FRAMES (Optimal Zoomed-Out Framing with Ambient Backdrop) */}
        {CONFIG.PHOTOS.map((photo, i) => {
          const bgCenter = (i + 2) * beatLength;
          const dist = (progress - bgCenter) / beatLength;

          let opacity = 0;
          if (i === 0 && progress < beatLength * 2) {
            opacity = Math.max(0, (progress - beatLength * 1.3) / (beatLength * 0.7));
          } else if (i === CONFIG.PHOTOS.length - 1 && progress >= (CONFIG.PHOTOS.length + 1.5) * beatLength) {
            opacity = 1;
          } else {
            opacity = Math.max(0, Math.min(1, 1.25 - Math.abs(dist)));
          }

          if (opacity <= 0.005) return null;

          return (
            <div
              key={`photo-frame-${i}`}
              className="fullscreen-media-container"
              style={{ opacity }}
            >
              {/* Soft Ambient Blurred Photo Background */}
              <img
                src={photo.src}
                alt=""
                className="fullscreen-bg-blur"
              />

              {/* Crisp Screen-Fitting Photo (Zero Edge Cropping) */}
              <img
                src={photo.src}
                alt={`Moment ${i + 1}`}
                className="fullscreen-fit-media"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Ambient Dark Vignette Overlay */}
        <div className="bg-dark-vignette" />
      </div>

      {/* Main Tall Scroll Track */}
      <div
        ref={trackRef}
        style={{ height: `${totalBeats * 220}vh` }}
      >
        {/* Sticky Full-Screen Viewport Stage */}
        <div className="stage-container">

          {/* 0. CAUTION WARNING START BEAT (Beat 0) */}
          <div
            className="caution-layer"
            style={{
              opacity: cautionOpacity,
              transform: `translate3d(0, ${cautionTranslateY}px, 0)`,
              display: cautionOpacity <= 0.005 ? 'none' : 'flex'
            }}
          >
            <div className="caution-card">
              <div className="caution-badge">⚠️ A Word of Caution</div>
              <p className="caution-text">
                "What lies beneath is the most potent drug known to mankind, stronger than gravity in its pull, swifter than light in reaching the mind. Proceed, dear reader, at your own peril."
              </p>
              <div className="caution-scroll-hint">
                <span>Scroll down to proceed</span>
                <span>↓</span>
              </div>
            </div>
          </div>

          {/* FLYING CELESTIAL UNICORN IN THE MIDDLE WHILE SCROLLING */}
          {unicornOpacity > 0.01 && (
            <div
              className="flying-unicorn-layer"
              style={{
                opacity: unicornOpacity,
                transform: `translate3d(${unicornX}vw, calc(-50% + ${unicornY}px), 0) rotate(${unicornRotate}deg)`
              }}
            >
              <div className="unicorn-wrapper">
                <img
                  src="/unicorn.png"
                  alt="Flying Pegasus Unicorn"
                  className="flying-unicorn-img"
                />
              </div>
              <div className="unicorn-sparkles">
                <span className="feather f1">🪶</span>
                <span className="sparkle-item sp1">✨</span>
                <span className="sparkle-item sp2">💖</span>
                <span className="feather f2">🪶</span>
                <span className="sparkle-item sp3">⭐</span>
              </div>
            </div>
          )}

          {/* INTRO BEAT (Special Birthday Wishes Over Fullscreen Video) */}
          <div
            className="intro-layer"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, ${introTranslateY}px, 0)`,
              display: introOpacity <= 0.005 ? 'none' : 'flex'
            }}
          >
            <div className="intro-badge">✨ HAPPY 26TH BIRTHDAY ✨</div>
            <div className="intro-name">For {CONFIG.NAME} 🤍</div>
            <h1 className="intro-headline">A few of my favourite moments</h1>
            <div className="intro-scroll-hint">
              <span>Scroll slowly</span>
              <span>↓</span>
            </div>
          </div>

          {/* REVEALING STORY TEXT FOR EACH PHOTO */}
          <div className="story-moments-wrapper">
            {CONFIG.PHOTOS.map((photo, i) => {
              const center = (i + 2) * beatLength;
              const dist = (progress - center) / beatLength;

              let storyOpacity = 0;
              let translateY = 30;
              let scale = 0.95;

              if (Math.abs(dist) < 0.85) {
                const norm = 1 - Math.abs(dist) / 0.85;
                const easeNorm = easeOutCubic(norm);
                storyOpacity = easeNorm;
                translateY = 25 * (1 - easeNorm);
                scale = 0.95 + 0.05 * easeNorm;
              }

              storyOpacity = storyOpacity * (1 - finaleRaw);

              if (storyOpacity <= 0.005) return null;

              return (
                <div
                  key={`story-${photo.src}-${i}`}
                  className="embedded-story-card"
                  style={{
                    opacity: storyOpacity,
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                  }}
                >
                  <div className="story-card-tag">{photo.era}</div>
                  <h2 className="story-card-title">{photo.title}</h2>
                  <h3 className="story-card-subtitle">{photo.card}</h3>
                  <p className="story-card-about">{photo.about}</p>
                </div>
              );
            })}
          </div>

          {/* FINALE BEAT */}
          <div
            className="finale-layer"
            style={{
              opacity: finaleOpacity,
              transform: `translate3d(0, ${finaleTranslateY}px, 0) scale(${finaleScale})`,
              display: finaleOpacity <= 0.005 ? 'none' : 'flex'
            }}
          >
            <h2 className="finale-headline">Happy 26th, {CONFIG.NAME}</h2>
            <p className="finale-message">{CONFIG.MESSAGE}</p>
          </div>

        </div>
      </div>

      {/* Fixed Bottom Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
}
