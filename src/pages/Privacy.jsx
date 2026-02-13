import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <h1>Privacy policy</h1>

          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
            Last updated: {new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <div className="panel" style={{ background: 'var(--color-primary-50)', border: '2px solid var(--color-primary-200)', marginBottom: 'var(--spacing-xl)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 0 }}>
              <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '24px', height: '24px', color: 'var(--color-primary-600)', flexShrink: 0 }}>
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <strong>Registered with the Information Commissioner's Office (ICO). Registration number: ZC077271</strong>
            </p>
          </div>

          <p>
            whoza.ai is a UK-based service. We follow the UK General Data Protection
            Regulation (GDPR) and guidance from the Information Commissioner's
            Office (ICO).
          </p>

          <h2>What data we collect</h2>

          <p>We collect the following information when you sign up:</p>

          <ul>
            <li>Your email address</li>
            <li>Your business name and trade type</li>
            <li>Your business location (postcode and service area)</li>
            <li>Information about your services and credentials</li>
            <li>Your website and Google Business Profile URLs (if provided)</li>
          </ul>

          <p>We also collect:</p>

          <ul>
            <li>Tasks we send you and your approval status</li>
            <li>Your monthly AI Visibility Scores</li>
            <li>Payment information (processed by Stripe, not stored by us)</li>
          </ul>

          <h2>How we use your data</h2>

          <p>We use your data to:</p>

          <ul>
            <li>Provide the whoza.ai service (sending tasks, measuring scores)</li>
            <li>Send you emails about your tasks and scores</li>
            <li>Process payments</li>
            <li>Improve our service</li>
          </ul>

          <p>
            <strong>We do not sell or share your data with third parties for
            marketing purposes.</strong>
          </p>

          <h2>Who can see your data</h2>

          <ul>
            <li>You can see all your own data through your portal</li>
            <li>whoza.ai staff can see your data to provide the service</li>
            <li>Stripe processes your payment details (they never see your card
            number)</li>
            <li>Our hosting provider (Supabase) stores your data securely</li>
          </ul>

          <p>No one else can see your data.</p>

          <h2>Your rights</h2>

          <p>Under UK GDPR, you have the right to:</p>

          <ul>
            <li>See what data we hold about you</li>
            <li>Request corrections to your data</li>
            <li>Delete your account and all data</li>
            <li>Export your data in a portable format</li>
            <li>Object to how we process your data</li>
          </ul>

          <p>
            To exercise any of these rights, email us. We'll respond within 30
            days.
          </p>

          <h2>Data retention</h2>

          <ul>
            <li>Account data: kept while your account is active</li>
            <li>Task history: kept while your account is active</li>
            <li>Billing records: kept for 7 years (legal requirement)</li>
          </ul>

          <p>
            When you delete your account, we delete all your data except billing
            records (which we must keep by law).
          </p>

          <h2>Data security</h2>

          <ul>
            <li>All data encrypted in transit (HTTPS)</li>
            <li>All data encrypted at rest</li>
            <li>Secure authentication</li>
            <li>Regular security audits</li>
            <li>Staff access limited and logged</li>
          </ul>

          <h2>Cookies</h2>

          <p>We use essential cookies to:</p>

          <ul>
            <li>Keep you signed in</li>
            <li>Remember your preferences</li>
          </ul>

          <p>We do not use advertising or tracking cookies.</p>

          <h2>Changes to this policy</h2>

          <p>
            We may update this policy. If we make significant changes, we'll
            email you.
          </p>

          <h2>Contact us</h2>

          <p>
            If you have questions about this privacy policy or how we handle your
            data, contact us at the email address on file.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
