import { Children, cloneElement, isValidElement, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Stepper.css';

export function Step({ children }) {
  return <div className="step-default">{children}</div>;
}

export default function Stepper({
  children,
  initialStep = 1,
  onFinalStepCompleted,
  onBeforeNext,
  backButtonText = 'חזור',
  nextButtonText = 'המשך',
}) {
  const steps = Children.toArray(children).filter(Boolean);
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeStep = Math.min(Math.max(currentStep, 1), totalSteps);

  const goToStep = (n) => {
    setCurrentStep(Math.min(Math.max(n, 1), totalSteps));
  };

  const goBack = () => goToStep(safeStep - 1);

  const goNext = async () => {
    if (onBeforeNext) {
      const ok = onBeforeNext(safeStep);
      if (ok === false) return;
    }

    const isLastFormStep = safeStep === totalSteps - 1;

    if (isLastFormStep) {
      setIsSubmitting(true);
      try {
        const result = onFinalStepCompleted?.();
        if (result && typeof result.then === 'function') {
          await result;
        }
      } catch (e) {
        alert(e?.message || 'אירעה שגיאה בשליחה. נסה שוב או עדכן בוואטסאפ.');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
    }

    if (safeStep < totalSteps) {
      setCurrentStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  const isThankYouStep = safeStep === totalSteps;

  return (
    <div className="outer-container">
      <div className="step-circle-container">
        <div className="step-indicator-row">
          {steps.map((_, i) => {
            const stepNum = i + 1;
            const isActive = safeStep === stepNum;
            const isCompleted = safeStep > stepNum;
            return (
              <div key={stepNum} style={{ display: 'contents' }}>
                {i > 0 && (
                  <div className={`step-connector ${safeStep > i ? 'filled' : ''}`}>
                    <div className="step-connector-inner" />
                  </div>
                )}
                <button
                  type="button"
                  className={`step-indicator ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => goToStep(stepNum)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`שלב ${stepNum}`}
                >
                  <span className="step-indicator-inner">
                    {isCompleted ? (
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isActive ? (
                      <span className="active-dot" />
                    ) : (
                      <span>{stepNum}</span>
                    )}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={safeStep}
            className="step-content-wrap"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {isValidElement(steps[safeStep - 1])
              ? cloneElement(steps[safeStep - 1], { key: safeStep })
              : steps[safeStep - 1]}
          </motion.div>
        </AnimatePresence>

        <div className="footer-container">
          {isThankYouStep ? (
            <div className="footer-nav spread">
              <button type="button" className="back-button" onClick={goBack}>
                {backButtonText}
              </button>
            </div>
          ) : safeStep === 1 ? (
            <div className="footer-nav end">
              <button
                type="button"
                className="next-button"
                onClick={() => goNext()}
                disabled={isSubmitting}
              >
                {isSubmitting && safeStep === totalSteps - 1 ? 'שולח...' : nextButtonText}
              </button>
            </div>
          ) : (
            <div className="footer-nav spread">
              <button type="button" className="back-button" onClick={goBack} disabled={isSubmitting}>
                {backButtonText}
              </button>
              <button
                type="button"
                className="next-button"
                onClick={() => goNext()}
                disabled={isSubmitting}
              >
                {isSubmitting && safeStep === totalSteps - 1 ? 'שולח...' : nextButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
