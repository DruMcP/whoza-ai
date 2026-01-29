import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <h1>Terms of service</h1>

          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
            Last updated: {new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <p>
            These terms govern your use of whoza.ai. By signing up, you agree to
            these terms.
          </p>

          <div className="panel" style={{ background: 'var(--color-primary-50)', border: '2px solid var(--color-primary-200)', marginBottom: 'var(--spacing-xl)' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>WHOZA AI LTD</strong>
            </p>
            <p style={{ marginBottom: '8px' }}>
              Company Number: SC874716
            </p>
            <p style={{ marginBottom: 0 }}>
              ICO Registration: ZC077271
            </p>
          </div>

          <h2>The service</h2>

          <p>whoza.ai provides:</p>

          <ul>
            <li>Weekly task recommendations to improve your AI search visibility</li>
            <li>Monthly AI Visibility Scores™</li>
            <li>Email delivery of tasks</li>
          </ul>

          <p>
            <strong>Important:</strong> Rex is an AI assistant that provides
            recommendations. You review and approve every task before taking
            action. Rex does not access your accounts or post content on your
            behalf.
          </p>

          <h2>Your responsibilities</h2>

          <p>You agree to:</p>

          <ul>
            <li>Provide accurate information about your business</li>
            <li>Keep your account details secure</li>
            <li>Review tasks before approving them</li>
            <li>Use the service in line with UK law</li>
          </ul>

          <h2>Payment and cancellation</h2>

          <ul>
            <li>Subscriptions are monthly and renew automatically</li>
            <li>You can cancel anytime</li>
            <li>When you cancel, you keep access until the end of your billing
            period</li>
            <li>Refunds available within 14 days of signing up</li>
            <li>After 14 days, no refunds for unused time</li>
          </ul>

          <h2>What we don't guarantee</h2>

          <p>
            We provide task recommendations to improve your visibility. However:
          </p>

          <ul>
            <li>We can't guarantee specific results or that you'll be named in AI answers</li>
            <li>AI search tools change their algorithms regularly</li>
            <li>Results depend on your business, location, and competition</li>
            <li>You must complete the tasks for them to have any effect</li>
          </ul>

          <h2>Our intellectual property</h2>

          <p>
            The whoza.ai service, including Rex's recommendations and the visibility
            scoring system, belongs to us. You can use them for your business but
            can't resell or share them.
          </p>

          <h2>Acceptable use</h2>

          <p>You must not:</p>

          <ul>
            <li>Share your account with others</li>
            <li>Try to reverse-engineer our service</li>
            <li>Use the service to do anything illegal</li>
            <li>Abuse or spam our support team</li>
          </ul>

          <h2>Service availability</h2>

          <p>
            We aim for 99.9% uptime but can't guarantee the service will always be
            available. We're not liable for losses if the service is temporarily
            unavailable.
          </p>

          <h2>Ending your account</h2>

          <p>We may suspend or close your account if you:</p>

          <ul>
            <li>Break these terms</li>
            <li>Don't pay your subscription</li>
            <li>Use the service for illegal purposes</li>
          </ul>

          <p>If we close your account, we'll refund any unused subscription time.</p>

          <h2>Liability</h2>

          <p>
            We're liable for death or personal injury caused by our negligence, and
            for fraud. Beyond that, our liability is limited to the amount you've
            paid us in the last 12 months.
          </p>

          <p>We're not liable for:</p>

          <ul>
            <li>Loss of profits or business</li>
            <li>Results you don't achieve from the service</li>
            <li>Changes to AI search algorithms</li>
          </ul>

          <h2>Changes to these terms</h2>

          <p>
            We may update these terms. If we make significant changes, we'll email
            you 30 days before they take effect.
          </p>

          <h2>Governing law</h2>

          <p>
            These terms are governed by the laws of Scotland. Any disputes
            will be handled in the courts of Scotland.
          </p>

          <h2>Contact</h2>

          <p>
            If you have questions about these terms, contact us at the email
            address on file.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
