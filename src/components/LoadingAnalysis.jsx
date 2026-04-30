import { motion } from 'framer-motion';
import { Loader2, Search, Brain, Target, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  { icon: Search, label: 'Finding your business...', delay: 0 },
  { icon: Brain, label: 'Analysing AI recommendations...', delay: 800 },
  { icon: Target, label: 'Checking competitor visibility...', delay: 1600 },
  { icon: FileText, label: 'Building your action plan...', delay: 2400 },
];

export default function LoadingAnalysis() {
  const [visibleSteps, setVisibleSteps] = useState([0]);

  useEffect(() => {
    const timers = steps.slice(1).map((step) =>
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, steps.indexOf(step)]);
      }, step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center ds-bg-offwhite px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Central orb */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-blue-100), rgba(59,130,246,0.15))',
                boxShadow: '0 0 40px rgba(59,130,246,0.2)',
              }}
            >
              <Loader2 size={36} className="animate-spin" style={{ color: 'var(--color-blue)' }} />
            </div>
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div
                className="w-3 h-3 rounded-full absolute"
                style={{
                  background: 'var(--color-blue)',
                  top: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: 0.6,
                }}
              />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
              <div
                className="w-2 h-2 rounded-full absolute"
                style={{
                  background: 'var(--color-amber)',
                  bottom: '-2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        </div>

        <h2
          className="text-center font-bold text-xl mb-2"
          style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-heading)' }}
        >
          Analysing your AI visibility...
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: 'var(--color-slate)' }}>
          Checking who AI recommends for your trade in your area
        </p>

        <div className="space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(i);
            const isDone = visibleSteps.length > i + 1;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: isDone ? 'var(--color-green-100)' : 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: isDone
                      ? 'var(--color-green)'
                      : isVisible && visibleSteps.length === i + 1
                      ? 'var(--color-blue-100)'
                      : 'var(--color-lightgray)',
                    transition: 'background 0.3s',
                  }}
                >
                  {isDone ? (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <Icon
                      size={18}
                      color={isVisible && visibleSteps.length === i + 1 ? 'var(--color-blue)' : 'var(--color-slate)'}
                      strokeWidth={1.8}
                    />
                  )}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isDone ? 'var(--color-green-600)' : 'var(--color-navy)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
