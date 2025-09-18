import React, { useState } from 'react';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = [
    "How can I prepare for interviews from now?",
    "What skills are most important for freshers?",
    "What industries hire your trained students?",
    "How will INSTA IQ help me in my career?",
    "Can I practice tests online anytime?",
    "How can I contact my trainer?",
    "Do you provide recorded lectures?",
    "Will I get study material after joining?",
    "How do I register for the aptitude test?",
    "Do you conduct mock interviews?",
    "How many students have you trained so far?",
    "What makes INSTA IQ different from other training companies?",
    "What is INSTA IQ?",
    "When was INSTA IQ started?",
    "What is the main objective of INSTA IQ?",
    "What competitive exam training do you provide?",
    "Do you have courses for non-engineering students?",
    "What is Campus Recruitment Training (CRT)?"
  ];

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    const botResponse = getBotResponse(question);
    setMessages([
      ...messages,
      { type: 'user', content: question },
      { type: 'bot', content: botResponse }
    ]);
  };

  const getBotResponse = (question) => {
    const responses = {
      "How can I prepare for interviews from now?": "Start by focusing on aptitude, technical skills, and communication. Join our comprehensive preparation program that includes mock interviews, skill assessments, and personalized coaching.",
      "What skills are most important for freshers?": "For freshers, focus on: 1) Aptitude and logical reasoning, 2) Basic programming concepts, 3) Communication skills, 4) Problem-solving abilities, 5) Teamwork and collaboration.",
      "What industries hire your trained students?": "Our students get placed in IT, Banking, Consulting, Manufacturing, and various other sectors. Top recruiters include TCS, Infosys, Wipro, Capgemini, and many more.",
      "How will INSTA IQ help me in my career?": "INSTA IQ provides industry-focused training, personalized coaching, mock interviews, skill assessments, and placement assistance to help you build a successful career.",
      "Can I practice tests online anytime?": "Yes! We provide 24/7 access to our online practice platform with thousands of questions, mock tests, and performance analytics.",
      "How can I contact my trainer?": "You can contact your trainer through our learning management system, WhatsApp groups, or direct phone calls. We ensure continuous support throughout your training.",
      "Do you provide recorded lectures?": "Yes, all our lectures are recorded and available for lifetime access. You can revisit any topic anytime for better understanding.",
      "Will I get study material after joining?": "Absolutely! You'll receive comprehensive study material including books, practice sets, previous year papers, and digital resources.",
      "How do I register for the aptitude test?": "You can register for aptitude tests through our website, mobile app, or by contacting our support team. We conduct regular tests to assess your progress.",
      "Do you conduct mock interviews?": "Yes, we conduct regular mock interviews with industry experts to help you gain confidence and improve your interview skills.",
      "How many students have you trained so far?": "We have successfully trained over 65,000+ students across various campuses and helped them secure placements in top companies.",
      "What makes INSTA IQ different from other training companies?": "Our unique campus-integrated approach, industry-focused curriculum, personalized coaching, and proven track record of 65,000+ successful placements set us apart.",
      "What is INSTA IQ?": "INSTA IQ is a leading career readiness platform that delivers industry-focused Campus Recruitment Training (CRT) to build career-ready graduates.",
      "When was INSTA IQ started?": "INSTA IQ was established with the vision to bridge the gap between academia and industry, helping students become job-ready professionals.",
      "What is the main objective of INSTA IQ?": "Our main objective is to empower students with industry-relevant skills and prepare them for successful careers through comprehensive training programs.",
      "What competitive exam training do you provide?": "We provide training for various competitive exams including aptitude tests, technical interviews, and company-specific recruitment processes.",
      "Do you have courses for non-engineering students?": "Yes, we offer courses for students from all backgrounds including B.Com, BBA, B.Sc, and other streams who want to pursue careers in IT and other sectors.",
      "What is Campus Recruitment Training (CRT)?": "CRT is a comprehensive training program designed to prepare students for campus recruitment processes, including aptitude tests, technical interviews, and HR rounds."
    };
    
    return responses[question] || "Thank you for your question. Our team will get back to you soon with a detailed response.";
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const botResponse = getBotResponse(inputMessage);
      setMessages([
        ...messages,
        { type: 'user', content: inputMessage },
        { type: 'bot', content: botResponse }
      ]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button - Updated Design */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '30px', // Positioned at bottom of screen
            right: '30px',
            width: 'auto',
            minWidth: '120px',
            height: '50px',
            backgroundColor: '#ffffff',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 15px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            border: '1px solid #e0e0e0'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
          }}
        >
          {/* Left side - INSTA IQ Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e0e0e0'
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#4c1864',
                lineHeight: '1'
              }}>
                INSTA<br/>IQ
              </span>
            </div>
          </div>
          
          {/* Right side - Chat Icon */}
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#4c1864',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <i className="fa fa-comments" style={{ 
              color: '#ffffff', 
              fontSize: '12px',
              textShadow: '0 0 4px rgba(255,255,255,0.5)'
            }}></i>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px', // Positioned at bottom of screen
            right: '30px',
            width: '350px',
            height: '500px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              backgroundColor: '#4c1864',
              color: '#ffffff',
              padding: '15px 20px',
              borderRadius: '20px 20px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa fa-refresh" style={{ fontSize: '16px', cursor: 'pointer' }}></i>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>INSTAIQ</div>
                <div style={{ fontSize: '12px', opacity: '0.8' }}>INSTA IQ</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa fa-share" style={{ fontSize: '14px', cursor: 'pointer' }}></i>
              <i className="fa fa-bookmark" style={{ fontSize: '14px', cursor: 'pointer' }}></i>
              <i 
                className="fa fa-times" 
                style={{ fontSize: '16px', cursor: 'pointer' }}
                onClick={() => setIsOpen(false)}
              ></i>
            </div>
          </div>

          {/* Chat Content */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}
          >
            {/* Welcome Message */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '14px', 
                color: '#333',
                marginBottom: '5px'
              }}>
                INSTA IQ - Delivering Industry-Focused CRT to Build Career-Ready Graduates
              </div>
            </div>

            {/* Start Chat Button */}
            <button
              style={{
                backgroundColor: '#4c1864',
                color: '#ffffff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '15px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3f189a';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4c1864';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fa fa-comment" style={{ fontSize: '12px' }}></i>
              Start chat
            </button>

            {/* About Section */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '14px', 
                color: '#333',
                marginBottom: '5px'
              }}>
                About me:
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#666',
                lineHeight: '1.4'
              }}>
                We're INSTA IQ, empowering 65,000+ students with industry-relevant skills. Our campus-integrated approach bridges academia and industry, offering apti... <span style={{ color: '#4c1864', cursor: 'pointer' }}>read more</span>
              </div>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: '10px',
                      textAlign: message.type === 'user' ? 'right' : 'left'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: message.type === 'user' ? '#4c1864' : '#f0f0f0',
                        color: message.type === 'user' ? '#ffffff' : '#333',
                        padding: '8px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        maxWidth: '80%',
                        display: 'inline-block',
                        wordWrap: 'break-word'
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length === 0 && (
              <div>
                <div style={{ 
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  color: '#333',
                  marginBottom: '10px'
                }}>
                  Suggested:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {suggestedQuestions.slice(0, 8).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      style={{
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        padding: '8px 12px',
                        borderRadius: '15px',
                        fontSize: '11px',
                        color: '#333',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.3s ease',
                        wordWrap: 'break-word'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#e9ecef';
                        e.target.style.borderColor = '#4c1864';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#f8f9fa';
                        e.target.style.borderColor = '#e9ecef';
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div
            style={{
              padding: '15px 20px',
              borderTop: '1px solid #e9ecef',
              backgroundColor: '#f8f9fa',
              borderRadius: '0 0 20px 20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #e9ecef',
                  borderRadius: '20px',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <i className="fa fa-paperclip" style={{ fontSize: '14px', color: '#666', cursor: 'pointer' }}></i>
              <i className="fa fa-microphone" style={{ fontSize: '14px', color: '#666', cursor: 'pointer' }}></i>
              <button
                onClick={handleSendMessage}
                style={{
                  backgroundColor: '#4c1864',
                  color: '#ffffff',
                  border: 'none',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                <i className="fa fa-arrow-up"></i>
              </button>
            </div>
            <div style={{ 
              fontSize: '10px', 
              color: '#999', 
              textAlign: 'center', 
              marginTop: '5px' 
            }}>
              AI can make mistakes. Please double-check responses.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
