import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in navigator['connection']
    ? (navigator['connection'] as any)['effectiveType']
    : '';
}

export function reportWebVitals() {
  const analyticsId = process.env.NEXT_PUBLIC_GA_ID;
  if (!analyticsId) return;

  const body = {
    dsn: analyticsId,
    id: crypto.randomUUID(),
    page: window.location.pathname,
    href: window.location.href,
    event: null as any,
    tags: { connectionSpeed: getConnectionSpeed() },
  };

  try {
    onFCP((metric) => sendToAnalytics(metric, body));
    onLCP((metric) => sendToAnalytics(metric, body));
    onCLS((metric) => sendToAnalytics(metric, body));
    onTTFB((metric) => sendToAnalytics(metric, body));
    onINP((metric) => sendToAnalytics(metric, body));
  } catch (err) {
    console.error('Web Vitals error:', err);
  }
}

function sendToAnalytics(metric: any, body: any) {
  const blob = new Blob(
    [
      new URLSearchParams({
        ...body,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed(),
      }).toString(),
    ],
    { type: 'application/x-www-form-urlencoded' }
  );

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, { body: blob, method: 'POST', keepalive: true });
  }
}
