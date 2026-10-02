import React, { useEffect } from 'react';

export default function DearestLetterModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="letter-modal-overlay" onClick={onClose}>
      <div 
        className="letter-modal-wrapper" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button 
          className="letter-close-btn" 
          onClick={onClose}
          aria-label="Close letter"
        >
          ✕ Close Letter
        </button>

        {/* Parchment Paper Page */}
        <div className="parchment-paper">
          
          {/* Subtle Top Red Accent Line & Subtitle */}
          <div className="parchment-header">
            <span className="letter-subtitle">On the occasion of your twenty-sixth birthday</span>
            <h1 className="letter-title">My Dearest Tejamma,</h1>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="letter-content">
            <p>
              I take up my pen today with a heart so full that words feel too small to carry it. On this blessed day of your 26th birthday, I write to you not merely as one who admires you, but as one whose every breath now carries your name. Tejamma, I love you. <span className="red-accent-text">Nuvvante pranam naaku. Edaina chestha, Tejamma kosam.</span>
            </p>

            <p>
              When I look back upon your journey, I am filled with wonder. A girl from Sathupally who crossed the oceans to a foreign land, who stood tall in America and earned her Master's at Pace University with honour, and who then walked into the great halls of finance, Fidelity and Barclays, with grace and quiet strength. Tejamma, you have always been my truest admiration and my greatest inspiration. Each step you took has kept me motivated through my own.
            </p>

            <p>
              And then came February, that cruel month when an accident sought to break you. Yet you did not break, Tejamma. You fought with a courage I shall never forget, and you rose again, stronger than before.
            </p>

            {/* Sacred Om Symbol Section */}
            <div className="om-symbol-container">
              <span className="om-symbol">ॐ</span>
            </div>

            <p>
              Of your devotion to Lord Hanuman, I can only speak with reverence. Your deekshas are no small matter; they demand discipline, sacrifice, and a heart wholly committed, and you have kept them faithfully. When you were injured during your recent deeksha, I was shaken and stunned to my very core. Still, your faith did not waver, and neither did your focus. Even through pain, your dedication to your work and your efforts to this very day remain an inspiration to me, Tejamma.
            </p>

            {/* Divider Line */}
            <div className="parchment-divider" />

            <p>
              But my dearest, what I hold closest of all is the care you show me. The iPhone 17 Pro Max, the Lacoste shirt, the whey protein, our shopping and every rupee you spent in Goa, our journeys to Bangalore and Mysore, the football, the little shopping days. These are not mere gifts, Tejamma. They are pieces of your heart, given freely. In every moment, every gesture of care and affection, I find myself truly blessed.
            </p>

            <p>
              You have taught me more than you know. Your fitness inspires me and pushes me to the gym each day. Your skin care routine taught me how one must care for oneself, how a person must grow both within and without. Tejamma, you are my guru.
            </p>

            <p>
              And so, I make you this solemn promise. I shall take upon myself every responsibility, and I shall never hurt you, at any point in this life. On a most auspicious day, at a muhurtham blessed by the heavens, the very day you say yes, I will marry you, Tejamma.
            </p>

            <p>
              So far, you have worked hard every minute, hour, day, and year. You never wasted any time and made every single decision great — never doubt or regret any of them. I will always be standing right by your side, and I believe in Tejamma's decision-making with all my heart. Let's travel together through infinite miles, infinite years, and infinite time together. I want to spend every single second with you — I will not live for even a second without you.
            </p>

            <div className="song-lyrics-container">
              <p className="song-declaration-line">
                <span className="red-accent-text">I love you, Tejamma... 🤍</span>
              </p>
              <div className="telugu-lyrics-block">
                finally కాబోతున్న కళ్యాణ మంత్రాలుగా<br />
                వినబోతున్న సన్నాయి మేళాలుగా..<br />
                ఓ సడే లేని అలజడి ఏదో ఎలా మదికి వినిపించిందో<br />
                స్వరం లేని ఏ రాగంతో చెలిమికెలా స్వాగతమందో<br /><br />
                ఇలాంటివేం తెలియకముందే<br />
                మనం అనే కథానిక మొదలైందో<br />
                మనం అనే కథానిక మొదలైందో ✨
              </div>
            </div>

            <p className="love-always-line">
              I love you, now and always.
            </p>

            {/* Red Accent Telugu Closing & Signature */}
            <div className="letter-signature-container">
              <div className="telugu-closing">Nuvvunte chaalu.</div>
              <div className="english-closing">Yours,</div>
              <div className="infinity-signature">
                Infinity <span className="infinity-icon">♾️</span>
              </div>
            </div>

            {/* Wax Seal Decorative Badge */}
            <div className="wax-seal-badge">
              <div className="wax-seal-inner">
                <span>T 🤍 I</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
