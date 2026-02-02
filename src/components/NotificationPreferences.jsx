import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import { useAuth } from '../contexts/AuthContext';

export default function NotificationPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState([]);
  const [channels, setChannels] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [prefsData, channelsData, typesData] = await Promise.all([
        notificationService.getUserPreferences(user.id),
        notificationService.getNotificationChannels(),
        notificationService.getNotificationTypes(),
      ]);

      setPreferences(prefsData);
      setChannels(channelsData);
      setTypes(typesData);

      if (prefsData.length === 0) {
        await notificationService.createDefaultPreferences(user.id);
        const newPrefs = await notificationService.getUserPreferences(user.id);
        setPreferences(newPrefs);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (preferenceId, currentValue) => {
    try {
      setSaving(true);
      await notificationService.updatePreference(preferenceId, {
        is_enabled: !currentValue,
      });

      setPreferences((prev) =>
        prev.map((p) =>
          p.id === preferenceId ? { ...p, is_enabled: !currentValue } : p
        )
      );

      setMessage({ type: 'success', text: 'Preference updated successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  const getPreference = (typeId, channelId) => {
    return preferences.find(
      (p) => p.notification_type_id === typeId && p.channel_id === channelId
    );
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading preferences...</p>
      </div>
    );
  }

  return (
    <div className="notification-preferences">
      <div className="preferences-header">
        <h2>Notification Preferences</h2>
        <p className="preferences-subtitle">
          Choose how you want to receive updates about tasks, scores, and system alerts
        </p>
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="message-close">
            ×
          </button>
        </div>
      )}

      <div className="preferences-table-wrapper">
        <table className="preferences-table">
          <thead>
            <tr>
              <th>Notification Type</th>
              {channels.map((channel) => (
                <th key={channel.id}>{channel.display_name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td>
                  <div className="notification-type-info">
                    <strong>{type.display_name}</strong>
                    <small>{type.description}</small>
                  </div>
                </td>
                {channels.map((channel) => {
                  const pref = getPreference(type.id, channel.id);
                  const isDisabled =
                    !type.user_can_disable ||
                    saving ||
                    !pref ||
                    !channel.is_enabled;

                  return (
                    <td key={`${type.id}-${channel.id}`}>
                      {pref ? (
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={pref.is_enabled}
                            disabled={isDisabled}
                            onChange={() => handleToggle(pref.id, pref.is_enabled)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      ) : (
                        <span className="not-available">N/A</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="preferences-info">
        <h3>About Notification Channels</h3>
        <div className="channel-info-grid">
          {channels.map((channel) => (
            <div key={channel.id} className="channel-info-card">
              <h4>{channel.display_name}</h4>
              <p>
                {channel.name === 'email' &&
                  'Receive notifications via email with detailed information and links.'}
                {channel.name === 'in_app' &&
                  'See notifications directly in your dashboard when you log in.'}
                {channel.name === 'whatsapp' &&
                  'Get instant notifications on WhatsApp (coming soon).'}
                {channel.name === 'sms' &&
                  'Receive SMS notifications for urgent updates (coming soon).'}
              </p>
              {!channel.is_enabled && (
                <span className="coming-soon-badge">Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
