import { useEffect } from 'react';
import SEO from '../components/SEO';
import './CookiePolicy.css';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cookie-policy-page">
      <SEO 
        title="Cookie Policy | Whoza.ai"
        description="Learn about how Whoza.ai uses cookies to improve your experience and protect your privacy."
        path="/cookie-policy"
      />
      
      <div className="cookie-policy-container">
        <h1>Cookie Policy</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <section className="policy-section">
          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device (computer, smartphone, or tablet) 
            when you visit a website. They help websites remember your preferences and improve your browsing experience.
          </p>
        </section>

        <section className="policy-section">
          <h2>How we use cookies</h2>
          <p>
            Whoza.ai uses cookies to:
          </p>
          <ul>
            <li>Keep you logged in to your account</li>
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our website to improve our service</li>
            <li>Ensure the security of your account</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Types of cookies we use</h2>
          
          <div className="cookie-type">
            <h3>1. Essential Cookies</h3>
            <p><strong>Purpose:</strong> These cookies are necessary for the website to function properly.</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li><strong>Session cookies:</strong> Keep you logged in while you navigate the site</li>
              <li><strong>Security cookies:</strong> Protect your account from unauthorized access</li>
              <li><strong>Preference cookies:</strong> Remember your language and region settings</li>
            </ul>
            <p><strong>Can you disable them?</strong> No. These cookies are essential for the website to work.</p>
            <p><strong>Duration:</strong> Session cookies expire when you close your browser. Others last up to 1 year.</p>
          </div>

          <div className="cookie-type">
            <h3>2. Analytics Cookies</h3>
            <p><strong>Purpose:</strong> Help us understand how visitors use our website so we can improve it.</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li><strong>Microsoft Clarity:</strong> Records how you interact with our website (clicks, scrolls, page views)</li>
            </ul>
            <p><strong>Can you disable them?</strong> Yes. You can opt out via our cookie consent banner or preferences.</p>
            <p><strong>Duration:</strong> Up to 2 years.</p>
            <p><strong>Data collected:</strong></p>
            <ul>
              <li>Pages you visit</li>
              <li>Time spent on each page</li>
              <li>Links you click</li>
              <li>Device type and browser</li>
              <li>General location (city/country level, not precise)</li>
            </ul>
            <p><strong>Third-party provider:</strong> Microsoft Clarity. <a href="https://privacy.microsoft.com/en-gb/privacystatement" target="_blank" rel="noopener noreferrer">View Microsoft's Privacy Policy</a></p>
          </div>
        </section>

        <section className="policy-section">
          <h2>Cookies we do NOT use</h2>
          <p>
            We do <strong>not</strong> use:
          </p>
          <ul>
            <li><strong>Advertising cookies:</strong> We don't track you across websites or show you targeted ads</li>
            <li><strong>Social media cookies:</strong> We don't embed social media tracking pixels</li>
            <li><strong>Third-party marketing cookies:</strong> We don't share your data with advertisers</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Managing your cookie preferences</h2>
          <p>
            You have full control over which cookies you accept:
          </p>
          <ol>
            <li><strong>Via our cookie banner:</strong> When you first visit our site, you can choose to accept or reject analytics cookies</li>
            <li><strong>Via your browser:</strong> Most browsers allow you to block or delete cookies. See instructions for:
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>
            </li>
          </ol>
          <p>
            <strong>Note:</strong> Blocking essential cookies may prevent you from using certain features of our website, 
            such as logging in or accessing your account.
          </p>
        </section>

        <section className="policy-section">
          <h2>Your rights under UK GDPR</h2>
          <p>
            Under UK data protection law, you have the right to:
          </p>
          <ul>
            <li>Know what data we collect via cookies</li>
            <li>Withdraw your consent for analytics cookies at any time</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
          </ul>
          <p>
            To exercise these rights, contact us at <a href="mailto:privacy@whoza.ai">privacy@whoza.ai</a>
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to this Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
            We'll notify you of any significant changes by updating the "Last updated" date at the top of this page.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact us</h2>
          <p>
            If you have questions about our use of cookies, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:privacy@whoza.ai">privacy@whoza.ai</a></li>
            <li><strong>Address:</strong> WHOZA AI LTD, United Kingdom</li>
            <li><strong>ICO Registration:</strong> ZC077271</li>
          </ul>
        </section>

        <div className="policy-footer">
          <p>
            <a href="/trust">View our Trust & Privacy page</a> | 
            <a href="/privacy-policy">View our Privacy Policy</a> | 
            <a href="/terms">View our Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
