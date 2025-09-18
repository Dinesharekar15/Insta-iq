import React, { useState, useRef } from "react";
import { useAdmin } from "../../context/AdminContext";

const TestimonialsManagement = () => {
  const { 
    clientTestimonials, 
    studentTestimonials, 
    addClientTestimonial, 
    updateClientTestimonial, 
    deleteClientTestimonial,
    addStudentTestimonial, 
    updateStudentTestimonial, 
    deleteStudentTestimonial 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("client");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    course: "",
    content: "",
    image: "",
    status: "published"
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImagePreview(imageData);
        setFormData(prev => ({
          ...prev,
          image: imageData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          handleImageUpload(file);
          break;
        }
      }
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: ""
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing testimonial
      if (activeTab === "client") {
        updateClientTestimonial(editingItem._id, formData);
      } else {
        updateStudentTestimonial(editingItem._id, formData);
      }
      setEditingItem(null);
    } else {
      // Add new testimonial
      if (activeTab === "client") {
        addClientTestimonial(formData);
      } else {
        addStudentTestimonial(formData);
      }
    }
    
    setShowAddModal(false);
    setFormData({
      name: "",
      role: "",
      company: "",
      course: "",
      content: "",
      image: "",
      status: "published"
    });
    setImagePreview(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      role: item.role || "",
      company: item.company || "",
      course: item.course || "",
      content: item.content || "",
      image: item.image || "",
      status: item.status || "published"
    });
    setImagePreview(item.image || null);
    setShowAddModal(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      if (activeTab === "client") {
        deleteClientTestimonial(itemId);
      } else {
        deleteStudentTestimonial(itemId);
      }
    }
  };

  const handleStatusToggle = (itemId, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    if (activeTab === "client") {
      updateClientTestimonial(itemId, { status: newStatus });
    } else {
      updateStudentTestimonial(itemId, { status: newStatus });
    }
  };

  const getStatusColor = (status) => {
    return status === 'published' 
      ? { background: '#d4edda', color: '#155724' }
      : { background: '#fff3cd', color: '#856404' };
  };

  const renderTestimonialsList = () => {
    const testimonials = activeTab === "client" ? clientTestimonials : studentTestimonials;
    
    return (
      <div style={{ display: 'grid', gap: '20px' }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} style={{
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
                  borderRadius: '8px',
                  marginRight: '15px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '16px' }}>
                  {testimonial.name}
                </h3>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                  {activeTab === "client" 
                    ? `${testimonial.role} at ${testimonial.company}`
                    : `${testimonial.role} - ${testimonial.course}`
                  }
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
                onClick={() => handleStatusToggle(testimonial._id, testimonial.status)}
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
                onClick={() => handleDelete(testimonial._id)}
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
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Testimonials Management</h1>
        <p style={{ color: '#666' }}>Manage client and student testimonials for the homepage</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #eee' }}>
          <button
            onClick={() => setActiveTab("client")}
            style={{
              background: activeTab === "client" ? '#4c1864' : 'transparent',
              color: activeTab === "client" ? 'white' : '#333',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Client Testimonials ({clientTestimonials.length})
          </button>
          <button
            onClick={() => setActiveTab("student")}
            style={{
              background: activeTab === "student" ? '#4c1864' : 'transparent',
              color: activeTab === "student" ? 'white' : '#333',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Student Testimonials ({studentTestimonials.length})
          </button>
        </div>
      </div>

      {/* Add New Button */}
      <div style={{ marginBottom: '20px' }}>
        <button
                     onClick={() => {
             setEditingItem(null);
             setFormData({
               name: "",
               role: "",
               company: "",
               course: "",
               content: "",
               image: "",
               status: "published"
             });
             setImagePreview(null);
             setShowAddModal(true);
           }}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Add New {activeTab === "client" ? "Client" : "Student"} Testimonial
        </button>
      </div>

      {/* Testimonials List */}
      {renderTestimonialsList()}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '85vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '25px',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '15px'
            }}>
              <h2 style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: '600' }}>
                {editingItem ? 'Edit' : 'Add New'} {activeTab === "client" ? "Client" : "Student"} Testimonial
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '5px',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#666';
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4c1864'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Role/Position *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter role or position"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4c1864'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

                             {activeTab === "client" ? (
                 <div style={{ marginBottom: '20px' }}>
                   <label style={{ 
                     display: 'block', 
                     marginBottom: '8px', 
                     fontWeight: '600',
                     color: '#333',
                     fontSize: '14px'
                   }}>
                     Company *
                   </label>
                   <input
                     type="text"
                     name="company"
                     value={formData.company}
                     onChange={handleInputChange}
                     required
                     placeholder="Enter company name"
                     style={{
                       width: '100%',
                       padding: '12px 15px',
                       border: '2px solid #e0e0e0',
                       borderRadius: '8px',
                       fontSize: '14px',
                       transition: 'border-color 0.3s ease',
                       boxSizing: 'border-box'
                     }}
                     onFocus={(e) => e.target.style.borderColor = '#4c1864'}
                     onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                   />
                 </div>
               ) : (
                 <div style={{ marginBottom: '20px' }}>
                   <label style={{ 
                     display: 'block', 
                     marginBottom: '8px', 
                     fontWeight: '600',
                     color: '#333',
                     fontSize: '14px'
                   }}>
                     Course/University *
                   </label>
                   <input
                     type="text"
                     name="course"
                     value={formData.course}
                     onChange={handleInputChange}
                     required
                     placeholder="Enter course and university"
                     style={{
                       width: '100%',
                       padding: '12px 15px',
                       border: '2px solid #e0e0e0',
                       borderRadius: '8px',
                       fontSize: '14px',
                       transition: 'border-color 0.3s ease',
                       boxSizing: 'border-box'
                     }}
                     onFocus={(e) => e.target.style.borderColor = '#4c1864'}
                     onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                   />
                 </div>
               )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Testimonial Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Enter the testimonial content..."
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    lineHeight: '1.5'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4c1864'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

                             <div style={{ marginBottom: '20px' }}>
                 <label style={{ 
                   display: 'block', 
                   marginBottom: '8px', 
                   fontWeight: '600',
                   color: '#333',
                   fontSize: '14px'
                 }}>
                   Profile Image
                 </label>
                 
                 {/* Image Preview */}
                 {imagePreview && (
                   <div style={{ 
                     marginBottom: '15px',
                     textAlign: 'center'
                   }}>
                     <div style={{ 
                       position: 'relative',
                       display: 'inline-block'
                     }}>
                       <img
                         src={imagePreview}
                         alt="Preview"
                         style={{
                           width: '120px',
                           height: '120px',
                           borderRadius: '8px',
                           objectFit: 'cover',
                           border: '2px solid #e0e0e0'
                         }}
                       />
                       <button
                         type="button"
                         onClick={removeImage}
                         style={{
                           position: 'absolute',
                           top: '-8px',
                           right: '-8px',
                           background: '#dc3545',
                           color: 'white',
                           border: 'none',
                           borderRadius: '50%',
                           width: '24px',
                           height: '24px',
                           cursor: 'pointer',
                           fontSize: '12px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center'
                         }}
                       >
                         ×
                       </button>
                     </div>
                   </div>
                 )}

                 {/* Drag & Drop Area */}
                 <div
                   onDragOver={handleDragOver}
                   onDragLeave={handleDragLeave}
                   onDrop={handleDrop}
                   onPaste={handlePaste}
                   style={{
                     border: `2px dashed ${isDragOver ? '#4c1864' : '#e0e0e0'}`,
                     borderRadius: '8px',
                     padding: '30px 20px',
                     textAlign: 'center',
                     backgroundColor: isDragOver ? '#f8f9ff' : '#fafafa',
                     transition: 'all 0.3s ease',
                     cursor: 'pointer',
                     marginBottom: '15px'
                   }}
                   onClick={() => fileInputRef.current?.click()}
                 >
                   <div style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}>
                     📷
                   </div>
                   <p style={{ 
                     margin: '0 0 10px 0', 
                     color: '#666', 
                     fontSize: '14px',
                     fontWeight: '500'
                   }}>
                     {isDragOver ? 'Drop image here' : 'Drag & drop image here'}
                   </p>
                   <p style={{ 
                     margin: '0 0 15px 0', 
                     color: '#999', 
                     fontSize: '12px'
                   }}>
                     or click to browse, or paste from clipboard
                   </p>
                   <button
                     type="button"
                     style={{
                       background: '#4c1864',
                       color: 'white',
                       border: 'none',
                       padding: '8px 16px',
                       borderRadius: '6px',
                       cursor: 'pointer',
                       fontSize: '12px',
                       fontWeight: '500'
                     }}
                   >
                     Choose File
                   </button>
                 </div>

                 {/* Hidden File Input */}
                 <input
                   ref={fileInputRef}
                   type="file"
                   accept="image/*"
                   onChange={handleFileSelect}
                   style={{ display: 'none' }}
                 />

                 {/* URL Input (Alternative) */}
                 <div style={{ marginTop: '15px' }}>
                   <label style={{ 
                     display: 'block', 
                     marginBottom: '8px', 
                     fontWeight: '500',
                     color: '#666',
                     fontSize: '13px'
                   }}>
                     Or enter image URL:
                   </label>
                   <input
                     type="text"
                     name="image"
                     value={formData.image}
                     onChange={handleImageUrlChange}
                     placeholder="https://example.com/image.jpg or assets/images/testimonials/..."
                     style={{
                       width: '100%',
                       padding: '10px 12px',
                       border: '1px solid #e0e0e0',
                       borderRadius: '6px',
                       fontSize: '13px',
                       transition: 'border-color 0.3s ease',
                       boxSizing: 'border-box'
                     }}
                     onFocus={(e) => e.target.style.borderColor = '#4c1864'}
                     onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                   />
                 </div>
               </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4c1864'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'flex-end',
                borderTop: '2px solid #f0f0f0',
                paddingTop: '20px',
                marginTop: '10px'
              }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    minWidth: '100px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                  {editingItem ? 'Update' : 'Add'} Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;
