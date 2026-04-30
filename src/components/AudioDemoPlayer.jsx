import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Headphones, MessageSquare, Phone } from 'lucide-react';

const transcript = [
  { time: 0, speaker: 'caller', text: 'Hi, my boiler\'s making a weird noise and there\'s no hot water.' },
  { time: 8, speaker: 'katie', text: 'Good morning, you\'ve reached Hendricks Plumbing. I\'m Katie, their assistant. I can help with that. May I take your postcode so I can check if we cover your area?' },
  { time: 22, speaker: 'caller', text: 'Sure, it\'s SW4 9HE.' },
  { time: 26, speaker: 'katie', text: 'Thank you. We cover Clapham — you\'re in our service area. Is this an emergency or can it wait until tomorrow?' },
  { time: 34, speaker: 'caller', text: 'It\'s not flooding or anything, but no hot water with kids in the house...' },
  { time: 41, speaker: 'katie', text: 'Understood. I\'ve got a slot tomorrow between 8 and 10 AM, or 2 and 4 PM. Which works better?' },
  { time: 50, speaker: 'caller', text: 'Morning slot please.' },
  { time: 53, speaker: 'katie', text: 'Perfect. I\'ve booked you in for tomorrow, 8 to 10 AM. Dave Hendricks will attend. You\'ll get a WhatsApp confirmation in a moment with his photo and contact details. Is there anything else?' },
  { time: 68, speaker: 'caller', text: 'No, that\'s brilliant. Thanks Katie.' },
  { time: 72, speaker: 'katie', text: 'You\'re welcome. Have a warm evening, and we\'ll see you tomorrow.' },
];

export default function AudioDemoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const intervalRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          // Update active transcript line based on progress
          const currentTime = (next / 100) * 80;
          const lineIndex = transcript.findIndex((line, idx) => {
            const nextLine = transcript[idx + 1];
            return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
          });
          if (lineIndex >= 0) setActiveLine(lineIndex);
          return next;
        });
      }, 800);
    }
  };

  return (
    <section className="ds-section" style={{ background: 'var(--white)' }}>
      <div className="ds-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'var(--katie-blue-light)', color: 'var(--katie-blue)' }}
          >
            <Headphones size={16} />
            Hear It In Action
          </div>
          <h2 className="ds-heading-2 mb-4">Listen to Katie Handle a Real Enquiry</h2>
          <p className="ds-body max-w-xl mx-auto">
            A 90-second sample of Katie answering a boiler repair call — from greeting to job booked.
          </p>
        </motion.div>

        {/* Audio player + transcript */}
        <div className="max-w-3xl mx-auto">
          {/* Player card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="ds-card p-6 md:p-8 mb-8"
            style={{ border: '1px solid var(--slate-200)' }}
          >
            {/* Demo badge */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: 'var(--katie-blue-light)', color: 'var(--katie-blue)' }}
              >
                <Phone size={12} />
                Live Demo
              </span>
              <span className="text-xs" style={{ color: 'var(--slate-400)' }}>
                90 seconds · AI voice · No actors
              </span>
            </div>

            {/* Play button + progress */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{
                  background: isPlaying ? 'var(--navy-800)' : 'var(--katie-blue)',
                  color: 'var(--white)',
                  boxShadow: isPlaying ? 'none' : '0 4px 14px rgba(37, 99, 235, 0.35)',
                }}
              >
                {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>
                    {isPlaying ? 'Playing...' : 'Radiator Leak — Booked Same Day'}
                  </span>
                  <span className="text-xs ml-auto" style={{ color: 'var(--slate-400)' }}>
                    {isPlaying ? `${Math.floor((progress / 100) * 80)}s / 80s` : '0:00 / 1:20'}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden cursor-pointer"
                  style={{ background: 'var(--slate-200)' }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    setProgress(Math.round(pct * 100));
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, var(--katie-blue), var(--rex-green))',
                    }}
                  />
                </div>
              </div>

              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--slate-100)' }}>
                <Volume2 size={18} style={{ color: 'var(--slate-500)' }} />
              </div>
            </div>
          </motion.div>

          {/* Transcript */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="ds-card p-6"
            style={{ border: '1px solid var(--slate-200)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} style={{ color: 'var(--slate-400)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--slate-400)' }}>
                Transcript
              </span>
            </div>

            <div className="space-y-3">
              {transcript.map((line, i) => (
                <div
                  key={i}
                  className="flex gap-3 transition-opacity duration-300"
                  style={{ opacity: isPlaying && i > activeLine ? 0.35 : 1 }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {line.speaker === 'katie' ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'var(--katie-blue-light)', color: 'var(--katie-blue)' }}
                      >
                        K
                      </div>
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'var(--slate-100)', color: 'var(--slate-500)' }}
                      >
                        C
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span
                      className="text-xs font-semibold block mb-0.5"
                      style={{ color: line.speaker === 'katie' ? 'var(--katie-blue)' : 'var(--slate-500)' }}
                    >
                      {line.speaker === 'katie' ? 'Katie (AI)' : 'Caller'}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-800)' }}>
                      {line.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
