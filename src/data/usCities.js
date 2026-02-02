export const US_CITIES = [
  {
    slug: 'new-york',
    name: 'New York',
    state: 'NY',
    fullName: 'New York, NY',
    population: 8336817,
    contractors: 125000,
    metroArea: 'New York Metropolitan Area',
    description: 'The largest city in the United States with a thriving contractor market',
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'CA',
    fullName: 'Los Angeles, CA',
    population: 3979576,
    contractors: 95000,
    metroArea: 'Los Angeles Metropolitan Area',
    description: 'Major hub for contractors and home improvement professionals in Southern California',
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    state: 'IL',
    fullName: 'Chicago, IL',
    population: 2693976,
    contractors: 68000,
    metroArea: 'Chicago Metropolitan Area',
    description: 'Midwest\'s largest city with a robust construction and contractor industry',
  },
  {
    slug: 'houston',
    name: 'Houston',
    state: 'TX',
    fullName: 'Houston, TX',
    population: 2320268,
    contractors: 62000,
    metroArea: 'Greater Houston',
    description: 'Fast-growing Texas city with strong demand for contractors',
  },
  {
    slug: 'phoenix',
    name: 'Phoenix',
    state: 'AZ',
    fullName: 'Phoenix, AZ',
    population: 1680992,
    contractors: 48000,
    metroArea: 'Phoenix Metropolitan Area',
    description: 'Rapidly expanding desert city with booming construction market',
  },
  {
    slug: 'philadelphia',
    name: 'Philadelphia',
    state: 'PA',
    fullName: 'Philadelphia, PA',
    population: 1584064,
    contractors: 42000,
    metroArea: 'Philadelphia Metropolitan Area',
    description: 'Historic East Coast city with established contractor community',
  },
  {
    slug: 'san-antonio',
    name: 'San Antonio',
    state: 'TX',
    fullName: 'San Antonio, TX',
    population: 1547253,
    contractors: 38000,
    metroArea: 'San Antonio Metropolitan Area',
    description: 'Growing Texas city with diverse contractor opportunities',
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    state: 'CA',
    fullName: 'San Diego, CA',
    population: 1423851,
    contractors: 41000,
    metroArea: 'San Diego Metropolitan Area',
    description: 'Coastal California city with strong home services market',
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    state: 'TX',
    fullName: 'Dallas, TX',
    population: 1343573,
    contractors: 45000,
    metroArea: 'Dallas-Fort Worth Metroplex',
    description: 'Major Texas metropolitan area with thriving contractor industry',
  },
  {
    slug: 'san-jose',
    name: 'San Jose',
    state: 'CA',
    fullName: 'San Jose, CA',
    population: 1021795,
    contractors: 32000,
    metroArea: 'San Jose Metropolitan Area',
    description: 'Silicon Valley hub with high-value contractor market',
  },
  {
    slug: 'austin',
    name: 'Austin',
    state: 'TX',
    fullName: 'Austin, TX',
    population: 978908,
    contractors: 35000,
    metroArea: 'Greater Austin',
    description: 'Fast-growing tech city with booming contractor demand',
  },
  {
    slug: 'jacksonville',
    name: 'Jacksonville',
    state: 'FL',
    fullName: 'Jacksonville, FL',
    population: 949611,
    contractors: 28000,
    metroArea: 'Jacksonville Metropolitan Area',
    description: 'Northeast Florida\'s largest city with growing contractor market',
  },
  {
    slug: 'fort-worth',
    name: 'Fort Worth',
    state: 'TX',
    fullName: 'Fort Worth, TX',
    population: 918915,
    contractors: 30000,
    metroArea: 'Dallas-Fort Worth Metroplex',
    description: 'Part of DFW Metroplex with strong construction industry',
  },
  {
    slug: 'columbus',
    name: 'Columbus',
    state: 'OH',
    fullName: 'Columbus, OH',
    population: 905748,
    contractors: 26000,
    metroArea: 'Columbus Metropolitan Area',
    description: 'Ohio\'s capital with steady contractor market growth',
  },
  {
    slug: 'charlotte',
    name: 'Charlotte',
    state: 'NC',
    fullName: 'Charlotte, NC',
    population: 885708,
    contractors: 27000,
    metroArea: 'Charlotte Metropolitan Area',
    description: 'Southeast financial hub with expanding contractor opportunities',
  },
];

export function getCityBySlug(slug) {
  return US_CITIES.find(city => city.slug === slug);
}

export function getCityByName(name) {
  return US_CITIES.find(city => city.name.toLowerCase() === name.toLowerCase());
}

export function getAllUSCities() {
  return US_CITIES;
}

export function getCitiesByState(state) {
  return US_CITIES.filter(city => city.state === state);
}
