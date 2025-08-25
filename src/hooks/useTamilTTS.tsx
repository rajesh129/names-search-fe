// useTamilTTS.ts
import { useEffect, useRef, useState } from "react";

export function useTamilTTS() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const tamilVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Load voices (Chrome loads async)
  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Pick a Tamil voice if available
  useEffect(() => {
    const v =
      voices.find(v => v.lang?.toLowerCase().startsWith("ta-in")) ||
      voices.find(v => /tamil/i.test(v.name));
    tamilVoiceRef.current = v || null;
  }, [voices]);

  const speak = (text: string, rate = 1) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ta-IN";
    if (tamilVoiceRef.current) u.voice = tamilVoiceRef.current;
    u.rate = rate; // 0.1–10
    window.speechSynthesis.speak(u);
  };

  const stop = () => window.speechSynthesis.cancel();

  return { speak, stop, hasTamilVoice: !!tamilVoiceRef.current };
}
