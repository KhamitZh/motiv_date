import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { emblem } from "@/components/fx/Emblem";
import { EVENT } from "@/data/content";

export default function TopBar({
  onBack,
  label = "Артқа",
  right,
}: {
  onBack: () => void;
  label?: string;
  right?: string;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
      />
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl glass-strong px-3 py-2 sm:px-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-cyan-50/90 transition-colors hover:bg-white/10 hover:text-white sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {label}
          </button>

          <div className="flex items-center gap-2.5">
            <img
              src={emblem}
              alt=""
              className="h-8 w-8 rounded-full ring-1 ring-cyan-200/40"
            />
            <div className="hidden text-left sm:block">
              <p className="font-display text-[11px] leading-tight font-bold tracking-wide text-white">
                {EVENT.brand}
              </p>
              <p className="text-[10px] leading-tight text-cyan-100/60">
                {right ?? EVENT.dateLabel}
              </p>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
