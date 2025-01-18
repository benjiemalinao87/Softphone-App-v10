import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import { CallSummary } from '../types';
import { CallStatusList } from './call-status-list';

type Props = {
  summary: CallSummary;
};

export function CallStatusSummary({ summary }: Props) {
  return (
    <Box sx={{ p: 2, height: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Call status</Typography>
        <IconButton size="small">
          <Iconify icon="solar:refresh-bold" />
        </IconButton>
      </Stack>

      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="subtitle2">
          {summary.total} calls today
        </Typography>

        <Box
          sx={{
            width: 1,
            height: 6,
            borderRadius: 1,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16),
          }}
        />
      </Stack>

      <Box sx={{ mt: 2, flexGrow: 1 }}>
        <CallStatusList summary={summary} />
      </Box>
    </Box>
  );
} 