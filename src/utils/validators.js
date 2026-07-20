export function isValidEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value.trim())
}

export function isRequired(value) {
  return value.trim() !== ''
}

export function minLength(value, length) {
  return value.trim().length >= length
}