const generateFingerprint = async () => {
  const components = {};

  try {
    components.userAgent = navigator.userAgent;
    components.language = navigator.language;
    components.languages = navigator.languages?.join(',') || '';
    components.platform = navigator.platform;
    components.hardwareConcurrency = navigator.hardwareConcurrency || 0;
    components.deviceMemory = navigator.deviceMemory || 0;
    components.screenResolution = `${screen.width}x${screen.height}`;
    components.screenColorDepth = screen.colorDepth;
    components.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    components.timezoneOffset = new Date().getTimezoneOffset();
    components.sessionStorage = !!window.sessionStorage;
    components.localStorage = !!window.localStorage;
    components.indexedDB = !!window.indexedDB;
    components.doNotTrack = navigator.doNotTrack || 'unknown';
    components.cookieEnabled = navigator.cookieEnabled;

    if (window.screen.availWidth && window.screen.availHeight) {
      components.availableScreenResolution = `${screen.availWidth}x${screen.availHeight}`;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 200;
      canvas.height = 50;
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('whoza.ai Security', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Fingerprint', 4, 17);
      components.canvasFingerprint = canvas.toDataURL().substring(0, 100);
    }

    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          components.webglVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          components.webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
    } catch (e) {
      components.webglError = true;
    }

    if ('fonts' in document) {
      try {
        const fontCheck = await document.fonts.check('12px Arial');
        components.fontCheck = fontCheck;
      } catch (e) {
        components.fontCheckError = true;
      }
    }

    const pluginsArray = [];
    if (navigator.plugins && navigator.plugins.length > 0) {
      for (let i = 0; i < navigator.plugins.length; i++) {
        pluginsArray.push(navigator.plugins[i].name);
      }
    }
    components.plugins = pluginsArray.join(',');

    components.touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const componentString = JSON.stringify(components);
    const fingerprint = await hashString(componentString);

    return {
      id: fingerprint,
      components
    };
  } catch (error) {
    return {
      id: 'error-' + Math.random().toString(36).substring(7),
      components: { error: error.message }
    };
  }
};

const hashString = async (str) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.substring(0, 32);
};

let cachedFingerprint = null;

export const getBrowserFingerprint = async () => {
  if (cachedFingerprint) {
    return cachedFingerprint;
  }

  cachedFingerprint = await generateFingerprint();
  return cachedFingerprint;
};

export const detectBotBehavior = () => {
  const botSignals = [];

  if (!navigator.webdriver === false) {
    botSignals.push('webdriver_present');
  }

  if (navigator.plugins && navigator.plugins.length === 0 && !navigator.userAgent.includes('Mobile')) {
    botSignals.push('no_plugins');
  }

  if (!window.chrome && navigator.userAgent.includes('Chrome')) {
    botSignals.push('fake_chrome');
  }

  if (navigator.languages && navigator.languages.length === 0) {
    botSignals.push('no_languages');
  }

  if (!navigator.platform || navigator.platform === '') {
    botSignals.push('no_platform');
  }

  const automationKeywords = ['headless', 'phantom', 'selenium', 'webdriver', 'bot', 'crawler', 'spider'];
  const userAgent = navigator.userAgent.toLowerCase();
  for (const keyword of automationKeywords) {
    if (userAgent.includes(keyword)) {
      botSignals.push(`automation_keyword_${keyword}`);
    }
  }

  if (navigator.webdriver) {
    botSignals.push('webdriver_flag');
  }

  if (window.document.documentElement.getAttribute('webdriver')) {
    botSignals.push('webdriver_attribute');
  }

  return {
    isSuspicious: botSignals.length >= 2,
    signals: botSignals,
    score: Math.max(0, 100 - (botSignals.length * 20))
  };
};

export const trackMouseActivity = () => {
  let mouseMovements = 0;
  let lastMouseTime = Date.now();
  let mousePositions = [];

  const handler = (e) => {
    mouseMovements++;
    mousePositions.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (mousePositions.length > 10) {
      mousePositions.shift();
    }

    lastMouseTime = Date.now();
  };

  document.addEventListener('mousemove', handler, { passive: true });

  return {
    stop: () => document.removeEventListener('mousemove', handler),
    getActivity: () => ({
      movements: mouseMovements,
      timeSinceLastMove: Date.now() - lastMouseTime,
      positions: mousePositions,
      isHuman: mouseMovements > 5 && mousePositions.length > 3
    })
  };
};
