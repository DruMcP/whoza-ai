import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, TrendingUp, PoundSterling, MessageSquare, Calendar, Phone, Shield, Wrench } from 'lucide-react';

const testimonials = [
  {
    name: 'Mike Tanner',
    trade: 'Electrician',
    location: 'Birmingham',
    timeWithUs: '8 months',
    outcome: '+3 jobs/month',
    outcomeColor: '--katie-blue',
    outcomeIcon: 'trending',
    quote: "I was missing 4-5 calls a week while I was on jobs. Since switching to whoza.ai, every call gets answered. I've picked up 3 extra jobs this month alone — that's an extra £750 in my pocket.",
    rating: 5,
    photo: '/images/testimonial-mike.jpg',
  },
  {
    name: 'Sarah Hendricks',
    trade: 'Plumbing & Heating',
    location: 'Clapham, London',
    timeWithUs: '5 months',
    outcome: '£1,200/mo recovered',
    outcomeColor: '--rex-green',
    outcomeIcon: 'pound',
    quote: "Before whoza.ai, my voicemail was full by Friday. Now Katie books jobs while I'm under sinks. My diary's never been fuller and I'm not working any harder — just not missing enquiries.",
    rating: 5,
    photo: '/images/testimonial-sarah.jpg',
  },
  {
    name: "Dave O'Brien",
    trade: 'Roofing Contractor',
    location: 'Manchester',
    timeWithUs: '12 months',
    outcome: '4.9★ Google rating',
    outcomeColor: '--claire-amber',
    outcomeIcon: 'star',
    quote: "Claire's review follow-ups are automatic. I went from 12 reviews to 67 in six months. Customers mention it when they call — 'saw your five stars on Google.' That alone pays for the subscription.",
    rating: 5,
    photo: '/images/testimonial-dave.jpg',
  },
  {
    name: 'Aisha Patel',
    trade: 'Kitchen Fitter',
    location: 'Leeds',
    timeWithUs: '3 months',
    outcome: '+2 jobs/week',
    outcomeColor: '--katie-blue',
    outcomeIcon: 'trending',
    quote: "Rex showed me I wasn't listed on two directories my competitors were on. Fixed that in an afternoon. Next week I got a £4,200 kitchen refit from a ChatGPT recommendation. Mental.",
    rating: 5,
    photo: '/images/testimonial-aisha.jpg',
  },
  {
    name: 'Tom Walsh',
    trade: 'Builder & Carpenter',
    location: 'Glasgow',
    timeWithUs: '10 months',
    outcome: '£800/mo saved on VA',
    outcomeColor: '--rex-green',
    outcomeIcon: 'pound',
    quote: "I had a call answering service at £180 a month. whoza.ai costs less, answers 24/7, and actually books appointments into my calendar. Sacked the answering service after week two.",
    rating: 5,
    photo: '/images/testimonial-tom.jpg',
  },
  {
    name: 'Jenny Brooks',
    trade: 'Painter & Decorator',
    location: 'Bristol',
    timeWithUs: '6 months',
    outcome: 'Zero missed calls',
    outcomeColor: '--claire-amber',
    outcomeIcon: 'phone',
    quote: "I'm up ladders most days. Used to come down to 6 missed calls and a full voicemail. Now I get WhatsApp summaries within minutes. Customers think I have a secretary. I don't — I have Katie.",
    rating: 5,
    photo: '/images/testimonial-jenny.jpg',
  },
];

const OutcomeIcon = ({ type }) => {
  switch (type) {
    case 'trending':
      return <TrendingUp size={13} strokeWidth={2.5} />;
    case 'pound':
      return <PoundSterling size={13} strokeWidth={2.5} />;
    case 'star':
      return <Star size={13} strokeWidth={2.5} />;
    case 'phone':
      return <Phone size={13} strokeWidth={2.5} />;
    case 'calendar':
      return <Calendar size={13} strokeWidth={2.5} />;
    default:
      return <TrendingUp size={13} strokeWidth={2.5} />;
  }
};

const Photo = ({ photo, name }) => (
  <img
    src={photo}
    alt={`Photo of ${name}`}
    className="rounded-full flex-shrink-0"
    style={{
      width: 80,
      height: 80,
      objectFit: 'cover',
      border: '3px solid rgba(255,255,255,0.15)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    }}
  />
);

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const goTo = useCallback((index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-rotate every 6 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.92,
    }),
  };

  const current = testimonials[active];

  return (
    <section
      className="ds-section"
      style={{
        background: 'var(--navy-900)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--white) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="ds-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="ds-heading-2 mb-4"
            style={{ color: 'var(--white)' }}
          >
            What tradespeople say
          </h2>
          <p
            className="ds-body max-w-xl mx-auto"
            style={{ color: 'var(--slate-400)' }}
          >
            Real results from real tradespeople who stopped losing jobs to missed calls and invisible listings.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto"
          style={{ minHeight: 320 }}
        >
          {/* Prev/Next arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--white)',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--white)',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards container */}
          <div className="relative overflow-hidden px-4 md:px-16" style={{ minHeight: 280 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="w-full"
              >
                <div
                  className="testimonial-card"
                  style={{
                    background: 'var(--navy-800)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                    padding: '32px 36px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    display: 'flex',
                    gap: 24,
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Left: Photo */}
                  <Photo photo={current.photo} name={current.name} />

                  {/* Right: Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name + Trade */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3
                        className="font-bold text-lg"
                        style={{ color: 'var(--white)', fontFamily: 'var(--font-heading)' }}
                      >
                        {current.name}
                      </h3>
                    </div>

                    <p
                      className="text-sm mb-2"
                      style={{ color: 'var(--slate-400)', fontFamily: 'var(--font-body)' }}
                    >
                      {current.trade} — {current.location}
                    </p>

                    {/* Star rating + Tenure */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: current.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill="#F59E0B"
                            color="#F59E0B"
                          />
                        ))}
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: 'var(--slate-500)' }}
                      >
                        with whoza.ai for {current.timeWithUs}
                      </span>
                    </div>

                    {/* Outcome badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                      style={{
                        background: `var(${current.outcomeColor}-glow)`,
                        color: `var(${current.outcomeColor})`,
                        border: `1px solid var(${current.outcomeColor})`,
                        borderOpacity: 0.3,
                      }}
                    >
                      <OutcomeIcon type={current.outcomeIcon} />
                      <span>{current.outcome}</span>
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="text-sm leading-relaxed italic"
                      style={{ color: 'var(--slate-200)', fontFamily: 'var(--font-body)' }}
                    >
                      "{current.quote}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? 28 : 10,
                  height: 10,
                  background: i === active ? 'var(--katie-blue)' : 'rgba(255,255,255,0.25)',
                  borderRadius: i === active ? 5 : '50%',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile arrows (below card) */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--white)',
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--white)',
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
