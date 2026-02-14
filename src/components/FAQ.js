// frontend/src/components/FAQ.js

import React, { useState } from 'react';
import './FAQ.css';

const FAQ = ({ content }) => {
    const [openIndex, setOpenIndex] = useState(null);
    
    // Parse FAQ string into array of Q&A pairs
    const parseFAQ = (faqString) => {
        const pairs = [];
        const lines = faqString.split('\n');
        
        for (let i = 0; i < lines.length; i += 2) {
            if (lines[i] && lines[i + 1]) {
                pairs.push({
                    question: lines[i].replace('Q:', '').trim(),
                    answer: lines[i + 1].replace('A:', '').trim()
                });
            }
        }
        return pairs;
    };

    const faqPairs = parseFAQ(content.faq);

    return (
        <section id="faq" className="faq">
            <div className="container">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="faq-container">
                    {faqPairs.map((item, index) => (
                        <div key={index} className="faq-item">
                            <div 
                                className="faq-question"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <h3>{item.question}</h3>
                                <span>{openIndex === index ? '−' : '+'}</span>
                            </div>
                            {openIndex === index && (
                                <div className="faq-answer">
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
