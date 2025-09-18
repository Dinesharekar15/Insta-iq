import React from "react";
import { Link } from "react-router-dom";

const BlogDetails5 = () => (
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
            Top 10 Companies Hiring Freshers in 2024
          </h1>
          <p style={{ 
            color: '#e6b3ff', 
            fontSize: '1.1rem', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover the leading companies actively hiring fresh graduates with detailed information about their recruitment processes
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
          <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>Top 10 Companies Hiring Freshers in 2024</li>
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
                    Placement
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
                        April 28, 2024
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
                        7 min read
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
                    Top 10 Companies Hiring Freshers in 2024
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
                    The job market for freshers in 2024 is showing promising signs of recovery and growth. Many top companies are actively hiring fresh graduates across various domains. Here's a comprehensive guide to the top 10 companies that are leading the hiring spree for freshers in 2024.
                  </p>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    1. Tata Consultancy Services (TCS)
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> TCS NQT (National Qualifier Test)</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 3.36 LPA - 7.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Software Engineer, System Engineer</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA, M.Sc</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    2. Infosys
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> Infosys SP and DSE</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 3.6 LPA - 9.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Systems Engineer, Digital Specialist</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA, M.Sc</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    3. Wipro
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> Wipro Elite NTH</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 3.5 LPA - 6.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Project Engineer</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    4. HCL Technologies
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> HCL Graduate Engineer Trainee</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 3.25 LPA - 4.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Graduate Engineer Trainee</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    5. Cognizant
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> Cognizant GenC</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 4.5 LPA - 6.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Programmer Analyst</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    6. Capgemini
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> Capgemini Recruitment</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 4.5 LPA - 7.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Software Engineer</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    7. Accenture
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> Accenture Recruitment</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 4.5 LPA - 8.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Associate Software Engineer</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    8. Tech Mahindra
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> Tech Mahindra NTH</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 3.25 LPA - 5.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Associate Software Engineer</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    9. L&T Infotech
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> LTI Recruitment</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 3.5 LPA - 6.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Graduate Engineer</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    10. Mindtree
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}><strong>Hiring Process:</strong> Mindtree Recruitment</li>
                    <li style={{ marginBottom: '10px' }}><strong>Package:</strong> 3.5 LPA - 6.5 LPA</li>
                    <li style={{ marginBottom: '10px' }}><strong>Positions:</strong> Software Engineer</li>
                    <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> B.Tech/BE, MCA</li>
                  </ul>

                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '1.5rem', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    marginTop: '40px'
                  }}>
                    Key Preparation Tips
                  </h4>
                  <ul style={{ 
                    color: '#bbbbbb', 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '20px'
                  }}>
                    <li style={{ marginBottom: '10px' }}>Stay updated with company-specific recruitment processes</li>
                    <li style={{ marginBottom: '10px' }}>Focus on aptitude, reasoning, and technical skills</li>
                    <li style={{ marginBottom: '10px' }}>Practice coding problems regularly</li>
                    <li style={{ marginBottom: '10px' }}>Improve communication and soft skills</li>
                    <li style={{ marginBottom: '10px' }}>Build a strong resume with relevant projects</li>
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
                      Ready to Land Your Dream Job?
                    </h4>
                    <p style={{ 
                      color: '#bbbbbb', 
                      fontSize: '16px', 
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      INSTA iQ provides comprehensive placement preparation programs designed to help you crack interviews at top companies. Our expert guidance covers all aspects from aptitude to technical skills.
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

export default BlogDetails5;
