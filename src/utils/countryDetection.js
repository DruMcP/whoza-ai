const STORAGE_KEY = 'whoza_country';
const VALID_COUNTRIES = ['US', 'GB'];

async function fetchCountryFromServer() {
  // detect-country Netlify function is not deployed — skip to avoid 404 console errors
  // Fallback to browser locale detection (getCountryFromBrowserLocale) handles this gracefully
  return null;
}

function getCountryFromBrowserLocale() {
  try {
    if (!navigator || !navigator.language) {
      return null;
    }

    const locale = navigator.language.toLowerCase();

    if (locale.startsWith('en-us')) {
      return 'US';
    }

    if (locale.startsWith('en-gb') || locale.startsWith('en-uk')) {
      return 'GB';
    }

    return null;
  } catch (error) {
    return null;
  }
}

function getCountryFromURL() {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    const pathname = window.location.pathname;

    if (pathname.startsWith('/us/')) {
      return 'US';
    }

    if (pathname.startsWith('/uk/')) {
      return 'GB';
    }

    return null;
  } catch (error) {
    return null;
  }
}

function getCountryFromStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored && VALID_COUNTRIES.includes(stored)) {
      return stored;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function detectUserCountry() {
  try {
    const fromURL = getCountryFromURL();
    if (fromURL) {
      return fromURL;
    }

    const fromStorage = getCountryFromStorage();
    if (fromStorage) {
      return fromStorage;
    }

    const fromServer = await fetchCountryFromServer();
    if (fromServer && VALID_COUNTRIES.includes(fromServer)) {
      return fromServer;
    }

    const fromBrowser = getCountryFromBrowserLocale();
    if (fromBrowser) {
      return fromBrowser;
    }

    return 'GB';
  } catch (error) {
    return 'GB';
  }
}

export function setUserCountry(country) {
  try {
    if (!country || !VALID_COUNTRIES.includes(country)) {
      return false;
    }

    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, country);
    return true;
  } catch (error) {
    return false;
  }
}

export function isValidCountry(country) {
  return VALID_COUNTRIES.includes(country);
}
