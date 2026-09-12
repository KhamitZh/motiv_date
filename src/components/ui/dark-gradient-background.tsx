import type React from "react";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  /** "deep" — жоғарыдан төмен көк-циан, "night" — тыныш түнгі көк */
  variant?: "deep" | "night";
}

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GradientBackground({
  children,
  className = "",
  variant = "deep",
}: GradientBackgroundProps) {
  const gradient =
    variant === "deep"
      ? "linear-gradient(180deg, #01030A 0%, #04091A 18%, #061C3E 38%, #0A4E9E 68%, #1D8FF0 86%, #22D3EE 100%)"
      : "linear-gradient(180deg, #01030A 0%, #04091A 30%, #071633 62%, #0A2F63 85%, #0B5FB8 100%)";

  return (
    <div className={`relative min-h-screen w-full overflow-hidden ${className}`}>
      {/* Негізгі градиент */}
      <div className="fixed inset-0" style={{ background: gradient }} />

      {/* Аврора дақтары */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full animate-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(29,143,240,0.55) 0%, rgba(29,143,240,0) 65%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full animate-glow"
          style={{
            animationDelay: "1.4s",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.45) 0%, rgba(34,211,238,0) 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full animate-glow"
          style={{
            animationDelay: "2.6s",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0) 65%)",
          }}
        />
      </div>

      {/* Шу текстурасы */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.045] bg-repeat mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: "180px" }}
      />

      {/* Геометриялық тор */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 20%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 20%, #000 35%, transparent 100%)",
        }}
      />

      {/* Диагональ сызықтар */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Винетка */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default GradientBackground;
