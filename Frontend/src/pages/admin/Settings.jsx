import React, { useState, useEffect } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: "Insta iQ",
      siteDescription: "Education Platform for Career Guidance",
      adminEmail: "admin@instaiq.com",
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY"
    },
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      userNotifications: true,
      systemNotifications: true
    },
    security: {
      sessionTimeout: 30,
      requireTwoFactor: false,
      passwordExpiry: 90,
      maxLoginAttempts: 5
    },
    appearance: {
      theme: "light",
      primaryColor: "#007bff",
      sidebarCollapsed: false,
      showNotifications: true
    }
  });

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem("adminSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = async (section) => {
    setLoading(true);
    setMessage("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem("adminSettings", JSON.stringify(settings));
      
      setMessage(`${section} settings saved successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error saving settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (section) => {
    if (window.confirm(`Are you sure you want to reset ${section} settings to default?`)) {
      const defaultSettings = {
        general: {
          siteName: "Insta iQ",
          siteDescription: "Education Platform for Career Guidance",
          adminEmail: "admin@instaiq.com",
          timezone: "Asia/Kolkata",
          dateFormat: "DD/MM/YYYY"
        },
        notifications: {
          emailNotifications: true,
          orderNotifications: true,
          userNotifications: true,
          systemNotifications: true
        },
        security: {
          sessionTimeout: 30,
          requireTwoFactor: false,
          passwordExpiry: 90,
          maxLoginAttempts: 5
        },
        appearance: {
          theme: "light",
          primaryColor: "#007bff",
          sidebarCollapsed: false,
          showNotifications: true
        }
      };

      setSettings(prev => ({
        ...prev,
        [section]: defaultSettings[section]
      }));
      
      setMessage(`${section} settings reset to default!`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const renderGeneralSettings = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
          Site Name *
        </label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
          Site Description
        </label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          rows="3"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px',
            resize: 'vertical'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
          Admin Email *
        </label>
        <input
          type="email"
          value={settings.general.adminEmail}
          onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
            Date Format
          </label>
          <select
            value={settings.general.dateFormat}
            onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Email Notifications</h4>
        <div style={{ display: 'grid', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', color: '#333' }}>
              Enable email notifications for admin actions
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.orderNotifications}
              onChange={(e) => handleInputChange('notifications', 'orderNotifications', e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', color: '#333' }}>
              Notify on new orders
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.userNotifications}
              onChange={(e) => handleInputChange('notifications', 'userNotifications', e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', color: '#333' }}>
              Notify on new user registrations
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.systemNotifications}
              onChange={(e) => handleInputChange('notifications', 'systemNotifications', e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', color: '#333' }}>
              Show system notifications in admin panel
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Session & Security</h4>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="480"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Password Expiry (days)
            </label>
            <input
              type="number"
              min="30"
              max="365"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Maximum Login Attempts
            </label>
            <input
              type="number"
              min="3"
              max="10"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.security.requireTwoFactor}
              onChange={(e) => handleInputChange('security', 'requireTwoFactor', e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', color: '#333' }}>
              Require two-factor authentication for admin access
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Theme & Display</h4>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Theme
            </label>
            <select
              value={settings.appearance.theme}
              onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Primary Color
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="color"
                value={settings.appearance.primaryColor}
                onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                style={{
                  width: '50px',
                  height: '40px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={settings.appearance.primaryColor}
                onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.appearance.sidebarCollapsed}
              onChange={(e) => handleInputChange('appearance', 'sidebarCollapsed', e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', color: '#333' }}>
              Start with collapsed sidebar
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.appearance.showNotifications}
              onChange={(e) => handleInputChange('appearance', 'showNotifications', e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontSize: '14px', color: '#333' }}>
              Show notification badges
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#333' }}>Settings</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Configure admin panel and system settings</p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div style={{
          background: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          padding: '12px 20px',
          borderRadius: '5px',
          marginBottom: '20px',
          border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
        }}>
          {message}
        </div>
      )}

      {/* Settings Container */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee',
        overflow: 'hidden'
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          {[
            { key: 'general', label: 'General', icon: 'fa fa-cog' },
            { key: 'notifications', label: 'Notifications', icon: 'fa fa-bell' },
            { key: 'security', label: 'Security', icon: 'fa fa-shield' },
            { key: 'appearance', label: 'Appearance', icon: 'fa fa-paint-brush' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? '#6c757d' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#666',
                border: 'none',
                padding: '15px 25px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRight: '1px solid #eee'
              }}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {renderContent()}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <button
              onClick={() => handleSave(activeTab)}
              disabled={loading}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <>
                  <i className="fa fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              onClick={() => handleReset(activeTab)}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 