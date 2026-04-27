import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  findBusinessViaPlaces, 
  findCompetitorViaAI, 
  generateBlindSpotReasons,
  generateQuickFixes,
  saveCompetitorAnalysis,
  updateCompetitorAnalysis
} from '../services/competitorService';
import CompetitorResults from '../components/CompetitorResults';
import LoadingScreen from '../components/LoadingScreen';
import { ArrowRight, Search, Shield, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';

const popularTrades = [
  'Plumber', 'Electrician', 'Builder', 'Carpenter', 'Gardener',
  'Painter', 'Handyman', 'Roofer', 'Tiler', 'Locksmith',
  'Cleaner', 'Heating Engineer', 'Bathroom Fitter', 'Kitchen Fitter',
  'Flooring Specialist', 'Window Fitter', 'Fence Installer'
];

export default function CompetitorAnalysis() {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!businessName.trim()) {
      setError('Please enter your business name');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Step 1: Find business via Google Places
      const business = await findBusinessViaPlaces(businessName, location);
      
      if (!business) {
        setError('Could not find your business. Try adding your town or postcode.');
        setIsLoading(false);
        return;
      }
      
      // Step 2: Determine trade type
      const trade = inferTradeFromPlacesTypes(business.types, business.name);
      
      // Step 3: Find competitor via AI
      const competitorResult = await findCompetitorViaAI(trade, business.location);
      const competitorName = competitorResult.names[0];
      
      // Step 4: Find competitor details via Places (optional)
      const competitorDetails = await findBusinessViaPlaces(
        competitorName, 
        business.location
      );
      
      // Step 5: Generate blind spot reasons
      const reasons = generateBlindSpotReasons(
        business,
        competitorDetails || { name: competitorName },
        trade,
        business.location
      );
      
      // Step 6: Generate quick fixes
      const fixes = generateQuickFixes(trade, business.location);
      
      // Step 7: Save to database
      const saved = await saveCompetitorAnalysis({
        business_name: business.name,
        trade_type: trade,
        location: business.location,
        postcode: extractPostcode(business.address),
        website_url: business.website,
        submitted_business_id: business.place_id,
        competitor_name: competitorName,
        competitor_website: competitorDetails?.website || null,
        blind_spot_reasons: reasons,
        quick_fixes: fixes,
        is_submitted_business_recommended: 
          competitorName.toLowerCase().includes(business.name.toLowerCase()) ||
          business.name.toLowerCase().includes(competitorName.toLowerCase())
      });
      
      if (saved) {
        setAnalysisId(saved.id);
      }
      
      // Step 8: Show results
      setResults({
        business,
        trade,
        competitor: competitorDetails || { name: competitorName },
        competitorNames: competitorResult.names,
        reasons,
        fixes,
        source: competitorResult.source,
        aiRecommendation: !saved?.is_submitted_business_recommended
          ? `${competitorName} is currently the #1 recommendation`
          : `Good news — you're already appearing in AI recommendations!`
      });
      
    } catch (err) {
      // Error displayed in UI via setError
      setError('Something went wrong. Please try again or check your business name.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCapture = async (email) => {
    if (!analysisId || !email) return;
    
    await updateCompetitorAnalysis(analysisId, {
      user_email: email,
      email_captured: true,
      wants_full_report: true
    });
    
    // Redirect to signup/start flow
    navigate(`/start?email=${encodeURIComponent(email)}&source=competitor-analysis`);
  };

  // Show loading screen
  if (isLoading) {
    return (
      <>
        <SEO title="Analysing Your AI Visibility... | Whoza.ai" description="We're checking who AI recommends for your trade in your area. Get your free competitor analysis in 60 seconds." />
        <LoadingScreen 
          message="Analysing your AI visibility..."
          submessage="Checking who AI recommends for your trade in your area"
        />
      </>
    );
  }

  // Show results
  if (results) {
    return (
      <>
        <SEO title={`Your AI Visibility Results | ${results.business?.name || 'Competitor Analysis'} | Whoza.ai`} description={`See who AI recommends for ${results.trade || 'your trade'} in your area and get 3 quick fixes to start appearing in ChatGPT and Google AI results.`} />
        <CompetitorResults 
          results={results}
          onEmailCapture={handleEmailCapture}
        />
      </>
    );
  }

  // Show form
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title="Why Is My Business Not in ChatGPT? Free Competitor Analysis | Whoza.ai"
        description="Find out why AI search doesn't recommend your trade business. See who AI recommends for your trade in your area and get 3 quick fixes to start appearing in ChatGPT and Google AI results."
        schemas={[]}
      />
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-60" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-green-100 mb-8">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Free analysis — takes 60 seconds
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              See who's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                stealing your customers
              </span>{' '}
              from AI search
            </h1>
            
            <p className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto">
              When people ask ChatGPT or Google AI for a tradesperson in your area, 
              which business gets recommended? 
              <strong> We'll show you — and why it's not you.</strong>
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-12">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>No email required to see results</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Real competitor names from AI search</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="business-name" 
                  className="block text-lg font-semibold text-slate-900 mb-3"
                >
                  What's your business name?
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    id="business-name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Smith Plumbing Services"
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  We'll auto-detect your trade and location. Add your town if needed.
                </p>
              </div>

              <div>
                <label 
                  htmlFor="location-hint" 
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Town or postcode (optional — helps us find you faster)
                </label>
                <input
                  type="text"
                  id="location-hint"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Birmingham or B15 2TT"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl shadow-lg shadow-green-200 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analysing your business...
                  </>
                ) : (
                  <>
                    Show me my competitor
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-500">
                Free analysis • No signup required • Results in 60 seconds • No credit card required
              </p>

              {/* Trust indicators — text only, no oversized icons */}
              <p className="text-center text-xs text-slate-400 pt-2">
                GDPR Compliant · Secure via Stripe · ICO Registered
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8">
            How the competitor analysis works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">1. We search AI</h3>
              <p className="text-slate-600 text-sm">
                We ask ChatGPT, Perplexity, and Google AI which{' '}
                {businessName ? 'your trade' : 'tradesperson'}{' '}
                they recommend in your area.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">2. We name your competitor</h3>
              <p className="text-slate-600 text-sm">
                We show you the actual business name AI recommends — and 3 specific reasons why it's not you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">3. We show the fix</h3>
              <p className="text-slate-600 text-sm">
                Each reason comes with a 10-minute fix you can do today to start appearing in AI recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Trades */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <p className="text-center text-sm text-slate-500 mb-4">
            Popular searches right now
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTrades.map(trade => (
              <button
                key={trade}
                onClick={() => setBusinessName(`${trade} near me`)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-green-400 hover:text-green-700 transition-colors"
              >
                {trade}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper functions
function inferTradeFromPlacesTypes(types, name) {
  const tradeKeywords = {
    'plumber': ['plumber', 'plumbing', 'drain', 'pipe', 'boiler', 'heating'],
    'electrician': ['electrician', 'electrical', 'wiring', 'fuse', 'spark'],
    'builder': ['builder', 'building', 'construction', 'brick', 'renovation'],
    'carpenter': ['carpenter', 'carpentry', 'joiner', 'wood', 'cabinet'],
    'gardener': ['gardener', 'garden', 'landscape', 'lawn', 'tree'],
    'painter': ['painter', 'decorator', 'painting', 'paint'],
    'handyman': ['handyman', 'handyman', 'repair', 'fix', 'maintenance'],
    'roofer': ['roofer', 'roofing', 'roof', 'gutter'],
    'tiler': ['tiler', 'tiling', 'tile', 'bathroom'],
    'locksmith': ['locksmith', 'lock', 'key', 'security'],
    'cleaner': ['cleaner', 'cleaning', 'clean', 'domestic'],
    'heating engineer': ['hvac', 'air conditioning', 'heating', 'ventilation', 'boiler']
  };
  
  const nameLower = name.toLowerCase();
  const typesString = (types || []).join(' ').toLowerCase();
  
  for (const [trade, keywords] of Object.entries(tradeKeywords)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword) || typesString.includes(keyword)) {
        return trade;
      }
    }
  }
  
  return 'tradesperson';
}

function extractPostcode(address) {
  if (!address) return null;
  // UK postcode regex
  const match = address.match(/[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/i);
  return match ? match[0] : null;
}
