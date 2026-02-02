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
        title="Switch to United Kingdom"
      >
        <img src="/flags/uk-flag.svg" alt="UK Flag" className="flag-icon" />
      </button>
      <button
        onClick={() => handleCountryChange('US')}
        className={`country-btn ${country === 'US' ? 'active' : ''}`}
        aria-pressed={country === 'US'}
        aria-label="Switch to United States"
        title="Switch to United States"
      >
        <img src="/flags/us-flag.svg" alt="US Flag" className="flag-icon" />
      </button>
    </div>
  );
}
