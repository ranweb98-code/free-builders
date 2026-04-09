import { useState } from 'react';
import Stepper, { Step } from './Stepper/Stepper';

async function submitToWeb3Forms({ name, phone, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error(
      'Email sending is not configured (missing access key). You can reach out on WhatsApp instead.'
    );
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `PITI — New inquiry from ${name}`,
      name,
      phone,
      message,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Something went wrong. Please try again later.');
  }
}

export default function ContactStepper({ theme = 'dk' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    await submitToWeb3Forms(formData);
  };

  const handleBeforeNext = (step) => {
    if (step === 1 && !formData.name.trim()) {
      alert('Please enter your full name');
      return false;
    }
    if (step === 2 && !formData.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    if (step === 3 && !formData.message.trim()) {
      alert('Please add a short description');
      return false;
    }
    return true;
  };

  const wrapperClass = theme === 'brutal' ? 'brutal-stepper-theme' : 'dk-stepper-theme';

  return (
    <div className={wrapperClass} dir="ltr" style={{ textAlign: 'left' }}>
      <Stepper
        initialStep={1}
        onFinalStepCompleted={handleComplete}
        onBeforeNext={handleBeforeNext}
        backButtonText="Back"
        nextButtonText="Continue"
        submittingText="Sending..."
      >
        <Step>
          <h3 style={{ marginBottom: '1rem' }}>What&apos;s your name?</h3>
          <label>
            Full name
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
        </Step>

        <Step>
          <h3 style={{ marginBottom: '1rem' }}>How can I reach you?</h3>
          <label>
            Phone number
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 555 000 0000"
              required
            />
          </label>
        </Step>

        <Step>
          <h3 style={{ marginBottom: '1rem' }}>What should we build?</h3>
          <label>
            Short brief
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder="Tell me about your project, timeline, and goals…"
              required
            />
          </label>
        </Step>

        <Step>
          <h3 style={{ marginBottom: '1rem', color: 'var(--accent, #ccff00)' }}>Thank you!</h3>
          <p>I&apos;ll get back to you as soon as I can.</p>
        </Step>
      </Stepper>
    </div>
  );
}
