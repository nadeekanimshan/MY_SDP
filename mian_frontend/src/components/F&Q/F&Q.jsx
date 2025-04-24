import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FAQ.css'; // We'll create this CSS file

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I book a recording session?",
      answer: "You can book a session through our online portal, by phone, or by visiting our studio in person. Online bookings require a 20% deposit to secure your time slot."
    },
    {
      question: "What equipment do you provide?",
      answer: "We offer state-of-the-art recording equipment including Neumann microphones, Pro Tools HD systems, outboard gear from Universal Audio, and a selection of premium instruments."
    },
    {
      question: "Can I bring my own engineer?",
      answer: "Absolutely! While we have excellent in-house engineers, you're welcome to bring your own. We do require advance notice for outside engineers."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Sessions can be cancelled or rescheduled up to 48 hours in advance for a full refund. Cancellations within 48 hours forfeit the deposit."
    },
    {
      question: "Do you offer mixing/mastering services?",
      answer: "Yes, we provide professional mixing and mastering services. Many clients record with us and then use our post-production services to complete their projects."
    }
  ];

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Find answers to common questions about our studio services</p>
        </div>

        <div className="faq-accordion">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.question}</span>
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              
              <div className="faq-answer-container">
                <div className="faq-answer">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <p>Still have questions?</p>
          <button className="faq-contact-button">Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;