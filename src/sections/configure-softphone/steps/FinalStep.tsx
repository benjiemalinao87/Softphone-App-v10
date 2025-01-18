import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { ChangeEvent } from 'react';

type FinalStepProps = {
  inboundEnabled: boolean;
  outboundEnabled: boolean;
  inboundUrl: string;
  outboundUrl: string;
  onInputChange: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void;
};

export function FinalStep({ 
  inboundEnabled, 
  outboundEnabled, 
  inboundUrl, 
  outboundUrl, 
  onInputChange,
  onSwitchChange 
}: FinalStepProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Call Configuration</Typography>

      <FormControlLabel
        control={
          <Switch
            checked={inboundEnabled}
            onChange={onSwitchChange('inboundEnabled')}
          />
        }
        label="Auto-configure inbound calls"
      />

      <FormControlLabel
        control={
          <Switch
            checked={outboundEnabled}
            onChange={onSwitchChange('outboundEnabled')}
          />
        }
        label="Auto-configure outbound calls"
      />

      <Stack spacing={2}>
        <Typography variant="subtitle2">Inbound URL</Typography>
        <TextField
          fullWidth
          value={inboundUrl}
          onChange={onInputChange('inboundUrl')}
          placeholder="e.g., https://your-ngrok-url/inbound"
          sx={{ bgcolor: 'background.neutral' }}
        />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Outbound URL</Typography>
        <TextField
          fullWidth
          value={outboundUrl}
          onChange={onInputChange('outboundUrl')}
          placeholder="e.g., https://your-ngrok-url/outbound"
          sx={{ bgcolor: 'background.neutral' }}
        />
      </Stack>
    </Stack>
  );
} 