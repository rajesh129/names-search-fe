import * as Yup from 'yup'

// Regex: allows only English alphabets (A–Z, a–z)
export const searchSchema = Yup.object({
  query: Yup.string()
    .matches(/^[\p{L}]+$/u, 'Only letters are allowed')
    .required('Search query is required'),
})
