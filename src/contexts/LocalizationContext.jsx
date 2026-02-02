import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { detectUserCountry, setUserCountry as saveUserCountry } from '../utils/countryDetection';
import { formatPrice as formatPriceUtil, getCurrencyCode as getCurrencyCodeUtil, getCurrencySymbol, fetchExchangeRate } from '../utils/currency';
import { getTerm as getTermUtil } from '../utils/terminology';

const LocalizationContext = createContext(null);

export function LocalizationProvider({ children }) {
  const [country, setCountryState] = useState('GB');
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    async function initializeLocalization() {
      try {
        setIsLoading(true);

        const detectedCountry = await detectUserCountry();
        setCountryState(detectedCountry);

        const rate = await fetchExchangeRate();
        setExchangeRate(rate);

        setIsLoading(false);
      } catch (error) {
        setCountryState('GB');
        setIsLoading(false);
      }
    }

    initializeLocalization();
  }, []);

  const setCountry = useCallback((newCountry) => {
    if (newCountry === 'US' || newCountry === 'GB') {
      setCountryState(newCountry);
      saveUserCountry(newCountry);
    }
  }, []);

  const formatPrice = useCallback(
    (priceGBP) => {
      return formatPriceUtil(priceGBP, country);
    },
    [country]
  );

  const getCurrencyCode = useCallback(() => {
    return getCurrencyCodeUtil(country);
  }, [country]);

  const getSymbol = useCallback(() => {
    return getCurrencySymbol(country);
  }, [country]);

  const getTerm = useCallback(
    (key) => {
      return getTermUtil(key, country);
    },
    [country]
  );

  const isUS = useMemo(() => country === 'US', [country]);
  const isGB = useMemo(() => country === 'GB', [country]);

  const value = useMemo(
    () => ({
      country,
      setCountry,
      formatPrice,
      getCurrencyCode,
      getCurrencySymbol: getSymbol,
      getTerm,
      isUS,
      isGB,
      isLoading,
      exchangeRate,
    }),
    [country, setCountry, formatPrice, getCurrencyCode, getSymbol, getTerm, isUS, isGB, isLoading, exchangeRate]
  );

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }

  return context;
}
