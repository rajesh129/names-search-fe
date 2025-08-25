import React from 'react'
import { Formik, Form } from 'formik'
import { profileSchema } from '../../lib/validation'
import { useUserStore } from '../../store/useUserStore'
import type { UserProfile } from '../../types'
import { Stack, Button } from '@mui/material'
import FormTextField from '../ui/FormTextField'

const initialValues: UserProfile = { name: '', email: '', age: null }

export default function ProfileForm() {
  const { setProfile, profile } = useUserStore()

  return (
    <Formik
      initialValues={profile.name || profile.email ? profile : initialValues}
      validationSchema={profileSchema}
      onSubmit={(values, { setSubmitting }) => {
        setProfile(values)
        setSubmitting(false)
        alert('Saved to Zustand store!')
      }}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={2} maxWidth={420}>
            <FormTextField name="name" label="Name" placeholder="Jane Doe" />
            <FormTextField name="email" type="email" label="Email" placeholder="jane@example.com" />
            <FormTextField name="age" type="number" label="Age (optional)" placeholder="28" />

            <Stack direction="row" spacing={1}>
              <Button type="submit" disabled={isSubmitting} variant="contained">
                {isSubmitting ? 'Saving…' : 'Save Profile'}
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
