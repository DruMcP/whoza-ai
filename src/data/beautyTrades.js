export const BEAUTY_TRADES = [
  {
    id: 'beauty-therapist',
    name: 'Beauty Therapist',
    description: 'Provides a range of beauty treatments including facials, waxing, and body treatments',
    keywords: ['beauty therapy', 'facial', 'waxing', 'body treatment', 'spa', 'beauty salon'],
    category: 'beauty',
  },
  {
    id: 'hair-stylist',
    name: 'Hair Stylist',
    description: 'Specializes in cutting, coloring, and styling hair for all occasions',
    keywords: ['hair styling', 'hair cut', 'hair color', 'balayage', 'highlights', 'hairdresser', 'salon'],
    category: 'beauty',
  },
  {
    id: 'nail-technician',
    name: 'Nail Technician',
    description: 'Expert in manicures, pedicures, nail art, and nail extensions',
    keywords: ['manicure', 'pedicure', 'nail art', 'gel nails', 'acrylic nails', 'nail salon'],
    category: 'beauty',
  },
  {
    id: 'makeup-artist',
    name: 'Makeup Artist',
    description: 'Professional makeup application for weddings, events, and photoshoots',
    keywords: ['makeup', 'bridal makeup', 'special occasion', 'photoshoot', 'airbrush', 'mua'],
    category: 'beauty',
  },
  {
    id: 'esthetician',
    name: 'Esthetician',
    description: 'Skincare specialist providing facials, peels, and skin treatments',
    keywords: ['skincare', 'facial', 'chemical peel', 'microdermabrasion', 'skin treatment', 'aesthetician'],
    category: 'beauty',
  },
  {
    id: 'lash-technician',
    name: 'Lash Technician',
    description: 'Specializes in eyelash extensions, lifts, and tinting',
    keywords: ['lash extensions', 'lash lift', 'lash tint', 'volume lashes', 'classic lashes', 'eyelash extensions'],
    category: 'beauty',
  },
  {
    id: 'brow-artist',
    name: 'Brow Artist',
    description: 'Expert in eyebrow shaping, tinting, microblading, and lamination',
    keywords: ['brow shaping', 'brow tint', 'microblading', 'brow lamination', 'eyebrow threading', 'eyebrow'],
    category: 'beauty',
  },
];

export function getBeautyTradeById(id) {
  return BEAUTY_TRADES.find(trade => trade.id === id);
}

export function getBeautyTradeByName(name) {
  return BEAUTY_TRADES.find(trade => trade.name.toLowerCase() === name.toLowerCase());
}

export function getAllBeautyTrades() {
  return BEAUTY_TRADES;
}
