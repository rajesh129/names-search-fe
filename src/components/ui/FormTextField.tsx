import React from 'react'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'

type Props = React.ComponentProps<typeof TextField> & { name: string }

export default function FormTextField({ name, helperText, ...rest }: Props) {
  const [field, meta] = useField(name)
  const isError = Boolean(meta.touched && meta.error)
  return (
    <TextField
      {...field}
      {...rest}
      error={isError}
      helperText={isError ? meta.error : helperText}
      fullWidth
      size="small"
      variant="outlined"
    />
  )
}
