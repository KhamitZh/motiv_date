type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: number;
  life: number;
};

const COLORS = [
  "#22D3EE",
  "#1D8FF0",
  "#67E8F9",
  "#FFFFFF",
  "#0B5FB8",
  "#A5F3FC",
  "#DBE7F5",
];

/** Жеңіл, тәуелсіздіксіз конфетти жарылысы */
export function fireConfetti(originX = 0.5, originY = 0.35, amount = 120) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  const ox = window.innerWidth * originX;
  const oy = window.innerHeight * originY;

  const pieces: Piece[] = Array.from({ length: amount }, () => {
    const angle = Math.random() * Math.PI * 2;
    const power = Math.random() * 11 + 4;
    return {
      x: ox,
      y: oy,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power - 4,
      size: Math.random() * 8 + 4,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.5 ? 0 : 1,
      life: 1,
    };
  });

  let raf = 0;
  const tick = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = false;
    for (const p of pieces) {
      p.vy += 0.24;
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 0.0075;
      if (p.life <= 0 || p.y > window.innerHeight + 60) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 0) {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    if (alive) {
      raf = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  };
  tick();
}
