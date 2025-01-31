import { useState, useEffect } from 'react';
import {
  Card,
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useCall } from 'src/contexts/call-context';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import BackspaceIcon from '@mui/icons-material/Backspace';

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function CallWidget() {
  const { 
    isCallActive, 
    endCall, 
    isIncomingCall,
    incomingCallData,
    acceptCall,
    rejectCall,
    isMuted,
    muteCall,
    unmuteCall,
    makeCall,
  } = useCall();
  const [duration, setDuration] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isCallActive) {
      setDuration(0);
      intervalId = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCallActive]);

  const cleanPhoneNumber = (number: string): string => {
    // Remove all non-numeric characters except +
    let cleaned = number.replace(/[^0-9+]/g, '');
    
    // If starts with multiple +, keep only the first one
    if (cleaned.includes('+')) {
      cleaned = `+${cleaned.replace(/\+/g, '')}`;
    }
    
    // If no + prefix and has 10 or more digits, assume US/Canada format
    if (!cleaned.startsWith('+') && cleaned.length >= 10) {
      cleaned = `+1${cleaned.slice(-10)}`;
    }
    
    return cleaned;
  };

  const formatPhoneNumberForDisplay = (number: string): string => {
    const cleaned = cleanPhoneNumber(number);
    
    // If empty, return empty
    if (!cleaned) return '';
    
    // If has country code (starts with +)
    if (cleaned.startsWith('+')) {
      const withoutPlus = cleaned.substring(1);
      
      // For US/Canada numbers (+1)
      if (cleaned.startsWith('+1') && withoutPlus.length >= 11) {
        const areaCode = withoutPlus.substring(1, 4);
        const firstPart = withoutPlus.substring(4, 7);
        const lastPart = withoutPlus.substring(7, 11);
        return `+1 (${areaCode}) ${firstPart}-${lastPart}`;
      }
      
      // For other international numbers, just add spaces every 3 digits
      return cleaned.replace(/(\d{3})/g, '$1 ').trim();
    }
    
    return cleaned;
  };

  const handleKeyPress = (key: string) => {
    console.log('[Dialer] Key pressed:', key);
    const newNumber = phoneNumber + key;
    const cleaned = cleanPhoneNumber(newNumber);
    if (cleaned.length <= 15) {
      setPhoneNumber(cleaned);
    }
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = cleanPhoneNumber(value);
    if (cleaned.length <= 15) {
      setPhoneNumber(cleaned);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const cleaned = cleanPhoneNumber(pastedText);
    if (cleaned.length <= 15) {
      setPhoneNumber(cleaned);
    }
  };

  const handleCall = async () => {
    const cleaned = cleanPhoneNumber(phoneNumber);
    console.log('[Dialer] Starting call process:', {
      original: phoneNumber,
      cleaned,
      length: cleaned.length
    });

    // Basic validation
    if (!cleaned) {
      console.error('[Dialer] Phone number is required');
      return;
    }

    try {
      console.log('[Dialer] Initiating call with Twilio Device...');
      await makeCall(cleaned);
      console.log('[Dialer] Call initiated successfully');
    } catch (error: unknown) {
      console.error('[Dialer] Error in call process:', error);
      // Show error to user
      if (error instanceof Error) {
        alert(`Call failed: ${error.message}`);
      } else {
        alert('Error placing call. Please try again.');
      }
    }
  };

  // Render incoming call UI
  if (isIncomingCall && incomingCallData) {
    return (
      <Card
        sx={{
          p: 2,
          bgcolor: 'warning.lighter',
          borderRadius: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CallIcon color="warning" />
            <Typography variant="subtitle2" color="warning.darker">
              Incoming Call
            </Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            From: {incomingCallData.from}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={acceptCall}
              startIcon={<CallIcon />}
            >
              Accept
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={rejectCall}
              startIcon={<CallEndIcon />}
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </Card>
    );
  }

  // Render active call UI
  if (isCallActive) {
    return (
      <Card
        sx={{
          p: 2,
          bgcolor: 'success.lighter',
          borderRadius: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'success.main',
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(0.95)',
                      opacity: 0.9,
                    },
                    '70%': {
                      transform: 'scale(1)',
                      opacity: 0.7,
                    },
                    '100%': {
                      transform: 'scale(0.95)',
                      opacity: 0.9,
                    },
                  },
                }}
              />
              <Typography variant="subtitle2" color="success.darker">
                Call in Progress
              </Typography>
            </Stack>
            <Typography variant="subtitle2" color="success.darker">
              {formatDuration(duration)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              color={isMuted ? "error" : "success"}
              onClick={() => isMuted ? unmuteCall() : muteCall()}
            >
              {isMuted ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
            <IconButton color="error" onClick={endCall}>
              <CallEndIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
    );
  }

  // Render dialer UI
  return (
    <Card sx={{ 
      p: 3,
      borderRadius: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Stack spacing={3}>
        {/* To Field */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            To:
          </Typography>
          <TextField
            fullWidth
            value={formatPhoneNumberForDisplay(phoneNumber)}
            onChange={handlePhoneNumberChange}
            onPaste={handlePaste}
            placeholder="Enter or paste phone number"
            size="small"
            error={phoneNumber.length > 0 && phoneNumber.length < 10}
            helperText={phoneNumber.length > 0 && phoneNumber.length < 10 ? "Enter at least 10 digits" : ""}
            InputProps={{
              startAdornment: phoneNumber.length === 0 && (
                <InputAdornment position="start">
                  <Typography color="text.secondary">+</Typography>
                </InputAdornment>
              ),
              endAdornment: phoneNumber && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setPhoneNumber('')} edge="end" size="small">
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* From Field */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            From:
          </Typography>
          <TextField
            fullWidth
            value="Demo"
            disabled
            size="small"
            helperText="657-385-7999"
            InputProps={{
              readOnly: true,
              sx: { bgcolor: 'grey.50' }
            }}
          />
        </Box>

        {/* Call Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleCall}
          disabled={!phoneNumber || phoneNumber.length < 10}
          startIcon={<CallIcon />}
          sx={{
            py: 1.5,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            mt: 'auto'
          }}
        >
          Place Call
        </Button>
      </Stack>
    </Card>
  );
} 