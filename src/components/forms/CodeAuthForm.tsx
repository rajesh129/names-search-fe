import React from 'react'
import { Formik, Form } from 'formik'
import { verifyTotpSchema } from '../../lib/validation'
import type { AuthUserState } from '../../types/auth'
import { Stack, Button } from '@mui/material'
import FormTextField from '../ui/FormTextField'
import { useAuthUserStore } from '../../store/useAuthStore'
import { authCodeLogin } from '../../services/auth'

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
  code: '',
}

interface Props {
  onSubmit: (values: AuthUserState) => void;
  onCancel: () => void;
}

export default function CodeAuthForm({onSubmit, onCancel}: Props) {
  const { setAuthUser, authUser } = useAuthUserStore()

  const handleCodeAuth = async (values: AuthUserState) => {
    
    try {
      await authCodeLogin({
        challengeToken: authUser.challengeToken,
        code: values.code,
      })
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
      validationSchema={verifyTotpSchema}
      onSubmit={(values, { setSubmitting }) => {
        setAuthUser(values)
        setSubmitting(false)
        handleCodeAuth(values)
        onSubmit(values)
        console.log('Saved to Zustand store!')
      }}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={2} maxWidth={420}>
            <FormTextField
                name="code"
                type="text"
                label="Authenticator Code"
                placeholder="123456"
            />
            <Stack direction="row" spacing={1}>
                <Button type="button" variant="outlined" onClick={onCancel}>
                Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} variant="contained">
                {isSubmitting ? 'Uploading...' : 'Upload'}
                </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
