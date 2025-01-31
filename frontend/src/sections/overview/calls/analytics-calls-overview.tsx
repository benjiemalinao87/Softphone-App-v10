import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { MOCK_CALLS } from 'src/_mock/calls';
import { MOCK_CALL_SUMMARY } from 'src/_mock/call-summary';
import { CARD_HEIGHT } from './config';
import { CallStatusSummary, RecentCallsTable } from './components';

export function AnalyticsCallsOverview() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Card sx={{ height: CARD_HEIGHT }}>
          <Box sx={{ p: 1, height: 1 }}>
            <RecentCallsTable calls={[...MOCK_CALLS, ...MOCK_CALLS, ...MOCK_CALLS, ...MOCK_CALLS]} />
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