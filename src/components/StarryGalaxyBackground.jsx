import React, { useEffect, useRef } from 'react';

export default function StarryGalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Star attributes
    const numStars = Math.floor(Math.min(width, height) * 0.22);
    const stars = [];
    const colors = ['#FFFDF8', '#F5D061', '#F4C2D0', '#E5B842', '#FFFFFF'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05, // Slow upward drift
      });
    }

    // Shooting stars state
    let shootingStar = null;

    const createShootingStar = () => {
      const startX = Math.random() * width * 0.8 + width * 0.1;
      const startY = Math.random() * height * 0.4;
      const length = Math.random() * 120 + 80;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~45 deg downward
      shootingStar = {
        x: startX,
        y: startY,
        length,
        speed: Math.random() * 12 + 10,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        life: 0,
        maxLife: Math.random() * 30 + 25,
      };
    };

    let shootingStarTimer = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle cosmic nebula background glow
      const grad1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.3,
        20,
        width * 0.2,
        height * 0.3,
        width * 0.55
      );
      grad1.addColorStop(0, 'rgba(74, 28, 59, 0.18)');
      grad1.addColorStop(1, 'rgba(10, 3, 10, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        20,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(45, 14, 38, 0.22)');
      grad2.addColorStop(1, 'rgba(10, 3, 10, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw drifting & twinkling stars
      stars.forEach((star) => {
        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen edges
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        // Twinkle opacity
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 0.95) {
          star.alpha = 0.95;
          star.twinkleDir = -1;
        } else if (star.alpha <= 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        // Draw star dot & soft halo
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = star.radius > 1.2 ? 8 : 4;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Handle shooting star
      shootingStarTimer++;
      if (!shootingStar && shootingStarTimer > 320 && Math.random() < 0.02) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      if (shootingStar) {
        ctx.save();
        ctx.beginPath();
        const tailX = shootingStar.x - shootingStar.dx * shootingStar.length;
        const tailY = shootingStar.y - shootingStar.dy * shootingStar.length;

        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          tailX,
          tailY
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.3, 'rgba(245, 208, 97, 0.6)');
        grad.addColorStop(1, 'rgba(244, 194, 208, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Advance shooting star head
        shootingStar.x += shootingStar.dx * shootingStar.speed;
        shootingStar.y += shootingStar.dy * shootingStar.speed;
        shootingStar.life++;

        if (
          shootingStar.life >= shootingStar.maxLife ||
          shootingStar.x > width + 100 ||
          shootingStar.y > height + 100
        ) {
          shootingStar = null;
        }
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starry-galaxy-canvas"
    />
  );
}
