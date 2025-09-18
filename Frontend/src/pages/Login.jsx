import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import Axios

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Login Page):", import.meta.env.VITE_BACKEND_URL); // Log the URL for debugging

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [mobileData, setMobileData] = useState({
    mobile: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // For general success messages
  const [errorMessage, setErrorMessage] = useState(null); // For login errors

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
  }, [successMessage, errorMessage]); // Re-run this effect whenever messages change

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle mobile data changes
  const handleMobileChange = (e) => {
    setMobileData({ ...mobileData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setSuccessMessage(null); // Clear any previous messages
    setErrorMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);

      // Store the JWT token in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Store full user info including token

      setSuccessMessage("Login successful! Redirecting to home page...");
      setFormData({ // Clear password field on success (keep email for convenience if desired)
        email: formData.email, // Keep email
        password: "", // Clear password
      });

      // Redirect to the home page after successful login
      navigate('/'); // Redirect to home page

    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Login failed. Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP send
  const handleSendOTP = async () => {
    if (!mobileData.mobile || mobileData.mobile.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // Simulate OTP sending (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      setSuccessMessage("OTP sent to your mobile number!");
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle mobile OTP login
  const handleMobileLogin = async (e) => {
    e.preventDefault();
    
    if (!mobileData.otp || mobileData.otp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // Simulate OTP verification (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, simulate successful login
      localStorage.setItem('userInfo', JSON.stringify({
        name: 'Mobile User',
        email: 'user@instaiq.com',
        mobile: mobileData.mobile,
        role: 'user'
      }));

      setSuccessMessage("Login successful! Redirecting to home page...");
      navigate('/');
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle different role logins (for demo purposes)
  const handleRoleLogin = (role) => {
    localStorage.setItem('isAdmin', 'true');
    
    const roleConfigs = {
      'super admin': {
        name: 'Super Admin User',
        email: 'admin@instaiq.com',
        role: 'super admin'
      },
      'junior admin': {
        name: 'Junior Admin User',
        email: 'junior.admin@instaiq.com',
        role: 'junior admin'
      },
      'instructor': {
        name: 'Instructor User',
        email: 'instructor@instaiq.com',
        role: 'instructor'
      },
      'student': {
        name: 'Student User',
        email: 'student@instaiq.com',
        role: 'student'
      }
    };
    
    const userInfo = roleConfigs[role];
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    if (role === 'student') {
      navigate('/');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="page-wraper">
      <div className="account-form">
        <div
          className="account-head"
          style={{ backgroundImage: "url(assets/images/about/login.jpg)" }}
        >
          <a href="/">
            <img src="assets/images/logo-white-2.png" alt="InstaIQ Logo" />
          </a>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="heading-bx left">
              <h2 className="title-head">
                Login to your<br />
                <span>InstaIQ Account</span>
              </h2>
              <p>
                Don't have an account? <Link to="/register">Register Now</Link>
              </p>
            </div>
            {/* Login Method Toggle */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="btn-group w-100" role="group">
                  <button
                    type="button"
                    className={`btn ${loginMethod === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setLoginMethod('email')}
                  >
                    Email Login
                  </button>
                  <button
                    type="button"
                    className={`btn ${loginMethod === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setLoginMethod('mobile')}
                  >
                    Mobile OTP Login
                  </button>
                </div>
              </div>
            </div>

            {/* Message display area */}
            {loading && <div className="alert alert-info">Logging in...</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            {/* Email Login Form */}
            {loginMethod === 'email' && (
              <form className="contact-bx" onSubmit={handleSubmit}>
                <div className="row placeani">
                {/* Input for Email */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email" // Corrected name to 'email' to match backend
                        type="email" // Changed type to email
                        required
                        className="form-control"
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Input for Password */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="password" // Corrected name to 'password' to match backend
                        type="password"
                        className="form-control"
                        required
                        placeholder="Your Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-forget">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlAutosizing"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="/forget-password" className="ml-auto">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </div>
                <div className="col-lg-12">
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Demo Role Logins:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleRoleLogin('super admin')}
                        className="btn button-md"
                        style={{
                          background: '#dc3545',
                          border: 'none',
                          fontSize: '12px',
                          padding: '8px 12px'
                        }}
                      >
                        Super Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleLogin('junior admin')}
                        className="btn button-md"
                        style={{
                          background: '#fd7e14',
                          border: 'none',
                          fontSize: '12px',
                          padding: '8px 12px'
                        }}
                      >
                        Junior Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleLogin('instructor')}
                        className="btn button-md"
                        style={{
                          background: '#28a745',
                          border: 'none',
                          fontSize: '12px',
                          padding: '8px 12px'
                        }}
                      >
                        Instructor
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleLogin('student')}
                        className="btn button-md"
                        style={{
                          background: '#17a2b8',
                          border: 'none',
                          fontSize: '12px',
                          padding: '8px 12px'
                        }}
                      >
                        Student
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            )}

            {/* Mobile OTP Login Form */}
            {loginMethod === 'mobile' && (
              <form className="contact-bx" onSubmit={handleMobileLogin}>
                <div className="row placeani">
                  {/* Input for Mobile Number */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="mobile"
                          type="tel"
                          required
                          className="form-control"
                          placeholder="Your Mobile Number"
                          value={mobileData.mobile}
                          onChange={handleMobileChange}
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"
                          disabled={otpSent}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Send OTP Button */}
                  {!otpSent && (
                    <div className="col-lg-12">
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="btn button-md"
                        disabled={loading || !mobileData.mobile || mobileData.mobile.length !== 10}
                        style={{
                          background: '#28a745',
                          border: 'none',
                          width: '100%'
                        }}
                      >
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    </div>
                  )}

                  {/* Input for OTP */}
                  {otpSent && (
                    <>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="input-group">
                            <input
                              name="otp"
                              type="text"
                              required
                              className="form-control"
                              placeholder="Enter 6-digit OTP"
                              value={mobileData.otp}
                              onChange={handleMobileChange}
                              pattern="[0-9]{6}"
                              title="Please enter a valid 6-digit OTP"
                              maxLength="6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setMobileData({ mobile: mobileData.mobile, otp: "" });
                          }}
                          className="btn button-md"
                          style={{
                            background: '#6c757d',
                            border: 'none',
                            width: '100%',
                            marginBottom: '10px'
                          }}
                        >
                          Change Mobile Number
                        </button>
                      </div>
                      <div className="col-lg-12 m-b30">
                        <button
                          name="submit"
                          type="submit"
                          value="Submit"
                          className="btn button-md"
                          disabled={loading || !mobileData.otp || mobileData.otp.length !== 6}
                        >
                          {loading ? "Verifying OTP..." : "Login with OTP"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
