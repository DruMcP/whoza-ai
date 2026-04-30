import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import ReactGA from 'react-ga4'
import App from './App.jsx'
import { LocalizationProvider } from './contexts/LocalizationContext'
import './index.css'
import './styles/design-system.css'
import './modern-upgrade.css'
import './modern-component-overrides.css'
import './visual-polish.css'
import './glassmorphism-microinteractions.css'
import { initAccessibility } from './utils/accessibility'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
)

if (typeof window !== 'undefined') {
  document.documentElement.classList.add('js-loaded');
  document.body.classList.add('js-active');

  const initNonCritical = () => {
    Sentry.init({
      dsn: 'https://d6a43adae723839dd45dee8cb6b0215b@o4510652590850048.ingest.de.sentry.io/4510652596682833',
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
      replaysSessionSampleRate: 0.01,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.MODE,
      beforeSend(event) {
        // Suppress console output in production
        return event;
      },
    })

    ReactGA.initialize('G-VCQND9WPW9')

    setTimeout(() => {
      try {
        initAccessibility();
      } catch (error) {
        // Silently fail
      }
    }, 300);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initNonCritical, { timeout: 2000 });
  } else {
    setTimeout(initNonCritical, 100);
  }
}
// Cache bust: 1770055092
