import React, { useState, useEffect } from "react";

const About = () => {
  const [showMore, setShowMore] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleStory = () => {
    setShowMore(!showMore);
  };

  const handleCardHover = (e, isHovering) => {
    const card = e.currentTarget;
    if (isHovering) {
      card.style.transform = 'translateY(-5px)';
    } else {
      card.style.transform = 'translateY(0)';
    }
  };

  return (
    <div className="page-content">
      {/* Page Banner */}
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/about/aboutus1.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry text-center" style={{ padding: '80px 0' }}>
            <h1 className="text-white" style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              About Us
            </h1>
            <p style={{ 
              color: '#e6b3ff', 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Empowering students with industry-focused training and career-ready skills since 2016
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb-row" style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #333' }}>
        <div className="container">
          <ul className="list-inline" style={{ margin: 0, padding: '15px 0' }}>
            <li><a href="/" style={{ color: '#4c1864', textDecoration: 'none', fontWeight: '500' }}>Home</a></li>
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>/</li>
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>About Us</li>
          </ul>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="section-area section-sp1" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
        <div className="container">
          <div className="row align-items-center d-flex">
            <div className="col-lg-5 col-md-12 heading-bx">
              <h2 className="m-b10" style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '30px' }}>
                Our Story
              </h2>
              <p style={{ color: '#bbbbbb', fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                In 2016, INSTA iQ was founded in Nagpur by Amit Aswale, a former defence aspirant who transitioned into corporate training after noticing a growing national crisis: academically excellent graduates lacked essential communication, confidence, and placement skills. What began as a test-prep workshop in local colleges quickly evolved into INSTA iQ—an employability platform anchored in Pratap Nagar, Nagpur, but now serving students across Maharashtra and beyond.
              </p>
              {showMore && (
                <p style={{ color: '#bbbbbb', fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                  In its early phase, INSTA iQ pioneered tools like the All India Placement Aptitude Test (AIPAT) and the Employability Quality Index (EQI), along with live mock interviews and simulation-based soft-skill training. These innovations earned rapid traction, not just in dozens of colleges, but also at the scale of 65,000+ students coached, 1000+ successful placements, and 10,000+ question items in its training library. Within three years, INSTA iQ had deployed its campus-embedded model (training inside college premises), creating a national brand focused on measurable outcomes—tracking student progress from Semester 1 to final placement drives. Founder Amit shared in June 2025 that AIPAT alone had engaged nearly 1,920 students in its latest online edition.
                </p>
              )}
              <button 
                onClick={toggleStory}
                style={{
                  backgroundColor: '#4c1864',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#3f189a'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4c1864'}
              >
                {showMore ? 'View Less' : 'View More'}
              </button>
            </div>
            <div className="col-lg-7 col-md-12 heading-bx p-lr">
              <div className="video-bx">
                <img 
                  src="assets/images/about/oldpic.png" 
                  alt="INSTA iQ Team"
                  style={{ 
                    width: '100%', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="section-area section-sp1" style={{ backgroundColor: '#253248', padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30 d-flex">
              <div 
                className="feature-container text-center p-4 w-100" 
                style={{ 
                  backgroundColor: '#1e1e1e', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="feature-md text-white m-b20">
                  <a href="#" className="icon-cell">
                    <img src="assets/images/icon/icon1.png" alt="Philosophy" style={{ width: '60px', height: '60px' }}/>
                  </a> 
                </div>
                <div className="icon-content">
                  <h5 className="ttr-tilte" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>
                    Our Philosophy
                  </h5>
                  <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6' }}>
                    "We exist to bridge the divide between academic excellence and real-world impact. At INSTA iQ, we empower students through structured upskilling that cultivates confidence, communication, and career readiness."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30 d-flex">
              <div 
                className="feature-container text-center p-4 w-100" 
                style={{ 
                  backgroundColor: '#1e1e1e', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="feature-md text-white m-b20">
                  <a href="#" className="icon-cell">
                    <img src="assets/images/icon/icon2.png" alt="Principle" style={{ width: '60px', height: '60px' }}/>
                  </a> 
                </div>
                <div className="icon-content">
                  <h5 className="ttr-tilte" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>
                    Core Principle
                  </h5>
                  <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6' }}>
                    "Our guiding belief is that potential thrives in practice. We measure progress through personalized assessments, iterative feedback, and real-time simulations—because growth comes from doing, not just knowing."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30 d-flex">
              <div 
                className="feature-container text-center p-4 w-100" 
                style={{ 
                  backgroundColor: '#1e1e1e', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="feature-md text-white m-b20">
                  <a href="#" className="icon-cell">
                    <img src="assets/images/icon/icon3.png" alt="Success" style={{ width: '60px', height: '60px' }}/>
                  </a> 
                </div>
                <div className="icon-content">
                  <h5 className="ttr-tilte" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>
                    Key to Success
                  </h5>
                  <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6' }}>
                    "Our success formula blends data-driven skill building with real-world readiness: mock interviews, the All India Placement Aptitude Test (AIPAT), and the Employability Quality Index (EQI) equip students with the tools to succeed—quantifiably and confidently."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30 d-flex">
              <div 
                className="feature-container text-center p-4 w-100" 
                style={{ 
                  backgroundColor: '#1e1e1e', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="feature-md text-white m-b20">
                  <a href="#" className="icon-cell">
                    <img src="assets/images/icon/icon4.png" alt="Values" style={{ width: '60px', height: '60px' }}/>
                  </a> 
                </div>
                <div className="icon-content">
                  <h5 className="ttr-tilte" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>
                    Our Values
                  </h5>
                  <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6' }}>
                    "We commit to Integrity, Empathy, Excellence, and Impact—values that shape everything we do. At INSTA iQ, every training module, mock test, and feedback session is delivered with honesty, respect, and an unwavering focus on real-world outcomes."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="section-area section-sp2" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head text-uppercase" style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '50px' }}>
                Our Core Team
              </h2>
            </div>
          </div>
          <div className="testimonial-carousel" style={{ 
            overflow: 'hidden', 
            position: 'relative',
            padding: '0 20px'
          }}>
            <div className="testimonial-wrapper" style={{
              display: 'flex',
              gap: '30px',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${currentSlide * 50}%)`
            }}>
              {/* Card 1 */}
              <div className="testimonial-item" style={{ 
                minWidth: 'calc(50% - 15px)',
                flex: '0 0 calc(50% - 15px)'
              }}>
                <div 
                  style={{ 
                    backgroundColor: '#253248', 
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  {/* Upper Section - Two Parts: Profile Image and Title */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '15px', 
                    marginBottom: '25px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #444',
                    minHeight: '120px'
                  }}>
                    {/* Part 1: Profile Image */}
                    <div style={{ 
                      flexShrink: 0,
                      width: '90px',
                      height: '90px'
                    }}>
                      <img 
                        src="assets/images/testimonials/pic1.jpg" 
                        alt="Amit Aswale"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '4px solid #4c1864'
                        }}
                      />
                    </div>
                    
                    {/* Part 2: Title Section */}
                    <div style={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      paddingTop: '5px'
                    }}>
                      <h5 style={{ 
                        color: '#ffffff', 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        marginBottom: '12px',
                        lineHeight: '1.3',
                        margin: '0 0 12px 0'
                      }}>
                        MR. AMIT PRAKASH ASWALE
                      </h5>
                                             <p style={{ 
                         color: '#e6b3ff', 
                         fontSize: '13px', 
                         fontWeight: '500', 
                         margin: '0',
                         lineHeight: '1.4',
                         wordWrap: 'break-word',
                         overflowWrap: 'break-word'
                       }}>
                         -APTITUDE, UPSC/MPSC CSAT, CAT/CET/NTA-NET APTITUDE
                       </p>
                    </div>
                  </div>
                  
                  {/* Lower Section - Description Text */}
                  <div>
                    <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                      Working as a consultant in Education Sector for 7 years. Aptitude Trainer and Professor for Polity Geography and Science for UPSC/MPSC/SSC/Banking/CAT/NTA NET-SET/GMAT. Professional Trainer for Soft Skills and Life Skills. Corporate Industrial Trainer and Employee Performance Analyst. Conducted Training of World Bank funded Project of HRD Ministry's Skill Development Program under TEQIP. Having Experience as a Production Engineer in Multinational Automobile Firm. Content Developer for Quantitative and Qualitative Mathematics. Cracked UPSC-CDS and AFCAT exams, Cracked IBPS PO/Clerk / SBI Clerk /Maharashtra-CID / MHAINTELLIGENCE BUREAU ACIO / RRB PO / Clerk / MPSC - RTO Startup - INSTA EDUCATION - 2020 on the demands of 3 Training Officers and 1000's of students demand. Completed Bachelors and Masters in Mechanical Engineering from Sant Gadge Baba Amaravati University, Maharashtra.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="testimonial-item" style={{ 
                minWidth: 'calc(50% - 15px)',
                flex: '0 0 calc(50% - 15px)'
              }}>
                <div 
                  style={{ 
                    backgroundColor: '#253248', 
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  {/* Upper Section - Two Parts: Profile Image and Title */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '15px', 
                    marginBottom: '25px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #444',
                    minHeight: '120px'
                  }}>
                    {/* Part 1: Profile Image */}
                    <div style={{ 
                      flexShrink: 0,
                      width: '90px',
                      height: '90px'
                    }}>
                      <img 
                        src="assets/images/testimonials/pic3.jpg" 
                        alt="B Satyanarayana"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '4px solid #4c1864'
                        }}
                      />
                    </div>
                    
                    {/* Part 2: Title Section */}
                    <div style={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      paddingTop: '5px'
                    }}>
                      <h5 style={{ 
                        color: '#ffffff', 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        marginBottom: '12px',
                        lineHeight: '1.3',
                        margin: '0 0 12px 0'
                      }}>
                        MR. B SATYANARAYANA
                      </h5>
                                             <p style={{ 
                         color: '#e6b3ff', 
                         fontSize: '13px', 
                         fontWeight: '500', 
                         margin: '0',
                         lineHeight: '1.4',
                         wordWrap: 'break-word',
                         overflowWrap: 'break-word'
                       }}>
                         -VERBAL ABILITY, CORPORATE TRAININGS, SOFT SKILLS TRAINING
                       </p>
                    </div>
            </div>
                  
                  {/* Lower Section - Description Text */}
                  <div>
                    <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                      Satya has done Masters in Engineering and has actively worked for over fifteen years in top MNC IT Companies like Hexaware, Patni, Wipro and ATOS at various levels in delivering International project assignments. He had been to HONG KONG and BELGIUM and worked as Onsite coordinator for approximately two years as part of his IT Carrier. He has conducted trainings on his signature programs like, Start-upV/S Salary (Entrepreneur V/S Employment), Transforming lives (Motivational talk) and Leadership Skills(Good Leader). He has also conducted workshops on soft skills like Time Management Abilities, Strong Work Ethics and Good Communication Skills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="testimonial-item" style={{ 
                minWidth: 'calc(50% - 15px)',
                flex: '0 0 calc(50% - 15px)'
              }}>
                <div 
                  style={{ 
                    backgroundColor: '#253248', 
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  {/* Upper Section - Two Parts: Profile Image and Title */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '15px', 
                    marginBottom: '25px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #444',
                    minHeight: '120px'
                  }}>
                    {/* Part 1: Profile Image */}
                    <div style={{ 
                      flexShrink: 0,
                      width: '90px',
                      height: '90px'
                    }}>
                      <img 
                        src="assets/images/testimonials/pic2.jpg" 
                        alt="Sanket Lute"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '4px solid #4c1864'
                        }}
                      />
                    </div>
                    
                    {/* Part 2: Title Section */}
                    <div style={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      paddingTop: '5px'
                    }}>
                      <h5 style={{ 
                        color: '#ffffff', 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        marginBottom: '12px',
                        lineHeight: '1.3',
                        margin: '0 0 12px 0'
                      }}>
                        MR. SANKET LUTE
                      </h5>
                                             <p style={{ 
                         color: '#e6b3ff', 
                         fontSize: '13px', 
                         fontWeight: '500', 
                         margin: '0',
                         lineHeight: '1.4',
                         wordWrap: 'break-word',
                         overflowWrap: 'break-word'
                       }}>
                         -CAT/CET/BANKING APTITUDE, CRT/GMAT/GRE
                       </p>
                    </div>
                  </div>
                  
                  {/* Lower Section - Description Text */}
                  <div>
                    <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                      Sanket Sir has a rich experience in preparing content and training the undergraduate and postgraduate students in Quantitative Aptitude towards placements and competitive exams. Preparing company based question papers for the candidates and train them on the same along with the basic concepts in a completely innovative methods and shortcuts, different from conventional aptitude training. Sanket Sir has excelled as a resource person in training aspirants of competitive exams like GRE/GMAT/SAT/GATE / CSAT. He has overall 7 years of experience in the training domain. His core competency includes Content Development on Elementary Mathematics and The Arithmetic's based on company needs. He has master in industry specific training module creation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '10px', 
              marginTop: '30px' 
            }}>
              <button 
                onClick={() => setCurrentSlide(0)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: currentSlide === 0 ? '#4c1864' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
              <button 
                onClick={() => setCurrentSlide(1)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: currentSlide === 1 ? '#4c1864' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>
        </div>
            </div>

      {/* Call to Action */}
      <div className="section-area section-sp1" style={{ backgroundColor: '#253248', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '600', marginBottom: '20px' }}>
                Ready to Transform Your Career?
              </h3>
              <p style={{ color: '#bbbbbb', fontSize: '18px', marginBottom: '30px' }}>
                Join thousands of students who have already benefited from our proven training methodology.
              </p>
              <a 
                href="/courses" 
                style={{
                  backgroundColor: '#4c1864',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#3f189a';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#4c1864';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Explore Our Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 