/**
 * Single source of truth for whoza.ai company identity.
 *
 * Verified against Companies House primary source, 18 August 2026.
 * The retired company number SC787047 must never reappear in the codebase.
 */

export const COMPANY = {
  legalName: 'WHOZA AI LTD',
  companyNumber: 'SC874716',
  jurisdiction: 'Scotland',
  incorporatedOn: '2026-01-09',
  incorporatedOnDisplay: '9 January 2026',
  registeredOffice: {
    streetAddress: '6 Atholl Crescent',
    addressLocality: 'Perth',
    addressRegion: 'Scotland',
    postalCode: 'PH1 5JN',
    addressCountry: 'GB',
  },
  registerUrl:
    'https://find-and-update.company-information.service.gov.uk/company/SC874716',
} as const;
