import { useState, useRef, useEffect } from 'react'
import './FAQ.css'

const faqs = [
  { q: 'What services does Freetown Press offer?', a: 'We offer four core services: Corporate Branding & Marketing, Premium Printing & Corporate Merchandise, Professional Training, and Business Supplies — each tailored to meet the specific needs of businesses and institutions.' },
  { q: 'How long does a typical project take?', a: 'Simple print jobs take 3-5 business days, while branding projects may take 2-4 weeks. We always provide clear timelines upfront.' },
  { q: 'Do you offer bulk pricing or corporate discounts?', a: 'Yes, we offer competitive bulk pricing and corporate packages customized to your specific requirements and volumes.' },
  { q: 'Can you handle urgent or rush orders?', a: 'Absolutely. We offer rush processing for urgent projects while maintaining our high quality standards.' },
  { q: 'What areas do you serve?', a: 'We serve organizations across Ghana including Accra, Kumasi, Takoradi, and other major cities — plus clients across West Africa.' },
  { q: 'How do I request a quote?', a: 'Fill out the Request a Quote form on this website, email us at request@thefreetownpress.com, or call 0244069157.' },
]

function FAQItem({ faq, isActive, onClick }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (isActive && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [isActive])

  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <button className="faq-q" onClick={onClick} aria-expanded={isActive}>
        {faq.q}
        <div className="faq-chevron">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </button>
      <div className="faq-a" style={{ maxHeight: height }} ref={contentRef}>
        <div className="faq-a-inner">{faq.a}</div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (i) => {
    setActiveIndex(activeIndex === i ? -1 : i)
  }

  return (
    <section className="faq">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-left" data-reveal="left">
            <span className="label">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Get quick answers to common questions about our services and pricing.</p>
          </div>
          <div className="faq-items" data-reveal="right">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} isActive={activeIndex === i} onClick={() => handleClick(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
