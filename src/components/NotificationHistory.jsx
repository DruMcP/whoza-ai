import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import { useAuth } from '../contexts/AuthContext';

export default function NotificationHistory() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotificationHistory(user.id);
      setNotifications(data);
    } catch (error) {
      // TODO: Review error handling: console.error('Error loading notifications:', error)
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      sent: 'status-badge-completed',
      pending: 'status-badge-sent',
      processing: 'status-badge-draft',
      failed: 'status-badge-draft',
      expired: 'status-badge-sent',
    };
    return statusMap[status] || 'status-badge-sent';
  };

  const getChannelIcon = (channelName) => {
    const icons = {
      Email: '✉',
      'In-App': '🔔',
      WhatsApp: '💬',
      SMS: '📱',
    };
    return icons[channelName] || '📧';
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    return notif.status === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notification-history">
      <div className="history-header">
        <h2>Notification History</h2>
        <div className="history-filters">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('sent')}
            className={`filter-button ${filter === 'sent' ? 'active' : ''}`}
          >
            Sent
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('failed')}
            className={`filter-button ${filter === 'failed' ? 'active' : ''}`}
          >
            Failed
          </button>
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <p>No notifications found</p>
        </div>
      ) : (
        <div className="notification-list">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <div className="notification-icon">
                {notification.priority === 'urgent' ? '🔴' : '🔵'}
              </div>
              <div className="notification-content">
                <div className="notification-header-row">
                  <h3>{notification.title}</h3>
                  <span className={`status-badge ${getStatusBadgeClass(notification.status)}`}>
                    {notification.status}
                  </span>
                </div>
                <p className="notification-body">{notification.content}</p>
                <div className="notification-meta">
                  <span className="notification-time">{formatDate(notification.created_at)}</span>
                  <span className="notification-type">
                    {notification.notification_types?.display_name}
                  </span>
                  {notification.notification_delivery_log &&
                    notification.notification_delivery_log.length > 0 && (
                      <div className="notification-channels">
                        {notification.notification_delivery_log.map((log, idx) => (
                          <span key={idx} className="channel-badge">
                            {getChannelIcon(log.notification_channels?.display_name)}{' '}
                            {log.notification_channels?.display_name}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
