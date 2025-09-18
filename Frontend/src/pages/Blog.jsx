import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      date: "June 10, 2025",
      author: "Amit Aswale",
      title: "All India Placement Aptitude Test by INSTA iQ",
             description: "A brilliant initiative for self‑assessment and performance analysis of students across UG and PG levels...",
      category: "placement",
      featured: true,
      readTime: "5 min read",
      link: "/blog-details1"
    },
    {
      id: 2,
      date: "October 5, 2024",
      author: "Amit Aswale",
      title: "TCS iON NQT National Qualifier Test",
             description: "Get yourself ready for the TCS recruitment. Last date to apply: 24th October 2024. Exam Date: 6th November 2024...",
      category: "recruitment",
      featured: false,
      readTime: "8 min read",
      link: "/blog-details2"
    },
    {
      id: 3,
      date: "May 31, 2024",
      author: "Amit Aswale",
      title: "Capgemini Recruitment Process",
             description: "Capgemini's process includes multiple rounds to assess aptitude, communication, and technical abilities...",
      category: "recruitment",
      featured: false,
      readTime: "6 min read",
      link: "/blog-details3"
    },
    {
      id: 4,
      date: "May 15, 2024",
      author: "Amit Aswale",
      title: "Aptitude Test Preparation Strategies",
             description: "Master the art of aptitude test preparation with proven strategies, time management techniques...",
      category: "aptitude",
      featured: false,
      readTime: "10 min read",
      link: "/blog-details4"
    },
    {
      id: 5,
      date: "April 28, 2024",
      author: "Amit Aswale",
      title: "Top 10 Companies Hiring Freshers in 2024",
             description: "Discover the leading companies actively hiring fresh graduates with detailed information about their recruitment processes...",
      category: "placement",
      featured: false,
      readTime: "7 min read",
      link: "/blog-details5"
    },
    {
      id: 6,
      date: "April 10, 2024",
      author: "Amit Aswale",
      title: "Interview Preparation Guide for IT Companies",
             description: "Comprehensive guide covering technical interviews, behavioral questions, and common interview patterns...",
      category: "interview",
      featured: false,
      readTime: "12 min read",
      link: "/blog-details6"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'placement', name: 'Placement', count: blogPosts.filter(post => post.category === 'placement').length },
    { id: 'recruitment', name: 'Recruitment', count: blogPosts.filter(post => post.category === 'recruitment').length },
    { id: 'aptitude', name: 'Aptitude', count: blogPosts.filter(post => post.category === 'aptitude').length },
    { id: 'interview', name: 'Interview', count: blogPosts.filter(post => post.category === 'interview').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="page-content">
      {/* Enhanced Page Heading Box */}
      <div
        className="page-banner ovbl-dark"
        style={{ 
          backgroundImage: "url(assets/images/banner/banner1.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div className="container">
          <div className="page-banner-entry text-center" style={{ padding: '80px 0' }}>
            <h1 className="text-white" style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Our Blog
            </h1>
            <p style={{ 
              color: '#e6b3ff', 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Stay updated with the latest insights, tips, and strategies for placement preparation and career growth
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
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>Blog</li>
          </ul>
        </div>
      </div>

      {/* Page Content Box */}
      <div className="content-block">
        {/* Categories Filter */}
        <div className="section-area section-sp1" style={{ backgroundColor: '#1e1e1e', padding: '40px 0' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="text-center" style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    color: '#ffffff', 
                    fontSize: '2.5rem', 
                    fontWeight: '700', 
                    marginBottom: '15px' 
                  }}>
                    Latest Articles
                  </h2>
                  <p style={{ 
                    color: '#bbbbbb', 
                    fontSize: '1.1rem', 
                    maxWidth: '600px', 
                    margin: '0 auto' 
                  }}>
                    Explore our comprehensive collection of articles and guides
                  </p>
                </div>
                
                {/* Category Filter Buttons */}
                <div className="text-center" style={{ marginBottom: '50px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '25px',
                          border: 'none',
                          fontWeight: '600',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          background: selectedCategory === category.id ? '#4c1864' : '#253248',
                          color: selectedCategory === category.id ? '#ffffff' : '#bbbbbb',
                          boxShadow: selectedCategory === category.id 
                            ? '0 4px 15px rgba(76, 24, 100, 0.3)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.2)',
                          minWidth: '120px'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCategory !== category.id) {
                            e.target.style.background = '#3a2a4a';
                            e.target.style.transform = 'translateY(-2px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCategory !== category.id) {
                            e.target.style.background = '#253248';
                            e.target.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="section-area section-sp1" style={{ backgroundColor: '#1e1e1e', padding: '0 0 80px 0' }}>
          <div className="container">
            <div className="ttr-blog-grid-3 row" id="masonry">
              {filteredPosts.map((post) => (
                <div
                  className="post action-card col-lg-4 col-md-6 col-sm-12 col-xs-12 m-b40"
                  key={post.id}
                >
                                                        <div className="recent-news" style={{
                     backgroundColor: '#2a2a2a',
                     borderRadius: '16px',
                     padding: '30px',
                     boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                     transition: 'all 0.3s ease',
                     cursor: 'pointer',
                     height: '450px',
                     width: '100%',
                     border: 'none',
                     overflow: 'hidden',
                     display: 'flex',
                     flexDirection: 'column',
                     position: 'relative'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-8px)';
                     e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                   }}>
                    
                    {/* Featured Badge */}
                    {post.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: '#4c1864',
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: '600',
                        zIndex: 2
                      }}>
                        Featured
                      </div>
                    )}



                                         <div className="info-bx" style={{ 
                       flex: 1,
                       display: 'flex',
                       flexDirection: 'column',
                       height: '100%'
                     }}>
                      {/* Category Badge */}
                      <div style={{
                        display: 'inline-block',
                        background: '#4c1864',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        marginBottom: '15px',
                        textTransform: 'uppercase'
                      }}>
                        {post.category}
                      </div>

                      <ul className="media-post" style={{ 
                        padding: 0, 
                        margin: '0 0 15px 0', 
                        listStyle: 'none', 
                        display: 'flex', 
                        gap: '15px',
                        color: '#bbbbbb',
                        fontSize: '13px',
                        flexWrap: 'wrap'
                      }}>
                                                 <li>
                           <a href="#" style={{ color: '#bbbbbb', textDecoration: 'none' }}>
                             <i className="fa fa-calendar" style={{ marginRight: '6px', color: '#ffffff' }}></i>{post.date}
                           </a>
                         </li>
                         <li>
                           <a href="#" style={{ color: '#bbbbbb', textDecoration: 'none' }}>
                             <i className="fa fa-user" style={{ marginRight: '6px', color: '#ffffff' }}></i>{post.author}
                           </a>
                         </li>
                         <li>
                           <a href="#" style={{ color: '#bbbbbb', textDecoration: 'none' }}>
                             <i className="fa fa-clock-o" style={{ marginRight: '6px', color: '#ffffff' }}></i>{post.readTime}
                           </a>
                         </li>
                      </ul>
                      
                                             <h5 className="post-title" style={{ 
                         marginBottom: '15px',
                         fontSize: '18px',
                         fontWeight: '600',
                         lineHeight: '1.4',
                         minHeight: '60px'
                       }}>
                        <Link to={post.link} style={{ 
                          color: '#ffffff', 
                          textDecoration: 'none',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#e6b3ff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#ffffff';
                        }}>
                          {post.title}
                        </Link>
                      </h5>
                      
                                             <p style={{ 
                         color: '#bbbbbb', 
                         fontSize: '14px', 
                         lineHeight: '1.6',
                         marginBottom: '20px',
                         minHeight: '80px'
                       }}>{post.description}</p>
                      
                                                                    <div className="post-extra" style={{ marginTop: 'auto', textAlign: 'center' }}>
                         <Link to={post.link} className="btn-link" style={{
                           color: '#ffffff',
                           textDecoration: 'none',
                           fontWeight: '600',
                           fontSize: '14px',
                           transition: 'all 0.3s ease',
                           display: 'inline-flex',
                           alignItems: 'center',
                           gap: '8px',
                           padding: '12px 24px',
                           backgroundColor: '#4c1864',
                           borderRadius: '8px',
                           border: '1px solid #4c1864',
                           width: '100%',
                           justifyContent: 'center'
                         }}
                         onMouseEnter={(e) => {
                           e.target.style.backgroundColor = '#3f189a';
                           e.target.style.borderColor = '#3f189a';
                         }}
                         onMouseLeave={(e) => {
                           e.target.style.backgroundColor = '#4c1864';
                           e.target.style.borderColor = '#4c1864';
                         }}>
                           READ MORE
                           <i className="fa fa-arrow-right" style={{ fontSize: '12px' }}></i>
                         </Link>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Posts Message */}
            {filteredPosts.length === 0 && (
              <div className="col-12 text-center" style={{ 
                color: '#bbbbbb', 
                fontSize: '18px', 
                padding: '60px 0',
                backgroundColor: '#253248',
                borderRadius: '16px',
                margin: '20px 0'
              }}>
                <i className="fa fa-search" style={{ fontSize: '48px', color: '#4c1864', marginBottom: '20px', display: 'block' }}></i>
                <p>No posts found in this category.</p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  style={{
                    background: '#4c1864',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '15px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#3f189a';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#4c1864';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  View All Posts
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Blog Grid END */}
      </div>
      {/* Page Content Box END */}
    </div>
  );
};

export default Blog; 