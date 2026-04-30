import { useState, useRef, useEffect } from 'react';

export default function VoiceDemoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(90); // 90-second demo
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  // TODO: Replace with actual AI voice sample file
  // Placeholder: when real audio is available, update AUDIO_SRC
  const AUDIO_SRC = '/audio/voice-demo-sample.mp3';

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Fallback: simulate playback for demo without audio file
        simulatePlayback();
      });
      setIsPlaying(true);
    }
  };

  const simulatePlayback = () => {
    let currentProgress = 0;
    progressInterval.current = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= duration) {
        clearInterval(progressInterval.current);
        setIsPlaying(false);
        setProgress(0);
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (progress / duration) * 100;

  return (
    <div className="voice-demo-player">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={(e) => setProgress(Math.floor(e.target.currentTime))}
      />

      <div className="demo-header">
        <div className="demo-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
            <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Live Demo
        </div>
        <span className="demo-duration">{formatTime(duration)} sample</span>
      </div>

      <div className="demo-scenario">
        <strong>Scenario:</strong> A homeowner calls about a boiler breakdown.
        whoza.ai answers, books a slot, and sends a WhatsApp summary.
      </div>

      <div className="player-controls">
        <button
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <div className="progress-bar">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="time-display">
            {formatTime(progress)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="demo-transcript">
        <p className={isPlaying ? 'active' : ''}>
          <span className="speaker">👤 Caller:</span> "Hi, my boiler's broken. Do you do emergency repairs?"
        </p>
        <p className={progress > 15 && isPlaying ? 'active' : ''}>
          <span className="speaker ai">🤖 whoza.ai:</span> "Good afternoon! Yes, we handle emergency boiler repairs. I can check availability right now. What's your postcode?"
        </p>
        <p className={progress > 35 && isPlaying ? 'active' : ''}>
          <span className="speaker">👤 Caller:</span> "It's B31 2QT."
        </p>
        <p className={progress > 45 && isPlaying ? 'active' : ''}>
          <span className="speaker ai">🤖 whoza.ai:</span> "Perfect. I've got a slot tomorrow between 9am and 12pm, or this evening after 6pm. Which works better?"
        </p>
        <p className={progress > 65 && isPlaying ? 'active' : ''}>
          <span className="speaker">👤 Caller:</span> "Tomorrow morning please."
        </p>
        <p className={progress > 75 && isPlaying ? 'active' : ''}>
          <span className="speaker ai">🤖 whoza.ai:</span> "Done! You're booked for 10am tomorrow. I'll send a confirmation to this number and a WhatsApp reminder. Is there anything else?"
        </p>
      </div>
    </div>
  );
}
