import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
    done: d === 0,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl glass sm:h-20 sm:w-20 md:h-24 md:w-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={str}
            initial={{ y: "-90%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "90%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl md:text-4xl"
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/70 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ iso }: { iso: string }) {
  const target = useMemo(() => new Date(iso).getTime(), [iso]);
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.done) {
    return (
      <div className="rounded-2xl glass px-6 py-4 text-center font-display text-lg text-cyan-100">
        🎉 Кеш басталды!
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4">
      <Unit value={t.days} label="күн" />
      <span className="mt-4 font-display text-2xl text-cyan-300/50 sm:mt-5 md:mt-7 md:text-3xl">:</span>
      <Unit value={t.hours} label="сағат" />
      <span className="mt-4 font-display text-2xl text-cyan-300/50 sm:mt-5 md:mt-7 md:text-3xl">:</span>
      <Unit value={t.minutes} label="минут" />
      <span className="mt-4 font-display text-2xl text-cyan-300/50 sm:mt-5 md:mt-7 md:text-3xl">:</span>
      <Unit value={t.seconds} label="секунд" />
    </div>
  );
}
