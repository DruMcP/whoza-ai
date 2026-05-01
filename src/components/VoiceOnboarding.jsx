import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createVoiceConfig, activateDivert, triggerTestCall } from '../services/voiceService';
import Header from './Header';
import Footer from './Footer';
import Icon from './icons/Icon';

const tradeTypes = [
  'plumber', 'electrician', 'builder', 'roofer', 'hvac', 
  'carpenter', 'painter', 'landscaper', 'locksmith', 'glazier',
  'plasterer', 'tiler', 'flooring', 'insulation', 'security'
];

const personas = [
  { id: 'Katie', name: 'Katie', gender: 'female', description: 'Warm, friendly female assistant' },
  { id: 'Mark', name: 'Mark', gender: 'male', description: 'Professional, reliable male assistant' },
];

const voiceGenders = [
  { id: 'female', name: 'Female Voice', description: 'Natural-sounding female AI voice' },
  { id: 'male', name: 'Male Voice', description: 'Natural-sounding male AI voice' },
];

const ukVoices = [
  { id: 'trillet_female', name: 'Sarah', gender: 'female', description: 'Professional British female (default)' },
  { id: 'trillet_male', name: 'James', gender: 'male', description: 'Professional British male' },
  { id: 'elevenlabs_natural', name: 'Alex', gender: 'male', description: 'Warm, natural British accent' },
];

const stepLabels = [
  { number: '1', title: 'Business Profile', subtitle: 'Tell us about your trade' },
  { number: '2', title: 'Voice Settings', subtitle: 'How should your AI sound?' },
  { number: '3', title: 'Activate', subtitle: 'Divert your calls' }
];

export default function VoiceOnboarding() {
  const { userData } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voiceConfig, setVoiceConfig] = useState(null);
  const [testCallStatus, setTestCallStatus] = useState('idle');

  // Step 1 form state
  const [businessName, setBusinessName] = useState(userData?.business_name || '');
  const [tradeType, setTradeType] = useState('');
  const [services, setServices] = useState('');
  const [postcodes, setPostcodes] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [emergencyRate, setEmergencyRate] = useState('');
  const [calloutFee, setCalloutFee] = useState('');

  // Step 2 form state
  const [selectedPersona, setSelectedPersona] = useState('Katie');
  const [selectedVoiceGender, setSelectedVoiceGender] = useState('female');
  const [selectedVoice, setSelectedVoice] = useState('trillet_female');
  const [forwardNumber, setForwardNumber] = useState('');
  const [calendarType, setCalendarType] = useState('google');
  const [smsSummary, setSmsSummary] = useState(true);
  const [whatsappSummary, setWhatsappSummary] = useState(true);

  // Auto-sync voice gender when persona changes (user can override)
  const handlePersonaChange = (personaId) => {
    setSelectedPersona(personaId);
    const persona = personas.find(p => p.id === personaId);
    if (persona) {
      setSelectedVoiceGender(persona.gender);
      // Also update voice to match gender
      const matchingVoice = ukVoices.find(v => v.gender === persona.gender);
      if (matchingVoice) setSelectedVoice(matchingVoice.id);
    }
  };

  const handleStep1Submit = async () => {
    if (!businessName || !tradeType) {
      setError('Please fill in your business name and trade type');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleStep2Submit = async () => {
    if (!forwardNumber) {
      setError('Please enter your mobile number for emergency transfers');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const result = await createVoiceConfig(userData.id, {
        business_name: businessName,
        trade_type: tradeType,
        services: services.split(',').map(s => s.trim()).filter(Boolean),
        postcodes: postcodes.split(',').map(p => p.trim().toUpperCase()).filter(Boolean),
        pricing: {
          hourly_rate: hourlyRate ? parseInt(hourlyRate) : null,
          emergency_rate: emergencyRate ? parseInt(emergencyRate) : null,
          callout_fee: calloutFee ? parseInt(calloutFee) : null
        },
        persona_name: selectedPersona,
        voice_profile: selectedVoice.startsWith('elevenlabs') ? 'elevenlabs' : 'trillet_ai',
        voice_gender: selectedVoiceGender,
        language: 'en-GB',
        calendar_type: calendarType,
        forward_number: forwardNumber,
        sms_summary: smsSummary,
        whatsapp_summary: whatsappSummary
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setVoiceConfig(result.voiceConfig);
      setStep(3);
    } catch (err) {
      setError(err.message || 'Failed to create voice configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleDivertConfirm = async () => {
    setLoading(true);
    try {
      const result = await activateDivert(userData.id);
      if (!result.success) {
        throw new Error(result.error);
      }
      setVoiceConfig(prev => ({ ...prev, divert_active: true }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestCall = async () => {
    setTestCallStatus('calling');
    try {
      const result = await triggerTestCall(userData.id);
      if (result.success) {
        setTestCallStatus('success');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setTestCallStatus('failed');
    }
  };

  return (
    <div className="voice-onboarding">
      <Header />
      <main>
        <div className="container" style={{ maxWidth: '640px', padding: '40px 20px' }}>
          {/* Progress */}
          <div className="onboarding-progress">
            {stepLabels.map((s, i) => (
              <div key={i} className={`progress-step ${step > i + 1 ? 'completed' : step === i + 1 ? 'active' : ''}`}>
                <div className="step-circle">{step > i + 1 ? '✓' : s.number}</div>
                <div className="step-label">
                  <div className="step-title">{s.title}</div>
                  <div className="step-subtitle">{s.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="error-banner" style={{ marginBottom: '20px' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Step 1: Business Profile */}
          {step === 1 && (
            <div className="onboarding-step">
              <h2>Let's set up your AI receptionist</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
                This takes about 5 minutes. The AI will answer calls exactly like a receptionist who knows your business.
              </p>

              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Smith & Sons Plumbing"
                />
              </div>

              <div className="form-group">
                <label>Trade Type</label>
                <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
                  <option value="">Select your trade...</option>
                  {tradeTypes.map(t => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Services You Offer (comma separated)</label>
                <input
                  type="text"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  placeholder="e.g., Emergency plumbing, Boiler repair, Bathroom fitting"
                />
              </div>

              <div className="form-group">
                <label>Postcodes You Cover (comma separated)</label>
                <input
                  type="text"
                  value={postcodes}
                  onChange={(e) => setPostcodes(e.target.value)}
                  placeholder="e.g., LS1, LS2, LS3, LS4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Hourly Rate (£)</label>
                  <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="45" />
                </div>
                <div className="form-group">
                  <label>Emergency Rate (£)</label>
                  <input type="number" value={emergencyRate} onChange={(e) => setEmergencyRate(e.target.value)} placeholder="90" />
                </div>
                <div className="form-group">
                  <label>Callout Fee (£)</label>
                  <input type="number" value={calloutFee} onChange={(e) => setCalloutFee(e.target.value)} placeholder="25" />
                </div>
              </div>

              <button className="btn-primary btn-large" onClick={handleStep1Submit} style={{ marginTop: '20px', width: '100%' }}>
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Voice Settings */}
          {step === 2 && (
            <div className="onboarding-step">
              <h2>How should your AI sound?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
                Choose your AI persona, voice gender, and set how emergencies are handled.
              </p>

              {/* Persona Name Dropdown */}
              <div className="form-group">
                <label>AI Persona Name</label>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  This is what callers will hear — "Hi, I'm [name], your assistant..."
                </p>
                <div className="persona-options" style={{ display: 'flex', gap: '12px' }}>
                  {personas.map(persona => (
                    <div
                      key={persona.id}
                      className={`voice-option ${selectedPersona === persona.id ? 'selected' : ''}`}
                      onClick={() => handlePersonaChange(persona.id)}
                      style={{ flex: 1, cursor: 'pointer', padding: '16px', borderRadius: '12px', border: '2px solid ' + (selectedPersona === persona.id ? 'var(--katie-blue)' : 'var(--color-neutral-300)') }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: persona.gender === 'female' ? 'var(--katie-blue-light)' : 'var(--color-neutral-100)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          fontWeight: 700,
                          color: persona.gender === 'female' ? 'var(--katie-blue)' : 'var(--color-text-primary)'
                        }}>
                          {persona.name[0]}
                        </div>
                        <div>
                          <div className="voice-name" style={{ fontWeight: 600, fontSize: '16px' }}>{persona.name}</div>
                          <div className="voice-desc" style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{persona.description}</div>
                        </div>
                      </div>
                      {selectedPersona === persona.id && <div style={{ textAlign: 'right', color: 'var(--katie-blue)' }}><Icon name="check" size={20} /></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Voice Gender Dropdown */}
              <div className="form-group" style={{ marginTop: '24px' }}>
                <label>Voice Gender</label>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Choose the gender of the AI voice callers will hear.
                </p>
                <select
                  value={selectedVoiceGender}
                  onChange={(e) => setSelectedVoiceGender(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-neutral-300)', fontSize: '16px', background: 'var(--color-white)' }}
                >
                  {voiceGenders.map(vg => (
                    <option key={vg.id} value={vg.id}>{vg.name} — {vg.description}</option>
                  ))}
                </select>
              </div>

              {/* Voice Provider */}
              <div className="form-group" style={{ marginTop: '24px' }}>
                <label>Voice Style</label>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Filtered by your selected voice gender.
                </p>
                <div className="voice-options" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {ukVoices.filter(v => v.gender === selectedVoiceGender).map(voice => (
                    <div
                      key={voice.id}
                      className={`voice-option ${selectedVoice === voice.id ? 'selected' : ''}`}
                      onClick={() => setSelectedVoice(voice.id)}
                      style={{ cursor: 'pointer', padding: '12px 16px', borderRadius: '8px', border: '2px solid ' + (selectedVoice === voice.id ? 'var(--katie-blue)' : 'var(--color-neutral-300)') }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div className="voice-name" style={{ fontWeight: 600 }}>{voice.name}</div>
                          <div className="voice-desc" style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{voice.description}</div>
                        </div>
                        {selectedVoice === voice.id && <Icon name="check" size={20} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label>Your Mobile Number (for emergencies)</label>
                <input
                  type="tel"
                  value={forwardNumber}
                  onChange={(e) => setForwardNumber(e.target.value)}
                  placeholder="07700 900123"
                />
                <small>The AI will transfer urgent calls to this number instantly.</small>
              </div>

              <div className="form-group">
                <label>Calendar Integration</label>
                <select value={calendarType} onChange={(e) => setCalendarType(e.target.value)}>
                  <option value="google">Google Calendar</option>
                  <option value="outlook">Microsoft Outlook</option>
                  <option value="servicem8">ServiceM8</option>
                  <option value="none">I'll add this later</option>
                </select>
              </div>

              <div className="form-group check-group">
                <label className="check-label">
                  <input type="checkbox" checked={smsSummary} onChange={(e) => setSmsSummary(e.target.checked)} />
                  Send me SMS summaries after each call
                </label>
              </div>

              <div className="form-group check-group">
                <label className="check-label">
                  <input type="checkbox" checked={whatsappSummary} onChange={(e) => setWhatsappSummary(e.target.checked)} />
                  Send me WhatsApp summaries after each call
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>
                  ← Back
                </button>
                <button className="btn-primary" onClick={handleStep2Submit} disabled={loading} style={{ flex: 2 }}>
                  {loading ? 'Setting up...' : `Create My ${selectedPersona} →`}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Divert Setup */}
          {step === 3 && voiceConfig && (
            <div className="onboarding-step">
              <div className="setup-complete">
                <Icon name="check-circle" size={48} />
                <h2>Your {selectedPersona} is ready!</h2>
                <p>Your whoza.ai number: <strong>{voiceConfig.trillet_number}</strong></p>
              </div>

              <div className="divert-instructions">
                <h3>Activate in 30 seconds</h3>
                <p>Call forwarding from your existing phone:</p>

                <div className="divert-code-box">
                  <code>**21*{voiceConfig.trillet_number}#</code>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(`**21*${voiceConfig.trillet_number}#`)}>
                    Copy
                  </button>
                </div>

                <p className="divert-note">
                  📱 <strong>To activate:</strong> Dial the code above, then press call.<br/>
                  📴 <strong>To pause:</strong> Dial <code>##21#</code><br/>
                  ✅ <strong>To check:</strong> Dial <code>*#21#</code>
                </p>
              </div>

              <div className="onboarding-actions">
                <button
                  className="btn-primary btn-large"
                  onClick={handleDivertConfirm}
                  disabled={loading}
                  style={{ width: '100%', marginBottom: '12px' }}
                >
                  {loading ? 'Activating...' : voiceConfig.divert_active ? `✓ Divert Active — ${selectedPersona} is live` : 'I\'ve Activated Divert'}
                </button>

                <button
                  className="btn-secondary"
                  onClick={handleTestCall}
                  disabled={testCallStatus === 'calling'}
                  style={{ width: '100%', marginBottom: '12px' }}
                >
                  {testCallStatus === 'idle' && `📞 Test My ${selectedPersona}`}
                  {testCallStatus === 'calling' && 'Calling...'}
                  {testCallStatus === 'success' && '✓ Test call sent! Check your phone.'}
                  {testCallStatus === 'failed' && '✗ Test failed. Try again.'}
                </button>

                <Link to="/portal" className="btn-outline" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                  Go to My Dashboard →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
