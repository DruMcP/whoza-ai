export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="progress-bar-container" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={steps.length} aria-label="Sign up progress">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`progress-step ${
              currentStep === step.id
                ? 'active'
                : currentStep > step.id
                ? 'completed'
                : ''
            }`}
            aria-current={currentStep === step.id ? 'step' : undefined}
          >
            <div className="progress-step-circle">
              {currentStep > step.id ? (
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <div className="progress-step-label">
              <div className="progress-step-title">{step.title}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`progress-step-line ${
                  currentStep > step.id ? 'completed' : ''
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
