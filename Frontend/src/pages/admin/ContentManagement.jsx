import React, { useState, useEffect } from "react";

const ContentManagement = () => {
  const [content, setContent] = useState({
    blogPosts: [],
    testimonials: [],
    faqs: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("blog");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
    status: "published"
  });

  // Sample content data
  const sampleContent = {
    blogPosts: [
      {
        id: 1,
        title: "How to Prepare for Campus Placements",
        content: "Campus placements are a crucial milestone in every student's career journey...",
        author: "Insta iQ Team",
        category: "Career Guidance",
        image: "assets/images/blog/latest-blog/pic1.jpg",
        status: "published",
        publishDate: "2024-01-15",
        views: 1250
      },
      {
        id: 2,
        title: "Top 10 Excel Skills for Data Analysis",
        content: "Excel is one of the most powerful tools for data analysis...",
        author: "Data Pro",
        category: "Technical Skills",
        image: "assets/images/blog/latest-blog/pic2.jpg",
        status: "draft",
        publishDate: "2024-01-10",
        views: 890
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "John Smith",
        role: "Software Engineer",
        company: "Tech Corp",
        content: "The placement aptitude course helped me crack my dream job!",
        image: "assets/images/testimonials/pic1.jpg",
        rating: 5,
        status: "published"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        role: "Data Analyst",
        company: "Analytics Inc",
        content: "Excellent course content and practical examples.",
        image: "assets/images/testimonials/pic2.jpg",
        rating: 5,
        status: "published"
      }
    ],
    faqs: [
      {
        id: 1,
        question: "How long does it take to complete a course?",
        answer: "Course duration varies from 2-6 months depending on the course type and your learning pace.",
        category: "General",
        status: "published"
      },
      {
        id: 2,
        question: "Do you provide certificates upon completion?",
        answer: "Yes, we provide certificates for all completed courses that can be used for your resume.",
        category: "Certification",
        status: "published"
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setContent(sampleContent);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      setContent(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(item => 
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      }));
      setEditingItem(null);
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...formData,
        publishDate: new Date().toISOString().split('T')[0],
        views: 0,
        rating: 5
      };
      setContent(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newItem]
      }));
    }
    setShowAddModal(false);
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "",
      image: "",
      status: "published"
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || item.question || item.name,
      content: item.content || item.answer,
      author: item.author || "",
      category: item.category || "",
      image: item.image || "",
      status: item.status
    });
    setShowAddModal(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setContent(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(item => item.id !== itemId)
      }));
    }
  };

  const handleStatusToggle = (itemId) => {
    setContent(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(item => 
        item.id === itemId 
          ? { ...item, status: item.status === 'published' ? 'draft' : 'published' }
          : item
      )
    }));
  };

  const getStatusColor = (status) => {
    return status === 'published' 
      ? { background: '#d4edda', color: '#155724' }
      : { background: '#fff3cd', color: '#856404' };
  };

  const renderContentList = () => {
    const items = content[activeTab];
    
    switch (activeTab) {
      case 'blog':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {items.map((post) => (
              <div key={post.id} style={{
                background: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: '1px solid #eee'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '18px' }}>
                      {post.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>By {post.author}</span>
                      <span style={{ fontSize: '12px', color: '#666' }}>{post.category}</span>
                      <span style={{ fontSize: '12px', color: '#666' }}>{post.views} views</span>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      ...getStatusColor(post.status)
                    }}>
                      {post.status}
                    </span>
                  </div>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '80px',
                      height: '60px',
                      borderRadius: '5px',
                      objectFit: 'cover',
                      marginLeft: '15px'
                    }}
                  />
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                  {post.content.substring(0, 150)}...
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(post)}
                    style={{
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleStatusToggle(post.id)}
                    style={{
                      background: post.status === 'published' ? '#ffc107' : '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {post.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'testimonials':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {items.map((testimonial) => (
              <div key={testimonial.id} style={{
                background: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: '1px solid #eee'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      marginRight: '15px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '16px' }}>
                      {testimonial.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                      {testimonial.role} at {testimonial.company}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fa fa-star" style={{ color: '#ffc107', fontSize: '12px' }}></i>
                      ))}
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      ...getStatusColor(testimonial.status)
                    }}>
                      {testimonial.status}
                    </span>
                  </div>
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px', fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(testimonial)}
                    style={{
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleStatusToggle(testimonial.id)}
                    style={{
                      background: testimonial.status === 'published' ? '#ffc107' : '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {testimonial.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'faqs':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {items.map((faq) => (
              <div key={faq.id} style={{
                background: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: '1px solid #eee'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px' }}>
                    {faq.question}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                    Category: {faq.category}
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    ...getStatusColor(faq.status)
                  }}>
                    {faq.status}
                  </span>
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                  {faq.answer}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(faq)}
                    style={{
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleStatusToggle(faq.id)}
                    style={{
                      background: faq.status === 'published' ? '#ffc107' : '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {faq.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Content Management</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage blog posts, testimonials, and FAQs</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: '#6f42c1',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>
            Add New {activeTab === 'blog' ? 'Post' : activeTab === 'testimonials' ? 'Testimonial' : 'FAQ'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { key: 'blog', label: 'Blog Posts', icon: 'fa fa-file-text' },
            { key: 'testimonials', label: 'Testimonials', icon: 'fa fa-quote-left' },
            { key: 'faqs', label: 'FAQs', icon: 'fa fa-question-circle' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? '#6f42c1' : '#f8f9fa',
                color: activeTab === tab.key ? 'white' : '#666',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div style={{ marginBottom: '20px' }}>
        {renderContentList()}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '30px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {editingItem ? 'Edit' : 'Add New'} {activeTab === 'blog' ? 'Blog Post' : activeTab === 'testimonials' ? 'Testimonial' : 'FAQ'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                  setFormData({
                    title: "",
                    content: "",
                    author: "",
                    category: "",
                    image: "",
                    status: "published"
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    {activeTab === 'blog' ? 'Post Title' : activeTab === 'testimonials' ? 'Name' : 'Question'} *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {activeTab === 'blog' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Category</option>
                    {activeTab === 'blog' && (
                      <>
                        <option value="Career Guidance">Career Guidance</option>
                        <option value="Technical Skills">Technical Skills</option>
                        <option value="Interview Tips">Interview Tips</option>
                        <option value="Industry News">Industry News</option>
                      </>
                    )}
                    {activeTab === 'faqs' && (
                      <>
                        <option value="General">General</option>
                        <option value="Certification">Certification</option>
                        <option value="Payment">Payment</option>
                        <option value="Technical">Technical</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    {activeTab === 'blog' ? 'Content' : activeTab === 'testimonials' ? 'Testimonial' : 'Answer'} *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder={`Enter ${activeTab === 'blog' ? 'content' : activeTab === 'testimonials' ? 'testimonial' : 'answer'}...`}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  type="submit"
                  style={{
                    background: '#6f42c1',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {editingItem ? 'Update' : 'Add'} {activeTab === 'blog' ? 'Post' : activeTab === 'testimonials' ? 'Testimonial' : 'FAQ'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                    setFormData({
                      title: "",
                      content: "",
                      author: "",
                      category: "",
                      image: "",
                      status: "published"
                    });
                  }}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement; 