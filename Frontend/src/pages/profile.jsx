import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // For API calls
import { useCart } from "../context/CartContext"; // Import CartContext

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Profile Page):", import.meta.env.VITE_BACKEND_URL);

const Profile = () => {
  const navigate = useNavigate();
  const { purchasedCourses, loadPurchasedCourses } = useCart(); // Use CartContext

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "", // For password update
    confirmPassword: "", // For password confirmation
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // For update form submission
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Effect to fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) {
        // If no user info, redirect to login
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.token;

        // Fetch user profile
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${API_BASE_URL}/users/profile`, config);

        // Load purchased courses from CartContext
        await loadPurchasedCourses();

        setUserData({
          name: data.name,
          email: data.email,
          password: "", // Keep password field empty for security
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
        setErrorMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : "Failed to load profile. Please try logging in again."
        );
        // If token is invalid or expired, redirect to login
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('userInfo');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // navigate is a dependency of useEffect

  // Effect to clear success/error messages after a few seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Message disappears after 3 seconds
      return () => clearTimeout(timer);
    }
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Error message disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle profile update submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      setErrorMessage("You are not logged in.");
      setSubmitting(false);
      navigate('/login');
      return;
    }
    const parsedUserInfo = JSON.parse(userInfo);
    const token = parsedUserInfo.token;

    // Prepare data for update
    const updateData = {
      name: userData.name,
      email: userData.email,
    };

    if (userData.password) {
      if (userData.password !== userData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setSubmitting(false);
        return;
      }
      updateData.password = userData.password;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(`${API_BASE_URL}/users/profile`, updateData, config);

      // Update localStorage with new user info if name or email changed
      const updatedUserInfo = { ...parsedUserInfo, name: data.name, email: data.email };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

      setSuccessMessage("Profile updated successfully!");
      // Clear password fields after successful update
      setUserData(prev => ({ ...prev, password: "", confirmPassword: "" }));

    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to update profile. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-content bg-white">
        <div className="container" style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content bg-white">
      {/* Add custom styles for the purchased courses section */}
      <style jsx>{`
        .course-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .stat-item h4 {
          font-weight: 700;
        }
        .badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
        }
        .btn-outline-primary:hover {
          transform: scale(1.05);
        }
        .purchased-courses-list {
          max-height: 500px;
          overflow-y: auto;
        }
        .purchased-courses-list::-webkit-scrollbar {
          width: 6px;
        }
        .purchased-courses-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .purchased-courses-list::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .purchased-courses-list::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>

      {/* Banner */}
      <div
        className="page-banner ovbl-dark"
        style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">User Profile</h1>
          </div>
        </div>
      </div>

      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              {/* Profile Details Column */}
              <div className="col-lg-6 col-md-12 m-b30">
                <div className="widget-box bg-white p-4 rounded shadow">
                  <h3 className="widget-title style-1 m-b20" style={{ color: '#0b0606ff' }}>Your Profile Information</h3>
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                  <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                      <label htmlFor="name" style={{ color: '#0b0606ff' }}>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" style={{ color: '#0b0606ff' }}>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" style={{ color: '#0b0606ff' }}>New Password (optional):</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword" style={{ color: '#0b0606ff' }}>Confirm New Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? "Updating..." : "Update Profile"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Purchased Courses Column */}
              <div className="col-lg-6 col-md-12 m-b30">
                <div className="widget-box bg-white p-4 rounded shadow">
                  <h3 className="widget-title style-1 m-b20" style={{ color: '#000' }}>Your Purchased Courses</h3>
                  {purchasedCourses.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="fa fa-graduation-cap fa-3x text-muted mb-3"></i>
                      <p className="text-muted">You have not purchased any courses yet.</p>
                      <a href="/courses" className="btn btn-primary">
                        Browse Courses
                      </a>
                    </div>
                  ) : (
                    <div className="purchased-courses-list">
                      {purchasedCourses.map((course, index) => (
                        <div key={course._id || course.courseId || index} className="course-item mb-3 p-3 rounded" style={{ 
                          backgroundColor: '#f8f9fa', 
                          border: '1px solid #e9ecef',
                          transition: 'transform 0.2s ease-in-out'
                        }}>
                          <div className="d-flex align-items-center">
                            <div className="course-image mr-3">
                              <img
                                src={course.imageUrl || course.img || course.image || '/assets/images/courses/course1.jpg'}
                                alt={course.title}
                                className="img-thumbnail"
                                style={{ 
                                  width: '60px', 
                                  height: '60px', 
                                  objectFit: 'cover', 
                                  borderRadius: '8px',
                                  border: '2px solid #fff'
                                }}
                                onError={(e) => {
                                  // If image fails to load, use fallback
                                  e.target.src = '/assets/images/courses/course1.jpg';
                                }}
                              />
                            </div>
                            <div className="course-details flex-grow-1">
                              <h5 className="mb-1" style={{ color: '#000', fontSize: '16px', fontWeight: '600' }}>
                                {course.title}
                              </h5>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <small className="text-muted d-block">
                                    Purchased: {new Date(course.purchaseDate).toLocaleDateString()}
                                  </small>
                                  <span className={`badge ${
                                    course.orderStatus === 'completed' || course.orderStatus === 'delivered' ? 'badge-success' : 
                                    course.orderStatus === 'processing' ? 'badge-warning' : 'badge-info'
                                  }`}>
                                    {course.orderStatus === 'delivered' ? 'Delivered' : 
                                     course.orderStatus === 'completed' ? 'Completed' :
                                     course.orderStatus === 'processing' ? 'Processing' : 'Pending'}
                                  </span>
                                </div>
                                <div className="course-actions">
                                  <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => {
                                      // You can add course access logic here
                                      console.log('Accessing course:', course.title);
                                    }}
                                  >
                                    <i className="fa fa-play"></i> Access Course
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Summary Section */}
                      <div className="mt-4 p-3 bg-light rounded">
                        <div className="row text-center">
                          <div className="col-6">
                            <div className="stat-item">
                              <h4 className="mb-0 text-primary">{purchasedCourses.length}</h4>
                              <small className="text-muted">Total Courses</small>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="stat-item">
                              <h4 className="mb-0 text-success">
                                {purchasedCourses.filter(c => c.orderStatus === 'completed' || c.orderStatus === 'delivered').length}
                              </h4>
                              <small className="text-muted">Delivered Orders</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
