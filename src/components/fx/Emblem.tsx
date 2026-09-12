import { motion } from "framer-motion";
import emblem from "@/assets/nnn-emblem.png";

export { emblem };

export default function Emblem({
  size = 120,
  spin = true,
  className = "",
}: {
  size?: number;
  spin?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Сыртқы пульс */}
      <span
        className="absolute inset-0 rounded-full animate-pulse-ring"
        style={{ boxShadow: "0 0 0 2px rgba(34,211,238,0.45)" }}
      />
      <span
        className="absolute inset-0 rounded-full animate-pulse-ring"
        style={{ animationDelay: "1.2s", boxShadow: "0 0 0 2px rgba(29,143,240,0.35)" }}
      />

      {/* Айналмалы сақиналар */}
      {spin && (
        <>
          <div
            className="absolute -inset-2 rounded-full border border-dashed border-cyan-300/30 animate-spin-slow"
            aria-hidden
          />
          <div
            className="absolute -inset-5 rounded-full border border-sky-400/20 animate-spin-rev"
            aria-hidden
          >
            <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(34,211,238,0.9)]" />
          </div>
        </>
      )}

      <motion.img
        src={emblem}
        alt="NNN эмблемасы"
        draggable={false}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full select-none rounded-full object-cover ring-1 ring-cyan-200/30"
        style={{
          boxShadow:
            "0 0 44px -6px rgba(34,211,238,0.55), 0 18px 60px -18px rgba(2,8,23,0.9)",
        }}
      />
    </div>
  );
}
