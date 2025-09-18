import React from "react";
import { Link } from "react-router-dom";

const BlogDetails2 = () => (
  <div className="page-content">
    {/* Enhanced Page Heading Box */}
    <div className="page-banner ovbl-dark" style={{ 
      backgroundImage: "url(assets/images/banner/banner1.jpg)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div className="container">
        <div className="page-banner-entry text-center" style={{ padding: '80px 0' }}>
          <h1 className="text-white" style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            TCS iON NQT National Qualifier Test
          </h1>
          <p style={{ 
            color: '#e6b3ff', 
            fontSize: '1.1rem', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            A prestigious test for freshers aiming to enter the workforce via TCS or its partner companies
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
          <li><Link to="/blog" style={{ color: '#4c1864', textDecoration: 'none', fontWeight: '500' }}>Blog</Link></li>
          <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>/</li>
          <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>TCS iON NQT National Qualifier Test</li>
        </ul>
      </div>
    </div>

    {/* Page Content Box */}
    <div className="content-block">
      <div className="section-area section-sp1" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              <div className="blog-single-content" style={{
                backgroundColor: '#253248',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                border: '1px solid #444'
              }}>
                {/* Blog Header */}
                <div className="blog-single-head" style={{ marginBottom: '40px' }}>
                  {/* Category Badge */}
                  <div style={{
                    display: 'inline-block',
                    background: '#4c1864',
                    color: '#ffffff',
                    padding: '6px 16px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    textTransform: 'uppercase'
                  }}>
                    Recruitment
                  </div>

                  {/* Meta Information */}
                  <ul className="media-post" style={{ 
                    padding: 0, 
                    margin: '0 0 25px 0', 
                    listStyle: 'none', 
                    display: 'flex', 
                    gap: '20px',
                    color: '#bbbbbb',
                    fontSize: '14px',
                    flexWrap: 'wrap'
                  }}>
                    <li>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fa fa-calendar" style={{ marginRight: '8px', color: '#ffffff' }}></i>
                        October 5, 2024
                      </span>
                    </li>
                    <li>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fa fa-user" style={{ marginRight: '8px', color: '#ffffff' }}></i>
                        Amit Aswale
                      </span>
                    </li>
                    <li>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fa fa-clock-o" style={{ marginRight: '8px', color: '#ffffff' }}></i>
                        8 min read
                      </span>
                    </li>
            </ul>

                  {/* Title */}
                  <h2 className="post-title" style={{ 
                    color: '#ffffff', 
                    fontSize: '2.5rem', 
                    fontWeight: '700', 
                    lineHeight: '1.3',
                    marginBottom: '30px'
                  }}>
                    TCS iON NQT National Qualifier Test
                  </h2>
          </div>

                {/* Blog Content */}
                <div className="blog-content">
                  <p style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px'
                  }}>
                    TCS iON National Qualifier Test (NQT) is a prestigious test for freshers aiming to enter the workforce via TCS or its partner companies. This comprehensive assessment evaluates candidates on multiple parameters and provides a gateway to opportunities with over 100+ companies.
                  </p>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    Important Dates
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}>✅ Last Date to Apply: 24th October 2024</li>
                    <li style={{ marginBottom: '10px' }}>🗓️ Exam Date: 6th November 2024</li>
            </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    Why Take the NQT?
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}>Opportunity to get placed with TCS or 100+ IT and non-IT companies hiring via NQT</li>
                    <li style={{ marginBottom: '10px' }}>Get a scorecard valid for 2 years</li>
                    <li style={{ marginBottom: '10px' }}>Benchmark your skills on a national level</li>
                    <li style={{ marginBottom: '10px' }}>Enhance your resume with a recognized certification</li>
            </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    Eligibility Criteria
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}>UG, PG, Diploma students eligible</li>
                    <li style={{ marginBottom: '10px' }}>Freshers and final year students can apply</li>
                    <li style={{ marginBottom: '10px' }}>No minimum marks or gap criteria</li>
                    <li style={{ marginBottom: '10px' }}>Open to all branches and disciplines</li>
            </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    Test Sections
                  </h4>
                  <ol style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}>Verbal Ability</li>
                    <li style={{ marginBottom: '10px' }}>Reasoning Ability</li>
                    <li style={{ marginBottom: '10px' }}>Numerical Ability</li>
                    <li style={{ marginBottom: '10px' }}>Subject NQT (if opted)</li>
            </ol>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    How to Register?
                  </h4>
                  <p style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '20px'
                  }}>
                    Visit the official TCS iON website and complete your registration before the deadline. Prepare thoroughly using sample papers and mock tests to maximize your chances of success.
                  </p>

                  {/* Call to Action */}
                  <div style={{
                    backgroundColor: '#1e1e1e',
                    padding: '30px',
                    borderRadius: '16px',
                    marginTop: '40px',
                    border: '1px solid #444'
                  }}>
                    <h4 style={{ 
                      color: '#ffffff', 
                      fontSize: '1.3rem', 
                      fontWeight: '600',
                      marginBottom: '15px'
                    }}>
                      Need Help with NQT Preparation?
                    </h4>
                    <p style={{ 
                      color: '#bbbbbb', 
                      fontSize: '16px', 
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      INSTA iQ offers coaching, mentorship, and test prep for NQT to help students boost their success rate. Our comprehensive preparation program covers all sections with expert guidance.
                    </p>
                    <Link to="/courses" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#4c1864',
                      color: '#ffffff',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      border: '1px solid #4c1864'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#3f189a';
                      e.target.style.borderColor = '#3f189a';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#4c1864';
                      e.target.style.borderColor = '#4c1864';
                      e.target.style.transform = 'translateY(0)';
                    }}>
                      Explore Our Courses
                      <i className="fa fa-arrow-right" style={{ fontSize: '14px' }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="widget" style={{
                backgroundColor: '#253248',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                border: '1px solid #444',
                position: 'sticky',
                top: '20px'
              }}>
                <h4 className="widget-title" style={{ 
                  color: '#ffffff', 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  marginBottom: '25px'
                }}>
                  Related Articles
                </h4>
                
                <div style={{ marginBottom: '25px' }}>
                  <Link to="/blog-details1" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    display: 'block',
                    padding: '15px',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '12px',
                    border: '1px solid #444',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2a2a2a';
                    e.target.style.borderColor = '#4c1864';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#1e1e1e';
                    e.target.style.borderColor = '#444';
                  }}>
                    All India Placement Aptitude Test
                  </Link>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <Link to="/blog-details3" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    display: 'block',
                    padding: '15px',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '12px',
                    border: '1px solid #444',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2a2a2a';
                    e.target.style.borderColor = '#4c1864';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#1e1e1e';
                    e.target.style.borderColor = '#444';
                  }}>
                    Capgemini Recruitment Process
                  </Link>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <Link to="/blog-details4" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    display: 'block',
                    padding: '15px',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '12px',
                    border: '1px solid #444',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2a2a2a';
                    e.target.style.borderColor = '#4c1864';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#1e1e1e';
                    e.target.style.borderColor = '#444';
                  }}>
                    Aptitude Test Preparation Strategies
                  </Link>
                </div>

                {/* Back to Blog Button */}
                <Link to="/blog" style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#4c1864',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  border: '1px solid #4c1864',
                  marginTop: '30px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#3f189a';
                  e.target.style.borderColor = '#3f189a';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#4c1864';
                  e.target.style.borderColor = '#4c1864';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <i className="fa fa-arrow-left" style={{ marginRight: '8px' }}></i>
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogDetails2; 