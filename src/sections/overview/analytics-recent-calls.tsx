import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Iconify } from 'src/components/iconify';
import { MOCK_CALLS } from 'src/_mock/calls';
import { MOCK_CALL_SUMMARY } from 'src/_mock/call-summary';
import { CallStatusDisplay } from './call-status';
import { CallActions } from './call-actions';
import { CallStatusSummary } from './call-status-summary';

// ----------------------------------------------------------------------

const CARD_HEIGHT = 400;

export function AnalyticsRecentCalls() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Card sx={{ height: CARD_HEIGHT }}>
          <Box sx={{ p: 1, height: 1 }}>
            <TableContainer sx={{ 
              height: 1,
              '& ::-webkit-scrollbar': { 
                width: 8,
                height: 8 
              },
              '& ::-webkit-scrollbar-thumb': {
                borderRadius: 2,
                bgcolor: 'grey.400',
                '&:hover': {
                  bgcolor: 'grey.500'
                }
              }
            }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell 
                      sx={{ 
                        py: 1,
                        bgcolor: 'background.paper',
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      CUSTOMER
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        py: 1,
                        bgcolor: 'background.paper',
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      TIME
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        py: 1,
                        bgcolor: 'background.paper',
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      DURATION
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        py: 1,
                        bgcolor: 'background.paper',
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      STATUS
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        py: 1,
                        bgcolor: 'background.paper',
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                      align="right"
                    >
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {[...MOCK_CALLS, ...MOCK_CALLS, ...MOCK_CALLS, ...MOCK_CALLS].map((call, index) => (
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
                        <CallStatusDisplay status={call.status} />
                      </TableCell>
                      <TableCell sx={{ py: 0.75 }} align="right">
                        <CallActions />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={5}>
        <Card sx={{ height: CARD_HEIGHT }}>
          <CallStatusSummary summary={MOCK_CALL_SUMMARY} />
        </Card>
      </Grid>
    </Grid>
  );
} 