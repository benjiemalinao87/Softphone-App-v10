import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Iconify } from 'src/components/iconify';
import { CallSummary } from '../types';
import { STATUS_ITEMS } from '../config';

type Props = {
  summary: CallSummary;
};

export function CallStatusList({ summary }: Props) {
  return (
    <Stack spacing={1} sx={{ flexGrow: 1, overflow: 'auto' }}>
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
  );
} 