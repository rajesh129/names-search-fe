// src/components/ui/SearchBar.tsx
import React from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import theme from '../../theme'

type SearchBarProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  helperText?: string
  error?: boolean
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  helperText,
  error = false,
}: SearchBarProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                color="primary"
                aria-label="search"
                type="submit" // ⬅️ submit enclosing <form>
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
        htmlInput: { 'aria-label': 'search' },
      }}
      sx={{ mt: theme.spacing(2), mb: theme.spacing(2) }}
    />
  )
}
