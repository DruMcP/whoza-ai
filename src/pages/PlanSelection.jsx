import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, Star, Shield, ArrowRight, Sparkles, Zap, Users, Phone, Globe } from 'lucide-react';

const BUNDLE_PLANS = [
  {
    id: 'solo',
    name: 'Solo',
    price: 69,
    minutes: 300,
    description: 'Perfect for one-person trades',
    features: [
      'AI Voice Agent (300 min/month)',
      'AI Visibility Score',
      'Weekly Tasks from Rex',
      'Competitor Monitoring',
      'WhatsApp Call Summaries',
      'Spam Blocking',
    ],
    popular: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: 129,
    minutes: 600,
    description: 'For growing trade businesses',
    features: [
      'AI Voice Agent (600 min/month)',
      'AI Visibility Score',
      'Weekly Tasks from Rex',
      'Competitor Monitoring',
      'WhatsApp + SMS Summaries',
      'Spam Blocking',
      'Emergency Call Transfer',
      'Review Requests',
    ],
    popular: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 219,
    minutes: 1200,
    description: 'For multi-trade operations',
    features: [
      'AI Voice Agent (1200 min/month)',
      'AI Visibility Score',
      'Priority Task Generation',
      '5 Competitor Tracking',
      'WhatsApp + SMS Summaries',
      'Spam Blocking',
      'Emergency Call Transfer',
      'Review Requests',
      'Calendar Integration',
    ],
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    minutes: 3000,
    description: 'For teams with 5+ staff',
    features: [
      'AI Voice Agent (3000 min/month)',
      'AI Visibility Score',
      'Custom AI Training',
      'Unlimited Competitor Tracking',
      'WhatsApp + SMS Summaries',
      'Spam Blocking',
      'Emergency Call Transfer',
      'Review Requests',
      'Calendar Integration',
      'Dedicated Support',
    ],
    popular: false,
  },
];

export default function PlanSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, loading: authLoading } = useAuth();
  const toast = useToast();
  const [selectedPlan, setSelectedPlan] = useState('business');
  const [loading, setLoading] = useState(false);
  const [trialMode, setTrialMode] = useState(true);

  const enableVoice = import.meta.env.VITE_ENABLE_VOICE === 'true';
  const enableTrialNoCard = import.meta.env.VITE_ENABLE_TRIAL_NO_CARD === 'true';

  useEffect(() => {
    if (!authLoading && !userData) {
      navigate('/start');
    }
  }, [userData, authLoading, navigate]);

  const handleStartTrial = async (planId) => {
    setLoading(true);
    try {
      const plan = BUNDLE_PLANS.find(p => p.id === planId);
      if (!plan) throw new Error('Invalid plan selected');

      // 1. Create trial subscription in database
      const { error: trialError } = await supabase
        .from('trials')
        .upsert({
          user_id: userData.id,
          plan_id: planId,
          plan_name: plan.name,
          status: 'active',
          trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          minutes_included: plan.minutes,
          minutes_used: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (trialError) throw trialError;

      // 2. Update user record
      await supabase
        .from('users')
        .update({
          subscription_tier: planId,
          subscription_status: 'trial',
          trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', userData.id);

      toast.success(`Your ${plan.name} trial starts now! 14 days free.`);

      // 3. Redirect to voice onboarding if voice is enabled
      if (enableVoice) {
        navigate('/voice/setup');
      } else {
        navigate('/portal');
      }
    } catch (err) {
      console.error('Trial setup error:', err);
      toast.error(err.message || 'Failed to start trial. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaidPlan = (planId) => {
    navigate('/checkout', { state: { selectedPlan: planId, bundle: true } });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="py-12 md:py-20">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Choose your whoza.ai plan
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              AI Voice + AI Visibility together. Every plan includes both.
            </p>
          </div>

          {/* Trial Toggle */}
          {enableTrialNoCard && (
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-slate-200">
                <button
                  onClick={() => setTrialMode(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    trialMode 
                      ? 'bg-green-500 text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🎁 14-Day Free Trial
                </button>
                <button
                  onClick={() => setTrialMode(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    !trialMode 
                      ? 'bg-green-500 text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pay Monthly
                </button>
              </div>
            </div>
          )}

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {BUNDLE_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl border-2 p-6 transition-all hover:shadow-lg relative ${
                  selectedPlan === plan.id 
                    ? 'border-green-500 shadow-lg' 
                    : 'border-slate-200'
                } ${plan.popular ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-500 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900">
                    £{plan.price}
                    <span className="text-sm font-normal text-slate-500">/mo</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {plan.minutes} minutes included
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {trialMode && enableTrialNoCard ? (
                  <button
                    onClick={() => handleStartTrial(plan.id)}
                    disabled={loading}
                    className={`w-full py-3 font-semibold rounded-lg transition-colors ${
                      plan.popular
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'border-2 border-green-500 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {loading && selectedPlan === plan.id 
                      ? 'Starting...' 
                      : `Start ${plan.name} Trial`
                    }
                  </button>
                ) : (
                  <button
                    onClick={() => handlePaidPlan(plan.id)}
                    className={`w-full py-3 font-semibold rounded-lg transition-colors ${
                      plan.popular
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'border-2 border-green-500 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Trust */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 flex-wrap">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> No credit card required
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> Cancel anytime
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> 30-day money-back guarantee
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              All prices include VAT. Your AI voice agent will be ready in under 5 minutes after signup.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
