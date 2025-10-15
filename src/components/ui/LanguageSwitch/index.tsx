import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useParams, useSearchParams } from 'react-router-dom';

export default function LanguageSwitch() {
    const { lng } = useParams<{ lng: string }>();
    const [params, setParams] = useSearchParams();
    const qLang = params.get('l');
  const [language, setLanguage] = React.useState<string | null>(qLang || lng || 'en');
  const searchParams = new URLSearchParams(params);


  const handleLanguageChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null,
  ) => {
    searchParams.set('l', newLanguage ?? 'en');
    setParams(searchParams);
    setLanguage(newLanguage);
  };

  return (
    <ToggleButtonGroup
      value={language}
      exclusive
      onChange={handleLanguageChange}
      aria-label="text alignment"
    >
      <ToggleButton value="en" aria-label="english">
        En
      </ToggleButton>
      <ToggleButton value="fr" aria-label="french">
        Fr
      </ToggleButton>
      <ToggleButton value="ta" aria-label="tamil">
        Ta
      </ToggleButton>
    </ToggleButtonGroup>
  );
}