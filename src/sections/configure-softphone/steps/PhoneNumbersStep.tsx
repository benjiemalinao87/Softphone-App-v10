import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import type { TwilioPhoneNumber } from 'src/services/twilio-service';

type PhoneNumbersStepProps = {
  phoneNumbers: TwilioPhoneNumber[];
  onPhoneNumberSelect: (phoneNumber: TwilioPhoneNumber) => void;
  onNext: () => void;
};

export function PhoneNumbersStep({
  phoneNumbers,
  onPhoneNumberSelect,
  onNext,
}: PhoneNumbersStepProps) {
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string>('');

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = phoneNumbers.find(num => num.sid === event.target.value);
    if (selected) {
      setSelectedPhoneNumber(selected.sid);
      onPhoneNumberSelect(selected);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Available Phone Numbers</Typography>

      <Box sx={{ bgcolor: 'background.neutral', borderRadius: 1 }}>
        <RadioGroup
          value={selectedPhoneNumber}
          onChange={handlePhoneNumberChange}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle2">
              SELECT A PHONE NUMBER
            </Typography>
          </Box>

          {/* Phone Numbers List */}
          <Stack>
            {phoneNumbers.map((number) => (
              <Box
                key={number.sid}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <Radio
                  value={number.sid}
                  sx={{ mr: 2 }}
                />
                <Typography>
                  {number.phoneNumber}
                </Typography>
              </Box>
            ))}

            {phoneNumbers.length === 0 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No phone numbers available
                </Typography>
              </Box>
            )}
          </Stack>
        </RadioGroup>
      </Box>

      <LoadingButton
        variant="contained"
        onClick={onNext}
        disabled={!selectedPhoneNumber}
        sx={{ alignSelf: 'flex-end' }}
      >
        Continue
      </LoadingButton>
    </Stack>
  );
} 