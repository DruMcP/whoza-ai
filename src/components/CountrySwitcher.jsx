import { useLocalization } from '../contexts/LocalizationContext';
import './CountrySwitcher.css';

export default function CountrySwitcher() {
  const { country, setCountry } = useLocalization();

  const handleCountryChange = (newCountry) => {
    if (newCountry !== country) {
      setCountry(newCountry);
    }
  };

  return (
    <div className="country-switcher" role="group" aria-label="Country selector">
      <button
        onClick={() => handleCountryChange('GB')}
        className={`country-btn ${country === 'GB' ? 'active' : ''}`}
        aria-pressed={country === 'GB'}
        aria-label="Switch to United Kingdom"
      >
        <span className="flag" role="img" aria-label="United Kingdom flag">🇬🇧</span>
        <span className="label">UK</span>
      </button>
      <button
        onClick={() => handleCountryChange('US')}
        className={`country-btn ${country === 'US' ? 'active' : ''}`}
        aria-pressed={country === 'US'}
        aria-label="Switch to United States"
      >
        <span className="flag" role="img" aria-label="United States flag">🇺🇸</span>
        <span className="label">US</span>
      </button>
    </div>
  );
}
