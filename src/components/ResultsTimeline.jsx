import { useEffect, useRef } from 'react';

const TIMELINE_DATA = [
  {
    week: 1,
    title: 'Foundation & Quick Wins',
    action: 'Complete your first task - Google Business Profile optimization',
    result: 'Your business is now correctly represented on Google, with updated hours, services, and photos. This is a critical first step for AI visibility.'
  },
  {
    week: 2,
    title: 'Gaining Traction',
    action: 'Add 2-3 new high-quality photos to your Google Business Profile and website',
    result: 'You start appearing in more local searches for your primary trade as your business information becomes clearer and more consistent.'
  },
  {
    week: 4,
    title: 'First AI Mention',
    action: 'Respond to 3-4 customer reviews on Google and other platforms',
    result: 'You get your first mention in a ChatGPT response for a local query like "best electrician in [your town]".'
  },
  {
    week: 8,
    title: 'Consistent Visibility',
    action: 'Publish a short blog post or case study on your website',
    result: 'You\'re more consistently named in AI answers for local trade queries as trust and consensus signals strengthen over time.'
  }
];

export default function ResultsTimeline() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = timelineRef.current?.querySelectorAll('.timeline-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="results-timeline-section section">
      <div className="container">
        <div className="timeline-header">
          <h2>See Your Results Grow Over Time</h2>
          <p className="timeline-subtitle">
            Watch how consistent action leads to measurable results
          </p>
        </div>

        <div className="timeline-container" ref={timelineRef}>
          {TIMELINE_DATA.map((milestone, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                {index < TIMELINE_DATA.length - 1 && <div className="timeline-line"></div>}
              </div>

              <div className="timeline-card">
                <div className="timeline-week-badge">Week {milestone.week}</div>
                <h3 className="timeline-title">{milestone.title}</h3>

                <div className="timeline-content">
                  <div className="timeline-action">
                    <div className="timeline-label">Action</div>
                    <p>{milestone.action}</p>
                  </div>

                  <div className="timeline-result">
                    <div className="timeline-label">Result</div>
                    <p>{milestone.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="timeline-disclaimer">
          Over the first 14–30 days, most businesses see clearer AI descriptions, fewer generic answers, and more accurate local mentions — as their business becomes easier to understand and safer to recommend.
        </p>
      </div>
    </section>
  );
}
