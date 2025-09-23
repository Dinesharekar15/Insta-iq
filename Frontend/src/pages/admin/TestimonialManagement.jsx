import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import ImageUpload from "../../components/ImageUpload";

const TestimonialManagement = () => {
  const { 
    clientTestimonials, 
    studentTestimonials, 
    loading, 
    addClientTestimonial, 
    updateClientTestimonial, 
    deleteClientTestimonial,
    addStudentTestimonial, 
    updateStudentTestimonial, 
    deleteStudentTestimonial
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState("client");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [deletingTestimonialId, setDeletingTestimonialId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
        course: "",
        content: "",
        image: ""
      });  // Show message with auto-hide
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const testimonialData = {
        name: formData.name,
        role: activeTab === "client" ? formData.role : undefined,
        company: activeTab === "client" ? formData.company : undefined,
        course: activeTab === "student" ? formData.course : undefined,
        content: formData.content,
        image: formData.image || 'https://placehold.co/150x150/000000/FFFFFF?text=Person'
      };

      if (editingTestimonial) {
        // Update existing testimonial
        if (activeTab === "client") {
          await updateClientTestimonial(editingTestimonial._id, testimonialData);
        } else {
          await updateStudentTestimonial(editingTestimonial._id, testimonialData);
        }
        showMessage("Testimonial updated successfully!", "success");
        setEditingTestimonial(null);
      } else {
        // Add new testimonial
        if (activeTab === "client") {
          await addClientTestimonial(testimonialData);
        } else {
          await addStudentTestimonial(testimonialData);
        }
        showMessage("Testimonial created successfully!", "success");
      }

      setShowAddModal(false);
      // Reset form
      setFormData({
        name: "",
        role: "",
        company: "",
        course: "",
        content: "",
        image: ""
      });
    } catch (error) {
      console.error("Error saving testimonial:", error);
      showMessage("Failed to save testimonial: " + (error.response?.data?.message || error.message), "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name || "",
      role: testimonial.role || "",
      company: testimonial.company || "",
      course: testimonial.course || testimonial.college || "", // Support both course and college fields
      content: testimonial.content || testimonial.testimonial || "", // Support both content and testimonial fields
      image: testimonial.image || testimonial.imageUrl || "" // Support both image and imageUrl fields
    });
    setShowAddModal(true);
  };

  const handleDelete = async (testimonialId) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setDeletingTestimonialId(testimonialId);
      try {
        if (activeTab === "client") {
          await deleteClientTestimonial(testimonialId);
        } else {
          await deleteStudentTestimonial(testimonialId);
        }
        showMessage("Testimonial deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        showMessage("Failed to delete testimonial: " + (error.response?.data?.message || error.message), "error");
      } finally {
        setDeletingTestimonialId(null);
      }
    }
  };

  // Get testimonials based on active tab
  const testimonials = activeTab === "client" ? clientTestimonials : studentTestimonials;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Message Display */}
      {message.text && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '12px 20px',
          borderRadius: '8px',
          background: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <i className={`fa ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} 
             style={{ marginRight: '8px' }}></i>
          {message.text}
        </div>
      )}

      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Testimonial Management</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage client and student testimonials</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: '#ffc107',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>
            Add New Testimonial
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #f0f0f0' }}>
          <button
            onClick={() => setActiveTab("client")}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontWeight: activeTab === "client" ? '600' : '400',
              color: activeTab === "client" ? '#ffc107' : '#666',
              borderBottom: activeTab === "client" ? '2px solid #ffc107' : '2px solid transparent',
              fontSize: '16px'
            }}
          >
            Client Testimonials ({clientTestimonials.length})
          </button>
          <button
            onClick={() => setActiveTab("student")}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontWeight: activeTab === "student" ? '600' : '400',
              color: activeTab === "student" ? '#ffc107' : '#666',
              borderBottom: activeTab === "student" ? '2px solid #ffc107' : '2px solid transparent',
              fontSize: '16px'
            }}
          >
            Student Testimonials ({studentTestimonials.length})
          </button>
        </div>
      </div>



      {/* Testimonials Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img
                src={testimonial.image || 'https://placehold.co/60x60/000000/FFFFFF?text=Person'}
                alt={testimonial.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '15px',
                  border: '2px solid #f0f0f0'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{testimonial.name}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  {activeTab === "client" ? (
                    <>
                      {testimonial.role}
                      {testimonial.company && <> at <strong>{testimonial.company}</strong></>}
                    </>
                  ) : (
                    <>
                      Student
                      {testimonial.course && <><br /><em>{testimonial.course}</em></>}
                    </>
                  )}
                </p>
              </div>
            </div>

            <p style={{ 
              color: '#666', 
              fontSize: '14px', 
              lineHeight: '1.5',
              marginBottom: '15px',
              fontStyle: 'italic'
            }}>
              "{testimonial.content.substring(0, 150)}..."
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEdit(testimonial)}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  flex: 1
                }}
              >
                <i className="fa fa-edit" style={{ marginRight: '5px' }}></i>
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial._id)}
                disabled={deletingTestimonialId === testimonial._id}
                style={{
                  background: deletingTestimonialId === testimonial._id ? '#6c757d' : '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: deletingTestimonialId === testimonial._id ? 'not-allowed' : 'pointer',
                  fontSize: '12px',
                  flex: 1,
                  opacity: deletingTestimonialId === testimonial._id ? 0.7 : 1
                }}
              >
                {deletingTestimonialId === testimonial._id ? (
                  <>
                    <i className="fa fa-spinner fa-spin" style={{ marginRight: '5px' }}></i>
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="fa fa-trash" style={{ marginRight: '5px' }}></i>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px',
          background: '#f8f9fa',
          borderRadius: '10px',
          color: '#666'
        }}>
          <i className="fa fa-comments" style={{ fontSize: '48px', marginBottom: '15px', opacity: 0.3 }}></i>
          <h3 style={{ margin: '0 0 10px 0' }}>No testimonials found</h3>
          <p style={{ margin: 0 }}>
            No {activeTab} testimonials available yet
          </p>
        </div>
      )}

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
            position: 'relative',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Loading Overlay */}
            {submitting && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255,255,255,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                borderRadius: '10px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#ffc107', marginBottom: '10px' }}></i>
                  <p style={{ margin: 0, color: '#666' }}>
                    {editingTestimonial ? 'Updating testimonial...' : 'Creating testimonial...'}
                  </p>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {editingTestimonial ? `Edit ${activeTab} Testimonial` : `Create New ${activeTab} Testimonial`}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTestimonial(null);
                  setFormData({
                    name: "",
                    role: "",
                    company: "",
                    course: "",
                    content: "",
                    image: "",
                    status: "published"
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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

                {activeTab === "client" && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Role/Position *
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
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

                {activeTab === "client" && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
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

                {activeTab === "student" && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                      Course/Education *
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
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

                <div style={{ gridColumn: '1 / -1' }}>
                  <ImageUpload
                    currentImage={formData.image}
                    onImageSelect={(image) => setFormData(prev => ({ ...prev, image: image }))}
                    placeholder="Upload person image"
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Testimonial Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Enter the testimonial content..."
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
                  disabled={submitting}
                  style={{
                    background: submitting ? '#6c757d' : '#ffc107',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      {editingTestimonial ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'
                  )}
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTestimonial(null);
                    setFormData({
                      name: "",
                      role: "",
                      company: "",
                      course: "",
                      content: "",
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
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: submitting ? 0.6 : 1
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

export default TestimonialManagement;