import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { isValidEmail, isRequired } from '../../utils/validators'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email.'
    if (!isRequired(form.password)) newErrors.password = 'Password is required.'

    setErrors(newErrors)
    setServerError('')
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-image" style={{ backgroundImage: "url('/auth-bg.jpg')" }}></div>

      <div className="auth-form-wrap">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit} noValidate>
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

          <div className="field-inline">
            <label>
              <input type="checkbox" name="rememberMe" checked={form.rememberMe} onChange={handleChange} />
              Remember me
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          {serverError && <p className="error-msg">{serverError}</p>}

          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>

        <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login