import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Iconify } from 'src/components/iconify';
import type { Call } from '../types';
import CallStatusBadge from './call-status-badge';
import { CallActions } from './call-actions';

type Props = {
  calls: Call[];
};

export function RecentCallsTable({ calls }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calls.map((call, index) => (
            <TableRow key={`${call.id}-${index}`} hover>
              <TableCell sx={{ py: 0.75 }}>{call.customer}</TableCell>
              <TableCell sx={{ py: 0.75 }}>{call.time}</TableCell>
              <TableCell sx={{ py: 0.75 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="solar:clock-circle-bold" width={12} sx={{ color: 'text.disabled' }} />
                  {call.duration}
                </Stack>
              </TableCell>
              <TableCell sx={{ py: 0.75 }}>
                <CallStatusBadge status={call.status} />
              </TableCell>
              <TableCell sx={{ py: 0.75 }} align="right">
                <CallActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 