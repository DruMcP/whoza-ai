import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import Icon from './icons/Icon';

export default function InteractiveTaskPreview() {
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    group1: '',
    group2: '',
    group3: ''
  });

  const transitionToStep = (newStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setIsTransitioning(false);
    }, 300);
  };

  const handleTryTask = () => {
    transitionToStep(2);
  };

  const handleCompleteTask = () => {
    transitionToStep(3);
  };

  const handleMarkComplete = () => {
    transitionToStep(4);
  };

  const handleBack = () => {
    if (step > 1) {
      transitionToStep(step - 1);
    }
  };

  const handleReset = () => {
    setFormData({ group1: '', group2: '', group3: '' });
    transitionToStep(1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (step === 4 && !isTransitioning) {
      const duration = 2500;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        colors: ['#4ade80', '#22c55e', '#16a34a', '#9ef01a']
      };

      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step, isTransitioning]);

  return (
    <section className="interactive-task-preview-section section">
      <div className="container">
        <div className="task-preview-header">
          <h2>Try a Sample Task</h2>
          <p className="task-preview-subtitle">
            See how simple and effective Rex's weekly tasks are. No signup required.
          </p>
        </div>

        <div className="task-preview-container">
          <div className="task-preview-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
            <div className="progress-label">Step {step} of 4</div>
          </div>

          <div className={`task-preview-card ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {step === 1 && (
              <div className="task-step task-step-1">
                <div className="task-badge">
                  <Icon name="clock" size="16" />
                  <span>5-10 mins</span>
                </div>
                <h3 className="task-card-title">Sample Task: Find 10 Local Facebook Groups</h3>
                <p className="task-card-description">
                  Discover new customer hotspots by finding local Facebook groups where potential customers are looking for your services.
                </p>
                <div className="task-actions">
                  <button onClick={handleTryTask} className="button-primary">
                    Try This Task
                    <Icon name="arrow-right" size="18" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="task-step task-step-2">
                <div className="email-simulation">
                  <div className="email-header">
                    <div className="email-from">
                      <div className="rex-avatar">
                        <Icon name="sparkles" size="20" />
                      </div>
                      <div>
                        <div className="email-sender">Rex</div>
                        <div className="email-address">rex@whoza.ai</div>
                      </div>
                    </div>
                    <div className="email-subject">
                      <strong>Subject:</strong> Your Weekly Task
                    </div>
                  </div>

                  <div className="email-body">
                    <p>Hi there,</p>
                    <p>This week's task is to find 10 local Facebook groups where potential customers might be looking for your services.</p>

                    <div className="email-section">
                      <h4>Why this matters:</h4>
                      <ul>
                        <li>Find customers actively looking for your trade</li>
                        <li>Build presence where your customers are</li>
                      </ul>
                    </div>

                    <div className="email-section">
                      <h4>Your Task:</h4>
                      <ol>
                        <li>Open Facebook and search for groups in your area</li>
                        <li>Look for '[your town] community' or '[your town] recommendations'</li>
                        <li>Note down 10 relevant groups</li>
                      </ol>
                    </div>

                    <p>Ready to try? Click below to simulate completing this task.</p>
                  </div>

                  <div className="task-actions">
                    <button onClick={handleBack} className="button-ghost">
                      <Icon name="arrow-left" size="18" />
                      Back
                    </button>
                    <button onClick={handleCompleteTask} className="button-primary">
                      Complete This Task
                      <Icon name="arrow-right" size="18" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="task-step task-step-3">
                <h3 className="task-form-title">Log Your Groups</h3>
                <p className="task-form-description">
                  Enter just 3 groups to get a feel for the process (you'd normally find 10)
                </p>

                <form className="task-form" onSubmit={(e) => { e.preventDefault(); handleMarkComplete(); }}>
                  <div className="form-group">
                    <label htmlFor="group1">Group Name 1</label>
                    <input
                      type="text"
                      id="group1"
                      value={formData.group1}
                      onChange={(e) => handleInputChange('group1', e.target.value)}
                      placeholder="e.g., Manchester Community Group"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="group2">Group Name 2</label>
                    <input
                      type="text"
                      id="group2"
                      value={formData.group2}
                      onChange={(e) => handleInputChange('group2', e.target.value)}
                      placeholder="e.g., Local Recommendations UK"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="group3">Group Name 3</label>
                    <input
                      type="text"
                      id="group3"
                      value={formData.group3}
                      onChange={(e) => handleInputChange('group3', e.target.value)}
                      placeholder="e.g., Home Improvement Tips"
                      required
                    />
                  </div>

                  <div className="task-actions">
                    <button type="button" onClick={handleBack} className="button-ghost">
                      <Icon name="arrow-left" size="18" />
                      Back
                    </button>
                    <button type="submit" className="button-primary">
                      Mark as Complete
                      <Icon name="check" size="18" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 4 && (
              <div className="task-step task-step-4">
                <div className="success-icon">
                  <Icon name="check-circle" size="64" />
                </div>

                <h3 className="success-title">Task Complete!</h3>
                <p className="success-message">
                  Great job! You've just completed a real task that helps boost your online visibility. Rex sends you one of these simple, high-impact tasks every week.
                </p>

                <div className="success-cta">
                  <p className="success-question">Ready to get started with real tasks for your business?</p>
                  <div className="success-buttons">
                    <Link to="/start" className="button-primary">
                      Get Started Free
                      <Icon name="arrow-right" size="18" />
                    </Link>
                    <button onClick={handleReset} className="button-secondary">
                      Try Another Task
                    </button>
                  </div>
                  <button onClick={handleBack} className="back-link">
                    <Icon name="arrow-left" size="16" />
                    Go back to review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
