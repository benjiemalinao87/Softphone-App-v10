import Box from '@mui/material/Box';
import { Iconify } from 'src/components/iconify';
import type { CallStatus } from '../types';

type Props = {
  status: CallStatus;
};

export default function CallStatusBadge({ status }: Props) {
  const getColor = () => {
    switch (status) {
      case 'completed':
        return {
          color: 'success.dark',
          bgcolor: 'success.lighter',
        };
      case 'failed':
      case 'missed':
        return {
          color: 'error.dark',
          bgcolor: 'error.lighter',
        };
      case 'busy':
      case 'no-answer':
        return {
          color: 'warning.dark',
          bgcolor: 'warning.lighter',
        };
      default:
        return {
          color: 'info.dark',
          bgcolor: 'info.lighter',
        };
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'completed':
        return 'eva:checkmark-circle-2-fill';
      case 'failed':
      case 'missed':
        return 'eva:close-circle-fill';
      case 'busy':
      case 'no-answer':
        return 'eva:clock-fill';
      default:
        return 'eva:phone-fill';
    }
  };

  return (
    <Box
      component="span"
      sx={{
        px: 1,
        py: 0.5,
        borderRadius: 1,
        display: 'inline-flex',
        alignItems: 'center',
        typography: 'caption',
        ...getColor(),
      }}
    >
      <Iconify icon={getIcon()} width={16} sx={{ mr: 0.5 }} />
      {status}
    </Box>
  );
} 