const TERMINOLOGY = {
  GB: {
    postcode: 'postcode',
    tradesperson: 'tradesperson',
    tradespeople: 'tradespeople',
    mobile: 'mobile',
    colour: 'colour',
    optimise: 'optimise',
    optimised: 'optimised',
    optimising: 'optimising',
    analyse: 'analyse',
    analysed: 'analysed',
    analysing: 'analysing',
    client: 'client',
    clients: 'clients',
    booking: 'booking',
    bookings: 'bookings',
    treatment: 'treatment',
    treatments: 'treatments',
    labour: 'labour',
    favour: 'favour',
    neighbourhood: 'neighbourhood',
    centre: 'centre',
    metres: 'metres',
    licence: 'licence',
    organisation: 'organisation',
    recognise: 'recognise',
  },
  US: {
    postcode: 'zip code',
    tradesperson: 'contractor',
    tradespeople: 'contractors',
    mobile: 'cell phone',
    colour: 'color',
    optimise: 'optimize',
    optimised: 'optimized',
    optimising: 'optimizing',
    analyse: 'analyze',
    analysed: 'analyzed',
    analysing: 'analyzing',
    client: 'client',
    clients: 'clients',
    booking: 'appointment',
    bookings: 'appointments',
    treatment: 'service',
    treatments: 'services',
    labour: 'labor',
    favour: 'favor',
    neighbourhood: 'neighborhood',
    centre: 'center',
    metres: 'meters',
    licence: 'license',
    organisation: 'organization',
    recognise: 'recognize',
  },
};

export function getTerm(key, country = 'GB') {
  try {
    if (!key || typeof key !== 'string') {
      return key || '';
    }

    if (!country || (country !== 'US' && country !== 'GB')) {
      country = 'GB';
    }

    const terminology = TERMINOLOGY[country];

    if (!terminology) {
      return key;
    }

    const term = terminology[key];

    if (!term) {
      return key;
    }

    return term;
  } catch (error) {
    return key || '';
  }
}

export function getTerms(country = 'GB') {
  try {
    if (!country || (country !== 'US' && country !== 'GB')) {
      country = 'GB';
    }

    return TERMINOLOGY[country] || TERMINOLOGY.GB;
  } catch (error) {
    return TERMINOLOGY.GB;
  }
}

export function getAllKeys() {
  return Object.keys(TERMINOLOGY.GB);
}
