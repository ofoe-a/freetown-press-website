import { useState, useRef } from 'react'
import './Quote.css'

const benefits = [
  'Free consultation & quote',
  'Response within 24 hours',
  'No obligation, transparent pricing',
  'Dedicated project manager',
]

export default function Quote() {
  const fileRef = useRef(null)
  const [btnText, setBtnText] = useState('Submit Quote Request')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [btnStyle, setBtnStyle] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnText('Submitting...')
    setBtnDisabled(true)

    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch('https://formsubmit.co/ajax/request@thefreetownpress.com', {
        method: 'POST',
        body: data,
      })

      if (res.ok) {
        setBtnText('Quote Request Sent!')
        setBtnStyle({ background: '#22c55e' })
        setTimeout(() => {
          setBtnText('Submit Quote Request')
          setBtnStyle({})
          setBtnDisabled(false)
          form.reset()
        }, 2500)
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setBtnText('Error — please try again')
      setBtnStyle({ background: '#ef4444' })
      setTimeout(() => {
        setBtnText('Submit Quote Request')
        setBtnStyle({})
        setBtnDisabled(false)
      }, 2500)
    }
  }

  return (
    <section className="quote" id="quote">
      <div className="container">
        <div className="quote-grid">
          <div className="quote-left" data-reveal="left">
            <span className="label">Get Started</span>
            <h2>Let&apos;s Bring Your Project to Life</h2>
            <p>Tell us what you need and our team will respond promptly with a tailored quotation.</p>
            {benefits.map((b) => (
              <div className="qbenefit" key={b}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                {b}
              </div>
            ))}
          </div>
          <div className="quote-form" data-reveal="right">
            <h3>Request Your Free Quote</h3>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New Quote Request from Website" />
              <input type="hidden" name="_template" value="table" />
              <div className="frow">
                <div className="fgroup"><label htmlFor="q-name">Full Name *</label><input id="q-name" name="name" type="text" placeholder="Your full name" required /></div>
                <div className="fgroup"><label htmlFor="q-company">Company Name</label><input id="q-company" name="company" type="text" placeholder="Your company" /></div>
              </div>
              <div className="frow">
                <div className="fgroup"><label htmlFor="q-email">Email *</label><input id="q-email" name="email" type="email" placeholder="you@company.com" required /></div>
                <div className="fgroup"><label htmlFor="q-phone">Phone *</label><input id="q-phone" name="phone" type="tel" placeholder="0244 069 157" required /></div>
              </div>
              <div className="fgroup">
                <label htmlFor="q-service">Service Required *</label>
                <select id="q-service" name="service" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option>Corporate Branding &amp; Marketing</option>
                  <option>Printing &amp; Corporate Merchandise</option>
                  <option>Professional Training</option>
                  <option>Business Supplies</option>
                  <option>Multiple Services</option>
                </select>
              </div>
              <div className="fgroup">
                <label htmlFor="q-details">Project Details *</label>
                <textarea id="q-details" name="details" placeholder="Tell us about your project..." required></textarea>
              </div>
              <div className="fgroup">
                <label>Upload Artwork (Optional)</label>
                <div className="upload-area" onClick={() => fileRef.current?.click()}>
                  <p>Click to upload or <span>browse files</span></p>
                  <p>PDF, AI, PSD, JPG, PNG</p>
                </div>
                <input type="file" name="attachment" ref={fileRef} style={{ display: 'none' }} accept=".pdf,.ai,.psd,.jpg,.jpeg,.png" />
              </div>
              <button type="submit" className="btn btn-dark submit-btn" disabled={btnDisabled} style={btnStyle}>{btnText}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
