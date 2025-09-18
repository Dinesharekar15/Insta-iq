import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useAdmin } from "../context/AdminContext";

 // Fallback static data for when admin courses are not available
 const fallbackCourses = [
   {
     _id: "0",
     img: "/assets/images/courses/course1.jpg",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta Education",
    price: "Free",
    oldPrice: null,
    membership: false,
    badge: "FREE",
    description: "A free, national-level aptitude test for students to assess their placement readiness. Includes Quantitative, Logical, and Verbal sections. Conducted by Insta iQ.",
    details: [
      "Covers Quantitative, Logical, and Verbal Aptitude",
      "Open to all students",
      "Get a detailed performance report",
      "Completely free of cost"
    ]
  },
     {
     _id: "1",
     img: "/assets/images/courses/course2.jpg",
    title: "PLACEMENT APTITUDE COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹6,999",
    oldPrice: "₹9,999",
    membership: true,
    badge: "Included in Membership",
    description: "Comprehensive course to master all placement aptitude topics. Includes video lectures, practice tests, and live sessions.",
    details: [
      "Covers all major placement aptitude topics",
      "Video lectures and practice questions",
      "Live doubt sessions",
      "Certificate on completion"
    ]
  },
     {
     _id: "2",
     img: "/assets/images/courses/course3.jpg",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹4,500",
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
    description: "Learn advanced Excel skills and data analysis techniques for business and research. Includes hands-on projects.",
    details: [
      "Advanced Excel formulas and tools",
      "Data visualization and dashboards",
      "Real-world data analysis projects",
      "Suitable for business and research"
    ]
  },
     {
     _id: "3",
     img: "/assets/images/courses/course4.jpg",
    title: "TCS NQT - MOCK TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹2,999",
    membership: true,
    badge: "Included in Membership",
    description: "Simulate the real TCS NQT exam with this mock test. Get instant results and detailed solutions.",
    details: [
      "Based on latest TCS NQT pattern",
      "Instant result and feedback",
      "Detailed solutions for all questions",
      "Affordable price"
    ]
  },
     {
     _id: "4",
     img: "/assets/images/courses/course5.jpg",
    title: "COGNIZANT ASSESSMENT COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
    description: "Prepare for Cognizant's recruitment process with targeted practice and expert guidance.",
    details: [
      "Cognizant-specific aptitude and coding practice",
      "Interview preparation",
      "Expert guidance and tips",
      "Included in membership"
    ]
  },
     {
     _id: "5",
     img: "/assets/images/courses/course6.jpg",
    title: "ACCENTURE MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: false,
    badge: null,
    description: "Take a mock test for Accenture's recruitment exam. Practice real questions and improve your chances.",
    details: [
      "Accenture exam pattern questions",
      "Timed test environment",
      "Performance analysis",
      "Ideal for final preparation"
    ]
  },
     {
     _id: "6",
     img: "/assets/images/courses/course7.jpg",
    title: "WIPRO MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹199",
    oldPrice: "₹499",
    membership: true,
    badge: "Included in Membership",
    description: "Prepare for Wipro's recruitment process with this comprehensive mock test. Practice real questions and improve your performance.",
    details: [
      "Wipro-specific exam pattern",
      "Timed mock test environment",
      "Detailed performance analysis",
      "Included in membership"
    ]
  },
     {
     _id: "7",
     img: "/assets/images/courses/course8.jpg",
    title: "INFOSYS MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹149",
    oldPrice: "₹399",
    membership: true,
    badge: "Included in Membership",
    description: "Master Infosys recruitment with targeted practice tests. Get familiar with their unique question patterns and time management.",
    details: [
      "Infosys exam pattern questions",
      "Real-time test simulation",
      "Performance tracking and analytics",
      "Included in membership"
    ]
  },
     {
     _id: "8",
     img: "/assets/images/courses/course9.jpg",
    title: "HCL MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹299",
    membership: true,
    badge: "Included in Membership",
    description: "Ace HCL's recruitment process with our specialized mock test. Practice with questions designed to match their exact pattern.",
    details: [
      "HCL-specific question patterns",
      "Timed test environment",
      "Instant results and feedback",
      "Included in membership"
    ]
  }
];

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { courses: adminCourses } = useAdmin();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Scroll to top when component mounts and set loading
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    // Simulate a small delay to prevent flickering
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [id]);

  // Find course from admin courses or fallback to static data
  let course = null;
  
  // Debug logging
  console.log("CourseDetails - ID:", id);
  console.log("CourseDetails - Admin courses:", adminCourses);
  
  // First, try to find course from fallback data (this ensures we always have a course)
  course = fallbackCourses.find(c => c._id === id) || fallbackCourses[parseInt(id, 10)];
  
  // If admin courses are available, try to enhance with admin data
  if (adminCourses && adminCourses.length > 0) {
    const adminCourse = adminCourses.find(c => c._id === id);
    if (adminCourse) {
      // Merge admin data with fallback data
      course = {
        ...course, // Fallback data as base
        ...adminCourse, // Admin data takes precedence
        imageUrl: adminCourse.imageUrl || course.img, // Use admin image if available
        description: adminCourse.description || course.description,
        details: adminCourse.details || course.details
      };
    }
  }

  if (loading) {
    return (
      <div className="page-content" style={{ backgroundColor: '#1e1e1e' }}>
        <div className="container" style={{ padding: 80, textAlign: "center" }}>
          <div className="spinner-border" style={{ color: '#4c1864' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: '#bbbbbb' }}>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="page-content" style={{ backgroundColor: '#1e1e1e' }}>
        <div className="container" style={{ padding: 80, textAlign: "center" }}>
          <h2 style={{ color: '#ffffff' }}>Course Not Found</h2>
          <p style={{ color: '#bbbbbb' }}>The course you are looking for does not exist.</p>
          <Link to="/courses" className="btn" style={{
            background: '#4c1864',
            color: '#ffffff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>Back to Courses</Link>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    // Add to cart and navigate to checkout
    const courseToAdd = { ...course, cartId: id };
    console.log("Adding course to cart:", courseToAdd);
    dispatch({ type: "ADD_TO_CART", payload: courseToAdd });
    
    // Show added message briefly
    setAdded(true);
    
    // Navigate to checkout page after a short delay
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  return (
    <div className="page-content" style={{ backgroundColor: '#1e1e1e' }}>
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">{course.title}</h1>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="breadcrumb-row" style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #333' }}>
        <div className="container">
          <ul className="list-inline" style={{ margin: 0, padding: '15px 0' }}>
            <li><Link to="/" style={{ color: '#4c1864', textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/courses" style={{ color: '#4c1864', textDecoration: 'none' }}>Courses</Link></li>
            <li style={{ color: '#bbbbbb' }}>{course.title}</li>
          </ul>
        </div>
      </div>
      
      <div className="content-block">
        <div className="section-area section-sp1" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12">
                                 <div className="course-details">
                   {/* Debug info */}
                   {console.log("Course image sources:", {
                     imageUrl: course.imageUrl,
                     img: course.img,
                     finalSrc: course.imageUrl || course.img || "assets/images/courses/course1.jpg"
                   })}
                   <img 
                     src={course.imageUrl || course.img || "/assets/images/courses/course1.jpg"} 
                     alt={course.title} 
                     style={{ 
                       maxWidth: "100%", 
                       borderRadius: 8, 
                       marginBottom: 24,
                       minHeight: "200px",
                       objectFit: "cover"
                     }} 
                     onError={(e) => {
                       console.log("Image failed to load, using fallback");
                       e.target.src = "/assets/images/courses/course1.jpg";
                     }}
                     onLoad={(e) => {
                       console.log("Image loaded successfully:", e.target.src);
                     }}
                   />
                  <h2 style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>{course.title}</h2>
                  <div style={{ color: "#bbbbbb", fontSize: 16, marginBottom: 12 }}>
                    {course.instructor || course.provider || "Insta Education"}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 20, color: '#ffffff' }}>
                    {course.oldPrice && course.oldPrice > course.price && (
                      <span style={{ textDecoration: "line-through", color: "#888", marginRight: 12 }}>{course.oldPrice}</span>
                    )}
                    <span style={{ color: '#ffffff', fontSize: '24px' }}>{course.price === 0 ? "Free" : `₹${course.price}`}</span>
                  </div>
                  <p style={{ color: '#bbbbbb', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>{course.description}</p>
                  {course.details && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Course Highlights:</h4>
                      <ul style={{ color: '#bbbbbb', fontSize: '15px', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
                        {course.details.map((item, i) => (
                          <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {added && <div style={{ color: '#4c1864', marginTop: 10, fontWeight: '600' }}>Added to cart!</div>}
                  
                  {/* Reviews Section */}
                  <div style={{ marginTop: 40 }}>
                    <h3 style={{ color: '#ffffff', marginBottom: 20, fontSize: '2rem', fontWeight: '700' }}>Student Reviews</h3>
                    {course.rating ? (
                      <div>
                        {/* Overall Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginRight: 15 }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i key={i} className={`fa fa-star${i < course.rating ? '' : '-o'}`} style={{ color: '#f3b632', marginRight: 2 }}></i>
                            ))}
                            <span style={{ marginLeft: 8, color: '#fff', fontSize: 18, fontWeight: 600 }}>{course.rating}</span>
                          </div>
                          <span style={{ color: '#bbb' }}>Based on {course.ratingsCount || course.enrollments || 0} reviews</span>
                        </div>
                        
                        {/* Sample Reviews */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                          {/* Review 1 */}
                          <div style={{ background: '#2a2a2a', padding: 20, borderRadius: 8, border: '1px solid #333' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#4c1864', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <span style={{ color: '#fff', fontWeight: 600 }}>R</span>
                              </div>
                              <div>
                                <div style={{ color: '#fff', fontWeight: 600 }}>Rahul Sharma</div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <i key={i} className={`fa fa-star${i < 5 ? '' : '-o'}`} style={{ color: '#f3b632', marginRight: 2, fontSize: 12 }}></i>
                                  ))}
                                  <span style={{ marginLeft: 5, color: '#bbb', fontSize: 12 }}>2 days ago</span>
                                </div>
                              </div>
                            </div>
                            <p style={{ color: '#bbb', lineHeight: 1.6 }}>
                              "Excellent course! The content is well-structured and the practice questions are very helpful. I feel much more confident about my placement preparation now."
                            </p>
                          </div>
                          
                          {/* Review 2 */}
                          <div style={{ background: '#2a2a2a', padding: 20, borderRadius: 8, border: '1px solid #333' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#4c1864', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <span style={{ color: '#fff', fontWeight: 600 }}>P</span>
                              </div>
                              <div>
                                <div style={{ color: '#fff', fontWeight: 600 }}>Priya Patel</div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <i key={i} className={`fa fa-star${i < 4 ? '' : '-o'}`} style={{ color: '#f3b632', marginRight: 2, fontSize: 12 }}></i>
                                  ))}
                                  <span style={{ marginLeft: 5, color: '#bbb', fontSize: 12 }}>1 week ago</span>
                                </div>
                              </div>
                            </div>
                            <p style={{ color: '#bbb', lineHeight: 1.6 }}>
                              "Great value for money. The instructors are knowledgeable and the material is up-to-date. Highly recommended for anyone preparing for placements."
                            </p>
                          </div>
                          
                          {/* Review 3 */}
                          <div style={{ background: '#2a2a2a', padding: 20, borderRadius: 8, border: '1px solid #333' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#4c1864', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <span style={{ color: '#fff', fontWeight: 600 }}>A</span>
                              </div>
                              <div>
                                <div style={{ color: '#fff', fontWeight: 600 }}>Amit Kumar</div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <i key={i} className={`fa fa-star${i < 5 ? '' : '-o'}`} style={{ color: '#f3b632', marginRight: 2, fontSize: 12 }}></i>
                                  ))}
                                  <span style={{ marginLeft: 5, color: '#bbb', fontSize: 12 }}>2 weeks ago</span>
                                </div>
                              </div>
                            </div>
                            <p style={{ color: '#bbb', lineHeight: 1.6 }}>
                              "The mock tests are very realistic and helped me understand the actual exam pattern. The detailed solutions are a great learning resource."
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ background: '#2a2a2a', padding: 20, borderRadius: 8, border: '1px solid #333', textAlign: 'center' }}>
                        <p style={{ color: '#bbb' }}>No reviews yet. Be the first to review this course!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="course-sidebar">
                  <div className="widget" style={{ backgroundColor: '#2a2a2a', padding: '30px', borderRadius: '16px', marginBottom: '30px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)', border: '1px solid #444' }}>
                    <h5 className="widget-title" style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>Course Info</h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #444' }}>
                        <span style={{ color: '#bbbbbb', fontWeight: '500' }}>Provider:</span>
                        <span style={{ color: '#ffffff', fontWeight: '600' }}>{course.instructor || course.provider || "Insta Education"}</span>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #444' }}>
                        <span style={{ color: '#bbbbbb', fontWeight: '500' }}>Price:</span>
                        <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '18px' }}>{course.price === 0 ? "Free" : `₹${course.price}`}</span>
                      </li>
                      {course.oldPrice && course.oldPrice > course.price && (
                        <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #444' }}>
                          <span style={{ color: '#bbbbbb', fontWeight: '500' }}>Old Price:</span>
                          <span style={{ color: '#888', textDecoration: 'line-through' }}>{course.oldPrice}</span>
                        </li>
                      )}
                      {course.badge && (
                        <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #444' }}>
                          <span style={{ color: '#bbbbbb', fontWeight: '500' }}>Badge:</span>
                          <span style={{ color: '#ffffff', fontWeight: '600' }}>{course.badge}</span>
                        </li>
                      )}
                      {course.rating && (
                        <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                          <span style={{ color: '#bbbbbb', fontWeight: '500' }}>Rating:</span>
                          <span style={{ color: '#ffffff', fontWeight: '600' }}>{course.rating} ({course.enrollments || course.ratingsCount || 0} ratings)</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="widget">
                    <button onClick={handleBuyNow} className="btn btn-block" style={{
                      background: '#4c1864',
                      color: '#ffffff',
                      border: 'none',
                      padding: '16px 24px',
                      fontSize: '18px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      width: '100%',
                      boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
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
                      Buy Now for {course.price === 0 ? "Free" : `₹${course.price}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 