import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ConfirmationStepProps = {
  formData: {
    inboundEnabled: boolean;
    outboundEnabled: boolean;
    twilioSid: string;
    twilioAuthToken: string;
    selectedPhoneNumbers: string[];
    inboundUrl: string;
    outboundUrl: string;
  };
};

export function ConfirmationStep({ formData }: ConfirmationStepProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Please confirm your settings:</Typography>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Call Settings
        </Typography>
        <Typography>Inbound Calls: {formData.inboundEnabled ? 'Enabled' : 'Disabled'}</Typography>
        <Typography>Outbound Calls: {formData.outboundEnabled ? 'Enabled' : 'Disabled'}</Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Twilio Configuration
        </Typography>
        <Typography>Account SID: {formData.twilioSid}</Typography>
        <Typography>Auth Token: {'•'.repeat(12)}</Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Phone Numbers
        </Typography>
        {formData.selectedPhoneNumbers.length > 0 ? (
          formData.selectedPhoneNumbers.map((number) => (
            <Typography key={number}>{number}</Typography>
          ))
        ) : (
          <Typography>No numbers selected</Typography>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          URLs Configuration
        </Typography>
        <Typography>Inbound URL: {formData.inboundUrl || 'Not configured'}</Typography>
        <Typography>Outbound URL: {formData.outboundUrl || 'Not configured'}</Typography>
      </Box>
    </Stack>
  );
} 