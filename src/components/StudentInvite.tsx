import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpenText,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  Flame,
  Map as MapIcon,
  MapPin,
  MousePointerClick,
  PartyPopper,
  Quote,
  Sparkles,
  Users2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Emblem from "@/components/fx/Emblem";
import { GlowButton, Reveal, SplitWords, TiltCard } from "@/components/fx/motion-bits";
import TopBar from "@/components/TopBar";
import { AGENDA, EVENT, STUDENT } from "@/data/content";
import { fireConfetti } from "@/utils/confetti";
import { downloadICS } from "@/utils/ics";

const ICONS: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  book: BookOpenText,
  users: Users2,
  map: MapIcon,
};

/* Әріптеп жазылатын мәтін */
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(id);
      }, 45);
    }, delay * 1000);
    return () => clearTimeout(start);
  }, [text, delay]);
  return (
    <span>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-cyan-300 animate-blink" />
    </span>
  );
}

function Marquee() {
  const items = [
    "АРМАНДАРДАН — ӘРЕКЕТКЕ",
    "12.09.2026",
    "GOOGLE MEET",
    "МОТИВАЦИЯЛЫҚ КЕШ",
    "NNN",
  ];
  return (
    <div className="relative my-16 w-full overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
      <div className="flex w-max animate-marquee gap-10">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-10">
            {items.map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="flex items-center gap-10 font-display text-sm font-bold tracking-[0.3em] whitespace-nowrap text-cyan-100/50 sm:text-base"
              >
                {t}
                <Sparkles className="h-4 w-4 text-cyan-300/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StudentInvite({ onBack }: { onBack: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [going, setGoing] = useState(false);

  useEffect(() => {
    setGoing(localStorage.getItem("nnn_rsvp") === "1");
    const t = setTimeout(() => fireConfetti(0.5, 0.3, 130), 700);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    setGoing(true);
    localStorage.setItem("nnn_rsvp", "1");
    fireConfetti(0.5, 0.55, 170);
  };

  const addCalendar = () =>
    downloadICS({
      title: `«${EVENT.title}» — мотивациялық кеш`,
      description: `${STUDENT.headline}\nҰйымдастырушылар: ${EVENT.organizers.join(", ")}`,
      location: EVENT.place,
      start: new Date("2026-09-12T18:00:00"),
      durationMinutes: 120,
    });

  return (
    <div className="relative">
      <TopBar onBack={onBack} label="Басты бет" right="Оқушы бөлімі" />

      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pt-28 pb-16 text-center"
      >
        <motion.div style={{ y: heroY, opacity: heroFade }} className="flex flex-col items-center">
          <Emblem size={92} />

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {STUDENT.badge}
          </motion.span>

          <h1 className="mt-6 max-w-4xl font-display text-[1.85rem] leading-[1.12] font-extrabold sm:text-5xl md:text-[3.6rem]">
            <SplitWords text={`✨ ${STUDENT.headline}`} delay={0.2} wordClass="text-gradient" />
          </h1>

          <p className="mt-6 min-h-[1.6em] font-display text-base text-cyan-100/90 sm:text-xl">
            <Typewriter text={STUDENT.greeting} delay={1.1} />
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-11 flex flex-col items-center gap-3 sm:flex-row"
          >
            <GlowButton onClick={accept} disabled={going}>
              {going ? (
                <>
                  <CheckCircle2 className="h-5 w-5" /> Тіркелдіңіз!
                </>
              ) : (
                <>
                  <PartyPopper className="h-5 w-5" /> Қатысамын!
                </>
              )}
            </GlowButton>
            <GlowButton variant="ghost" onClick={addCalendar}>
              <CalendarPlus className="h-5 w-5 text-cyan-300" /> Күнтізбеге қосу
            </GlowButton>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="absolute bottom-7 flex flex-col items-center gap-2 text-cyan-200/60"
        >
          <MousePointerClick className="h-4 w-4" />
          <span className="text-[10px] uppercase tracking-[0.25em]">Төмен сырғытыңыз</span>
          <span className="h-8 w-px bg-gradient-to-b from-cyan-300/70 to-transparent" />
        </motion.div>
      </section>

      <Marquee />

      {/* ---------------- INTRO ---------------- */}
      <section className="mx-auto max-w-4xl px-5">
        <div className="grid gap-5 md:grid-cols-2">
          {STUDENT.intro.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-200/40">
                <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-all duration-700 group-hover:bg-cyan-400/25" />
                <Flame className="mb-4 h-6 w-6 text-cyan-300" />
                <p className="relative text-[15px] leading-relaxed text-white/85">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- BLOCKS ---------------- */}
      <section className="mx-auto mt-20 max-w-5xl px-5">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">
            Бағдарлама
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            🎯 {STUDENT.blocksTitle}
          </h2>
          <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {STUDENT.blocks.map((b, i) => {
            const Icon = ICONS[b.icon] ?? Sparkles;
            return (
              <Reveal key={b.title} delay={i * 0.1}>
                <TiltCard intensity={7}>
                  <div className="group relative h-full overflow-hidden rounded-3xl glass-strong p-7 transition-all duration-500 hover:border-cyan-200/45">
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-transparent to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-400/10 group-hover:to-blue-500/10 group-hover:opacity-100" />
                    <div className="relative flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-600 shadow-[0_10px_30px_-8px_rgba(34,211,238,0.8)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-xs font-bold text-cyan-300/70">
                            0{i + 1}
                          </span>
                          <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                            {b.title}
                          </h3>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-white/70">{b.text}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- DETAILS ---------------- */}
      <section className="mx-auto mt-20 max-w-5xl px-5">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            📌 Іс-шараның орны мен уақыты
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { icon: CalendarDays, label: "Күні", value: EVENT.dateLabel, sub: "Сенбі" },
            { icon: Clock3, label: "Уақыты", value: STUDENT.time, sub: "Кештің басталуы" },
            { icon: MapPin, label: "Орны", value: EVENT.place, sub: "Онлайн кездесу" },
          ].map((d, i) => (
            <Reveal key={d.label} delay={i * 0.12}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-7 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-200/50">
                <span className="absolute inset-x-0 -top-24 mx-auto h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-700 group-hover:bg-cyan-300/35" />
                <d.icon className="relative mx-auto h-8 w-8 text-cyan-300 transition-transform duration-500 group-hover:scale-125" />
                <p className="relative mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200/70">
                  {d.label}
                </p>
                <p className="relative mt-2 font-display text-2xl font-extrabold text-white">
                  {d.value}
                </p>
                <p className="relative mt-1 text-xs text-white/50">{d.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- AGENDA ---------------- */}
      <section className="mx-auto mt-20 max-w-3xl px-5">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">
            Тайм-лайн
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Кештің жүрісі
          </h2>
        </Reveal>

        <div className="relative mt-12 pl-8">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-300 via-sky-500/50 to-transparent" />
          {AGENDA.map((a, i) => (
            <Reveal key={a.time} delay={i * 0.08} y={18}>
              <div className="group relative mb-4 rounded-2xl glass px-5 py-4 transition-all duration-400 hover:translate-x-1.5 hover:border-cyan-200/40">
                <span className="absolute -left-[30px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-cyan-300 bg-[#04091A] transition-all duration-500 group-hover:scale-125 group-hover:bg-cyan-300 group-hover:shadow-[0_0_16px_4px_rgba(34,211,238,0.6)]" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="min-w-[3.4rem] font-display text-sm font-bold text-cyan-300">
                    {a.time}
                  </span>
                  <h3 className="font-semibold text-white">{a.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- QUOTE ---------------- */}
      <section className="mx-auto mt-20 max-w-4xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-cyan-200/25 bg-gradient-to-br from-[#0a2a58]/80 via-[#061936]/80 to-[#02060f]/80 p-9 text-center backdrop-blur-xl sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/30 blur-3xl animate-float-slow" />
              <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl animate-float-mid" />
            </div>
            <Quote className="relative mx-auto h-10 w-10 text-cyan-300/70" />
            <p className="relative mt-6 font-display text-lg leading-relaxed font-medium text-balance text-white sm:text-2xl">
              «{STUDENT.quote}»
            </p>
            <div className="relative mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            <p className="relative mt-6 text-sm text-cyan-100/70">
              Ұйымдастырушылар: {EVENT.organizers.join(" & ")}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- CTA / FOOTER ---------------- */}
      <section className="mx-auto mt-16 mb-20 max-w-3xl px-5 text-center">
        <Reveal>
          <Emblem size={76} spin={false} className="mx-auto" />
          <h3 className="mt-6 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Сені сол кеште күтеміз! 💙
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
            {EVENT.dateLabel} күні {STUDENT.time}-де {EVENT.place} платформасына қосыл.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton onClick={accept} disabled={going}>
              {going ? (
                <>
                  <CheckCircle2 className="h-5 w-5" /> Қатысуың расталды
                </>
              ) : (
                <>
                  <PartyPopper className="h-5 w-5" /> Қатысамын!
                </>
              )}
            </GlowButton>
            <GlowButton variant="ghost" onClick={onBack}>
              Басты бетке оралу
            </GlowButton>
          </div>
          <p className="mt-10 text-[11px] tracking-[0.2em] text-white/35 uppercase">
            © 2026 {EVENT.brand} · {EVENT.title}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
