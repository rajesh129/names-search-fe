import * as Yup from 'yup'

// Regex: allows only English alphabets (A–Z, a–z)
export const searchSchema = Yup.object({
  query: Yup.string()
    .matches(/^[\p{L}]+$/u, 'Only letters are allowed')
    .required('Search query is required'),
})

export const authUserSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const verifyTotpSchema = Yup.object({
  code: Yup.string()
    .matches(/^\d{6}$/, 'Code must be exactly 6 digits')
    .required('Code is required'),
});
