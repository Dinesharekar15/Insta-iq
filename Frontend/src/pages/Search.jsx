import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { courses: adminCourses, events: adminEvents } = useAdmin();
  const [searchResults, setSearchResults] = useState({
    courses: [],
    events: [],
    blogs: []
  });

  // Sample blog data (you can replace with actual blog data)
  const sampleBlogs = [
    {
      id: 1,
      title: "How to Prepare for Placement Aptitude Tests",
      excerpt: "Comprehensive guide on preparing for placement aptitude tests...",
      author: "Insta Education",
      date: "2024-01-15",
      image: "assets/images/blog/latest-blog/pic1.jpg"
    },
    {
      id: 2,
      title: "Top 10 Tips for Cracking Technical Interviews",
      excerpt: "Essential tips and strategies for technical interview preparation...",
      author: "Insta Education",
      date: "2024-01-10",
      image: "assets/images/blog/latest-blog/pic2.jpg"
    },
    {
      id: 3,
      title: "Data Analysis Skills for Modern Business",
      excerpt: "Learn essential data analysis skills required in today's business world...",
      author: "Insta Education",
      date: "2024-01-05",
      image: "assets/images/blog/latest-blog/pic3.jpg"
    }
  ];

  useEffect(() => {
    if (query.trim()) {
      performSearch(query.toLowerCase());
    }
  }, [query, adminCourses, adminEvents]);

  const performSearch = (searchTerm) => {
    // Search in courses
    const courseResults = (adminCourses || []).filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description?.toLowerCase().includes(searchTerm) ||
      course.instructor?.toLowerCase().includes(searchTerm)
    );

    // Search in events
    const eventResults = (adminEvents || []).filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description?.toLowerCase().includes(searchTerm) ||
      event.category?.toLowerCase().includes(searchTerm)
    );

    // Search in blogs
    const blogResults = sampleBlogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm)
    );

    setSearchResults({
      courses: courseResults,
      events: eventResults,
      blogs: blogResults
    });
  };

  const totalResults = searchResults.courses.length + searchResults.events.length + searchResults.blogs.length;

  return (
    <div className="page-content bg-white">
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Search Results</h1>
            <p className="text-white">Searching for: "{query}"</p>
          </div>
        </div>
      </div>

      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Search Results ({totalResults} found)</h2>
                
                {totalResults === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3>No results found for "{query}"</h3>
                    <p>Try searching with different keywords or browse our courses, events, and blogs.</p>
                    <div style={{ marginTop: '20px' }}>
                      <Link to="/courses" className="btn" style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#4c1864', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Browse Courses</Link>
                      <Link to="/events" className="btn" style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#4c1864', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Browse Events</Link>
                      <Link to="/blog" className="btn" style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#4c1864', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Browse Blogs</Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Courses Results */}
                    {searchResults.courses.length > 0 && (
                      <div style={{ marginBottom: '40px' }}>
                        <h3>Courses ({searchResults.courses.length})</h3>
                        <div className="row">
                          {searchResults.courses.map((course) => (
                            <div key={course._id} className="col-md-4 col-sm-6 mb-4">
                              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', height: '100%' }}>
                                <img 
                                  src={course.imageUrl || "/assets/images/courses/course1.jpg"} 
                                  alt={course.title}
                                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
                                />
                                <h5 style={{ marginBottom: '8px' }}>{course.title}</h5>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>{course.instructor || "Insta Education"}</p>
                                <p style={{ fontWeight: 'bold', color: '#4c1864' }}>₹{course.price}</p>
                                <Link to={`/course-details/${course._id}`} className="btn" style={{ backgroundColor: '#4c1864', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '5px', fontSize: '14px' }}>View Course</Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Events Results */}
                    {searchResults.events.length > 0 && (
                      <div style={{ marginBottom: '40px' }}>
                        <h3>Events ({searchResults.events.length})</h3>
                        <div className="row">
                          {searchResults.events.map((event) => (
                            <div key={event._id} className="col-md-4 col-sm-6 mb-4">
                              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', height: '100%' }}>
                                <img 
                                  src={event.img || "/assets/images/event/1.png"} 
                                  alt={event.title}
                                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
                                />
                                <h5 style={{ marginBottom: '8px' }}>{event.title}</h5>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>{event.date} {event.month}</p>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>{event.time} • {event.location}</p>
                                <p style={{ fontSize: '14px' }}>{event.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Blogs Results */}
                    {searchResults.blogs.length > 0 && (
                      <div style={{ marginBottom: '40px' }}>
                        <h3>Blogs ({searchResults.blogs.length})</h3>
                        <div className="row">
                          {searchResults.blogs.map((blog) => (
                            <div key={blog.id} className="col-md-4 col-sm-6 mb-4">
                              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', height: '100%' }}>
                                <img 
                                  src={blog.image} 
                                  alt={blog.title}
                                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
                                />
                                <h5 style={{ marginBottom: '8px' }}>{blog.title}</h5>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>By {blog.author} • {blog.date}</p>
                                <p style={{ fontSize: '14px' }}>{blog.excerpt}</p>
                                <Link to={`/blog/${blog.id}`} className="btn" style={{ backgroundColor: '#4c1864', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '5px', fontSize: '14px' }}>Read More</Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
