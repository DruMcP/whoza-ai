import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const messages = [
  { id: 1, sender: 'caller', text: "Hi, my boiler's broken and we have no hot water..." },
  { id: 2, sender: 'katie', text: "I can help with that. Are you getting any error codes on the display?" },
  { id: 3, sender: 'caller', text: "Yes, it shows F28. Can someone come today?" },
  { id: 4, sender: 'katie', text: "Absolutely — I have a slot at 2pm. I'll send details to your email now." },
];

function SignalBars() {
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm"
          style={{
            height: `${i * 3}px`,
            background: i <= 3 ? '#fff' : 'rgba(255,255,255,0.35)',
          }}
        />
      ))}
    </div>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 11L8 11.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M3.5 7C5.5 5 10.5 5 12.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 4C4 1 12 1 15 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <div className="flex items-center gap-[2px]">
      <div className="w-5 h-[9px] border border-white/70 rounded-[2px] relative flex items-center px-[1px]">
        <div className="h-[5px] w-[70%] bg-white rounded-[1px]" />
      </div>
      <div className="w-[2px] h-[4px] bg-white/70 rounded-r-[1px]" />
    </div>
  );
}

function CallButton({ icon, label, color, bg }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: bg,
          boxShadow: `0 2px 8px ${color}40`,
        }}
      >
        {icon}
      </div>
      <span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {label}
      </span>
    </div>
  );
}

export default function PhoneMockup({ className = '' }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [status, setStatus] = useState('Incoming Call');

  useEffect(() => {
    let timeouts = [];
    messages.forEach((msg, index) => {
      const t = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg]);
        if (index === 0) setStatus('On Call · 00:12');
        if (index === 1) setStatus('On Call · 00:24');
        if (index === 2) setStatus('On Call · 00:38');
        if (index === 3) setStatus('On Call · 00:52');
      }, 800 + index * 2200);
      timeouts.push(t);
    });
    // Loop
    const resetT = setTimeout(() => {
      setVisibleMessages([]);
      setStatus('Incoming Call');
    }, 800 + messages.length * 2200 + 3000);
    timeouts.push(resetT);

    const interval = setInterval(() => {
      setVisibleMessages([]);
      setStatus('Incoming Call');
      messages.forEach((msg, index) => {
        const t2 = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, msg]);
          if (index === 0) setStatus('On Call · 00:12');
          if (index === 1) setStatus('On Call · 00:24');
          if (index === 2) setStatus('On Call · 00:38');
          if (index === 3) setStatus('On Call · 00:52');
        }, 800 + index * 2200);
        timeouts.push(t2);
      });
    }, 800 + messages.length * 2200 + 5000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Phone frame */}
      <div
        className="relative mx-auto"
        style={{
          width: '280px',
          height: '580px',
          borderRadius: '44px',
          background: '#1a1a1a',
          padding: '12px',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.08) inset,
            0 0 0 2px rgba(0,0,0,0.8) inset,
            0 25px 60px rgba(0,0,0,0.4),
            0 8px 20px rgba(0,0,0,0.3),
            0 0 0 1px rgba(255,255,255,0.04)
          `,
        }}
      >
        {/* Screen */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: '36px',
            background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
          }}
        >
          {/* Subtle mesh pattern on screen */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
            style={{
              width: '120px',
              height: '28px',
              background: '#1a1a1a',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          >
            {/* Speaker */}
            <div
              className="absolute top-[8px] left-1/2 -translate-x-1/2"
              style={{
                width: '40px',
                height: '4px',
                background: '#333',
                borderRadius: '2px',
              }}
            />
            {/* Camera */}
            <div
              className="absolute top-[6px] right-[22px]"
              style={{
                width: '10px',
                height: '10px',
                background: '#1a1a1a',
                borderRadius: '50%',
                border: '1px solid #2a2a2a',
              }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '4px',
                  height: '4px',
                  background: '#0a3d62',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>

          {/* Status bar */}
          <div className="absolute top-2 left-0 right-0 z-10 flex items-center justify-between px-6 pt-1">
            <span className="text-[11px] font-semibold text-white tabular-nums">12:34</span>
            <div className="flex items-center gap-1.5">
              <SignalBars />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* Call status */}
          <div className="mt-14 flex flex-col items-center gap-2">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
                }}
              >
                <span className="text-lg font-bold text-white">K</span>
              </div>
              {/* Online pulse */}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0F172A]"
                style={{
                  boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
                  animation: 'call-pulse 2s infinite',
                }}
              />
            </div>
            <p className="text-sm font-semibold text-white mt-1">Katie — whoza.ai</p>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400"
                style={{
                  boxShadow: '0 0 0 0 rgba(52, 211, 153, 0.7)',
                  animation: 'call-pulse 2s infinite',
                }}
              />
              <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>
                {status}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="mt-6 px-4 flex flex-col gap-3 min-h-[240px]">
            <AnimatePresence>
              {visibleMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${msg.sender === 'caller' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-[1.4]"
                    style={{
                      background:
                        msg.sender === 'caller'
                          ? 'rgba(255,255,255,0.1)'
                          : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      color: msg.sender === 'caller' ? '#E2E8F0' : '#fff',
                      border:
                        msg.sender === 'caller'
                          ? '1px solid rgba(255,255,255,0.08)'
                          : 'none',
                      borderBottomLeftRadius: msg.sender === 'caller' ? '4px' : '16px',
                      borderBottomRightRadius: msg.sender === 'caller' ? '16px' : '4px',
                      boxShadow:
                        msg.sender === 'katie'
                          ? '0 4px 12px rgba(37,99,235,0.25)'
                          : '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleMessages.length > 0 && visibleMessages.length < messages.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end"
              >
                <div className="flex gap-1 px-3 py-2.5 rounded-2xl bg-white/5">
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                  />
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                  />
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Call controls */}
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="flex items-center justify-center gap-6">
              <CallButton
                label="Mute"
                color="#64748B"
                bg="rgba(100,116,139,0.2)"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                }
              />
              <CallButton
                label="End"
                color="#EF4444"
                bg="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a1 1 0 0 1 1.42 0l2.84 2.84a1 1 0 0 1 0 1.42l-2.12 2.12a1 1 0 0 1-1.42 0l-1.27-1.27a16 16 0 0 1-3.41-2.6" />
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9H21" />
                  </svg>
                }
              />
              <CallButton
                label="Speaker"
                color="#64748B"
                bg="rgba(100,116,139,0.2)"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for call pulse */}
      <style>{`
        @keyframes call-pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </div>
  );
}
