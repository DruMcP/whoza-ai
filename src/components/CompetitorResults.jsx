import { useState } from 'react';
import { 
  ArrowRight, 
  Mail, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  Clock, 
  Star,
  ExternalLink,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function CompetitorResults({ results, onEmailCapture }) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [expandedReason, setExpandedReason] = useState(0);
  const [expandedFix, setExpandedFix] = useState(0);

  const { business, trade, competitor, reasons, fixes, aiRecommendation } = results;

  const isRecommended = results.aiRecommendation.includes('Good news');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      onEmailCapture(email);
      setEmailSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Result Banner */}
      <section className={`py-16 md:py-24 ${isRecommended ? 'bg-gradient-to-br from-emerald-50 to-green-50' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
        <div className="container max-w-4xl text-center">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            isRecommended 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {isRecommended 
              ? <CheckCircle className="w-5 h-5" />
              : <AlertTriangle className="w-5 h-5" />
            }
            <span className="font-semibold">
              {isRecommended 
                ? "You're already appearing in AI search!" 
                : "We found your AI blind spot"
              }
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            {isRecommended
              ? `Good news — ${business.name} is visible to AI`
              : `When AI recommends a ${trade} in ${business.location}, it suggests ${competitor.name}`
            }
          </h1>

          {!isRecommended && (
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Not {business.name}. Here's why AI trusts {competitor.name} more — and 3 quick fixes to change that.
            </p>
          )}

          {/* Comparison Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-700">AI Recommendation</h2>
              <span className="text-sm text-slate-500">Based on ChatGPT, Perplexity & Google AI</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Their Business */}
              <div className={`p-6 rounded-xl border-2 ${
                isRecommended ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isRecommended ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'
                  }`}>
                    {isRecommended ? <Star className="w-5 h-5" /> : <span className="text-sm font-bold">You</span>}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-900">{business.name}</p>
                    <p className="text-sm text-slate-500">{trade} in {business.location}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${isRecommended ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className="text-sm text-slate-600">{business.rating || 'N/A'} rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${isRecommended ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className="text-sm text-slate-600">{business.user_ratings_total || 0} reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${business.website ? 'text-emerald-500' : 'text-red-400'}`} />
                    <span className={`text-sm ${business.website ? 'text-slate-600' : 'text-red-600'}`}>
                      {business.website ? 'Website found' : 'No website detected'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Competitor */}
              <div className="p-6 rounded-xl border-2 border-green-400 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-900">{competitor.name}</p>
                    <p className="text-sm text-slate-500">AI's top recommendation</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-600">Higher review frequency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-600">Better directory presence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-600">More complete online profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blind Spot Reasons */}
      {!isRecommended && (
        <section className="py-16">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              3 reasons AI recommends {competitor.name} over you
            </h2>
            <p className="text-slate-600 text-center mb-12">
              Each comes with a 10-minute fix you can do today
            </p>

            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-green-300 transition-colors"
                >
                  <button
                    onClick={() => setExpandedReason(expandedReason === index ? -1 : index)}
                    className="w-full p-6 flex items-start gap-4 text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-amber-700">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                          {reason.pillar}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900">{reason.title}</h3>
                    </div>
                    {expandedReason === index 
                      ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    }
                  </button>

                  {expandedReason === index && (
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-slate-600 mb-4">{reason.explanation}</p>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-800 text-sm">Quick Fix ({reason.time})</span>
                        </div>
                        <p className="text-sm text-green-700">{reason.fix}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Fixes */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            Start appearing in AI recommendations this week
          </h2>
          <p className="text-slate-600 text-center mb-12">
            These are the exact tasks our AI employee Rex generates for members
          </p>

          <div className="space-y-4">
            {fixes.map((fix, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-green-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{fix.title}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        fix.impact === 'High' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {fix.impact} impact
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{fix.description}</p>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <Clock className="w-4 h-4" />
                      <span>{fix.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Gate / CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-emerald-700">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want the full 5-pillar improvement plan?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            {isRecommended 
              ? "You're already visible — let's make you #1. Get a personalised weekly task from Rex."
              : "We'll send you a complete action plan with week-by-week tasks to overtake your competitor."
            }
          </p>

          {!emailSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:ring-4 focus:ring-green-300 text-slate-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  Get my plan
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-green-200 mt-3">
                Free analysis • No credit card • 14-day trial
              </p>
            </form>
          ) : (
            <div className="bg-white rounded-xl p-8 max-w-lg mx-auto text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your plan is ready!</h3>
              <p className="text-slate-600 mb-6">
                We've saved your competitor analysis. Now create your account to get week-by-week tasks from Rex.
              </p>
              <button
                onClick={() => onEmailCapture(email)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
              >
                Continue to your plan
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-slate-500 mt-4">
                Start your free 14-day trial — no credit card required
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="text-sm text-slate-500 mb-4">Trusted by tradespeople across the UK</p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              ICO Registered
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              GDPR Compliant
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              5.0/5 Google Reviews
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
