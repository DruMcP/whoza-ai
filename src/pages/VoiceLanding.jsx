import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/icons/Icon';
import SEO from '../components/SEO';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../utils/schemaOrg';
import VoiceDemoPlayer from '../components/VoiceDemoPlayer';
import { useAuth } from '../contexts/AuthContext';

const voiceFeatures = [
  {
    icon: 'phone',
    title: 'Katie or Mark Answers Every Call 24/7',
    description: 'Never miss a job again. Your AI voice agent works while you sleep, eat, and work on the tools. You choose the name and voice.'
  },
  {
    icon: 'calendar',
    title: 'Books Jobs Into Your Diary',
    description: 'Katie checks your availability and books appointments directly into Google Calendar or Outlook. No back-and-forth.'
  },
  {
    icon: 'shield',
    title: 'Filters Spam & Time-Wasters',
    description: 'PPI calls, cold callers, and tyre-kickers are blocked automatically. You only get qualified enquiries.'
  },
  {
    icon: 'zap',
    title: 'Handles Emergencies Instantly',
    description: '"Burst pipe" or "no heating" triggers instant live transfer to your mobile. Katie recognises emergencies and patches you through immediately.'
  },
  {
    icon: 'message-circle',
    title: 'Sends WhatsApp Summaries',
    description: 'After every call, Katie sends you a full summary: who called, what they wanted, and what she did.'
  },
  {
    icon: 'smartphone',
    title: 'Works With Your Existing Number',
    description: 'No new phone needed. Just dial **21*[your whoza.ai number]# from your mobile. Turn it on and off anytime.'
  }
];

const howItWorksSteps = [
  {
    number: '1',
    title: 'Build Your Profile',
    description: 'Tell Katie your business name, trade, services, pricing, and the postcodes you cover. Choose whether you want Katie or Mark as your voice agent. Takes 10 minutes.'
  },
  {
    number: '2',
    title: 'Divert Your Calls',
    description: 'Dial a short code on your phone — your calls forward to Katie or Mark when you\'re busy or after hours.'
  },
  {
    number: '3',
    title: 'Focus on the Job',
    description: 'Katie answers, qualifies, books, and summarises. You check your phone between jobs and see a full diary.'
  }
];

const testimonials = [
  {
    name: 'Mark',
    trade: 'Plumber',
    location: 'Leeds',
    quote: 'I was losing jobs on roofs. Now Alex answers every call. I booked three emergency callouts last week I would have missed.',
    metric: '3 extra jobs/week'
  },
  {
    name: 'Sarah',
    trade: 'Electrician',
    location: 'Birmingham',
    quote: 'Evenings were just returning calls. Now I finish at 5pm and the AI handles everything until morning. Game changer.',
    metric: '2 hours saved/day'
  },
  {
    name: 'Dave',
    trade: 'Builder',
    location: 'Manchester',
    quote: 'I thought customers would hate speaking to a robot. They literally cannot tell. The voice is proper natural.',
    metric: '100% booking rate'
  }
];

const pricingTiers = [
  {
    name: 'Capture',
    price: 59,
    period: '/month',
    description: 'Never miss a lead. Basic Katie for call capture, limited usage. No Rex, no advanced Claire.',
    minutes: 'Katie/Mark: 100 minutes included',
    popular: false,
    cta: 'Start Free Trial',
    features: [
      'Katie/Mark: 100 min voice answering',
      'Katie/Mark: 24/7 call coverage',
      'Katie/Mark: WhatsApp summaries',
      'Basic call capture & qualification',
      'Claire: Review monitoring',
      '2 directory listings'
    ]
  },
  {
    name: 'Convert',
    price: 119,
    period: '/month',
    description: 'Where you want volume. Full Katie booking, Claire reviews, light Rex insights. Most popular.',
    minutes: 'Katie/Mark: 300 minutes included',
    popular: true,
    cta: 'Start Free Trial',
    features: [
      'Katie/Mark: 300 min voice answering',
      'Everything in Capture, plus:',
      'Katie/Mark: Calendar booking',
      'Rex: AI Visibility Score + monthly report',
      'Claire: Automated review requests',
      '5 directory listings',
      'Priority support'
    ]
  },
  {
    name: 'Grow',
    price: 199,
    period: '/month',
    description: 'Your real product. Full stack: Katie + Claire + Rex. Actionable insights, higher usage.',
    minutes: 'Katie/Mark: 800 minutes included',
    popular: false,
    cta: 'Start Free Trial',
    features: [
      'Katie/Mark: 800 min voice answering',
      'Everything in Convert, plus:',
      'Rex: Competitor tracking (10 locations)',
      'Rex: Actionable competitor insights',
      'Claire: Full review collection',
      '10 directory listings',
      'Team access (3 seats)',
      'Monthly strategy calls'
    ]
  },
  {
    name: 'Scale',
    price: 349,
    period: '/month',
    description: 'Fair use, not unlimited. Everything + priority optimisation, multi-location, fair use policy.',
    minutes: 'Katie/Mark: Fair use minutes included',
    popular: false,
    cta: 'Start Free Trial',
    features: [
      'Katie/Mark: Fair use voice answering',
      'Everything in Grow, plus:',
      'Rex: Priority optimisation + white-label',
      'Claire: Multi-brand review management',
      'Unlimited directory listings',
      'Custom AI training',
      'Dedicated account manager'
    ]
  }
];

export default function VoiceLanding() {
  const { user } = useAuth();
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqs = [
    {
      q: 'Will customers know it\'s an AI?',
      a: 'No. The voice is natural British English with natural pauses and inflection. Callers think they\'re speaking to a human receptionist.'
    },
    {
      q: 'Do I need a new phone number?',
      a: 'No. You keep your existing number. Just dial **21*[your whoza.ai number]# to forward calls. Turn it off anytime with ##21#.'
    },
    {
      q: 'What if there\'s a real emergency?',
      a: 'The AI is trained to recognise emergency keywords ("burst pipe", "no heating", "gas leak", etc.) and transfers immediately to your mobile.'
    },
    {
      q: 'How quickly can I set this up?',
      a: '10–15 minutes. No technical skills needed. Just answer questions about your business and dial the divert code.'
    },
    {
      q: 'What happens after the 14-day trial?',
      a: 'If you don\'t add a payment method, your number is released and service stops. No charges, no hassle. Add a card anytime to keep going.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. No contract. Cancel in your dashboard or email us — your service stops at the end of the current billing period.'
    }
  ];

  return (
    <div className="voice-landing">
      <SEO
        title="AI Voice Agent for Tradespeople | Never Miss a Call"
        description="Your AI receptionist answers every call 24/7, books jobs into your diary, filters spam, and transfers emergencies. 14-day free trial."
        canonical="/voice"
        schemas={[
          generateOrganizationSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'AI Voice Agent', url: '/voice' }
          ])
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="voice-hero">
        <div className="container">
          <div className="voice-hero-content">
            <div className="badge">🎙️ Now Available: AI Voice Agent</div>
            <h1>
              Never Miss a Call.
              <br />
              <span className="gradient-text">Never Miss a Job.</span>
            </h1>
            <p className="subtitle">
              Meet Katie (or Mark) — your AI voice agent who answers every call in your business name — 24/7, 
              weekends, bank holidays. She books jobs into your diary, filters spam, 
              transfers emergencies, and sends you WhatsApp summaries. All while you work on the tools.
              You choose the name and voice.
            </p>
            <div className="hero-cta-group">
              <Link to="/start" className="btn-primary btn-large">
                Start Your 14-Day Free Trial →
              </Link>
              <p className="trust-micro">No credit card • No setup fee • Cancel anytime</p>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">£24,000</span>
                <span className="stat-label">average lost per year to missed calls</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">of calls answered within 3 rings</span>
              </div>
              <div className="stat">
                <span className="stat-number">15 min</span>
                <span className="stat-label">setup time. No tech skills needed.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="container">
          <h2>See It In Action</h2>
          <p className="section-subtitle">A real call to a whoza.ai plumber. The AI books the job in under 60 seconds.</p>
          <div className="demo-card">
            <div className="demo-phone">
              <div className="call-timeline">
                <div className="call-event">
                  <span className="time">00:00</span>
                  <span className="event">📞 Incoming call from 07700 900123</span>
                </div>
                <div className="call-event ai">
                  <span className="time">00:02</span>
                  <span className="event">🤖 "Good afternoon, Smith & Sons Plumbing. Katie speaking. How can I help?"</span>
                </div>
                <div className="call-event caller">
                  <span className="time">00:05</span>
                  <span className="event">👤 "I've got a burst pipe under the sink. Water everywhere."</span>
                </div>
                <div className="call-event ai">
                  <span className="time">00:08</span>
                  <span className="event">🤖 "I'm sorry to hear that. Is it safe to turn off the stopcock? Don't worry if you're not sure — I can talk you through it."</span>
                </div>
                <div className="call-event caller">
                  <span className="time">00:15</span>
                  <span className="event">👤 "Yes I've turned it off. Can someone come today?"</span>
                </div>
                <div className="call-event ai">
                  <span className="time">00:18</span>
                  <span className="event">🤖 "Absolutely — we treat this as an emergency. What's your name and postcode?"</span>
                </div>
                <div className="call-event">
                  <span className="time">00:25</span>
                  <span className="event">📋 Name: James Wilson | Postcode: LS1 4HR</span>
                </div>
                <div className="call-event ai">
                  <span className="time">00:30</span>
                  <span className="event">🤖 "Thank you James. I'll send someone between 2pm and 4pm today. You'll get a text confirmation from Katie. Is that okay?"</span>
                </div>
                <div className="call-event caller">
                  <span className="time">00:35</span>
                  <span className="event">👤 "Yes perfect, thank you."</span>
                </div>
                <div className="call-event ai">
                  <span className="time">00:37</span>
                  <span className="event">🤖 "You're welcome. If anything changes, just call back and Katie will sort it. Take care."</span>
                </div>
                <div className="call-event result">
                  <span className="time">00:40</span>
                  <span className="event">✅ Job booked • SMS sent to customer • Calendar updated • WhatsApp summary sent to plumber</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Voice Demo */}
      <section className="demo-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-tag">Hear It In Action</span>
            <h2>Listen to a Real Call</h2>
            <p>90 seconds. A boiler breakdown enquiry. Booked, confirmed, summarised.</p>
          </div>
          <VoiceDemoPlayer />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>What Katie (or Mark) Does For You</h2>
          <p className="section-subtitle">Every feature designed specifically for UK tradespeople. You choose the name and voice.</p>
          <div className="features-grid">
            {voiceFeatures.map((feature, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">
                  <Icon name={feature.icon} size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <h2>Set Up In 3 Steps</h2>
          <p className="section-subtitle">No apps to install. No IT skills needed. No new phone.</p>
          <div className="steps-grid">
            {howItWorksSteps.map((step, i) => (
              <div className="step-card" key={i}>
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <div className="steps-cta">
            <Link to="/start" className="btn-primary btn-large">
              Start Your Free Trial — See How Many Jobs Katie Books →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <h2>Simple Pricing. Total Prices. No Hidden Fees.</h2>
          <p className="section-subtitle">All plans include AI Voice Agent + AI Visibility. VAT included.</p>
          <div className="pricing-grid">
            {pricingTiers.map((tier, i) => (
              <div className={`pricing-card ${tier.popular ? 'popular' : ''}`} key={i}>
                {tier.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{tier.name}</h3>
                <p className="tier-description">{tier.description}</p>
                <div className="price">
                  <span className="currency">£</span>
                  <span className="amount">{tier.price}</span>
                  <span className="period">{tier.period}</span>
                </div>
                <p className="minutes">{tier.minutes}</p>
                <ul className="feature-list">
                  {tier.features.map((feature, j) => (
                    <li key={j}>{feature}</li>
                  ))}
                </ul>
                <Link to="/start" className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="pricing-footnote">
            Enterprise plan available for multi-location businesses.{' '}
            <Link to="/contact">Contact us</Link> for custom pricing.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Tradespeople Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <p className="quote">"{t.quote}"</p>
                <div className="testimonial-meta">
                  <span className="name">{t.name}</span>
                  <span className="trade">{t.trade}</span>
                  <span className="location">{t.location}</span>
                </div>
                <div className="metric">{t.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div 
                className={`faq-item ${selectedFaq === i ? 'open' : ''}`} 
                key={i}
                onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-chevron">{selectedFaq === i ? '−' : '+'}</span>
                </div>
                {selectedFaq === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <h2>Stop Missing Calls. Start Booking Jobs.</h2>
          <p className="subtitle">14-day free trial. No credit card. No setup fee. Cancel anytime.</p>
          <Link to="/start" className="btn-primary btn-large">
            Start Your Free Trial — See How Many Jobs Katie Books →
          </Link>
          <p className="guarantee">
            💯 Guarantee: If whoza.ai doesn't book you at least one extra job in month one, month two is free.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
