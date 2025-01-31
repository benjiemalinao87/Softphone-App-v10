import { Box, Button, Stack, Typography, Alert } from '@mui/material';
import { useCall } from 'src/contexts/call-context';
import { bgBlur } from 'src/theme/css';
import { Iconify } from 'src/components/iconify';
import { useEffect } from 'react';

export default function CallNotification() {
  const { isIncomingCall, incomingCallData, acceptCall, rejectCall, hasAudioPermission } = useCall();

  useEffect(() => {
    console.log('CallNotification: State changed', {
      isIncomingCall,
      incomingCallData,
      hasAudioPermission
    });
  }, [isIncomingCall, incomingCallData, hasAudioPermission]);

  useEffect(() => {
    // Component mount logging
    console.log('CallNotification: Component mounted');
    return () => {
      console.log('CallNotification: Component unmounted');
    };
  }, []);

  if (!isIncomingCall) {
    console.log('CallNotification: No incoming call, not showing notification');
    return null;
  }

  console.log('CallNotification: Rendering notification UI', {
    from: incomingCallData?.from,
    hasAudioPermission
  });

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          p: 4,
          width: 400,
          maxWidth: '90%',
          borderRadius: 2,
          bgcolor: 'background.paper',
          textAlign: 'center',
          boxShadow: (theme) => theme.customShadows.z24,
        }}
      >
        {!hasAudioPermission && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Please allow microphone access to accept calls
          </Alert>
        )}

        <Iconify
          icon="solar:phone-calling-rounded-bold"
          width={80}
          sx={{ color: 'primary.main', mb: 3, animation: 'pulse 1s infinite' }}
        />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Incoming Call
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          {incomingCallData?.from || 'Unknown Caller'}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            startIcon={<Iconify icon="solar:phone-bold" />}
            onClick={acceptCall}
            disabled={!hasAudioPermission}
            sx={{ minWidth: 120 }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Iconify icon="solar:phone-bold" />}
            onClick={rejectCall}
            sx={{ minWidth: 120 }}
          >
            Reject
          </Button>
        </Stack>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
} 