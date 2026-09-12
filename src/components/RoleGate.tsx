import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, GraduationCap, MapPin, Mic2, Users2 } from "lucide-react";
import Emblem from "@/components/fx/Emblem";
import { SplitWords, TiltCard } from "@/components/fx/motion-bits";
import { EVENT } from "@/data/content";

type Props = { onPick: (role: "student" | "speaker") => void };

const cards = [
  {
    key: "student" as const,
    title: "Оқушы",
    subtitle: "Мотивациялық кешке шақырту",
    desc: "Кештің бағдарламасы, уақыты және сені күтіп тұрған мүмкіндіктер.",
    icon: GraduationCap,
    grad: "from-cyan-300/90 via-sky-500/80 to-blue-600/80",
    ring: "rgba(34,211,238,0.55)",
  },
  {
    key: "speaker" as const,
    title: "Speaker",
    subtitle: "Құпия сөз қажет",
    desc: "Спикерлерге арналған жеке шақырту. Парольді енгізіңіз.",
    icon: Mic2,
    grad: "from-indigo-400/90 via-blue-600/80 to-cyan-500/80",
    ring: "rgba(99,132,255,0.55)",
  },
];

export default function RoleGate({ onPick }: Props) {
  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 py-16">
      {/* Логотип + тақырып */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        <Emblem size={112} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100/90"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
          </span>
          {EVENT.kicker}
        </motion.div>

        <h1 className="mt-5 max-w-3xl font-display text-[2rem] leading-[1.1] font-extrabold text-white sm:text-5xl md:text-6xl">
          <SplitWords
            text={`«${EVENT.title}»`}
            delay={0.25}
            wordClass="text-gradient drop-shadow-[0_6px_30px_rgba(34,211,238,0.35)]"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-5 max-w-xl text-balance text-sm text-cyan-50/75 sm:text-base"
        >
          Сайтқа қош келдіңіз! Жалғастыру үшін өзіңізге сай бөлімді таңдаңыз.
        </motion.p>
      </motion.div>

      {/* Таңдау карталары */}
      <div className="mt-12 grid w-full gap-5 sm:mt-14 md:grid-cols-2 md:gap-7">
        {cards.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.85 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard intensity={9}>
              <button
                onClick={() => onPick(c.key)}
                className="group relative block w-full overflow-hidden rounded-[28px] glass-strong p-7 text-left transition-all duration-500 hover:border-cyan-200/50 sm:p-9"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Hover жарығы */}
                <span
                  className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: `0 24px 80px -24px ${c.ring}, inset 0 0 60px -30px ${c.ring}` }}
                />
                {/* Жүріп өтетін жарық сызық */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1200ms] group-hover:translate-x-full" />

                <div className="relative flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.grad} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <c.icon className="h-7 w-7 text-white" strokeWidth={1.8} />
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-500 group-hover:border-cyan-200/60 group-hover:bg-cyan-300/20">
                    <ArrowRight className="h-4.5 w-4.5 text-cyan-100 transition-transform duration-500 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <h2 className="relative mt-7 font-display text-3xl font-bold text-white sm:text-4xl">
                  {c.title}
                </h2>
                <p className="relative mt-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200/80">
                  {c.subtitle}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-white/65">{c.desc}</p>

                <div className="relative mt-7 h-px w-full bg-gradient-to-r from-cyan-300/50 via-white/10 to-transparent" />
                <p className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  Кіру
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </p>
              </button>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Ақпарат чиптері */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.7 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm"
      >
        {[
          { icon: CalendarDays, text: `${EVENT.dateLabel} · ${EVENT.startLabel}` },
          { icon: MapPin, text: EVENT.place },
          { icon: Users2, text: EVENT.organizers.join(" & ") },
        ].map((chip, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-cyan-50/85 transition-colors hover:text-white"
          >
            <chip.icon className="h-4 w-4 text-cyan-300" />
            {chip.text}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
