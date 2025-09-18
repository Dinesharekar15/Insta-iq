import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useAdmin } from "../context/AdminContext";
import { useAppContext } from "../context/AppContext";

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Courses Page):", import.meta.env.VITE_BACKEND_URL); // Log the URL for debugging

// Original static data (will be replaced by fetched data for main courses)
// Keeping it commented out for reference, but the component will use fetched data.
 const coursesData = [
   {
     img: "/assets/images/courses/course1.jpg",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta iQ",
    price: "Free",
    oldPrice: null,
    membership: false,
    badge: "FREE",
  },
     {
     img: "/assets/images/courses/course2.jpg",
    title: "PLACEMENT APTITUDE COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹6,999",
    oldPrice: "₹9,999",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course3.jpg",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹4,500",
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course4.jpg",
    title: "TCS NQT - MOCK TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹2,999",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course5.jpg",
    title: "COGNIZANT ASSESSMENT COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course6.jpg",
    title: "ACCENTURE MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: false,
    badge: null,
  },
     {
     img: "/assets/images/courses/course7.jpg",
    title: "WIPRO MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹199",
    oldPrice: "₹499",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course8.jpg",
    title: "INFOSYS MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹149",
    oldPrice: "₹399",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course9.jpg",
    title: "HCL MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹299",
    membership: true,
    badge: "Included in Membership",
  },
];

// Extract actual categories from course data
const extractCategories = (courses) => {
  const categorySet = new Set();
  courses.forEach(course => {
    // Extract category from course title or add based on content
    if (course.title.includes('PLACEMENT') || course.title.includes('APTITUDE')) {
      categorySet.add('Aptitude');
    } else if (course.title.includes('EXCEL') || course.title.includes('DATA')) {
      categorySet.add('Data Analysis');
    } else if (course.title.includes('MOCK TEST') || course.title.includes('ASSESSMENT')) {
      categorySet.add('Assessment');
    } else if (course.title.includes('TCS') || course.title.includes('COGNIZANT') || 
               course.title.includes('ACCENTURE') || course.title.includes('WIPRO') || 
               course.title.includes('INFOSYS') || course.title.includes('HCL')) {
      categorySet.add('Company Specific');
    } else {
      categorySet.add('General');
    }
  });
  return ['All Courses', ...Array.from(categorySet).sort()];
};

const categories = extractCategories(coursesData);

 const recentCourses = [
   {
     img: "/assets/images/blog/recent-blog/pic1.jpg",
    title: "Introduction InstaIQ",
    price: "₹120",
    oldPrice: "₹190",
    provider: "Insta iQ",
  },
     {
     img: "/assets/images/blog/recent-blog/pic3.jpg",
    title: "English For Tomorrow",
    price: "Free",
    oldPrice: null,
    provider: "Insta Education",
  },
];

const COURSES_PER_PAGE = 6;

const Courses = () => {
  const { courses: adminCourses } = useAdmin();
  const { dispatch } = useAppContext();
  const [allFetchedCourses, setAllFetchedCourses] = useState([]); // Stores all courses from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [page, setPage] = useState(1);

  // Use courses from AdminContext for real-time updates
  useEffect(() => {
    setLoading(true);
    console.log("Courses page - Admin courses:", adminCourses);
    if (adminCourses && adminCourses.length > 0) {
      // Map admin courses to display format
      const mappedCourses = adminCourses.map(course => ({
        _id: course._id,
        img: course.imageUrl,
        imageUrl: course.imageUrl, // Keep both for compatibility
        title: course.title,
        provider: "Insta Education",
        price: course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`,
        oldPrice: null,
        membership: course.price > 0,
        badge: course.price === 0 ? "FREE" : "Included in Membership",
        rating: course.rating,
        ratingsCount: course.enrollments,
        description: course.description,
      }));
      setAllFetchedCourses(mappedCourses);
    } else {
      // Fallback to static data
      setAllFetchedCourses(coursesData.map((course, idx) => ({ 
        ...course, 
        _id: idx,
        imageUrl: course.img // Add imageUrl for consistency
      })));
    }
    setLoading(false);
  }, [adminCourses]); // Re-run when admin courses change

  // Filter courses by search and category (now based on fetched data)
  const filteredCourses = allFetchedCourses.filter(
    (course) => {
      // Enhanced search functionality - search in title, provider, description, and price
      const searchTerm = search.toLowerCase();
      const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                           (course.provider && course.provider.toLowerCase().includes(searchTerm)) ||
                           (course.description && course.description.toLowerCase().includes(searchTerm)) ||
                           (course.price && course.price.toLowerCase().includes(searchTerm));
      
      if (selectedCategory === "All Courses") {
        return matchesSearch;
      }
      
      // Category-specific filtering logic
      const matchesCategory = (() => {
        switch (selectedCategory) {
          case 'Aptitude':
            return course.title.includes('PLACEMENT') || course.title.includes('APTITUDE');
          case 'Data Analysis':
            return course.title.includes('EXCEL') || course.title.includes('DATA');
          case 'Assessment':
            return course.title.includes('MOCK TEST') || course.title.includes('ASSESSMENT');
          case 'Company Specific':
            return course.title.includes('TCS') || course.title.includes('COGNIZANT') || 
                   course.title.includes('ACCENTURE') || course.title.includes('WIPRO') || 
                   course.title.includes('INFOSYS') || course.title.includes('HCL');
          case 'General':
            return !course.title.includes('PLACEMENT') && !course.title.includes('APTITUDE') &&
                   !course.title.includes('EXCEL') && !course.title.includes('DATA') &&
                   !course.title.includes('MOCK TEST') && !course.title.includes('ASSESSMENT') &&
                   !course.title.includes('TCS') && !course.title.includes('COGNIZANT') &&
                   !course.title.includes('ACCENTURE') && !course.title.includes('WIPRO') &&
                   !course.title.includes('INFOSYS') && !course.title.includes('HCL');
          default:
            return true;
        }
      })();
      
      return matchesSearch && matchesCategory;
    }
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * COURSES_PER_PAGE,
    page * COURSES_PER_PAGE
  );

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setPage(1); // Reset to first page on category change
  };

  return (
    <div className="page-content">
      {/* Banner */}
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
              Our Courses
            </h1>
            <p style={{ 
              color: '#e6b3ff', 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Discover comprehensive training programs designed to enhance your skills and boost your career prospects
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
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>Courses</li>
          </ul>
        </div>
      </div>
      {/* Main Content */}
      <div className="content-block">
        <div className="section-area section-sp1" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
          <div className="container">
            <div className="row">
              {/* Search and Filter Section */}
              <div className="col-12 m-b30">
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="widget courses-search-bx placeani">
                      <div className="form-group">
                        <h5 className="widget-title style-1" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>Search Courses</h5>
                        <div className="input-group">
                          <div style={{ position: 'relative', width: '100%' }}>
                            <input
                              name="dzName"
                              type="text"
                              className="form-control"
                              placeholder="Search for courses..."
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1); // Reset to first page on search
                              }}
                              style={{
                                backgroundColor: '#253248',
                                border: '1px solid #444',
                                color: '#fff',
                                padding: '15px 50px 15px 20px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                width: '100%'
                              }}
                            />
                            <i className="fa fa-search" style={{
                              position: 'absolute',
                              right: '20px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              color: '#ffffff',
                              fontSize: '16px',
                              zIndex: 2
                            }}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12 mb-3">
                    <div className="widget widget_archive">
                      <h5 className="widget-title style-1" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>Filter by Category</h5>
                      <div className="d-flex flex-wrap gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            style={{ 
                              marginBottom: '10px',
                              padding: '12px 24px',
                              borderRadius: '25px',
                              border: 'none',
                              fontWeight: '600',
                              fontSize: '14px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              backgroundColor: selectedCategory === cat ? '#4c1864' : '#253248',
                              color: selectedCategory === cat ? '#ffffff' : '#bbbbbb',
                              boxShadow: selectedCategory === cat ? '0 4px 15px rgba(76, 24, 100, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              if (selectedCategory !== cat) {
                                e.target.style.backgroundColor = '#3f189a';
                                e.target.style.transform = 'translateY(-2px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedCategory !== cat) {
                                e.target.style.backgroundColor = '#253248';
                                e.target.style.transform = 'translateY(0)';
                              }
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Course Grid */}
              <div className="col-12">
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center text-muted">Loading courses...</div>
                  ) : error ? (
                    <div className="col-12 text-center text-danger">{error}</div>
                  ) : paginatedCourses.length === 0 ? (
                    <div className="col-12 text-center" style={{ color: '#bbbbbb', fontSize: '18px', padding: '40px 0' }}>
                      {search ? `No courses found matching "${search}"` : 'No courses found matching your criteria.'}
                    </div>
                  ) : (
                    paginatedCourses.map((course) => (
                      <div className="col-md-6 col-lg-4 col-sm-6 m-b30" key={course._id}>
                        <div className="cours-bx d-flex flex-column h-100" style={{
                          minHeight: 400,
                          backgroundColor: '#2a2a2a',
                          borderRadius: '16px',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                          overflow: 'hidden',
                          border: '1px solid #444',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                        }}>
                          <div style={{ backgroundColor: '#2a2a2a' }}>
                            <div style={{ position: "relative" }}>
                              <img
                                src={course.imageUrl || course.img || "/assets/images/courses/course1.jpg"}
                                alt={course.title}
                                className="card-img-top"
                                style={{ 
                                  borderTopLeftRadius: 16, 
                                  borderTopRightRadius: 16, 
                                  height: 200, 
                                  objectFit: "cover",
                                  width: '100%'
                                }}
                                onError={(e) => {
                                  e.target.src = "/assets/images/courses/course1.jpg";
                                }}
                              />
                              {course.membership && (
                                <span style={{ 
                                  position: "absolute", 
                                  top: 15, 
                                  left: 15, 
                                  background: "#e67e22", 
                                  color: "#fff", 
                                  borderRadius: 8, 
                                  padding: "6px 12px", 
                                  fontSize: 12,
                                  fontWeight: '600',
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                                }}>
                                  {course.badge}
                                </span>
                              )}
                              {course.badge === "FREE" && (
                                <span style={{ 
                                  position: "absolute", 
                                  top: 15, 
                                  right: 15, 
                                  background: "#27ae60", 
                                  color: "#fff", 
                                  borderRadius: 8, 
                                  padding: "6px 12px", 
                                  fontSize: 12,
                                  fontWeight: '600',
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                                }}>
                                  {course.badge}
                                </span>
                              )}
                            </div>
                            <div className="card-body" style={{ padding: '24px', flexGrow: 1, backgroundColor: '#2a2a2a' }}>
                              <h5 className="card-title" style={{ 
                                fontWeight: 600, 
                                fontSize: 18, 
                                minHeight: '54px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                color: '#fff',
                                lineHeight: '1.4',
                                marginBottom: '15px'
                              }}>
                                <Link to={`/course-details/${course._id}`} style={{ 
                                  color: '#fff', 
                                  textDecoration: 'none',
                                  textAlign: 'center'
                                }}>
                                  {course.title}
                                </Link>
                              </h5>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                color: "#bbbbbb", 
                                fontSize: 14,
                                marginBottom: '15px'
                              }}>
                                <span style={{ fontWeight: '500' }}>{course.provider}</span>
                                {course.rating && (
                                  <div className="rating-bx" style={{ display: 'flex', alignItems: 'center' }}>
                                    <ul className="media-post" style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', alignItems: 'center' }}>
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <li key={i}>
                                          <i className={`fa fa-star${i < course.rating ? '' : '-o'}`} style={{ 
                                            color: '#f3b632', 
                                            marginRight: 2, 
                                            fontSize: 14 
                                          }}></i>
                                        </li>
                                      ))}
                                      <li style={{ marginLeft: 5, fontSize: 12, color: '#bbbbbb' }}>({course.ratingsCount})</li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                              <div style={{ 
                                fontWeight: 700, 
                                fontSize: 20, 
                                color: '#fff',
                                textAlign: 'center',
                                marginBottom: '20px'
                              }}>
                                {course.oldPrice && (
                                  <span style={{ 
                                    textDecoration: "line-through", 
                                    color: "#888", 
                                    marginRight: 10,
                                    fontSize: '16'
                                  }}>
                                    {course.oldPrice}
                                  </span>
                                )}
                                {course.price}
                              </div>
                            </div>
                          </div>
                          <div style={{ 
                            marginTop: "auto", 
                            padding: '0 24px 24px 24px', 
                            background: '#253248' 
                          }}>
                            <Link to={`/course-details/${course._id}`} className="btn w-100" style={{ 
                              borderRadius: 12,
                              minHeight: 48,
                              fontWeight: 600,
                              border: 'none',
                              background: '#4c1864',
                              color: '#fff',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)',
                              display: 'inline-block',
                              textTransform: 'none',
                              fontSize: '16px'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#3f189a';
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 6px 20px rgba(76, 24, 100, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#4c1864';
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 4px 15px rgba(76, 24, 100, 0.3)';
                            }}>
                              Buy Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Pagination (dynamic) */}
                  {totalPages > 1 && (
                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx" style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginTop: '40px'
                      }}>
                        <ul className="pagination" style={{ 
                          display: 'flex', 
                          listStyle: 'none', 
                          padding: 0, 
                          margin: 0,
                          gap: '10px'
                        }}>
                          <li>
                            <button 
                              onClick={() => setPage(page - 1)} 
                              disabled={page === 1} 
                              style={{ 
                                background: page === 1 ? '#444' : '#4c1864',
                                border: 'none',
                                color: '#fff',
                                padding: '12px 20px',
                                borderRadius: '8px',
                                cursor: page === 1 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                fontWeight: '600'
                              }}
                              onMouseEnter={(e) => {
                                if (page !== 1) {
                                  e.target.style.backgroundColor = '#3f189a';
                                  e.target.style.transform = 'translateY(-2px)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (page !== 1) {
                                  e.target.style.backgroundColor = '#4c1864';
                                  e.target.style.transform = 'translateY(0)';
                                }
                              }}
                            >
                              <i className="ti-arrow-left"></i> Prev
                            </button>
                          </li>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <li key={i}>
                              <button 
                                onClick={() => setPage(i + 1)} 
                                style={{ 
                                  background: page === i + 1 ? '#4c1864' : '#253248',
                                  border: 'none',
                                  color: '#fff',
                                  padding: '12px 16px',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  fontWeight: '600',
                                  minWidth: '40px'
                                }}
                                onMouseEnter={(e) => {
                                  if (page !== i + 1) {
                                    e.target.style.backgroundColor = '#3f189a';
                                    e.target.style.transform = 'translateY(-2px)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (page !== i + 1) {
                                    e.target.style.backgroundColor = '#253248';
                                    e.target.style.transform = 'translateY(0)';
                                  }
                                }}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}
                          <li>
                            <button 
                              onClick={() => setPage(page + 1)} 
                              disabled={page === totalPages} 
                              style={{ 
                                background: page === totalPages ? '#444' : '#4c1864',
                                border: 'none',
                                color: '#fff',
                                padding: '12px 20px',
                                borderRadius: '8px',
                                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                fontWeight: '600'
                              }}
                              onMouseEnter={(e) => {
                                if (page !== totalPages) {
                                  e.target.style.backgroundColor = '#3f189a';
                                  e.target.style.transform = 'translateY(-2px)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (page !== totalPages) {
                                  e.target.style.backgroundColor = '#4c1864';
                                  e.target.style.transform = 'translateY(0)';
                                }
                              }}
                            >
                              Next <i className="ti-arrow-right"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* End Course Grid */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
