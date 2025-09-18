import React, { useState } from "react";

const faqs = [
  {
    question: "What is InstaIQ?",
    answer:
      "InstaIQ is an AI-powered educational platform designed to help students prepare for campus placements, competitive exams, and career growth through personalized learning paths, quizzes, resume building tools, job portals, and more.",
  },
  {
    question: "Is InstaIQ free to use?",
    answer:
      "InstaIQ offers both free and premium services. Core features like practice quizzes and career tips are free, while advanced features such as AI-based learning paths and job matching may require a membership.",
  },
  {
    question: "Are mock interviews and preparation included?",
    answer:
      "Yes! We offer mock interview modules, common HR and technical question banks, and tips to boost your confidence before real interviews.",
  },
  {
    question: "How do I register or log in?",
    answer:
      "Click on the “Register” or “Login” button on the homepage. You can sign up using email, Google, or through your college credentials (if integrated).",
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      "Click on “Forgot Password” on the login page, enter your email, and follow the steps to reset your password.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="page-content">
      {/* Banner */}
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner1.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry text-center" style={{ padding: '80px 0' }}>
            <h1 className="text-white" style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Frequently Asked Questions
            </h1>
            <p style={{ 
              color: '#e6b3ff', 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Find answers to common questions about our services and how we help students succeed
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
            <li style={{ color: '#bbbbbb', marginLeft: '10px' }}>FAQ</li>
          </ul>
        </div>
      </div>

      {/* FAQ Section - matches faq-1.html */}
      <div className="content-block">
        <div className="section-area section-sp1" style={{ backgroundColor: '#1e1e1e', padding: '80px 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="heading-bx left">
                  <h2 className="m-b10 title-head" style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
                    Asked <span style={{ color: '#4c1864' }}> Questions</span>
                  </h2>
                </div>
                <p className="m-b10" style={{ color: '#bbbbbb', fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
                  Find answers to common questions about InstaIQ’s features, services, and how we help students succeed in their careers. Whether you're a new user or just exploring, these FAQs will guide you through everything you need to know.
                </p>
                <div className="ttr-accordion m-b30 faq-bx" id="accordion1">
                  {faqs.map((faq, idx) => (
                    <div className="panel" key={idx} style={{ marginBottom: '20px' }}>
                      <div className="acod-head" style={{
                        backgroundColor: '#253248',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                        <h6 className="acod-title">
                          <a
                            href="#"
                            className={openIndex === idx ? "" : "collapsed"}
                            aria-expanded={openIndex === idx}
                            onClick={e => {
                              e.preventDefault();
                              handleToggle(idx);
                            }}
                            style={{
                              display: 'block',
                              padding: '20px 25px',
                              color: openIndex === idx ? '#ffffff' : '#bbbbbb',
                              textDecoration: 'none',
                              fontSize: '16px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease',
                              backgroundColor: openIndex === idx ? '#4c1864' : 'transparent'
                            }}
                          >
                            {faq.question}
                          </a>
                        </h6>
                      </div>
                      <div
                        id={`faq${idx + 1}`}
                        className={`acod-body collapse${openIndex === idx ? " show" : ""}`}
                        style={{
                          backgroundColor: '#253248',
                          borderRadius: '0 0 12px 12px'
                        }}
                      >
                        <div className="acod-content" style={{
                          padding: '25px',
                          color: '#bbbbbb',
                          fontSize: '15px',
                          lineHeight: '1.6'
                        }}>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="m-b10" style={{ color: '#bbbbbb', fontSize: '16px', lineHeight: '1.6', marginTop: '40px' }}>
                  Wondering how InstaIQ works, what services we offer, or how to get started? You're in the right place! Browse through our most commonly asked questions to learn more about how InstaIQ can support your academic and career journey.
                </p>
                {/* Feature boxes removed as per user request */}
              </div>
              {/* Removed the right-side contact form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 