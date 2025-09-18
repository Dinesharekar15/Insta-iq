import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Contact Page):", import.meta.env.VITE_BACKEND_URL); // Log the URL for debugging

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // CORRECTED: Changed back to 'phone' to match backend model
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      setSuccessMessage(response.data.message || "Your message has been sent successfully!");
      setFormData({ // Clear form fields on success
        name: "",
        email: "",
        phone: "", // Clear 'phone' field
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      {/* inner page banner */}
      <div
        className="page-banner ovbl-dark"
        style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-entry text-center" style={{ padding: '80px 0' }}>
            <h1 className="text-white" style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Contact Us
            </h1>
            <p style={{ 
              color: '#e6b3ff', 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Get in touch with us for any questions, support, or collaboration opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb-row" style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #333' }}>
        <div className="container">
          <ul className="list-inline" style={{ margin: 0, padding: '15px 0' }}>
            <li><Link to="/" style={{ color: '#4c1864', textDecoration: 'none', fontWeight: '500' }}>Home</Link></li>
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>/</li>
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>Contact Us</li>
          </ul>
        </div>
      </div>
      {/* inner page banner */}
      <div className="page-banner contact-page section-sp2" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5 m-b30">
              <div className="contact-info-bx" style={{
                backgroundColor: '#253248',
                color: '#ffffff',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                height: '100%'
              }}>
                <h2 className="m-b10 title-head" style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '700', marginBottom: '30px' }}>
                  Contact <span style={{ color: '#e6b3ff' }}>Information</span>
                </h2>
                <div className="widget widget_getintuch">
                  {/* Location Section */}
                  <div style={{ 
                    marginBottom: '20px',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '12px',
                    border: '1px solid #333',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                    e.currentTarget.style.borderColor = '#4c1864';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.backgroundColor = '#1e1e1e';
                    e.currentTarget.style.borderColor = '#333';
                  }}>
                    <div style={{ 
                      display: 'flex',
                      minHeight: '80px'
                    }}>
                      {/* Left Section - Icon */}
                      <div style={{ 
                        width: '20%',
                        backgroundColor: '#2a2a2a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '2px solid #333',
                        position: 'relative'
                      }}>
                        <i className="ti-location-pin" style={{ 
                          color: '#e6b3ff', 
                          fontSize: '28px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}></i>
                      </div>
                      
                      {/* Right Section - Content */}
                      <div style={{ 
                        width: '80%',
                        padding: '15px'
                      }}>
                        <h4 style={{ 
                          color: '#ffffff', 
                          margin: '0 0 8px 0', 
                          fontSize: '16px',
                          fontWeight: '600'
                        }}>Our Location</h4>
                        <div style={{ 
                          color: '#bbbbbb', 
                          lineHeight: '1.6',
                          fontSize: '14px'
                        }}>
                          Plot no 58, P&T Colony, Kotwal Nagar, Pratap Nagar, Nagpur, Maharashtra 440022
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Section */}
                  <div style={{ 
                    marginBottom: '20px',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '12px',
                    border: '1px solid #333',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                    e.currentTarget.style.borderColor = '#4c1864';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.backgroundColor = '#1e1e1e';
                    e.currentTarget.style.borderColor = '#333';
                  }}>
                    <div style={{ 
                      display: 'flex',
                      minHeight: '80px'
                    }}>
                      {/* Left Section - Icon */}
                      <div style={{ 
                        width: '20%',
                        backgroundColor: '#2a2a2a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '2px solid #333',
                        position: 'relative'
                      }}>
                        <i className="ti-mobile" style={{ 
                          color: '#e6b3ff', 
                          fontSize: '28px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}></i>
                      </div>
                      
                      {/* Right Section - Content */}
                      <div style={{ 
                        width: '80%',
                        padding: '15px'
                      }}>
                        <h4 style={{ 
                          color: '#ffffff', 
                          margin: '0 0 8px 0', 
                          fontSize: '16px',
                          fontWeight: '600'
                        }}>Phone Number</h4>
                        <div style={{ 
                          color: '#bbbbbb',
                          fontSize: '14px'
                        }}>
                          092841 84049
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email Section */}
                  <div style={{ 
                    marginBottom: '20px',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '12px',
                    border: '1px solid #333',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                    e.currentTarget.style.borderColor = '#4c1864';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.backgroundColor = '#1e1e1e';
                    e.currentTarget.style.borderColor = '#333';
                  }}>
                    <div style={{ 
                      display: 'flex',
                      minHeight: '80px'
                    }}>
                      {/* Left Section - Icon */}
                      <div style={{ 
                        width: '20%',
                        backgroundColor: '#2a2a2a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '2px solid #333',
                        position: 'relative'
                      }}>
                        <i className="ti-email" style={{ 
                          color: '#e6b3ff', 
                          fontSize: '28px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}></i>
                      </div>
                      
                      {/* Right Section - Content */}
                      <div style={{ 
                        width: '80%',
                        padding: '15px'
                      }}>
                        <h4 style={{ 
                          color: '#ffffff', 
                          margin: '0 0 8px 0', 
                          fontSize: '16px',
                          fontWeight: '600'
                        }}>Email Address</h4>
                        <div style={{ 
                          color: '#bbbbbb',
                          fontSize: '14px'
                        }}>
                          info@instaiq.in
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="m-t0 m-b20" style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '600', marginTop: '30px', marginBottom: '20px' }}>Follow Us</h5>
                <ul className="list-inline contact-social-bx" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
                  <li>
                    <a
                      href="https://www.facebook.com/InstaeducationNgp"
                      style={{
                        display: 'inline-block',
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#4c1864',
                        color: '#ffffff',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '45px',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3f189a';
                        e.target.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#4c1864';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/insta_iq_crt/"
                      style={{
                        display: 'inline-block',
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#4c1864',
                        color: '#ffffff',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '45px',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3f189a';
                        e.target.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#4c1864';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@INSTA_iQ"
                      style={{
                        display: 'inline-block',
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#4c1864',
                        color: '#ffffff',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '45px',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3f189a';
                        e.target.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#4c1864';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/instaiqcrt/"
                      style={{
                        display: 'inline-block',
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#4c1864',
                        color: '#ffffff',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '45px',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3f189a';
                        e.target.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#4c1864';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instaiq.ongraphy.com/"
                      style={{
                        display: 'inline-block',
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#4c1864',
                        color: '#ffffff',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '45px',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3f189a';
                        e.target.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#4c1864';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <form className="contact-bx ajax-form" onSubmit={handleSubmit}> {/* Added onSubmit handler */}
                {/* Message display area */}
                {loading && <div className="alert alert-info">Sending message...</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <div className="heading-bx left">
                  <h2 className="title-head">Connect with us</h2>
                  &nbsp;<h5>send us your query</h5>
                </div>
                <div className="row placeani">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="name"
                          type="text"
                          required
                          className="form-control valid-character"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          required
                          placeholder="Your Email Address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="phone" // CORRECTED: Changed name back to 'phone' to match backend model
                          type="text"
                          required
                          className="form-control int-value"
                          placeholder="Your Phone" // Updated placeholder to match 'phone'
                          value={formData.phone} // CORRECTED: Changed value to formData.phone
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="subject"
                          type="text"
                          required
                          className="form-control"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control"
                          required
                          placeholder="Type Message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      name="submit"
                      type="submit"
                      value="Submit"
                      className="btn button-md"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* inner page banner END */}
    </div>
  );
};

export default Contact;
