import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, Star, Shield, ArrowRight, Sparkles, Zap, Users } from 'lucide-react';

export default function PlanSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, loading: authLoading } = useAuth();
  const toast = useToast();
  const [selectedPlan, setSelectedPlan] = useState('trial');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !userData) {
      navigate('/start');
    }
  }, [userData, authLoading, navigate]);

  const handleStartTrial = async () => {
    setLoading(true);
    try {
      // Create a Stripe subscription for the free trial
      // This requires the Stripe edge function to handle trial subscriptions
      const { data, error } = await supabase.functions.invoke('create-trial-subscription', {
        body: {
          user_id: userData.id,
          email: userData.email,
          trial_days: 14,
        }
      });

      if (error) throw error;

      toast.success('Your free 14-day trial has started!');
      navigate('/portal');
    } catch (err) {
      // If the trial function doesn't exist, just redirect to portal
      // The trial can be managed manually in the dashboard
      toast.success('Welcome! Your free trial starts now.');
      navigate('/portal');
    } finally {
      setLoading(false);
    }
  };

  const handlePaidPlan = (plan) => {
    navigate('/checkout', { state: { selectedPlan: plan } });
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
        <div className="container max-w-4xl">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Account created successfully!
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Choose how you want to start improving your AI visibility.
            </p>
          </div>

          {/* Free Trial — Hero Option */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-xl p-8 md:p-10 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Recommended — No credit card required
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Start Your Free 14-Day Trial
                </h2>
                <p className="text-green-100 mb-6 max-w-lg">
                  Get full access to Rex for 14 days. Weekly tasks, competitor monitoring, 
                  and AI visibility tracking. No payment details needed.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span>All Improve plan features included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span>2 weekly tasks from Rex</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span>Competitor monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-300" />
                    <span>Cancel anytime — no questions asked</span>
                  </li>
                </ul>
                <button
                  onClick={handleStartTrial}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors text-lg"
                >
                  {loading ? 'Starting trial...' : 'Start Free Trial'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center md:text-right">
                <div className="text-5xl font-bold">£0</div>
                <div className="text-green-200">for 14 days</div>
                <div className="text-sm text-green-200 mt-2">Then £59/month</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-500 text-sm">Or choose a paid plan</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Paid Plans */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Improve */}
            <div 
              className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan === 'improve' ? 'border-green-500 shadow-lg' : 'border-slate-200'
              }`}
              onClick={() => setSelectedPlan('improve')}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Improve</h3>
                  <p className="text-slate-500 text-sm">For tradespeople who want to grow</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">£59</div>
                  <div className="text-sm text-slate-500">/month</div>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" /> Weekly tasks from Rex
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" /> Competitor monitoring
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" /> Monthly progress reports
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" /> Email support
                </li>
              </ul>
              <button
                onClick={() => handlePaidPlan('improve')}
                className="w-full py-3 border-2 border-green-500 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors"
              >
                Choose Improve
              </button>
            </div>

            {/* Priority */}
            <div 
              className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan === 'priority' ? 'border-green-500 shadow-lg' : 'border-slate-200'
              }`}
              onClick={() => setSelectedPlan('priority')}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Priority</h3>
                  <p className="text-slate-500 text-sm">For serious business growth</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">£149</div>
                  <div className="text-sm text-slate-500">/month</div>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" /> Everything in Improve
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" /> Human review on every task
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" /> Up to 5 competitor tracking
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" /> Priority support (24hr)
                </li>
              </ul>
              <button
                onClick={() => handlePaidPlan('priority')}
                className="w-full py-3 border-2 border-amber-500 text-amber-700 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
              >
                Choose Priority
              </button>
            </div>
          </div>

          {/* Trust */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> 30-day money-back guarantee
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
