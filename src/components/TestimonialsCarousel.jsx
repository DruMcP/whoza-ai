import { useState, useEffect, memo } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Plumber',
    location: 'Birmingham',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "Within two months of using Rex, I started appearing in ChatGPT responses for local plumbers. The weekly tasks are simple and actually make sense for my business.",
    metric: '3x increase in enquiries'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Electrician',
    location: 'Manchester',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "I was skeptical at first, but Rex's approach works. I approve each task before doing it, so I'm always in control. My Google Business profile looks better than ever.",
    metric: '45% more profile views'
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Gardener',
    location: 'Bristol',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "The best part is that it only takes 15 minutes a week. Rex tells me exactly what to do, and I can see my competitor position improving month by month.",
    metric: 'Now appears in 3 AI platforms'
  },
  {
    id: 4,
    name: 'David Roberts',
    role: 'Carpenter',
    location: 'Leeds',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "I've tried other marketing services that promised the world. Rex is different - it's honest, straightforward, and I actually understand what I'm doing and why.",
    metric: '2x more website visits'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Painter & Decorator',
    location: 'Liverpool',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    quote: "My customers are now finding me through AI search tools I didn't even know existed. Rex has helped me stay ahead of the competition without feeling overwhelmed.",
    metric: '5-star AI visibility rating'
  }
];

const TestimonialsCarousel = memo(function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="testimonials-carousel">
      <div className={`testimonial-slide ${isAnimating ? 'animating' : ''}`}>
        <img
          src={currentTestimonial.photo}
          alt={currentTestimonial.name}
          className="testimonial-photo"
          loading="lazy"
        />
        <div className="testimonial-content-wrapper">
          <svg className="testimonial-quote-mark" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
          <blockquote className="testimonial-text">
            "{currentTestimonial.quote}"
          </blockquote>
          <div className="testimonial-author-info">
            <strong>{currentTestimonial.name}</strong>
            <span>{currentTestimonial.role}, {currentTestimonial.location}</span>
          </div>
          <div className="testimonial-metric">
            {currentTestimonial.metric}
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-button carousel-prev"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          className="carousel-button carousel-next"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
});

export default TestimonialsCarousel;
