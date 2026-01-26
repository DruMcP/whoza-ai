import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import ReactGA from 'react-ga4'
import App from './App.jsx'
import './index.css'
import './modern-upgrade.css'
import './modern-component-overrides.css'
import './visual-polish.css'
import './glassmorphism-microinteractions.css'
import { initAccessibility } from './utils/accessibility'

Sentry.init({
  dsn: 'https://d6a43adae723839dd45dee8cb6b0215b@o4510652590850048.ingest.de.sentry.io/4510652596682833',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
  // Ignore known Supabase auth-js AbortError (GitHub issue #41968)
  // This is a benign race condition that doesn't affect functionality
  ignoreErrors: [
    'AbortError: signal is aborted without reason',
    /signal is aborted without reason/,
    /AbortError.*locks\.js/,
  ],
  beforeSend(event, hint) {
    const error = hint.originalException;
    // Filter out Supabase AbortErrors that don't affect functionality
    if (error && error.name === 'AbortError' && 
        error.message && error.message.includes('signal is aborted')) {
      return null; // Don't send to Sentry
    }
    return event;
  },
})

ReactGA.initialize('G-VCQND9WPW9')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if (typeof window !== 'undefined') {
  document.documentElement.classList.add('js-loaded');

  setTimeout(() => {
    try {
      initAccessibility();
    } catch (error) {
      // TODO: Review error handling: console.error('Error initializing accessibility:', error)
    }
  }, 500);
}
