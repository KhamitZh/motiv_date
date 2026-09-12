import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mic2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Emblem from "@/components/fx/Emblem";
import { GlowButton, TiltCard } from "@/components/fx/motion-bits";
import TopBar from "@/components/TopBar";
import { EVENT, SPEAKERS } from "@/data/content";
import { fireConfetti } from "@/utils/confetti";

function mask(name: string) {
  return name
    .split(" ")
    .map((w) => (w.length > 1 ? `${w[0]}${"•".repeat(Math.min(w.length - 1, 7))}` : w))
    .join(" ");
}

export default function SpeakerAuth({
  onBack,
  onUnlock,
}: {
  onBack: () => void;
  onUnlock: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [caps, setCaps] = useState(false);
  const [ok, setOk] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 220);
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const submit = () => {
    const found = SPEAKERS.find((s) => s.password === value.trim());
    if (!found) {
      setError("Құпия сөз қате. Регистрге (үлкен/кіші әріпке) назар аударыңыз.");
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 560);
      return;
    }
    setError("");
    setOk(found.id);
    fireConfetti(0.5, 0.4, 110);
    setTimeout(() => onUnlock(found.id), 1150);
  };

  return (
    <div className="relative min-h-screen">
      <TopBar onBack={onBack} label="Басты бет" right="Спикер бөлімі" />

      <section className="mx-auto max-w-5xl px-5 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <Emblem size={84} />
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-100">
            <ShieldCheck className="h-3.5 w-3.5" /> Жабық бөлім
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-5xl">
            <span className="text-gradient">Спикерлер кабинеті</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm text-cyan-50/70 sm:text-base">
            Өз атыңызды таңдап, жеке құпия сөзіңізді енгізіңіз. Жүйе парольге қарай сіздің
            жеке шақыртуыңызды автоматты түрде ашады.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SPEAKERS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard intensity={7}>
                <button
                  onClick={() => {
                    setPicked(s.id);
                    setValue("");
                    setError("");
                    setOk(null);
                    setOpen(true);
                  }}
                  className="group relative w-full overflow-hidden rounded-3xl glass-strong p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-cyan-200/45"
                >
                  <span
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: `0 22px 70px -26px ${s.glow}` }}
                  />
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} font-display text-lg font-extrabold text-white shadow-lg transition-transform duration-500 group-hover:scale-105`}
                    >
                      {s.initials}
                      <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-[#04091A]">
                        <Lock className="h-3.5 w-3.5 text-cyan-300" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300/80">
                        {s.role}
                      </p>
                      <h3 className="mt-1 truncate font-display text-lg font-bold text-white">
                        {mask(s.name)}
                      </h3>
                      <p className="mt-1 truncate text-xs text-white/50">{s.tag}</p>
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="inline-flex items-center gap-2 text-xs text-white/45">
                      <Mic2 className="h-3.5 w-3.5" /> {s.time} · {EVENT.place}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-200">
                      Ашу
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-white/40"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-300/70" />
          Құпия сөз регистрге сезімтал: «AdMin_nnn2023» ≠ «AdMin_NNN2023»
        </motion.p>
      </section>

      {/* ---------- Modal ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          >
            <div
              className="absolute inset-0 bg-[#01040c]/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-md overflow-hidden rounded-[28px] glass-strong p-7 sm:p-9 ${
                shaking ? "animate-shake" : ""
              }`}
              style={{ boxShadow: "0 40px 120px -30px rgba(4,12,32,0.95)" }}
            >
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-3xl" />

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
                    <p className="mt-2 text-sm text-cyan-100/80">
                      {SPEAKERS.find((s) => s.id === ok)?.role} шақыртуы ашылуда…
                    </p>
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
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600">
                        <KeyRound className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">
                          Құпия сөзді енгізіңіз
                        </h3>
                        <p className="text-xs text-white/50">
                          {picked ? SPEAKERS.find((s) => s.id === picked)?.role : "Спикер"} ·
                          жеке кіру
                        </p>
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
                          placeholder="AdMin_•••2023"
                          spellCheck={false}
                          autoComplete="off"
                          className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 pr-12 font-mono text-[15px] text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-cyan-300/70 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]"
                        />
                        <button
                          type="button"
                          onClick={() => setShow((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-cyan-200"
                          aria-label="Құпия сөзді көрсету"
                        >
                          {show ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
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

                      <div className="mt-6 flex gap-3">
                        <GlowButton onClick={submit} className="flex-1">
                          <Lock className="h-4.5 w-4.5" /> Кіру
                        </GlowButton>
                        <GlowButton variant="ghost" onClick={() => setOpen(false)}>
                          Болдырмау
                        </GlowButton>
                      </div>

                      <p className="mt-5 text-center text-[11px] leading-relaxed text-white/35">
                        Құпия сөзді ұйымдастырушылардан алыңыз:{" "}
                        {EVENT.organizers.join(" · ")}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
