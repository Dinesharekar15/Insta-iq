import React from "react";
import { Link } from "react-router-dom";

const BlogDetails3 = () => (
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
            Capgemini Recruitment Process
          </h1>
          <p style={{ 
            color: '#e6b3ff', 
            fontSize: '1.1rem', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            A comprehensive guide to understanding Capgemini's multi-stage recruitment process
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
          <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>Capgemini Recruitment Process</li>
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
                        May 31, 2024
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
                        6 min read
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
                    Capgemini Recruitment Process Overview
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
                    Capgemini, a global leader in consulting and technology services, follows a structured and multi-stage recruitment process designed to assess both technical and behavioral competencies. Understanding this process is crucial for candidates aiming to join this prestigious organization.
                  </p>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    1. Online Assessment
                  </h4>
                  <p style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '20px'
                  }}>
                    This round includes sections such as:
                  </p>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}>Quantitative Aptitude</li>
                    <li style={{ marginBottom: '10px' }}>Logical Reasoning</li>
                    <li style={{ marginBottom: '10px' }}>English Communication</li>
                    <li style={{ marginBottom: '10px' }}>Pseudo-code (basic programming logic)</li>
                    <li style={{ marginBottom: '10px' }}>Game-Based Aptitude (newly introduced)</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    2. Technical Interview
                  </h4>
                  <p style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '20px'
                  }}>
                    This round tests knowledge in programming languages, data structures, OOP concepts, and real-world problem-solving capabilities. Projects mentioned in resumes are also discussed in detail.
                  </p>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    3. HR Interview
                  </h4>
                  <p style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px'
                  }}>
                    It focuses on your communication skills, confidence, motivation, willingness to relocate, career goals, and cultural fit.
                  </p>

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
                    <li style={{ marginBottom: '10px' }}>Minimum 60% in 10th, 12th, and graduation</li>
                    <li style={{ marginBottom: '10px' }}>No current backlogs</li>
                    <li style={{ marginBottom: '10px' }}>Gap of not more than 1 year in education</li>
                    <li style={{ marginBottom: '10px' }}>Strong communication skills</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    Tips for Success
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}>Focus on problem-solving and basic coding practice</li>
                    <li style={{ marginBottom: '10px' }}>Strengthen verbal ability and logic-based reasoning</li>
                    <li style={{ marginBottom: '10px' }}>Practice with game-based aptitude mock tests</li>
                    <li style={{ marginBottom: '10px' }}>Prepare well for behavioral questions</li>
                    <li style={{ marginBottom: '10px' }}>Research about Capgemini's culture and values</li>
                  </ul>

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
                      Ready to Ace Capgemini?
                    </h4>
                    <p style={{ 
                      color: '#bbbbbb', 
                      fontSize: '16px', 
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      At INSTA iQ, we offer complete placement readiness programs tailored to help students ace companies like Capgemini. Our expert guidance covers all aspects of the recruitment process.
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
                  <Link to="/blog-details2" style={{
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
                    TCS iON NQT National Qualifier Test
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

export default BlogDetails3; 