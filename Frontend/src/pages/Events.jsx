import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";

const eventsData = [
  {
    img: "assets/images/event/1.png",
    type: "upcoming",
    date: "15",
    month: "July",
    title: "Webinar on Generative AI",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "An AI-driven system that recommends tailored study plans, practice tests, and resources based on user performance, role preferences , and career goals."
  },
  {
    img: "assets/images/event/2.png",
    type: "upcoming",
    date: "21",
    month: "August",
    title: "Resume Building Bootcamp ",
    time: "11:00am 12:00am",
    location: "Nagpur , India",
    desc: "An online tool to create professional resumes and is a hands-on workshop where participants learn how to create job-winning resumes tailored for campus  placements,with templates optimized for ATS."
  },
  {
    img: "assets/images/event/3.png",
    type: "upcoming",
    date: "29",
    month: "August",
    title: "Aptitude Mastery to Succeed in Competitive Exams",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "Specialized training modules focused on quantitative aptitude, logical reasoning, critical thinking and verbal ability to excel in campus placement tests and competitive exams."
  },
  {
    img: "assets/images/event/4.png",
    type: "ongoing",
    date: "9",
    month: "September",
    title: "Job Matching and Placement Portal",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "A portal that matches students with job opportunities based on test scores, skills, and company preferences, integrated with recruiters or platforms like LinkedIn. "
  },
  {
    img: "assets/images/event/5.png",
    type: "completed",
    date: "2",
    month: "October",
    title: "Interview Preparation",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "Targeted modules to prepare students for technical and HR interviews through mock interviews, question banks, and behavioral tips, focusing on top recruiters’."
  },
  {
    img: "assets/images/event/6.png",
    type: "ongoing",
    date: "29",
    month: "October",
    title: "Communication Assessment",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "Enhance your speaking, listening, and presentation skills with our Communication Assessment event. This interactive session helps you identify strengths, improve clarity, and build confidence in expressing ideas effectively whether in interviews, group discussions, or professional settings."
  }
];

const filterTypes = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Upcoming", value: "upcoming" },
];

const Events = () => {
  const { events: adminEvents } = useAdmin();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  
  // Use admin events if available, otherwise fallback to static events
  const eventsToDisplay = adminEvents && adminEvents.length > 0 ? adminEvents : eventsData;
  
  const filteredEvents = eventsToDisplay.filter((event) => {
    // Handle both admin events (with status) and static events (with type)
    const eventStatus = event.status || event.type;
    
    // Search filter
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
                         event.desc.toLowerCase().includes(search.toLowerCase()) ||
                         event.location.toLowerCase().includes(search.toLowerCase());
    
    // Status filter
    const matchesStatus = filter === "all" || eventStatus === filter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-content">
      {/* Banner */}
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry text-center" style={{ padding: '80px 0' }}>
            <h1 className="text-white" style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Our Events
            </h1>
            <p style={{ 
              color: '#e6b3ff', 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Join our interactive workshops, webinars, and training sessions to enhance your skills and knowledge
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
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>Events</li>
          </ul>
        </div>
      </div>
      {/* Breadcrumb removed as per user request */}
      {/* Events Section - matches event.html */}
      <div className="content-block">
        <div className="section-area section-sp1 gallery-bx" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
          <div className="container">
                         {/* Search and Filter Section */}
             <div className="row m-b30">
               <div className="col-12">
                 <div className="row align-items-end">
                                       <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                      <div className="widget courses-search-bx placeani">
                        <div className="form-group">
                          <h5 className="widget-title style-1" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>Search Events</h5>
                          <div className="input-group">
                                                       <div style={{ position: 'relative', width: '100%' }}>
                              <input
                                name="dzName"
                                type="text"
                                className="form-control"
                                placeholder="Search for events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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
                       <h5 className="widget-title style-1" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>Filter by Status</h5>
                       <div className="d-flex flex-wrap gap-3">
                         {filterTypes.map((type) => (
                           <button
                             key={type.value}
                             onClick={() => setFilter(type.value)}
                             style={{ 
                               marginBottom: '10px',
                               padding: '12px 24px',
                               borderRadius: '25px',
                               border: 'none',
                               fontWeight: '600',
                               fontSize: '14px',
                               cursor: 'pointer',
                               transition: 'all 0.3s ease',
                               backgroundColor: filter === type.value ? '#4c1864' : '#253248',
                               color: filter === type.value ? '#ffffff' : '#bbbbbb',
                               boxShadow: filter === type.value ? '0 4px 15px rgba(76, 24, 100, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)'
                             }}
                             onMouseEnter={(e) => {
                               if (filter !== type.value) {
                                 e.target.style.backgroundColor = '#3f189a';
                                 e.target.style.transform = 'translateY(-2px)';
                               }
                             }}
                             onMouseLeave={(e) => {
                               if (filter !== type.value) {
                                 e.target.style.backgroundColor = '#253248';
                                 e.target.style.transform = 'translateY(0)';
                               }
                             }}
                           >
                             {type.label}
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
            

            <div className="clearfix">
              {filteredEvents.length === 0 ? (
                <div className="col-12 text-center" style={{ color: '#bbbbbb', fontSize: '18px', padding: '40px 0' }}>
                  {search ? `No events found matching "${search}"` : 'No events found matching your criteria.'}
                </div>
              ) : (
                <ul id="masonry" className="ttr-gallery-listing magnific-image row" style={{ listStyle: 'none', padding: 0 }}>
                  {filteredEvents.map((event, idx) => (
                  <li
                    key={idx}
                    className={`action-card col-lg-4 col-md-6 col-sm-12 ${event.type}`}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
                  >
                    <div className="event-bx d-flex flex-column h-100" style={{ 
                      minHeight: 380, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      backgroundColor: '#2a2a2a', 
                      borderRadius: 16, 
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)', 
                      width: '100%',
                      transition: 'all 0.3s ease',
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
                        <img src={event.img} alt={event.title} style={{ 
                          width: '100%', 
                          height: 180, 
                          objectFit: 'cover', 
                          borderTopLeftRadius: 16, 
                          borderTopRightRadius: 16, 
                          display: 'block' 
                        }} />
                      </div>
                      <div className="info-bx text-center" style={{ padding: 24, backgroundColor: '#2a2a2a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                          <div className="event-time" style={{ 
                            background: '#4c1864', 
                            color: '#fff', 
                            borderRadius: 12, 
                            padding: '12px 20px', 
                            marginRight: 15, 
                            minWidth: 70,
                            boxShadow: '0 4px 15px rgba(76, 24, 100, 0.3)'
                          }}>
                            <div className="event-date" style={{ fontSize: 26, fontWeight: 700, lineHeight: '1' }}>{event.date}</div>
                            <div className="event-month" style={{ fontSize: 14, marginTop: '4px' }}>{event.month}</div>
                          </div>
                          <div style={{ textAlign: 'left', flex: 1 }}>
                            <h5 style={{ 
                              fontWeight: 600, 
                              fontSize: 18, 
                              marginBottom: 10, 
                              color: '#fff',
                              lineHeight: '1.3'
                            }}>
                              {event.title}
                            </h5>
                            <ul className="media-post" style={{ 
                              padding: 0, 
                              margin: 0, 
                              listStyle: 'none', 
                              fontSize: 13, 
                              color: '#bbbbbb' 
                            }}>
                              <li style={{ marginBottom: '5px' }}>
                                <i className="fa fa-clock-o" style={{ marginRight: '8px', color: '#4c1864' }}></i> 
                                {event.time}
                              </li>
                              <li style={{ marginBottom: '5px' }}>
                                <i className="fa fa-map-marker" style={{ marginRight: '8px', color: '#4c1864' }}></i> 
                                {event.location}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <p style={{ 
                          color: '#bbbbbb', 
                          fontSize: 14, 
                          marginTop: 15,
                          lineHeight: '1.5',
                          textAlign: 'left'
                        }}>
                          {event.description || event.desc}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events; 