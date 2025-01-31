import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { CallSummary } from 'src/types/call';

const STATUS_ITEMS = [
  {
    label: 'Outbound',
    value: 'outbound',
    icon: 'solar:phone-calling-bold',
    color: 'primary.main',
  },
  {
    label: 'Answered',
    value: 'answered',
    icon: 'eva:checkmark-circle-2-fill',
    color: 'success.main',
  },
  {
    label: 'Missed',
    value: 'missed',
    icon: 'eva:close-circle-fill',
    color: 'error.main',
  },
  {
    label: 'Abandoned',
    value: 'abandoned',
    icon: 'solar:user-cross-bold',
    color: 'text.disabled',
  },
  {
    label: 'Voicemail',
    value: 'voicemail',
    icon: 'solar:inbox-bold',
    color: 'warning.main',
  },
];

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

      <Stack spacing={1} sx={{ mt: 2, flexGrow: 1, overflow: 'auto' }}>
        {STATUS_ITEMS.map((item) => {
          const value = summary[item.value as keyof Omit<CallSummary, 'total'>];
          const percentage = (value / summary.total) * 100 || 0;

          return (
            <Stack
              key={item.value}
              direction="row"
              alignItems="center"
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'background.neutral',
                },
              }}
            >
              <Box sx={{ width: 20, height: 20, mr: 1.5 }}>
                <Iconify icon={item.icon} width={20} sx={{ color: item.color }} />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="subtitle2">{value}</Typography>
                  <Typography variant="body2">{item.label}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    ({percentage.toFixed(0)}%)
                  </Typography>
                </Stack>
              </Box>

              <Iconify icon="eva:chevron-right-fill" width={16} />
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
} 