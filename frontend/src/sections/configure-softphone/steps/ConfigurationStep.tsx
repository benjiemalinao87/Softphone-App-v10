import { useState, useEffect, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import type { ChangeEvent } from 'react';

import { twilioService } from 'src/services/twilio-service';

type ConfigurationStepProps = {
  twilioSid: string;
  twilioAuthToken: string;
  selectedPhoneNumber: string;
  onInputChange: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

export function ConfigurationStep({
  twilioSid,
  twilioAuthToken,
  selectedPhoneNumber,
  onInputChange,
  onNext,
}: ConfigurationStepProps) {
  const [configuring, setConfiguring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBaseUrl = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/base-url');
      const data = await response.json();
      onInputChange('inboundUrl')({ target: { value: `${data.baseUrl}/api/voice` } } as any);
      onInputChange('outboundUrl')({ target: { value: `${data.baseUrl}/api/voice/outbound` } } as any);
    } catch (err) {
      console.error('Failed to fetch base URL:', err);
    }
  }, [onInputChange]);

  useEffect(() => {
    fetchBaseUrl();
  }, [fetchBaseUrl]);

  const handleConfigure = async () => {
    setConfiguring(true);
    setError(null);

    try {
      await twilioService.configureWebhooks(twilioSid, twilioAuthToken, selectedPhoneNumber);
      onNext();
    } catch (err) {
      console.error('Failed to configure webhooks:', err);
      setError('Failed to configure call handling. Please try again.');
    } finally {
      setConfiguring(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Call Configuration</Typography>
      
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Typography color="text.secondary">
        Your call handling is being automatically configured with secure webhook URLs.
      </Typography>
      
      <LoadingButton
        loading={configuring}
        variant="contained"
        onClick={handleConfigure}
        sx={{ alignSelf: 'flex-end' }}
      >
        Continue
      </LoadingButton>
    </Stack>
  );
} 