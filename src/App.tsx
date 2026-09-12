import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import RoleGate from "@/components/RoleGate";
import SpeakerAuth from "@/components/SpeakerAuth";
import SpeakerInvite from "@/components/SpeakerInvite";
import StudentInvite from "@/components/StudentInvite";
import StarField from "@/components/fx/StarField";
import { emblem } from "@/components/fx/Emblem";
import { GradientBackground } from "@/components/ui/dark-gradient-background";
import { SPEAKERS } from "@/data/content";

type Screen = "gate" | "student" | "speaker-auth" | "speaker";

const pageAnim = {
  initial: { opacity: 0, y: 28, filter: "blur(14px)", scale: 0.985 },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, y: -22, filter: "blur(14px)", scale: 0.99 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  className: "relative z-10",
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState<Screen>("gate");
  const [speakerId, setSpeakerId] = useState<number | null>(null);

  /* Эмблеманы favicon ретінде орнату */
  useEffect(() => {
    const link = document.getElementById("app-favicon") as HTMLLinkElement | null;
    if (link) {
      link.type = "image/png";
      link.href = emblem;
    }
  }, []);

  /* Экран ауысқанда жоғарыға оралу */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen]);

  const go = useCallback((s: Screen) => setScreen(s), []);
  const speaker = SPEAKERS.find((s) => s.id === speakerId) ?? null;

  return (
    <GradientBackground variant={screen === "gate" ? "night" : "deep"}>
      <StarField
        density={screen === "gate" ? 80 : 60}
        linked={screen === "gate"}
        className="z-0"
      />

      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {screen === "gate" && (
          <motion.main key="gate" {...pageAnim}>
            <RoleGate
              onPick={(role) => go(role === "student" ? "student" : "speaker-auth")}
            />
          </motion.main>
        )}

        {screen === "student" && (
          <motion.main key="student" {...pageAnim}>
            <StudentInvite onBack={() => go("gate")} />
          </motion.main>
        )}

        {screen === "speaker-auth" && (
          <motion.main key="auth" {...pageAnim}>
            <SpeakerAuth
              onBack={() => go("gate")}
              onUnlock={(id) => {
                setSpeakerId(id);
                go("speaker");
              }}
            />
          </motion.main>
        )}

        {screen === "speaker" && speaker && (
          <motion.main key={`speaker-${speaker.id}`} {...pageAnim}>
            <SpeakerInvite
              speaker={speaker}
              onBack={() => {
                setSpeakerId(null);
                go("speaker-auth");
              }}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </GradientBackground>
  );
}
