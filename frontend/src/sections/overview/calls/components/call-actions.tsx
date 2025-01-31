import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';

export function CallActions() {
  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Tooltip title="Call back" arrow>
        <IconButton size="small" sx={{ p: 0.5, color: 'primary.main' }}>
          <Iconify icon="eva:phone-fill" width={16} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Block number" arrow>
        <IconButton size="small" sx={{ p: 0.5, color: 'error.main' }}>
          <Iconify icon="eva:person-delete-fill" width={16} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
} 