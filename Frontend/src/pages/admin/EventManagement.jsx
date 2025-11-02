import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import ImageUpload from "../../components/ImageUpload";

const EventManagement = () => {
  const { events, loading, addEvent, updateEvent, deleteEvent } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    month: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
    category: "",
    imageUrl: "",
    status: "upcoming"
  });

  // Helper function to parse date into day and month
  const parseDateToEvent = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.getDate().toString(),
      month: date.toLocaleString('default', { month: 'long' })
    };
  };

  // Show message with auto-hide
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
      // Parse date into day and month format for display
      const { date: day, month } = parseDateToEvent(formData.date);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('desc', formData.description);
      formDataToSend.append('date', day);
      formDataToSend.append('month', month);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('type', formData.status);
      formDataToSend.append('capacity', parseInt(formData.capacity) || 0);
      
      // Handle image upload
      if (formData.imageUrl instanceof File) {
        formDataToSend.append('image', formData.imageUrl);
      } else if (formData.imageUrl && typeof formData.imageUrl === 'string') {
        // If it's already a URL (for existing events), include it
        formDataToSend.append('imageUrl', formData.imageUrl);
      }
      
      if (editingEvent) {
        // Update existing event
        await updateEvent(editingEvent._id, formDataToSend);
        showMessage("Event updated successfully!", "success");
        setEditingEvent(null);
      } else {
        // Add new event
        await addEvent(formDataToSend);
        showMessage("Event created successfully!", "success");
      }
      
      setShowAddModal(false);
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        month: "",
        time: "",
        location: "",
        capacity: "",
        price: "",
        category: "",
        imageUrl: "",
        status: "upcoming"
      });
    } catch (error) {
      console.error("Error saving event:", error);
      showMessage("Failed to save event: " + (error.response?.data?.message || error.message), "error");
      // Don't close modal so user can try again
    } finally {
      setSubmitting(false);
    }
    setFormData({
      title: "",
      description: "",
      date: "",
      month: "",
      time: "",
      location: "",
      capacity: "",
      price: "",
      category: "",
      imageUrl: "",
      status: "upcoming"
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      ...event,
      description: event.desc || event.description || '',
      status: event.type || event.status || 'upcoming',
      imageUrl: event.imageUrl || event.img || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setDeletingEventId(eventId);
      try {
        await deleteEvent(eventId);
        showMessage("Event deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting event:", error);
        showMessage("Failed to delete event: " + (error.response?.data?.message || error.message), "error");
      } finally {
        setDeletingEventId(null);
      }
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await updateEvent(eventId, { type: newStatus });
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = (event.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.desc || event.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || event.type === filterStatus || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return { background: '#d1ecf1', color: '#0c5460' };
      case 'ongoing': return { background: '#d4edda', color: '#155724' };
      case 'completed': return { background: '#f8d7da', color: '#721c24' };
      case 'cancelled': return { background: '#f8f9fa', color: '#6c757d' };
      default: return { background: '#f8f9fa', color: '#6c757d' };
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading events...</p>
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
            <h2 style={{ margin: 0, color: '#333' }}>Event Management</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage all events and workshops</p>
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
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>
            Create New Event
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Search Events
            </label>
            <input
              type="text"
              placeholder="Search by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="complete">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Total Events
            </label>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {filteredEvents.length}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {filteredEvents.map((event) => (
          <div key={event._id} style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '18px' }}>
                  {event.title}
                </h3>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  ...getStatusColor(event.status)
                }}>
                  {event.status}
                </span>
              </div>
              <img
                src={event.imageUrl || event.img || 'https://placehold.co/60x60/000000/FFFFFF?text=Event'}
                alt={event.title}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginLeft: '15px'
                }}
              />
            </div>

            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px', lineHeight: '1.5' }}>
              {(event.desc || event.description || '').substring(0, 100)}...
            </p>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-calendar" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>
                  {event.date} {event.month}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-clock-o" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>{event.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-map-marker" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>{event.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-users" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>
                  {event.registrations}/{event.capacity} registered
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className="fa fa-money" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>{event.price}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleEdit(event)}
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
                onClick={() => handleDelete(event._id)}
                disabled={deletingEventId === event._id}
                style={{
                  background: deletingEventId === event._id ? '#6c757d' : '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: deletingEventId === event._id ? 'not-allowed' : 'pointer',
                  fontSize: '12px',
                  flex: 1,
                  opacity: deletingEventId === event._id ? 0.7 : 1
                }}
              >
                {deletingEventId === event._id ? (
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

            {/* Status Change Dropdown */}
            <div style={{ marginTop: '10px' }}>
              <select
                value={event.status}
                onChange={(e) => handleStatusChange(event._id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '12px',
                  background: '#fff'
                }}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Event Modal */}
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
                    {editingEvent ? 'Updating event...' : 'Creating event...'}
                  </p>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingEvent(null);
                  setFormData({
                    title: "",
                    description: "",
                    date: "",
                    time: "",
                    location: "",
                    capacity: "",
                    price: "",
                    category: "",
                    imageUrl: "",
                    status: "upcoming"
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Event Title *
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

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
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

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
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

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
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

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Capacity *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                    min="1"
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
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., ₹1,500 or Free"
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
                    <option value="Workshop">Workshop</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Training">Training</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Conference">Conference</option>
                  </select>
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
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="complete">Complete</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <ImageUpload
                    currentImage={formData.imageUrl}
                    onImageSelect={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl: imageUrl }))}
                    placeholder="Upload event cover image"
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Enter event description..."
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
                      {editingEvent ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingEvent ? 'Update Event' : 'Create Event'
                  )}
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                    setFormData({
                      title: "",
                      description: "",
                      date: "",
                      time: "",
                      location: "",
                      capacity: "",
                      price: "",
                      category: "",
                      image: "",
                      status: "upcoming"
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

export default EventManagement; 