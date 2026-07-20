import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}

    if (form.name.trim() === '') newErrors.name = 'Name is required.'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.email.trim())) newErrors.email = 'Enter a valid email.'
    if (form.message.trim() === '') newErrors.message = 'Message is required.'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange}></textarea>
          {errors.message && <span className="error-msg">{errors.message}</span>}
        </div>

        <button type="submit">Send message</button>
        {submitted && <p className="success-msg">Thanks, we'll be in touch soon.</p>}
      </form>
    </div>
  )
}

export default Contact