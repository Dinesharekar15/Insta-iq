import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../context/AdminContext";

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Home Page):", import.meta.env.VITE_BACKEND_URL);

// Images (relative to public/assets/) - These are static assets, not from backend
const serviceImages = [
  "assets/images/our-services/pic1.jpg",
  "assets/images/our-services/pic2.jpg",
  "assets/images/our-services/pic3.jpg",
];

const eventImages = [
  "assets/images/event/pic4.jpg",
  "assets/images/event/pic3.jpg",
  "assets/images/event/pic2.jpg",
];
const testimonialImages = [
  "assets/images/testimonials/pic1.jpg",
  "assets/images/testimonials/pic2.jpg",
];
const newsImages = [
  "assets/images/blog/latest-blog/pic1.jpg",
  "assets/images/blog/latest-blog/pic2.jpg",
  "assets/images/blog/latest-blog/pic3.jpg",
];

export const allEvents = [
  {
    img: "assets/images/event/1.png",
    date: "15",
    month: "July",
    title: "Webinar on Generative AI",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "An AI-driven system that recommends tailored study plans, practice tests, and resources based on user performance, role preferences , and career goals."
  },
  {
    img: "assets/images/event/2.png",
    date: "21",
    month: "August",
    title: "Resume Building Bootcamp ",
    time: "11:00am 12:00am",
    location: "Nagpur , India",
    desc: "An online tool to create professional resumes and is a hands-on workshop where participants learn how to create job-winning resumes tailored for campus  placements,with templates optimized for ATS."
  },
  {
    img: "assets/images/event/6.png",
    date: "29",
    month: "October",
    title: "Communication Assessment",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "Enhance your speaking, listening, and presentation skills with our Communication Assessment event. This interactive session helps you identify strengths, improve clarity, and build confidence in expressing ideas effectively whether in interviews, group discussions, or professional settings."
  }
];

// Static fallback for popular courses
const popularCoursesData = [
  {
    img: "assets/images/courses/course1.jpg",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    provider: "Insta iQ",
    price: "Free",
    oldPrice: null,
    badge: "FREE",
    _id: 1,
  },
  {
    img: "assets/images/courses/course2.jpg",
    title: "PLACEMENT APTITUDE COURSE",
    provider: "Insta Education",
    price: "₹6,999",
    oldPrice: "₹9,999",
    badge: "Included in Membership",
    _id: 2,
  },
  {
    img: "assets/images/courses/course3.jpg",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    provider: "Insta Education",
    price: "₹4,500",
    oldPrice: null,
    badge: "Included in Membership",
    _id: 3,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { 
    courses: adminCourses, 
    events: adminEvents, 
    clientTestimonials: adminClientTestimonials, 
    studentTestimonials: adminStudentTestimonials 
  } = useAdmin();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add CSS for smooth transitions and hide arrow buttons
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .testimonial-bx {
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out !important;
        border-radius: 16px !important;
        border: 1px solid #444 !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
        background-color: #2a2a2a !important;
        height: 320px !important;
        min-height: 320px !important;
        max-height: 320px !important;
        overflow: hidden !important;
      }
      .testimonial-bx.sliding {
        transform: translateY(-20px) !important;
      }
      
      /* Hide arrow buttons for testimonial carousels */
      .client-testimonial-carousel .owl-nav,
      .student-testimonial-carousel .owl-nav {
        display: none !important;
      }
      
      /* Ensure card background color and consistent sizing */
      .client-testimonial-carousel .testimonial-bx,
      .student-testimonial-carousel .testimonial-bx {
        background-color: #2a2a2a !important;
        height: 320px !important;
        min-height: 320px !important;
        max-height: 320px !important;
      }
      
      /* Fix carousel item sizing */
      .client-testimonial-carousel .owl-item,
      .student-testimonial-carousel .owl-item {
        height: 320px !important;
      }
      
      /* Ensure content doesn't overflow */
      .testimonial-content {
        overflow: hidden !important;
        max-height: 200px !important;
      }
      
      /* Prevent text overflow */
      .testimonial-content p {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 6 !important;
        -webkit-box-orient: vertical !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Initialize Owl Carousel for upcoming events and courses
  useEffect(() => {
    // Wait for DOM to be ready and jQuery to be available
    const initCarousels = () => {
      if (window.jQuery) {
        // Initialize upcoming events carousel
        if (window.jQuery('.upcoming-event-carousel').length > 0) {
          window.jQuery('.upcoming-event-carousel').owlCarousel({
            center: true,
            autoplay: true,
            items: 3,
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            autoplaySpeed: 1000,
            navSpeed: 1000,
            paginationSpeed: 1000,
            slideSpeed: 1000,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
              0: {
                items: 1
              },
              650: {
                items: 1.5
              },
              1024: {
                items: 2
              },
              1200: {
                items: 2
              }
            }
          });
        }

        // Initialize courses carousel
        if (window.jQuery('.courses-carousel').length > 0) {
          window.jQuery('.courses-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            nav: true,
            dots: false,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
              0: {
                items: 1
              },
              480: {
                items: 2
              },
              1024: {
                items: 3
              },
              1200: {
                items: 3
              }
            }
          });
        }

        // Initialize client testimonial carousel
        if (window.jQuery('.client-testimonial-carousel').length > 0) {
          window.jQuery('.client-testimonial-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplaySpeed: 3000,
            navSpeed: 1000,
            paginationSpeed: 1000,
            slideSpeed: 1000,
            autoHeight: false,
            responsive: {
              0: {
                items: 1
              },
              768: {
                items: 1
              }
            }
          });
        }

        // Initialize student testimonial carousel
        if (window.jQuery('.student-testimonial-carousel').length > 0) {
          window.jQuery('.student-testimonial-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 20,
            nav: false,
            dots: true,
            autoplaySpeed: 3000,
            navSpeed: 1000,
            paginationSpeed: 1000,
            slideSpeed: 1000,
            autoHeight: false,
            responsive: {
              0: {
                items: 1
              },
              768: {
                items: 1
              }
            }
          });
        }
      }
    };

    // Try to initialize immediately
    initCarousels();

    // If not ready, wait a bit and try again
    const timer = setTimeout(initCarousels, 1000);

    return () => {
      clearTimeout(timer);
      // Destroy carousels on unmount
      if (window.jQuery) {
        if (window.jQuery('.upcoming-event-carousel').length > 0) {
          window.jQuery('.upcoming-event-carousel').trigger('destroy.owl.carousel');
        }
        if (window.jQuery('.courses-carousel').length > 0) {
          window.jQuery('.courses-carousel').trigger('destroy.owl.carousel');
        }
        if (window.jQuery('.client-testimonial-carousel').length > 0) {
          window.jQuery('.client-testimonial-carousel').trigger('destroy.owl.carousel');
        }
        if (window.jQuery('.student-testimonial-carousel').length > 0) {
          window.jQuery('.student-testimonial-carousel').trigger('destroy.owl.carousel');
        }
      }
    };
  }, [adminEvents, courses]); // Re-initialize when events or courses change

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigation handlers with scroll to top
  const handleNavigation = (path) => {
    scrollToTop();
    navigate(path);
  };
  
  // Events carousel state
  const [eventsCurrentSlide, setEventsCurrentSlide] = useState(0);



     // Testimonial data - Use admin context data
   const clientTestimonials = adminClientTestimonials?.filter(t => t.status === 'published') || [];
   const studentTestimonials = adminStudentTestimonials?.filter(t => t.status === 'published') || [];

  

  // Use courses and events from AdminContext for real-time updates
  useEffect(() => {
    setLoading(true);
    if (adminCourses && adminCourses.length > 0) {
      // Map admin courses to display format and limit to 3 for homepage
      const mappedCourses = adminCourses
        .filter(course => course.status === 'active')
        .slice(0, 3) // Limit to only 3 courses for homepage
        .map(course => ({
          _id: course._id,
          img: course.imageUrl,
          title: course.title,
          provider: course.instructor || "Insta Education",
          price: course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`,
          oldPrice: null,
          badge: course.price === 0 ? "FREE" : "Included in Membership",
        }));
      setCourses(mappedCourses);
    } else {
      // Fallback to static data, limit to 3 courses
      setCourses(popularCoursesData.slice(0, 3));
    }
    setLoading(false);
  }, [adminCourses]);

  const homeBtnStyle = {
    borderRadius: 12,
    minWidth: 140,
    minHeight: 48,
    fontWeight: 600,
    border: 'none',
    background: '#4c1864',
    color: '#fff',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)',
    display: 'inline-block',
    fontSize: '16px',
    padding: '12px 24px'
  };

  return (
    <div className="page-content">
      {/* Hero/Main Slider (static for now) */}
      <section className="rev-slider" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", maxHeight: 500, position: "relative" }}>
          <img
            src="assets/images/slider/slide1.jpg"
            alt="Hero"
            style={{ width: "100%", maxHeight: 500, objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(2,0,11,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 2
          }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>Welcome To InstaIQ</h2>
            <h4 style={{ fontSize: '1.5rem', margin: "0 0 20px 0", textAlign: 'center', fontWeight: '500' }}>Master Placement Aptitude & Excel in Your Career</h4>
            <p style={{ maxWidth: 600, textAlign: "center", fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
              Join thousands of students who have successfully cracked placement tests with our comprehensive aptitude courses, mock tests, and expert guidance.
            </p>
            <div style={{ marginTop: 30 }}>
              <button onClick={() => handleNavigation('/courses')} className="btn radius-xl" style={{ 
                ...homeBtnStyle, 
                marginRight: 10,
                fontSize: '18px',
                padding: '15px 30px',
                borderRadius: '12px',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#3f189a';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(76, 24, 100, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#4c1864';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(76, 24, 100, 0.3)';
              }}>
                BROWSE COURSES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-area section-sp1 bg-fix online-cours" style={{ 
        backgroundImage: "url(assets/images/background/bg1.png)", 
        backgroundSize: "cover", 
        position: "relative",
        backgroundColor: '#1e1e1e',
        padding: '80px 0'
      }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="mw800 m-auto" style={{ maxWidth: '1200px' }}>
            <div className="row" style={{ marginBottom: '50px' }}>
              <div className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
                <div className="cours-search-bx m-b30" style={{
                  backgroundColor: '#253248',
                  borderRadius: '16px',
                  padding: '25px 15px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                }}>
                  <div className="icon-box">
                    <h3 style={{ color: '#ffffff', fontSize: '2.2rem', fontWeight: '700', marginBottom: '12px' }}>
                      <i className="ti-user" style={{ color: '#ffffff', marginRight: '8px' }}></i>
                      <span className="counter">65</span>K+
                    </h3>
                  </div>
                  <span className="cours-search-text" style={{ color: '#bbbbbb', fontSize: '15px', fontWeight: '500' }}>Students Coached</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
                <div className="cours-search-bx m-b30" style={{
                  backgroundColor: '#253248',
                  borderRadius: '16px',
                  padding: '25px 15px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                }}>
                  <div className="icon-box">
                    <h3 style={{ color: '#ffffff', fontSize: '2.2rem', fontWeight: '700', marginBottom: '12px' }}>
                      <i className="ti-users" style={{ color: '#ffffff', marginRight: '8px' }}></i>
                      <span className="counter">17</span>+
                    </h3>
                  </div>
                  <span className="cours-search-text" style={{ color: '#bbbbbb', fontSize: '15px', fontWeight: '500' }}>Client Served</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
                <div className="cours-search-bx m-b30" style={{
                  backgroundColor: '#253248',
                  borderRadius: '16px',
                  padding: '25px 15px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                }}>
                  <div className="icon-box">
                    <h3 style={{ color: '#ffffff', fontSize: '2.2rem', fontWeight: '700', marginBottom: '12px' }}>
                      <i className="ti-book" style={{ color: '#ffffff', marginRight: '8px' }}></i>
                      <span className="counter">10</span>K+
                    </h3>
                  </div>
                  <span className="cours-search-text" style={{ color: '#bbbbbb', fontSize: '15px', fontWeight: '500' }}>Question Bank</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
                <div className="cours-search-bx m-b30" style={{
                  backgroundColor: '#253248',
                  borderRadius: '16px',
                  padding: '25px 15px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                }}>
                  <div className="icon-box">
                    <h3 style={{ color: '#ffffff', fontSize: '2.2rem', fontWeight: '700', marginBottom: '12px' }}>
                      <i className="ti-layout-list-post" style={{ color: '#ffffff', marginRight: '8px' }}></i>
                      <span className="counter">1000</span>+
                    </h3>
                  </div>
                  <span className="cours-search-text" style={{ color: '#bbbbbb', fontSize: '15px', fontWeight: '500' }}>Students Placed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <button onClick={() => handleNavigation('/about')} className="btn radius-xl" style={{ 
                ...homeBtnStyle, 
                background: '#4c1864', 
                fontSize: '18px', 
                padding: '15px 30px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#3f189a';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(76, 24, 100, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#4c1864';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(76, 24, 100, 0.3)';
              }}>
                KNOW ABOUT US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-area section-sp2" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head m-b0" style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
                Upcoming <span style={{ color: '#4c1864' }}>Events</span>
              </h2>
              <p className="m-b0" style={{ color: '#bbbbbb', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>Upcoming Education Events To Feed Brain.</p>
            </div>
          </div>
          <div className="row">
            <div className="upcoming-event-carousel owl-carousel owl-btn-center-lr owl-btn-1 col-12 p-lr0 m-b30">
              {(adminEvents && adminEvents.length > 0 ? adminEvents.filter(e => e.status === 'upcoming') : allEvents).map((event, idx) => (
                <div className="item" key={idx}>
                  <div className="event-bx" style={{ 
                    backgroundColor: '#253248', 
                    borderRadius: '16px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid #444'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.border = '1px solid #4c1864';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.border = '1px solid #444';
                  }}>
                    <div className="action-box" style={{ position: 'relative' }}>
                      <img 
                        src={event.img} 
                        alt={event.title} 
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          display: 'block'
                        }} 
                      />
                    </div>
                    <div className="info-bx d-flex" style={{ padding: '20px' }}>
                      <div style={{ marginRight: '15px' }}>
                        <div className="event-time" style={{ 
                          background: '#4c1864', 
                          color: '#fff', 
                          borderRadius: '12px', 
                          padding: '15px 18px', 
                          textAlign: 'center',
                          minWidth: '75px',
                          boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)'
                        }}>
                          <div className="event-date" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1' }}>{event.date}</div>
                          <div className="event-month" style={{ fontSize: '14px', marginTop: '4px' }}>{event.month}</div>
                        </div>
                      </div>
                      <div className="event-info" style={{ flex: 1 }}>
                        <h4 className="event-title" style={{ 
                          fontWeight: '700', 
                          fontSize: '18px', 
                          marginBottom: '12px', 
                          color: '#fff',
                          lineHeight: '1.3'
                        }}>
                          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700' }}>{event.title}</a>
                        </h4>
                        <ul className="media-post" style={{ 
                          padding: 0, 
                          margin: '0 0 15px 0', 
                          listStyle: 'none', 
                          fontSize: '14px', 
                          color: '#bbbbbb' 
                        }}>
                          <li style={{ marginBottom: '8px' }}>
                            <i className="fa fa-clock-o" style={{ marginRight: '10px', color: '#4c1864', fontSize: '16px' }}></i> 
                            {event.time}
                          </li>
                          <li style={{ marginBottom: '8px' }}>
                            <i className="fa fa-map-marker" style={{ marginRight: '10px', color: '#4c1864', fontSize: '16px' }}></i> 
                            {event.location}
                          </li>
                        </ul>
                        <p style={{ 
                          color: '#bbbbbb', 
                          fontSize: '14px', 
                          lineHeight: '1.6',
                          margin: 0,
                          overflow: 'visible'
                        }}>
                          {event.description || event.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <button onClick={() => handleNavigation('/events')} className="btn" style={homeBtnStyle}>View All Events</button>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="section-area section-sp2 popular-courses-bx" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head" style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
                Popular <span style={{ color: '#4c1864' }}>Courses</span>
              </h2>
              <p style={{ color: '#bbbbbb', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>Master placement aptitude with our most popular courses designed by industry experts</p>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <p>Loading courses...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : courses.length === 0 ? (
              <p>No courses available at the moment.</p>
            ) : (
              <div className="courses-carousel owl-carousel owl-btn-1 col-12 p-lr0">
                {courses.map((course) => (
                  <div className="item" key={course._id}>
                    <div className="cours-bx d-flex flex-column h-100" style={{
                      minHeight: 340,
                      background: '#253248 !important',
                      borderRadius: 16,
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden',
                      border: '1px solid #444',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                      e.currentTarget.style.border = '1px solid #4c1864';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.border = '1px solid #444';
                    }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#253248' }}>
                        <div className="action-box" style={{ position: 'relative' }}>
                          <img src={course.img} alt={course.title} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                          {course.badge && (
                            <span style={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                              background: course.badge === "FREE" ? "#27ae60" : "#e67e22",
                              color: "#fff",
                              borderRadius: 6,
                              padding: "2px 10px",
                              fontSize: 13,
                              zIndex: 2
                            }}>
                              {course.badge}
                            </span>
                          )}
                        </div>
                        <div className="info-bx text-center" style={{ padding: '12px', flexGrow: 1, background: '#253248 !important' }}>
                          <h5 style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <button onClick={() => handleNavigation(`/course-details/${course._id}`)} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontWeight: 'inherit' }}>{course.title}</button>
                          </h5>
                          <span style={{ color: '#bbb', fontSize: 15 }}>{course.provider}</span>
                        </div>
                        <div className="price" style={{ margin: '0 12px 12px 12px', textAlign: 'center', fontWeight: 700, fontSize: 22, color: '#fff', background: '#253248 !important' }}>
                          {course.oldPrice && <del style={{ color: '#888', marginRight: 8, fontSize: 16 }}>{course.oldPrice}</del>}
                          <span>{course.price}</span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center" style={{ padding: '0 12px 12px 12px', background: '#253248 !important' }}>
                        <button onClick={() => handleNavigation(`/course-details/${course._id}`)} className="btn" style={{ 
                          ...homeBtnStyle, 
                          width: '100%', 
                          margin: 0, 
                          borderRadius: 12, 
                          textAlign: 'center',
                          background: '#4c1864',
                          boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#3f189a';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(76, 24, 100, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = '#4c1864';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(76, 24, 100, 0.3)';
                        }}>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <button onClick={() => handleNavigation('/courses')} className="btn" style={homeBtnStyle}>View All Courses</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-area section-sp2 bg-fix ovbl-dark" style={{ 
        backgroundImage: "url(assets/images/background/bg1.jpg)", 
        backgroundSize: "cover",
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-white heading-bx left">
              <h2 className="title-head text-uppercase" style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
                what people <span style={{ color: '#4c1864' }}>say</span>
              </h2>
              <p style={{ color: '#bbbbbb', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>Hear from our clients and students about their experience with InstaIQ</p>
            </div>
          </div>
                    <div className="row">
            {/* Client Feedback Vertical Carousel */}
            <div className="col-md-6">
              <div className="testimonial-section">
                <h3 className="text-white text-center" style={{ fontSize: '24px', fontWeight: '600', marginBottom: '30px' }}>Client Feedback</h3>
                <div className="client-testimonial-carousel owl-carousel col-12 p-lr0">
                  {clientTestimonials.map((testimonial, idx) => (
                    <div className="item" key={idx}>
                      <div className="testimonial-bx" style={{ 
                        backgroundColor: '#2a2a2a', 
                        borderRadius: '16px', 
                        padding: '25px', 
                        border: '1px solid #444',
                        height: '320px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                        e.currentTarget.style.border = '1px solid #4c1864';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                        e.currentTarget.style.border = '1px solid #444';
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                          <img 
                            src={testimonial.image} 
                            alt="Client" 
                            style={{ width: '50px', height: '70px', borderRadius: '8px', objectFit: 'cover', marginRight: '15px' }} 
                          />
                          <div>
                            <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                              {testimonial.name}
                            </h5>
                            <p style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>- {testimonial.role} at {testimonial.company}</p>
                          </div>
                        </div>
                        <div className="testimonial-content">
                          <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'left', color: '#ffffff' }}>
                            "{testimonial.content}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Feedback Vertical Carousel */}
            <div className="col-md-6">
              <div className="testimonial-section">
                <h3 className="text-white text-center" style={{ fontSize: '24px', fontWeight: '600', marginBottom: '30px' }}>Students Testimonials</h3>
                <div className="student-testimonial-carousel owl-carousel col-12 p-lr0">
                  {studentTestimonials.map((testimonial, idx) => (
                    <div className="item" key={idx}>
                      <div className="testimonial-bx" style={{ 
                        backgroundColor: '#2a2a2a', 
                        borderRadius: '16px', 
                        padding: '25px', 
                        border: '1px solid #444',
                        height: '320px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                        e.currentTarget.style.border = '1px solid #4c1864';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                        e.currentTarget.style.border = '1px solid #444';
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                          <img 
                            src={testimonial.image} 
                            alt="Student" 
                            style={{ width: '50px', height: '70px', borderRadius: '8px', objectFit: 'cover', marginRight: '15px', flexShrink: 0 }} 
                          />
                          <div style={{ flex: 1 }}>
                            <h5 className="name text-white" style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 5px 0', color: '#ffffff', lineHeight: '1.3' }}>
                              {testimonial.name}
                            </h5>
                            <p style={{ margin: '0 0 3px 0', fontSize: '13px', color: '#e6b3ff', fontWeight: '500' }}>- {testimonial.role}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: '#bbbbbb', lineHeight: '1.3' }}>{testimonial.course}</p>
                          </div>
                        </div>
                        <div className="testimonial-content">
                          <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'left', color: '#ffffff' }}>
                            "{testimonial.content}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
