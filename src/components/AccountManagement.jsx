import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { supabase } from '../lib/supabase';

export default function AccountManagement({ userId }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getUserProfile(userId);
      setProfile(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const userUpdates = {
        business_name: profile.user.business_name,
        trade_type: profile.user.trade_type,
        postcode: profile.user.postcode,
        service_area: profile.user.service_area,
        whatsapp_number: profile.user.whatsapp_number,
      };

      await dashboardService.updateUserProfile(userId, userUpdates);

      if (profile.profile) {
        const profileUpdates = {
          website_url: profile.profile.website_url,
          google_business_url: profile.profile.google_business_url,
          key_services: profile.profile.key_services,
          credentials: profile.profile.credentials,
        };
        await dashboardService.updateBusinessProfile(userId, profileUpdates);
      }

      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setSaving(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      setSaving(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Password updated successfully' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="account-loading">
        <div className="loading-spinner"></div>
        <p>Loading account settings...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="account-error">
        <p>Failed to load account information</p>
      </div>
    );
  }

  return (
    <div className="account-management">
      <div className="account-header">
        <h2>Account Settings</h2>
      </div>

      <div className="account-content">
        <div className="account-sidebar">
          <button
            className={`sidebar-button ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Profile Information
          </button>
          <button
            className={`sidebar-button ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Security
          </button>
          <button
            className={`sidebar-button ${activeSection === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveSection('subscription')}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Subscription
          </button>
        </div>

        <div className="account-main">
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          {activeSection === 'profile' && (
            <form onSubmit={handleProfileUpdate} className="account-form">
              <h3>Profile Information</h3>
              <p className="section-description">Update your business and contact information</p>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={profile.user.email}
                  disabled
                  className="input-disabled"
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label htmlFor="business_name">Business Name</label>
                <input
                  id="business_name"
                  type="text"
                  value={profile.user.business_name || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      user: { ...profile.user, business_name: e.target.value },
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="trade_type">Trade Type</label>
                <input
                  id="trade_type"
                  type="text"
                  value={profile.user.trade_type || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      user: { ...profile.user, trade_type: e.target.value },
                    })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="postcode">Postcode</label>
                  <input
                    id="postcode"
                    type="text"
                    value={profile.user.postcode || ''}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        user: { ...profile.user, postcode: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service_area">Service Area</label>
                  <input
                    id="service_area"
                    type="text"
                    value={profile.user.service_area || ''}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        user: { ...profile.user, service_area: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp_number">WhatsApp Number</label>
                <input
                  id="whatsapp_number"
                  type="tel"
                  value={profile.user.whatsapp_number || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      user: { ...profile.user, whatsapp_number: e.target.value },
                    })
                  }
                />
              </div>

              {profile.profile && (
                <>
                  <div className="form-group">
                    <label htmlFor="website_url">Website URL</label>
                    <input
                      id="website_url"
                      type="url"
                      value={profile.profile.website_url || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          profile: { ...profile.profile, website_url: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="google_business_url">Google Business URL</label>
                    <input
                      id="google_business_url"
                      type="url"
                      value={profile.profile.google_business_url || ''}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          profile: { ...profile.profile, google_business_url: e.target.value },
                        })
                      }
                    />
                  </div>
                </>
              )}

              <button type="submit" disabled={saving} className="button">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {activeSection === 'security' && (
            <form onSubmit={handlePasswordChange} className="account-form">
              <h3>Change Password</h3>
              <p className="section-description">Update your password to keep your account secure</p>

              <div className="form-group">
                <label htmlFor="new_password">New Password</label>
                <input
                  id="new_password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  required
                  minLength={8}
                />
                <small>Must be at least 8 characters</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password">Confirm New Password</label>
                <input
                  id="confirm_password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  required
                  minLength={8}
                />
              </div>

              <button type="submit" disabled={saving} className="button">
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          {activeSection === 'subscription' && (
            <div className="subscription-section">
              <h3>Subscription & Billing</h3>
              <p className="section-description">Manage your subscription and payment method</p>

              <div className="subscription-card">
                <div className="subscription-info">
                  <div className="subscription-plan">
                    <h4>Current Plan</h4>
                    <span className="plan-name">{profile.user.plan || 'No active plan'}</span>
                  </div>
                  {profile.user.stripe_customer_id && (
                    <div className="subscription-status">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ color: 'var(--color-success-600)' }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Active</span>
                    </div>
                  )}
                </div>

                {profile.user.plan && (
                  <div className="subscription-actions">
                    <a href="/pricing" className="button button-secondary">
                      Change Plan
                    </a>
                    <button
                      className="button button-outline"
                      onClick={() => window.open('https://billing.stripe.com/p/login/test_YOUR_LOGIN_LINK', '_blank')}
                    >
                      Manage Billing
                    </button>
                  </div>
                )}

                {!profile.user.plan && (
                  <div className="subscription-empty">
                    <p>You don't have an active subscription.</p>
                    <a href="/pricing" className="button">
                      View Plans
                    </a>
                  </div>
                )}
              </div>

              <div className="billing-info">
                <h4>Billing Information</h4>
                <p>Your payment method and billing history are managed securely through Stripe.</p>
                {profile.user.stripe_customer_id && (
                  <button
                    className="button button-secondary"
                    onClick={() => window.alert('This will open the Stripe customer portal. Integration pending.')}
                  >
                    View Billing History
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
