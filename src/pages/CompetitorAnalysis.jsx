import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { generateOrganizationSchema, generateBreadcrumbSchema, getBaseUrl } from '../utils/schemaOrg';
import { ArrowRight, BarChart3, Mail, Calendar, Bell, Target, CheckCircle, Sparkles } from 'lucide-react';

const orgSchema = generateOrganizationSchema();
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: getBaseUrl() },
  { name: 'Competitor Analysis', url: `${getBaseUrl()}/competitor-analysis` }
]);

export default function CompetitorAnalysis() {
  return (
    <>
      <SEO 
        title="AI Competitor Analysis for Tradespeople | Rex by Whoza.ai"
        description="Rex monitors your competitors every month, tracks your AI visibility score, and sends you weekly actionable advice to outrank them on ChatGPT, Google AI, and Perplexity."
        schemas={[orgSchema, breadcrumbSchema]}
      />
      <Header />
      <main id="main-content" className="min-h-screen" style={{ paddingTop: '80px' }}>
        
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{ background: 'linear-gradient(135deg, var(--color-blue-100) 0%, var(--color-green-100) 50%, var(--color-amber-100) 100%)' }}
          />
          <div className="ds-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'var(--color-blue-100)', color: 'var(--color-blue)' }}>
                <Sparkles size={16} />
                <span className="text-sm font-semibold">Meet Rex — Your AI Visibility Analyst</span>
              </div>
              
              <h1 className="ds-heading-hero mb-4">
                Never Wonder What Your{' '}
                <span style={{ color: 'var(--color-blue)' }}>Competitors</span>{' '}
                Are Doing Again
              </h1>
              
              <p className="ds-body max-w-2xl mx-auto mb-8">
                Every month, Rex analyses who AI recommends for your trade in your area. 
                Every week, he sends you a personalised action plan to outrank them. 
                You just follow the steps.
              </p>
              
              <Link to="/pricing" className="ds-btn ds-btn-cta ds-btn-lg inline-flex items-center gap-2">
                Start Your Free Trial — See How Many Jobs Katie Books
                <ArrowRight size={18} />
              </Link>
              
              <p className="text-sm mt-4" style={{ color: 'var(--color-slate)' }}>
                No credit card required · Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* What Rex Does */}
        <section className="ds-section">
          <div className="ds-container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="ds-heading-2 mb-4">What Rex does for you</h2>
              <p className="ds-body">
                Rex is your dedicated AI visibility analyst. He monitors, scores, and advises — so you can focus on the job.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: BarChart3,
                  title: 'Monthly Competitor Report',
                  desc: 'Rex scans AI search engines every month and tells you exactly who is being recommended for your trade in your area — and why.',
                  color: 'var(--color-blue)',
                  bg: 'var(--color-blue-100)',
                },
                {
                  icon: Target,
                  title: 'AI Visibility Score',
                  desc: 'A single score that tracks how likely ChatGPT, Google AI, and Perplexity are to recommend your business. Watch it climb as you take action.',
                  color: 'var(--color-green)',
                  bg: 'var(--color-green-100)',
                },
                {
                  icon: Mail,
                  title: 'Weekly Action Plan',
                  desc: 'Every Monday, Rex emails you 3–5 specific, 10-minute tasks to improve your score. No guesswork. Just follow the steps.',
                  color: 'var(--color-amber)',
                  bg: 'var(--color-amber-100)',
                },
              ].map((item, i) => (
                <div key={i} className="ds-card text-center">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: item.bg, color: item.color }}
                  >
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-navy)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="ds-section ds-bg-offwhite">
          <div className="ds-container">
            <h2 className="ds-heading-2 text-center mb-12">How it works</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {[
                {
                  step: '01',
                  title: 'Rex scans the AI landscape',
                  desc: 'Every month, Rex checks who ChatGPT, Google AI, and Perplexity recommend for your trade in your postcode. He identifies your top 3 competitors and reverse-engineers why they rank.',
                },
                {
                  step: '02',
                  title: 'You get your score and report',
                  desc: 'Rex calculates your AI Visibility Score (0–100) and emails you a full competitor report: who is winning, what they are doing right, and where they are vulnerable.',
                },
                {
                  step: '03',
                  title: 'Weekly tasks arrive every Monday',
                  desc: 'Rex breaks down the report into bite-sized, 10-minute tasks. Update your Google Business Profile, add an FAQ page, fix a directory listing — one task at a time, score climbs every week.',
                },
                {
                  step: '04',
                  title: 'Watch your score climb',
                  desc: 'Your dashboard shows your score history. You will see the line go up as you complete tasks. Rex also alerts you if a competitor suddenly jumps ahead — so you never get caught off guard.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                    style={{ background: 'var(--color-navy)', color: 'var(--color-white)' }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--color-navy)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="ds-section">
          <div className="ds-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="ds-heading-2 text-center mb-12">What's included in every plan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Monthly competitor analysis report',
                  'AI Visibility Score tracking',
                  'Weekly personalised action plan',
                  'Competitor movement alerts',
                  'Directory listing audit',
                  'Review strategy recommendations',
                  'Website content suggestions',
                  'Google Business Profile tips',
                  'Priority support from Rex',
                  'Unlimited score re-checks',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--color-offwhite)' }}>
                    <CheckCircle size={18} style={{ color: 'var(--color-green)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-navy)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="ds-section ds-bg-offwhite">
          <div className="ds-container">
            <h2 className="ds-heading-2 text-center mb-12">Your AI team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: 'Katie or Mark',
                  role: 'AI Voice Agent',
                  desc: 'Answers every call 24/7. Qualifies leads, books appointments, sends WhatsApp summaries, and patches through emergencies. You choose the name and voice.',
                  color: 'var(--color-blue)',
                  bg: 'var(--color-blue-100)',
                },
                {
                  name: 'Rex',
                  role: 'AI Visibility Analyst',
                  desc: 'Monitors your competitors monthly. Tracks your AI Visibility Score. Sends weekly action plans to outrank them on ChatGPT, Google AI, and Perplexity.',
                  color: 'var(--color-green)',
                  bg: 'var(--color-green-100)',
                },
                {
                  name: 'Claire',
                  role: 'Review Collector',
                  desc: 'Automatically follows up with customers after every job. Collects reviews, manages your reputation, and alerts you to negative feedback before it spreads.',
                  color: 'var(--color-amber)',
                  bg: 'var(--color-amber-100)',
                },
              ].map((persona, i) => (
                <div key={i} className="ds-card text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                    style={{ background: persona.bg, color: persona.color }}
                  >
                    {persona.name[0]}
                  </div>
                  <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--color-navy)' }}>
                    {persona.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: persona.color }}>
                    {persona.role}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                    {persona.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ds-section" style={{ background: 'var(--color-navy)' }}>
          <div className="ds-container text-center">
            <h2 className="ds-heading-2 mb-4" style={{ color: 'var(--color-white)' }}>
              Stop guessing. Start knowing.
            </h2>
            <p className="ds-body mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-white)', opacity: 0.8 }}>
              Your competitors are already being recommended by AI. Rex makes sure you are too — with data, not guesswork.
            </p>
            <Link 
              to="/pricing" 
              className="ds-btn ds-btn-cta ds-btn-lg inline-flex items-center gap-2"
              style={{ background: 'var(--color-white)', color: 'var(--color-navy)' }}
            >
              See Plans & Pricing
              <ArrowRight size={18} />
            </Link>
            <p className="text-sm mt-4" style={{ color: 'var(--color-white)', opacity: 0.6 }}>
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="ds-section ds-bg-offwhite">
          <div className="ds-container" style={{ maxWidth: '800px' }}>
            <h2 className="ds-heading-2 text-center mb-12">Questions about competitor analysis</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What is an AI Visibility Score?',
                  a: 'It is a score from 0–100 that measures how likely ChatGPT, Google AI, and Perplexity are to recommend your business when someone asks for a tradesperson in your area. Rex calculates it based on your directory presence, reviews, website signals, and local citations.',
                },
                {
                  q: 'How does Rex find my competitors?',
                  a: 'Rex queries the same AI search engines your customers use — ChatGPT, Perplexity, Google AI — and asks who they recommend for your trade in your postcode. He then cross-references this with directory data to build an accurate competitor map.',
                },
                {
                  q: 'What kind of tasks does Rex send me?',
                  a: 'Simple, 10-minute tasks you can do on your phone: update your Google Business Profile, reply to a review, add an FAQ to your website, fix a directory listing, or update your service descriptions. Each task is designed to directly improve your AI Visibility Score.',
                },
                {
                  q: 'How often do I get reports?',
                  a: 'You get a full competitor analysis report every month, plus a weekly action plan every Monday. You also get instant alerts if Rex detects a major competitor movement — like a rival suddenly being recommended by AI where they were not before.',
                },
                {
                  q: 'Is this included in all plans?',
                  a: 'Yes. Rex is included in every whoza.ai plan starting at £59/month. Capture gives you basic call capture. Convert adds light Rex insights — AI Visibility Score and monthly report. Grow and above add full competitor tracking across multiple locations and deeper website analysis.',
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Absolutely. No contracts, no setup fees, no cancellation charges. You also get a 30-day money-back guarantee if you are not happy with the insights Rex provides.',
                },
              ].map((faq, i) => (
                <div key={i} className="ds-card">
                  <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-navy)' }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-slate)' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
