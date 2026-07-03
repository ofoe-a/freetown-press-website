import './Contact.css'

const cards = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Visit Us',
    info: 'Accra, Ghana',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    title: 'Call Us',
    info: '0244 069 157',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
    title: 'Email Us',
    info: 'request@thefreetownpress.com',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    title: 'Business Hours',
    info: null,
  },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div data-reveal="left">
            <span className="label">Contact Us</span>
            <h2>Get In Touch</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.7, marginTop: 8 }}>Reach out through any of the channels below.</p>
            <div className="c-cards">
              {cards.map((c) => (
                <div className="c-card" key={c.title}>
                  <div className="c-icon">{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    {c.info ? (
                      <p>{c.info}</p>
                    ) : (
                      <p>Mon-Fri: 8:30am - 5:30pm<br />Sat: 9:00am - 2:00pm</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="map-box" data-reveal="right"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.68670563854!2d-0.2631340684654474!3d5.603716962482647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0, borderRadius: 'var(--radius-xl)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Freetown Press location map"></iframe></div>
        </div>
      </div>
    </section>
  )
}
