import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  tw: number;
};

interface Props {
  density?: number;
  className?: string;
  linked?: boolean;
}

/** Жұлдызды тозаң + курсорға реакция жасайтын параллакс қабат */
export default function StarField({
  density = 90,
  className = "",
  linked = true,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let parts: Particle[] = [];
    let raf = 0;

    const build = () => {
      const count = Math.round(
        Math.min(density, (window.innerWidth * window.innerHeight) / 14000)
      );
      parts = Array.from({ length: Math.max(28, count) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.85 + 0.15,
        r: Math.random() * 1.7 + 0.4,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22 - 0.05,
        hue: 185 + Math.random() * 40,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = () => {
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.045;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.045;
      ctx.clearRect(0, 0, w, h);

      for (const p of parts) {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        p.tw += 0.02;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const ox = mouse.current.x * 26 * p.z;
        const oy = mouse.current.y * 26 * p.z;
        const px = p.x + ox;
        const py = p.y + oy;
        const alpha = (0.35 + Math.sin(p.tw) * 0.3) * p.z;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, ${72 + p.z * 12}%, ${alpha})`;
        ctx.arc(px, py, p.r * p.z, 0, Math.PI * 2);
        ctx.fill();

        if (p.r > 1.4) {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, ${alpha * 0.16})`;
          ctx.arc(px, py, p.r * 5 * p.z, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (linked && parts.length < 120) {
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const a = parts[i];
            const b = parts[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 16000) {
              const o = (1 - d2 / 16000) * 0.16;
              ctx.strokeStyle = `rgba(125, 211, 252, ${o})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x + mouse.current.x * 26 * a.z, a.y + mouse.current.y * 26 * a.z);
              ctx.lineTo(b.x + mouse.current.x * 26 * b.z, b.y + mouse.current.y * 26 * b.z);
              ctx.stroke();
            }
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, linked]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed inset-0 h-full w-full ${className}`}
    />
  );
}
