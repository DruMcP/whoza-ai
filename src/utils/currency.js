const EXCHANGE_RATE_KEY = 'whoza_exchange_rate';
const EXCHANGE_RATE_TIMESTAMP_KEY = 'whoza_exchange_rate_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const FALLBACK_RATE = 1.27;
const API_URL = 'https://api.exchangerate-api.com/v4/latest/GBP';

function getCachedExchangeRate() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const rate = localStorage.getItem(EXCHANGE_RATE_KEY);
    const timestamp = localStorage.getItem(EXCHANGE_RATE_TIMESTAMP_KEY);

    if (!rate || !timestamp) {
      return null;
    }

    const now = Date.now();
    const age = now - parseInt(timestamp, 10);

    if (age > CACHE_DURATION) {
      return null;
    }

    const parsedRate = parseFloat(rate);
    if (isNaN(parsedRate) || parsedRate <= 0) {
      return null;
    }

    return parsedRate;
  } catch (error) {
    return null;
  }
}

function setCachedExchangeRate(rate) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    localStorage.setItem(EXCHANGE_RATE_KEY, rate.toString());
    localStorage.setItem(EXCHANGE_RATE_TIMESTAMP_KEY, Date.now().toString());
    return true;
  } catch (error) {
    return false;
  }
}

export async function fetchExchangeRate() {
  try {
    const cached = getCachedExchangeRate();
    if (cached) {
      return cached;
    }

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return FALLBACK_RATE;
    }

    const data = await response.json();

    if (!data.rates || !data.rates.USD) {
      return FALLBACK_RATE;
    }

    const rate = parseFloat(data.rates.USD);

    if (isNaN(rate) || rate <= 0) {
      return FALLBACK_RATE;
    }

    setCachedExchangeRate(rate);
    return rate;
  } catch (error) {
    return FALLBACK_RATE;
  }
}

export function formatPrice(priceGBP, country) {
  try {
    if (!priceGBP || typeof priceGBP !== 'number') {
      return country === 'US' ? '$0' : '£0';
    }

    if (priceGBP < 0) {
      return country === 'US' ? '$0' : '£0';
    }

    if (country === 'US') {
      const rate = getCachedExchangeRate() || FALLBACK_RATE;
      const priceUSD = Math.round(priceGBP * rate);
      return `$${priceUSD.toLocaleString()}`;
    }

    return `£${Math.round(priceGBP).toLocaleString()}`;
  } catch (error) {
    return country === 'US' ? '$0' : '£0';
  }
}

export function getCurrencyCode(country) {
  return country === 'US' ? 'USD' : 'GBP';
}

export function getCurrencySymbol(country) {
  return country === 'US' ? '$' : '£';
}
