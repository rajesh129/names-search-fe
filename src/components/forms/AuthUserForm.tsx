import React from 'react'
import { Formik, Form } from 'formik'
import { authUserSchema } from '../../lib/validation'
import type { AuthResponse, AuthUserState } from '../../types/auth'
import { Stack, Button } from '@mui/material'
import FormTextField from '../ui/FormTextField'
import { useAuthUserStore } from '../../store/useAuthStore'
import { authLogin } from '../../services/auth'

const initialValues: AuthUserState = {
  challengeToken: '',
  user: {
    id: '',
    email: '',
    role: '',
    is_totp_enabled: false,
  },
  password: '',
  email: '',
}

interface Props {
  onSubmit?: (values: AuthUserState) => void;
  onCancel: () => void;
}

export default function AuthUserForm({onSubmit, onCancel}: Props) {
  const { setAuthUser, authUser } = useAuthUserStore()

  const handleAuthLogin = async (values: AuthUserState) => {
    try {
      const data = await authLogin({
        email: values.email,
        password: values.password,
      })
      setAuthUser(data)
      
    } catch (e: any) {
      if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') return
      const msg = e?.message?.includes('Network Error')
        ? 'Network error. In dev, enable Vite proxy or API CORS.'
        : e?.message || 'Failed to fetch results'
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authUserSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        handleAuthLogin(values)
        onSubmit && onSubmit(values)
        console.log('Saved to Zustand store!')
      }}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={2} maxWidth={420}>
            <FormTextField name="email" type="email" label="Email" placeholder="jane@example.com" />
            <FormTextField name="password" type="password" label="Password" placeholder="••••••••" />
            <Stack direction="row" spacing={1}>
                <Button type="button" variant="outlined" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} variant="contained">
                  {isSubmitting ? 'Submitting…' : 'Submit'}
                </Button>
              </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
