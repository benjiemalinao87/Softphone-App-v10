import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import type { ChangeEvent } from 'react';

import { twilioService } from 'src/services/twilio-service';

type CredentialsStepProps = {
  twilioSid: string;
  twilioAuthToken: string;
  onInputChange: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void;
  onValidated: () => void;
};

export function CredentialsStep({ 
  twilioSid, 
  twilioAuthToken, 
  onInputChange,
  onValidated 
}: CredentialsStepProps) {
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateSID = (sid: string) => {
    if (!sid) return false;
    return sid.startsWith('AC') && sid.length === 34;
  };

  const validateAuthToken = (token: string) => {
    if (!token) return false;
    return token.length === 32;
  };

  const handleValidate = async () => {
    // Clear previous error
    setError(null);

    // Basic format validation
    if (!validateSID(twilioSid)) {
      setError('Invalid Account SID format. Should start with "AC" and be 34 characters long');
      return;
    }

    if (!validateAuthToken(twilioAuthToken)) {
      setError('Invalid Auth Token format. Should be 32 characters long');
      return;
    }

    setValidating(true);

    try {
      console.log('[Credentials] Validating:', { sid: twilioSid });
      const result = await twilioService.validateCredentials(twilioSid, twilioAuthToken);
      
      if (result.valid) {
        console.log('[Credentials] Validation successful');
        onValidated();
      } else {
        console.error('[Credentials] Validation failed:', result.message);
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('[Credentials] Validation error:', err);
      setError('Failed to validate credentials. Please try again.');
    } finally {
      setValidating(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Twilio Credentials</Typography>
      
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <Typography variant="subtitle2">Twilio SID</Typography>
        <TextField
          fullWidth
          value={twilioSid}
          onChange={onInputChange('twilioSid')}
          placeholder="Starts with AC..."
          error={!!error && !validateSID(twilioSid)}
          helperText={!!error && !validateSID(twilioSid) ? "Invalid SID format" : ""}
          sx={{ bgcolor: 'background.neutral' }}
        />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Twilio Auth Token</Typography>
        <TextField
          fullWidth
          type="password"
          value={twilioAuthToken}
          onChange={onInputChange('twilioAuthToken')}
          error={!!error && !validateAuthToken(twilioAuthToken)}
          helperText={!!error && !validateAuthToken(twilioAuthToken) ? "Invalid Auth Token format" : ""}
          sx={{ bgcolor: 'background.neutral' }}
        />
      </Stack>

      <LoadingButton
        loading={validating}
        variant="contained"
        onClick={handleValidate}
        sx={{ alignSelf: 'flex-end' }}
      >
        Continue
      </LoadingButton>
    </Stack>
  );
} 