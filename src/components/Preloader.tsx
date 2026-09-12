import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Emblem from "@/components/fx/Emblem";
import { EVENT } from "@/data/content";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setP((v) => {
        const next = v + Math.random() * 14 + 6;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(onDone, 520);
          return 100;
        }
        return next;
      });
    }, 130);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#01030A]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,143,240,0.28),transparent_65%)] blur-2xl" />
      </div>

      <Emblem size={124} />

      <motion.h1
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        animate={{ opacity: 1, letterSpacing: "0.34em" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-9 font-display text-xl font-extrabold text-white sm:text-2xl"
      >
        {EVENT.brand}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/60"
      >
        «{EVENT.title}»
      </motion.p>

      <div className="mt-9 h-[3px] w-52 overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{ width: `${Math.min(p, 100)}%` }}
          transition={{ ease: "easeOut", duration: 0.35 }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]"
        />
      </div>
      <p className="mt-3 font-mono text-[11px] tabular-nums text-cyan-100/50">
        {Math.min(Math.round(p), 100)}%
      </p>
    </motion.div>
  );
}
