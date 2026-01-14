import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Icon from '../components/icons/Icon';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';

const SimpleToast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#dcfce7', border: '#22c55e', text: '#166534', icon: '✓' },
    error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', icon: '✗' },
    info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', icon: 'ℹ' }
  };

  const style = colors[type] || colors.info;

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 10000,
      background: style.bg,
      border: `2px solid ${style.border}`,
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxWidth: '420px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>
        {style.icon}
      </div>
      <div style={{ flex: 1, color: style.text, fontSize: '15px', fontWeight: 500, lineHeight: '1.5' }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: style.text,
          fontSize: '20px',
          lineHeight: 1,
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          opacity: 0.6
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const CancelSubscriptionModal = ({ isOpen, onClose, subscription, onConfirm }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape' && !isConfirming) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isConfirming, onClose]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsConfirming(true);
    await onConfirm();
    setIsConfirming(false);
  };

  const planFeatures = {
    monitor: [
      'Monthly Visibility Confidence Score™',
      'AI visibility report across ChatGPT, Google AI, Perplexity',
      'Competitor tracking',
      'Monthly strategy report'
    ],
    improve: [
      'Everything in Monitor',
      'Weekly personalised tasks from Rex',
      'Step-by-step action plans you approve before doing',
      'Faster visibility growth',
      'Email + WhatsApp support'
    ],
    priority: [
      'Everything in Improve',
      'Priority support',
      'Custom compliance checks',
      'Ideal for regulated businesses'
    ]
  };

  const currentPlan = subscription?.items?.data?.[0]?.price?.product?.name?.toLowerCase() || 'monitor';
  const features = planFeatures[currentPlan] || planFeatures.monitor;
  const accessUntil = subscription?.current_period_end ?
    new Date(subscription.current_period_end).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'the end of your billing period';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 'var(--spacing-lg)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isConfirming) {
          onClose();
        }
      }}
    >
      <div style={{
        backgroundColor: 'var(--color-dark-800)',
        border: '1px solid var(--color-dark-600)',
        borderRadius: '16px',
        maxWidth: '540px',
        width: '100%',
        padding: 'var(--spacing-2xl)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--spacing-lg)',
            right: 'var(--spacing-lg)',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: 'var(--spacing-xs)'
          }}
        >
          <Icon name="CloseIcon" size={24} />
        </button>

        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            Cancel your subscription?
          </h2>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: 1.6
          }}>
            Are you sure you want to cancel? You'll lose access to these features:
          </p>
        </div>

        <div style={{
          backgroundColor: 'var(--color-dark-900)',
          border: '1px solid var(--color-dark-600)',
          borderRadius: '12px',
          padding: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-xl)'
        }}>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {features.map((feature, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--spacing-sm)',
                marginBottom: index < features.length - 1 ? 'var(--spacing-sm)' : 0,
                color: 'var(--color-text-primary)',
                fontSize: '15px'
              }}>
                <Icon name="CloseIcon" size={18} style={{
                  color: 'var(--color-error)',
                  flexShrink: 0,
                  marginTop: '2px'
                }} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          backgroundColor: 'rgba(194, 255, 72, 0.1)',
          border: '1px solid rgba(194, 255, 72, 0.3)',
          borderRadius: '12px',
          padding: 'var(--spacing-lg)',
          marginBottom: 'var(--spacing-xl)'
        }}>
          <p style={{
            color: 'var(--color-text-primary)',
            fontSize: '15px',
            lineHeight: 1.6,
            margin: 0
          }}>
            <strong>You'll keep access until {accessUntil}</strong>
            <br />
            After that, your subscription will end and you won't be charged again.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: 'var(--spacing-md)',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onClose}
            disabled={isConfirming}
            style={{
              flex: 1,
              padding: 'var(--spacing-md) var(--spacing-lg)',
              backgroundColor: 'var(--color-primary-500)',
              color: 'var(--color-dark-900)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isConfirming ? 'not-allowed' : 'pointer',
              opacity: isConfirming ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            Keep My Subscription
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            style={{
              flex: 1,
              padding: 'var(--spacing-md) var(--spacing-lg)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-dark-600)',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isConfirming ? 'not-allowed' : 'pointer',
              opacity: isConfirming ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {isConfirming ? 'Cancelling...' : 'Yes, Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Account() {
  const { user, userData, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/start');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAccountData();
    }
  }, [user]);

  const fetchAccountData = async () => {
    try {
      setLoading(true);

      const [subResponse, invoiceResponse, pmResponse] = await Promise.all([
        supabase
          .from('stripe_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('stripe_invoices')
          .select('*')
          .eq('user_id', user.id)
          .order('created', { ascending: false })
          .limit(10),
        supabase
          .from('stripe_payment_methods')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_default', true)
          .maybeSingle()
      ]);

      if (subResponse.data) setSubscription(subResponse.data);
      if (invoiceResponse.data) setInvoices(invoiceResponse.data);
      if (pmResponse.data) setPaymentMethod(pmResponse.data);

    } catch (error) {
      // TODO: Review error handling: console.error('Error fetching account data:', error)
      setToast({ type: 'error', message: 'Failed to load account data' });
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    alert('Stripe Customer Portal will be available soon. For billing inquiries, please contact hello@whoza.ai');
  };

  const handleCancelSubscription = async () => {
    try {
      const { error } = await supabase
        .from('stripe_subscriptions')
        .update({
          cancel_at_period_end: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscription.id);

      if (error) throw error;

      setSubscription({ ...subscription, cancel_at_period_end: true });
      setShowCancelModal(false);
      setToast({
        type: 'success',
        message: `Your subscription has been cancelled. You'll have access until ${new Date(subscription.current_period_end).toLocaleDateString('en-GB')}`
      });
    } catch (error) {
      // TODO: Review error handling: console.error('Error cancelling subscription:', error)
      setToast({ type: 'error', message: 'Failed to cancel subscription. Please contact support.' });
    }
  };

  const getPlanDisplayName = (status) => {
    if (!subscription) return 'No active plan';
    const planName = subscription.items?.data?.[0]?.price?.product?.name || 'Monitor';
    return planName;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'var(--color-success)', text: 'Active' },
      past_due: { color: 'var(--color-warning)', text: 'Past Due' },
      canceled: { color: 'var(--color-error)', text: 'Cancelled' },
      trialing: { color: 'var(--color-primary-500)', text: 'Trial' },
      incomplete: { color: 'var(--color-warning)', text: 'Incomplete' },
      unpaid: { color: 'var(--color-error)', text: 'Unpaid' },
      paused: { color: 'var(--color-text-secondary)', text: 'Paused' }
    };

    const config = statusConfig[status] || { color: 'var(--color-text-secondary)', text: status };

    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        padding: '4px 12px',
        backgroundColor: `${config.color}20`,
        color: config.color,
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 600
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: config.color
        }} />
        {config.text}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'UserIcon' },
    { id: 'billing', label: 'Billing & Invoices', icon: 'SettingsIcon' },
    { id: 'settings', label: 'Account Settings', icon: 'SettingsIcon' }
  ];

  return (
    <>
      <SEO
        title="My Account"
        description="Manage your Whoza subscription, billing, and account settings"
        noindex={true}
      />

      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-dark-900)',
        paddingTop: 'calc(var(--header-height) + var(--spacing-2xl))',
        paddingBottom: 'var(--spacing-4xl)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--spacing-lg)'
        }}>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-sm)'
            }}>
              My Account
            </h1>
            <p style={{
              fontSize: '18px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6
            }}>
              Manage your subscription, billing, and account settings
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-2xl)',
            borderBottom: '1px solid var(--color-dark-700)',
            overflowX: 'auto'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon name={tab.icon} size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
              <div style={{
                backgroundColor: 'var(--color-dark-800)',
                border: '1px solid var(--color-dark-600)',
                borderRadius: '16px',
                padding: 'var(--spacing-2xl)'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  Account Information
                </h2>
                <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                      Email Address
                    </div>
                    <div style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      {userData?.email || user.email}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                      Business Name
                    </div>
                    <div style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      {userData?.business_name || 'Not set'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                      Member Since
                    </div>
                    <div style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      {new Date(userData?.created_at || user.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {subscription && (
                <div style={{
                  backgroundColor: 'var(--color-dark-800)',
                  border: '1px solid var(--color-dark-600)',
                  borderRadius: '16px',
                  padding: 'var(--spacing-2xl)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--spacing-xl)',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-md)'
                  }}>
                    <div>
                      <h2 style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-sm)'
                      }}>
                        Current Subscription
                      </h2>
                      <div style={{
                        fontSize: '18px',
                        color: 'var(--color-primary-500)',
                        fontWeight: 600
                      }}>
                        {getPlanDisplayName(subscription.status)} Plan
                      </div>
                    </div>
                    {getStatusBadge(subscription.status)}
                  </div>

                  <div style={{ display: 'grid', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                    <div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                        Next Billing Date
                      </div>
                      <div style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                        {new Date(subscription.current_period_end).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xs)' }}>
                        Subscription Started
                      </div>
                      <div style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                        {new Date(subscription.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    {subscription.cancel_at_period_end && (
                      <div style={{
                        padding: 'var(--spacing-md)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        color: 'var(--color-error)',
                        fontSize: '15px'
                      }}>
                        Your subscription will end on {new Date(subscription.current_period_end).toLocaleDateString('en-GB')}
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-md)',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={handleManageBilling}
                      style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        backgroundColor: 'var(--color-primary-500)',
                        color: 'var(--color-dark-900)',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Manage Billing
                    </button>
                    {!subscription.cancel_at_period_end && subscription.status === 'active' && (
                      <button
                        onClick={() => setShowCancelModal(true)}
                        style={{
                          padding: 'var(--spacing-md) var(--spacing-xl)',
                          backgroundColor: 'transparent',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-dark-600)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </div>
                </div>
              )}

              {!subscription && (
                <div style={{
                  backgroundColor: 'var(--color-dark-800)',
                  border: '1px solid var(--color-dark-600)',
                  borderRadius: '16px',
                  padding: 'var(--spacing-2xl)',
                  textAlign: 'center'
                }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    No Active Subscription
                  </h2>
                  <p style={{
                    fontSize: '16px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-xl)',
                    lineHeight: 1.6
                  }}>
                    You don't have an active subscription. Choose a plan to start improving your visibility.
                  </p>
                  <button
                    onClick={() => navigate('/pricing')}
                    style={{
                      padding: 'var(--spacing-md) var(--spacing-xl)',
                      backgroundColor: 'var(--color-primary-500)',
                      color: 'var(--color-dark-900)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    View Plans
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'billing' && (
            <div style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
              {paymentMethod && (
                <div style={{
                  backgroundColor: 'var(--color-dark-800)',
                  border: '1px solid var(--color-dark-600)',
                  borderRadius: '16px',
                  padding: 'var(--spacing-2xl)'
                }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    Payment Method
                  </h2>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <div>
                      <div style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 500, marginBottom: 'var(--spacing-xs)' }}>
                        {paymentMethod.card_brand?.toUpperCase()} •••• {paymentMethod.card_last4}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                        Expires {paymentMethod.card_exp_month}/{paymentMethod.card_exp_year}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleManageBilling}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-lg)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-primary-500)',
                      border: '1px solid var(--color-primary-500)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Update Payment Method
                  </button>
                </div>
              )}

              <div style={{
                backgroundColor: 'var(--color-dark-800)',
                border: '1px solid var(--color-dark-600)',
                borderRadius: '16px',
                padding: 'var(--spacing-2xl)'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  Billing History
                </h2>
                {invoices.length > 0 ? (
                  <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                    {invoices.map(invoice => (
                      <div
                        key={invoice.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: 'var(--spacing-md)',
                          backgroundColor: 'var(--color-dark-900)',
                          border: '1px solid var(--color-dark-700)',
                          borderRadius: '8px',
                          flexWrap: 'wrap',
                          gap: 'var(--spacing-md)'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 500, marginBottom: 'var(--spacing-xs)' }}>
                            {invoice.number || 'Invoice'}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                            {new Date(invoice.created).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                          <div style={{
                            fontSize: '18px',
                            color: 'var(--color-text-primary)',
                            fontWeight: 600
                          }}>
                            £{(invoice.total / 100).toFixed(2)}
                          </div>
                          {invoice.paid ? (
                            <span style={{
                              padding: '4px 12px',
                              backgroundColor: 'rgba(16, 185, 129, 0.2)',
                              color: 'var(--color-success)',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: 600
                            }}>
                              Paid
                            </span>
                          ) : (
                            <span style={{
                              padding: '4px 12px',
                              backgroundColor: 'rgba(239, 68, 68, 0.2)',
                              color: 'var(--color-error)',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: 600
                            }}>
                              {invoice.status}
                            </span>
                          )}
                          {invoice.invoice_pdf && (
                            <a
                              href={invoice.invoice_pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: 'var(--spacing-xs) var(--spacing-md)',
                                color: 'var(--color-primary-500)',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: 600
                              }}
                            >
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
                    No invoices yet
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
              <div style={{
                backgroundColor: 'var(--color-dark-800)',
                border: '1px solid var(--color-dark-600)',
                borderRadius: '16px',
                padding: 'var(--spacing-2xl)'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  Account Settings
                </h2>
                <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-sm)' }}>
                      Email Notifications
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                      Manage your email notification preferences
                    </p>
                    <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                      {['Task reminders', 'Visibility score updates', 'Weekly reports', 'Marketing emails'].map(pref => (
                        <label key={pref} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-sm)',
                          padding: 'var(--spacing-sm)',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            defaultChecked
                            style={{
                              width: '20px',
                              height: '20px',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>
                            {pref}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--color-dark-700)',
                    paddingTop: 'var(--spacing-lg)'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-sm)' }}>
                      Security
                    </h3>
                    <button
                      onClick={() => setToast({ type: 'info', message: 'Password reset email sent!' })}
                      style={{
                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-primary-500)',
                        border: '1px solid var(--color-primary-500)',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Change Password
                    </button>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--color-dark-700)',
                    paddingTop: 'var(--spacing-lg)'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-error)', marginBottom: 'var(--spacing-sm)' }}>
                      Danger Zone
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                      Delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setToast({ type: 'error', message: 'Please contact hello@whoza.ai to delete your account' })}
                      style={{
                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-error)',
                        border: '1px solid var(--color-error)',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CancelSubscriptionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        subscription={subscription}
        onConfirm={handleCancelSubscription}
      />

      {toast && (
        <SimpleToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
