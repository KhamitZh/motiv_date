import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Emblem from "@/components/fx/Emblem";
import { GlowButton } from "@/components/fx/motion-bits";
import TopBar from "@/components/TopBar";
import { SPEAKERS } from "@/data/content";
import { fireConfetti } from "@/utils/confetti";

export default function SpeakerAuth({
  onBack,
  onUnlock,
}: {
  onBack: () => void;
  onUnlock: (id: number) => void;
}) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [caps, setCaps] = useState(false);
  const [ok, setOk] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 700);
    return () => clearTimeout(t);
  }, []);

  const submit = () => {
    if (ok) return;
    const found = SPEAKERS.find((s) => s.password === value.trim());
    if (!found) {
      setError("Құпия сөз қате. Қайталап көріңіз.");
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 560);
      return;
    }
    setError("");
    setOk(true);
    fireConfetti(0.5, 0.4, 120);
    setTimeout(() => onUnlock(found.id), 1150);
  };

  return (
    <div className="relative min-h-screen">
      <TopBar onBack={onBack} label="Басты бет" right="Спикер бөлімі" />

      <section className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 py-28">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col items-center text-center"
        >
          <Emblem size={96} />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-100"
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Жабық бөлім
          </motion.span>

          <h1 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
            <span className="text-gradient">Спикерлер кабинеті</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm text-cyan-50/70">
            Жалғастыру үшін өзіңізге берілген құпия сөзді енгізіңіз.
          </p>
        </motion.div>

        {/* ---------- Card ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative mt-10 w-full overflow-hidden rounded-[28px] glass-strong p-7 sm:p-9 ${
            shaking ? "animate-shake" : ""
          }`}
          style={{ boxShadow: "0 40px 120px -34px rgba(4,12,32,0.95)" }}
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />

          <AnimatePresence mode="wait">
            {ok ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 8, 0] }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-600 shadow-[0_0_50px_-6px_rgba(34,211,238,0.9)]"
                >
                  <ShieldCheck className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="mt-6 font-display text-xl font-bold text-white">
                  Қош келдіңіз!
                </h3>
                <p className="mt-2 text-sm text-cyan-100/80">Шақыртуыңыз ашылуда…</p>
                <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.05 }}
                    className="h-full bg-gradient-to-r from-cyan-300 to-blue-500"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }} className="relative">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, -8, 8, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 0.8 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.9)]"
                  >
                    <KeyRound className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold text-white">
                      Құпия сөз
                    </h3>
                    <p className="text-xs text-white/50">Жеке кіру</p>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type={show ? "text" : "password"}
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                        if (error) setError("");
                      }}
                      onKeyDown={(e) => {
                        setCaps(e.getModifierState?.("CapsLock") ?? false);
                        if (e.key === "Enter") submit();
                      }}
                      spellCheck={false}
                      autoComplete="off"
                      aria-label="Құпия сөз"
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 pr-12 font-mono text-[15px] tracking-wider text-white outline-none transition-all duration-300 focus:border-cyan-300/70 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-cyan-200"
                      aria-label="Құпия сөзді көрсету"
                    >
                      {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {caps && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 flex items-center gap-2 text-xs text-amber-300/90"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" /> Caps Lock қосулы
                      </motion.p>
                    )}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-200"
                      >
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <GlowButton onClick={submit} className="flex-1">
                      <Lock className="h-5 w-5" /> Кіру
                    </GlowButton>
                    <GlowButton variant="ghost" onClick={onBack}>
                      Артқа
                    </GlowButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
