exports.handler = async (event, context) => {
  try {
    const cfCountry = event.headers['cf-ipcountry'] || 'GB';

    const countryMap = {
      'US': 'US',
      'GB': 'GB',
      'UK': 'GB',
    };

    const detectedCountry = countryMap[cfCountry] || 'GB';

    return {
      statusCode: 200,
      body: JSON.stringify({ country: detectedCountry }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ country: 'GB' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
