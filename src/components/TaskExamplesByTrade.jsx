import { useState } from 'react';
import Icon from './icons/Icon';

const TRADE_DATA = {
  plumbers: {
    name: 'Plumbers',
    tasks: [
      {
        title: 'Find 10 local "emergency plumber" Facebook groups',
        time: '5 mins',
        benefit: 'Discover new customer hotspots'
      },
      {
        title: 'Write a Google Business Profile post about "leak detection services"',
        time: '10 mins',
        benefit: 'Attract high-value local searches'
      },
      {
        title: 'Create a list of 5 local blogs that accept guest posts about home maintenance',
        time: '15 mins',
        benefit: 'Build trust signals and strengthen your online presence'
      }
    ]
  },
  electricians: {
    name: 'Electricians',
    tasks: [
      {
        title: 'Identify the most common questions people ask about "EV charger installation" on Quora',
        time: '5 mins',
        benefit: 'Create content that answers real customer questions'
      },
      {
        title: 'Draft a short email to local builders offering "new build electrical services"',
        time: '10 mins',
        benefit: 'Generate B2B leads and partnerships'
      },
      {
        title: 'Find 5 local businesses that recently failed their PAT testing',
        time: '15 mins',
        benefit: 'Target potential clients with a direct need'
      }
    ]
  },
  roofers: {
    name: 'Roofers',
    tasks: [
      {
        title: 'List 10 local keywords for "roof repair" with high search volume',
        time: '5 mins',
        benefit: 'Optimise your website for what people are searching for'
      },
      {
        title: 'Write a short script for a 30-second video on "common signs of roof damage"',
        time: '10 mins',
        benefit: 'Create engaging social media content'
      },
      {
        title: 'Find contact details for 5 local property management companies',
        time: '15 mins',
        benefit: 'Build relationships with recurring revenue clients'
      }
    ]
  }
};

export default function TaskExamplesByTrade() {
  const [activeTrade, setActiveTrade] = useState('plumbers');
  const currentTrade = TRADE_DATA[activeTrade];

  return (
    <section className="task-examples-section section">
      <div className="container">
        <div className="task-examples-header">
          <h2>See What Rex Can Do For Your Trade</h2>
          <p className="task-examples-subtitle">Real tasks. Real results. In minutes, not hours.</p>
        </div>

        <div className="trade-tabs">
          {Object.entries(TRADE_DATA).map(([key, trade]) => (
            <button
              key={key}
              className={`trade-tab ${activeTrade === key ? 'active' : ''}`}
              onClick={() => setActiveTrade(key)}
              aria-selected={activeTrade === key}
              role="tab"
            >
              {trade.name}
            </button>
          ))}
        </div>

        <div className="task-cards-grid" role="tabpanel">
          {currentTrade.tasks.map((task, index) => (
            <div key={index} className="task-example-card">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-time-badge">
                <svg className="clock-icon" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{task.time}</span>
              </div>
              <p className="task-benefit">{task.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
