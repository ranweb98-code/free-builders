import { useState } from 'react';
import Stepper, { Step } from './Stepper/Stepper';

async function submitToWeb3Forms({ name, phone, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error(
      'שליחת מייל לא הוגדרה באתר (חסר מפתח). אפשר ליצור קשר בוואטסאפ.'
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
      subject: `פנייה חדשה מהאתר — ${name}`,
      name,
      phone,
      message,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'השליחה נכשלה. נסה שוב מאוחר יותר.');
  }
}

export default function ContactStepper() {
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
      alert('נא להזין שם מלא');
      return false;
    }
    if (step === 2 && !formData.phone.trim()) {
      alert('נא להזין מספר טלפון');
      return false;
    }
    if (step === 3 && !formData.message.trim()) {
      alert('נא לכתוב תיאור קצר');
      return false;
    }
    return true;
  };

  return (
    <div dir="rtl" style={{ textAlign: 'right' }}>
      <Stepper
        initialStep={1}
        onFinalStepCompleted={handleComplete}
        onBeforeNext={handleBeforeNext}
        backButtonText="חזור"
        nextButtonText="המשך"
      >
        <Step>
          <h3 style={{ marginBottom: '1rem' }}>מה שמך?</h3>
          <label>
            שם מלא
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="הכנס את שמך"
              required
            />
          </label>
        </Step>

        <Step>
          <h3 style={{ marginBottom: '1rem' }}>איך אפשר ליצור איתך קשר?</h3>
          <label>
            מספר טלפון
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="050-1234567"
              required
            />
          </label>
        </Step>

        <Step>
          <h3 style={{ marginBottom: '1rem' }}>מה תרצה שנבנה יחד?</h3>
          <label>
            תיאור קצר
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder="ספר לי על הפרויקט שלך..."
              required
            />
          </label>
        </Step>

        <Step>
          <h3 style={{ marginBottom: '1rem', color: '#7cff67' }}>תודה! 🚀</h3>
          <p>אחזור אליך בהקדם.</p>
        </Step>
      </Stepper>
    </div>
  );
}
