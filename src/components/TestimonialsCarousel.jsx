import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Plumber',
    location: 'Birmingham',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "Within two months of using Rex, I started appearing in ChatGPT responses for local plumbers. The weekly tasks are simple and actually make sense for my business.",
    metric: '3x increase in enquiries',
    rating: 5,
    verified: true,
    caseStudyLink: '/case-studies'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Electrician',
    location: 'Manchester',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "I was skeptical at first, but Rex's approach works. I approve each task before doing it, so I'm always in control. My Google Business profile looks better than ever.",
    metric: '45% more profile views',
    rating: 5,
    verified: true,
    caseStudyLink: '/case-studies'
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Gardener',
    location: 'Bristol',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "The best part is that it only takes 15 minutes a week. Rex tells me exactly what to do, and I can see my Visibility Confidence Score™ improving month by month.",
    metric: 'Visibility Confidence Score™: 78/100',
    rating: 5,
    verified: true,
    caseStudyLink: '/case-studies'
  },
  {
    id: 4,
    name: 'David Roberts',
    role: 'Carpenter',
    location: 'Leeds',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "I've tried other marketing services that promised the world. Rex is different - it's honest, straightforward, and I actually understand what I'm doing and why.",
    metric: '2x more website visits',
    rating: 5,
    verified: true,
    caseStudyLink: '/case-studies'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Painter & Decorator',
    location: 'Liverpool',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "My customers are now finding me through AI search tools I didn't even know existed. Rex has helped me stay ahead of the competition without feeling overwhelmed.",
    metric: '5-star AI visibility rating',
    rating: 5,
    verified: true,
    caseStudyLink: '/case-studies'
  }
];

// Star Rating Component
const StarRating = ({ rating = 5 }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    }}>
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 200
          }}
        >
          <Star
            size={20}
            fill={index < rating ? '#AAFF00' : 'none'}
            stroke={index < rating ? '#AAFF00' : '#6B7280'}
            strokeWidth={2}
          />
        </motion.div>
      ))}
      <span style={{
        marginLeft: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#AAFF00'
      }}>
        {rating}.0
      </span>
    </div>
  );
};

// Verified Badge Component
const VerifiedBadge = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: 'rgba(132, 204, 22, 0.1)',
        border: '1px solid rgba(132, 204, 22, 0.3)',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#AAFF00'
      }}
    >
      <CheckCircle size={14} />
      <span>Verified Customer</span>
    </motion.div>
  );
};

const TestimonialsCarousel = memo(function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000); // Increased from 6s to 7s for better readability

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="testimonials-carousel" style={{
      position: 'relative',
      padding: '40px 20px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="testimonial-slide"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            padding: '32px',
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(132, 204, 22, 0.2)',
            borderRadius: '24px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Photo with enhanced styling */}
          <div style={{ position: 'relative' }}>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              src={currentTestimonial.photo}
              alt={currentTestimonial.name}
              className="testimonial-photo"
              loading="lazy"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid rgba(132, 204, 22, 0.3)',
                boxShadow: '0 4px 20px rgba(132, 204, 22, 0.2)'
              }}
            />
            {currentTestimonial.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '32px',
                  height: '32px',
                  background: '#AAFF00',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #0F172A',
                  boxShadow: '0 2px 8px rgba(132, 204, 22, 0.4)'
                }}
              >
                <CheckCircle size={18} style={{ color: '#0F172A' }} />
              </motion.div>
            )}
          </div>

          {/* Star Rating */}
          <StarRating rating={currentTestimonial.rating} />

          {/* Quote */}
          <div className="testimonial-content-wrapper" style={{
            textAlign: 'center',
            maxWidth: '700px'
          }}>
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="testimonial-quote-mark"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                width: '40px',
                height: '40px',
                color: 'rgba(132, 204, 22, 0.3)',
                marginBottom: '16px'
              }}
            >
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </motion.svg>
            
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="testimonial-text"
              style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#E5E7EB',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}
            >
              "{currentTestimonial.quote}"
            </motion.blockquote>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="testimonial-author-info"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <strong style={{
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: '700'
              }}>
                {currentTestimonial.name}
              </strong>
              <span style={{
                fontSize: '14px',
                color: '#9CA3AF'
              }}>
                {currentTestimonial.role}, {currentTestimonial.location}
              </span>
            </motion.div>

            {/* Verified Badge */}
            {currentTestimonial.verified && <VerifiedBadge />}

            {/* Metric */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="testimonial-metric"
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.15), rgba(132, 204, 22, 0.05))',
                border: '1px solid rgba(132, 204, 22, 0.3)',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#AAFF00',
                display: 'inline-block'
              }}
            >
              📈 {currentTestimonial.metric}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <div className="carousel-controls" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '32px'
      }}>
        <button
          className="carousel-button carousel-prev"
          onClick={handlePrev}
          aria-label="Previous testimonial"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(132, 204, 22, 0.1)',
            border: '1px solid rgba(132, 204, 22, 0.3)',
            color: '#AAFF00',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(132, 204, 22, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(132, 204, 22, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className="carousel-dots" style={{
          display: 'flex',
          gap: '8px'
        }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentIndex ? '#AAFF00' : 'rgba(132, 204, 22, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: index === currentIndex ? '0 0 10px rgba(132, 204, 22, 0.5)' : 'none'
              }}
            />
          ))}
        </div>

        <button
          className="carousel-button carousel-next"
          onClick={handleNext}
          aria-label="Next testimonial"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(132, 204, 22, 0.1)',
            border: '1px solid rgba(132, 204, 22, 0.3)',
            color: '#AAFF00',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(132, 204, 22, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(132, 204, 22, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Link to Case Studies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: 'center',
          marginTop: '32px'
        }}
      >
        <Link
          to="/case-studies"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#AAFF00',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(132, 204, 22, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span>Read full case studies</span>
          <ExternalLink size={14} />
        </Link>
      </motion.div>
    </div>
  );
});

export default TestimonialsCarousel;
