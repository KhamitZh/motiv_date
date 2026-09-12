import { motion, useScroll, useTransform } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  Mic2,
  MapPin,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Countdown from "@/components/fx/Countdown";
import Emblem from "@/components/fx/Emblem";
import { GlowButton, Reveal, SplitWords, TiltCard } from "@/components/fx/motion-bits";
import TopBar from "@/components/TopBar";
import { EVENT, type Speaker } from "@/data/content";
import { fireConfetti } from "@/utils/confetti";
import { downloadICS } from "@/utils/ics";

export default function SpeakerInvite({
  speaker,
  onBack,
}: {
  speaker: Speaker;
  onBack: () => void;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const key = `nnn_speaker_${speaker.id}`;
    setAccepted(localStorage.getItem(key) === "1");
    const t = setTimeout(() => fireConfetti(0.5, 0.28, 120), 500);
    return () => clearTimeout(t);
  }, [speaker.id]);

  const accept = () => {
    setAccepted(true);
    localStorage.setItem(`nnn_speaker_${speaker.id}`, "1");
    fireConfetti(0.5, 0.5, 160);
  };

  const addCalendar = () =>
    downloadICS({
      title: `«${EVENT.title}» — спикер: ${speaker.name}`,
      description: `${speaker.role}. Сөз кезегі: ${speaker.time}. Ұйымдастырушылар: ${EVENT.organizers.join(
        ", "
      )}`,
      location: EVENT.place,
      start: new Date(`2026-09-12T${speaker.time}:00`),
      durationMinutes: 40,
    });

  return (
    <div className="relative">
      <TopBar onBack={onBack} label="Шығу" right={speaker.role} />

      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pt-28 pb-14 text-center"
      >
        <motion.div style={{ y, opacity: fade }} className="flex w-full flex-col items-center">
          {/* Аватар */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className={`relative flex h-28 w-28 items-center justify-center rounded-[28px] bg-gradient-to-br ${speaker.accent} font-display text-3xl font-extrabold text-white shadow-[0_20px_60px_-18px_rgba(34,211,238,0.9)] sm:h-32 sm:w-32 sm:text-4xl`}
            >
              <span className="absolute inset-0 rounded-[28px] bg-white/10 mix-blend-overlay" />
              {speaker.initials}
              <span className="absolute -bottom-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200/40 bg-[#04091A]">
                <BadgeCheck className="h-6 w-6 text-cyan-300" />
              </span>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-[36px] border border-cyan-200/20 animate-tilt" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200"
          >
            <Star className="h-3.5 w-3.5" /> {speaker.role}
          </motion.span>

          <h1 className="mt-6 max-w-3xl font-display text-[1.7rem] leading-[1.15] font-extrabold sm:text-4xl md:text-[3rem]">
            <SplitWords text={speaker.salutation} delay={0.25} wordClass="text-gradient-gold" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-cyan-50/80 sm:text-lg"
          >
            {speaker.intro[0]}
          </motion.p>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 grid w-full max-w-lg grid-cols-3 gap-3"
          >
            {speaker.stats.map((s) => (
              <div
                key={s.label}
                className="group rounded-2xl glass px-3 py-4 transition-all duration-400 hover:-translate-y-1 hover:border-cyan-200/45"
              >
                <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cyan-100/60">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <GlowButton onClick={accept} disabled={accepted}>
              {accepted ? (
                <>
                  <CheckCircle2 className="h-5 w-5" /> Келісіміңіз расталды
                </>
              ) : (
                <>
                  <Mic2 className="h-5 w-5" /> Шақыртуды қабылдаймын
                </>
              )}
            </GlowButton>
            <GlowButton variant="ghost" onClick={addCalendar}>
              <CalendarPlus className="h-5 w-5 text-cyan-300" /> Күнтізбеге қосу
            </GlowButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- INTRO ---------------- */}
      <section className="mx-auto max-w-3xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-7 sm:p-9">
            <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-2xl" />
            <p className="relative text-[15px] leading-relaxed text-white/85 sm:text-base">
              {speaker.intro[1]}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- TOPICS ---------------- */}
      <section className="mx-auto mt-16 max-w-4xl px-5">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">
            Бағдарлама
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-4xl">
            📌 {speaker.topicsTitle}
          </h2>
          <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        </Reveal>

        <div className="mt-11 space-y-4">
          {speaker.topics.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1} y={22}>
              <TiltCard intensity={5}>
                <div className="group relative overflow-hidden rounded-3xl glass-strong p-6 transition-all duration-500 hover:border-cyan-200/45 sm:p-7">
                  <span
                    className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${speaker.accent} opacity-70 transition-all duration-500 group-hover:w-1.5 group-hover:opacity-100`}
                  />
                  <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-700 group-hover:bg-cyan-300/25" />
                  <div className="relative flex items-start gap-5">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${speaker.accent} font-display text-sm font-extrabold text-white transition-transform duration-500 group-hover:scale-110`}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{t.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{t.text}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- DETAILS + COUNTDOWN ---------------- */}
      <section className="mx-auto mt-16 max-w-4xl px-5">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            📍 Іс-шара туралы ақпарат
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {[
            { icon: CalendarDays, label: "Күні", value: EVENT.dateLabel },
            { icon: Clock3, label: "Сөз кезегі", value: speaker.time },
            { icon: MapPin, label: "Орны", value: EVENT.place },
          ].map((d, i) => (
            <Reveal key={d.label} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-6 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-200/50">
                <d.icon className="mx-auto h-7 w-7 text-cyan-300 transition-transform duration-500 group-hover:scale-125" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200/70">
                  {d.label}
                </p>
                <p className="mt-1.5 font-display text-xl font-extrabold text-white">{d.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-9 rounded-3xl glass p-7 text-center">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
              Кешке дейін қалды
            </p>
            <Countdown iso={EVENT.dateISO} />
          </div>
        </Reveal>
      </section>

      {/* ---------------- QUOTE ---------------- */}
      <section className="mx-auto mt-16 max-w-4xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-cyan-200/25 bg-gradient-to-br from-[#0a2a58]/80 via-[#061936]/80 to-[#02060f]/80 p-9 text-center backdrop-blur-xl sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/30 blur-3xl animate-float-slow" />
              <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl animate-float-mid" />
            </div>
            <Quote className="relative mx-auto h-10 w-10 text-cyan-300/70" />
            <p className="relative mt-6 font-display text-lg leading-relaxed font-medium text-balance text-white sm:text-2xl">
              «{speaker.quote}»
            </p>
            <div className="relative mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            <p className="relative mt-6 text-sm text-cyan-100/70">
              Құрметпен, ұйымдастырушылар: {EVENT.organizers.join(" & ")}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <section className="mx-auto mt-14 mb-20 max-w-3xl px-5 text-center">
        <Reveal>
          <Emblem size={72} spin={false} className="mx-auto" />
          <h3 className="mt-6 font-display text-xl font-extrabold text-white sm:text-2xl">
            <Sparkles className="mr-2 inline h-5 w-5 text-cyan-300" />
            Сізді кеште көруге асығамыз!
          </h3>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton onClick={accept} disabled={accepted}>
              {accepted ? (
                <>
                  <CheckCircle2 className="h-5 w-5" /> Расталды
                </>
              ) : (
                <>
                  <Mic2 className="h-5 w-5" /> Шақыртуды қабылдау
                </>
              )}
            </GlowButton>
            <GlowButton variant="ghost" onClick={onBack}>
              Шығу
            </GlowButton>
          </div>
          <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-white/35">
            © 2026 {EVENT.brand} · {EVENT.title}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
