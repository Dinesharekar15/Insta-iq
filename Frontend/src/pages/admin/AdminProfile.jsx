import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { AuthUtils } from "../../utils/auth";

const AdminProfile = () => {
  const { getAdminProfile, updateAdminProfile } = useAdmin();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    mobile: "",
    status: "",
    createdAt: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch admin profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const result = await getAdminProfile();
      
      if (result.success) {
        const profile = result.profile;
        const profileInfo = {
          name: profile.name || "",
          email: profile.email || "",
          role: profile.role || "",
          mobile: profile.mobile || "",
          status: profile.status || "",
          createdAt: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ""
        };
        setProfileData(profileInfo);
        setFormData(profileInfo);
      } else {
        // Fallback to localStorage data if API fails
        const currentUser = AuthUtils.getCurrentUser();
        if (currentUser) {
          const fallbackProfile = {
            name: currentUser.name || "",
            email: currentUser.email || "",
            role: currentUser.role || "",
            mobile: currentUser.mobile || "",
            status: "active",
            createdAt: "N/A"
          };
          setProfileData(fallbackProfile);
          setFormData(fallbackProfile);
        }
        setMessage(result.message || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      
      const result = await updateAdminProfile(formData);
      
      if (result.success) {
        setProfileData(prev => ({
          ...prev,
          name: result.profile.name,
          email: result.profile.email,
          mobile: result.profile.mobile,
          role: result.profile.role,
          status: result.profile.status
        }));
        setMessage(result.message || "Profile updated successfully!");
        setIsEditing(false);
      } else {
        setMessage(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setMessage("");
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ fontSize: '18px', color: '#666' }}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>My Profile</h2>
        <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage your admin profile information</p>
      </div>

      {/* Message Display */}
      {message && (
        <div style={{
          padding: '12px 20px',
          marginBottom: '20px',
          borderRadius: '6px',
          backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
          color: message.includes('success') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        {/* Profile Card */}
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee',
          textAlign: 'center'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: '#007bff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <i className="fas fa-user" style={{ color: 'white', fontSize: '50px' }}></i>
          </div>
          
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
            {profileData.name || "Admin User"}
          </h3>
          <p style={{ margin: '0 0 5px 0', color: '#666' }}>{profileData.email}</p>
          <span style={{
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            background: profileData.status === 'active' ? '#d4edda' : '#f8d7da',
            color: profileData.status === 'active' ? '#155724' : '#721c24'
          }}>
            {profileData.role ? profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1) : "Admin"}
          </span>
          
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>Status:</span>
              <div style={{ 
                color: profileData.status === 'active' ? '#155724' : '#721c24', 
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {profileData.status || "Active"}
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>Mobile:</span>
              <div style={{ color: '#333', fontWeight: '500' }}>
                {profileData.mobile || "Not provided"}
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>Join Date:</span>
              <div style={{ color: '#333', fontWeight: '500' }}>{profileData.createdAt || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Profile Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <i className="fas fa-edit" style={{ marginRight: '5px' }}></i>
                Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    background: saving ? '#6c757d' : '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`} style={{ marginRight: '5px' }}></i>
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  backgroundColor: isEditing ? '#fff' : '#f8f9fa'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  backgroundColor: isEditing ? '#fff' : '#f8f9fa'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter mobile number"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  backgroundColor: isEditing ? '#fff' : '#f8f9fa'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  backgroundColor: isEditing ? '#fff' : '#f8f9fa'
                }}
              >
                <option value="admin">Admin</option>
                <option value="junior admin">Junior Admin</option>
                <option value="super admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  backgroundColor: isEditing ? '#fff' : '#f8f9fa'
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                Join Date
              </label>
              <input
                type="text"
                value={profileData.createdAt}
                disabled={true}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  backgroundColor: '#f8f9fa',
                  color: '#666'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
