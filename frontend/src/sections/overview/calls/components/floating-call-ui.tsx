import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useCall } from 'src/contexts/call-context';

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function FloatingCallUI() {
  const theme = useTheme();
  const { endCall, isCallActive, isMuted, muteCall, unmuteCall } = useCall();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    console.log('[FloatingCallUI] Component mounted');
    return () => {
      console.log('[FloatingCallUI] Component unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('[FloatingCallUI] Call state changed:', {
      isCallActive,
      isMuted,
      duration
    });
  }, [isCallActive, isMuted, duration]);

  useEffect(() => {
    console.log('[FloatingCallUI] isCallActive changed:', isCallActive);
    let intervalId: NodeJS.Timeout;

    if (isCallActive) {
      console.log('[FloatingCallUI] Starting duration timer');
      setDuration(0);
      intervalId = setInterval(() => {
        setDuration((prev) => {
          console.log('[FloatingCallUI] Duration updated:', prev + 1);
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        console.log('[FloatingCallUI] Cleaning up timer');
        clearInterval(intervalId);
      }
    };
  }, [isCallActive]);

  const handleMuteToggle = () => {
    console.log('[FloatingCallUI] Toggling mute:', { currentlyMuted: isMuted });
    if (isMuted) {
      unmuteCall();
    } else {
      muteCall();
    }
  };

  if (!isCallActive) {
    console.log('[FloatingCallUI] Not rendering - call not active');
    return null;
  }

  console.log('[FloatingCallUI] Rendering active call UI:', {
    duration,
    isMuted,
    isCallActive
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        px: 1,
        mx: 0.5,
        borderRadius: 1,
        bgcolor: (t) => t.palette.mode === 'light' ? 'primary.lighter' : 'primary.dark',
        '& .icon-button': {
          width: 32,
          height: 32,
        },
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          bgcolor: 'success.main',
          mr: 1,
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
      <Typography 
        variant="caption" 
        sx={{ 
          mx: 1,
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        {formatDuration(duration)}
      </Typography>
      <IconButton
        className="icon-button"
        size="small"
        onClick={handleMuteToggle}
        sx={{
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
        }}
      >
        {isMuted ? <MicOffIcon fontSize="small" /> : <MicIcon fontSize="small" />}
      </IconButton>
      <IconButton
        className="icon-button"
        size="small"
        onClick={endCall}
        sx={{
          color: 'error.main',
          '&:hover': {
            bgcolor: 'error.lighter',
          },
        }}
      >
        <CallEndIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
} 