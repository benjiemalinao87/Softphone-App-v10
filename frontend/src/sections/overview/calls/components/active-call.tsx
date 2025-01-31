import { Box, IconButton, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import { useCall } from '../../../../contexts/call-context';

const CallControlsContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[6],
  borderRadius: theme.shape.borderRadius * 2,
  zIndex: 1300,
}));

const CallButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const EndCallButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

export function ActiveCall() {
  const { isCallActive, isMuted, muteCall, unmuteCall, endCall, incomingCallData } = useCall();

  if (!isCallActive) {
    return null;
  }

  const handleMuteToggle = () => {
    if (isMuted) {
      unmuteCall();
    } else {
      muteCall();
    }
  };

  return (
    <CallControlsContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle1" component="div">
          Call in progress with {incomingCallData?.from || 'Unknown'}
        </Typography>
        
        <CallButton
          onClick={handleMuteToggle}
          size="large"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          <Iconify icon={isMuted ? 'eva:mic-off-fill' : 'eva:mic-fill'} />
        </CallButton>

        <EndCallButton
          onClick={endCall}
          size="large"
          aria-label="End Call"
        >
          <Iconify icon="eva:phone-off-fill" />
        </EndCallButton>
      </Box>
    </CallControlsContainer>
  );
} 