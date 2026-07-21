import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { isValidEmail, isRequired, minLength } from '../../utils/validators'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!isRequired(form.name)) newErrors.name = 'Name is required.'
    if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email.'
    if (!minLength(form.password, 6)) newErrors.password = 'Password must be at least 6 characters.'
    if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match.'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    await register(form.name, form.email, form.password)
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-image" style={{ backgroundImage: "url('/auth-bg.jpg')" }}></div>

      <div className="auth-form-wrap">
        <h1>Create your account</h1>
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
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register