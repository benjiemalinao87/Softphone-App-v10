import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ReactApexChart from 'react-apexcharts';

import { _tasks, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';

import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import { AnalyticsRecentCalls } from '../analytics-recent-calls';
import AnalyticsCallStatusDistribution from '../analytics-call-status-distribution';
import AnalyticsWeeklyCallMetrics from '../analytics-weekly-call-metrics';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Calls"
            percent={2.6}
            total={714}
            color="primary"
            icon={<Iconify icon="solar:phone-bold" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Average Duration"
            percent={-0.1}
            total={325}
            color="secondary"
            icon={<Iconify icon="solar:clock-circle-bold" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Success Rate"
            percent={2.8}
            total={85}
            color="success"
            icon={<Iconify icon="solar:check-circle-bold" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 70, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Customer Rating"
            percent={3.6}
            total={4.8}
            color="warning"
            icon={<Iconify icon="solar:star-bold" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [4.5, 4.2, 4.8, 4.9, 4.7, 4.6, 4.8, 4.8],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCallStatusDistribution />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWeeklyCallMetrics />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <Card sx={{ height: '100%', p: 2 }}>
            <AnalyticsConversionRates
              title="Calls by State"
              subheader="(+43%) than last month"
              chart={{
                categories: ['CA', 'TX', 'NY', 'FL', 'IL', 'WA'],
                series: [
                  { name: 'Current Month', data: [44, 55, 41, 64, 22, 43] },
                  { name: 'Last Month', data: [53, 32, 33, 52, 13, 44] },
                ],
              }}
              sx={{ height: 360 }}
            />
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', p: 0 }}>
            <CardHeader title="Call Timeline" sx={{ p: 2, pb: 0 }} />
            <Box sx={{ 
              height: 360,
              overflow: 'auto',
              px: 2,
              pb: 2,
              '& .MuiTimelineItem-root': {
                '&:before': {
                  flex: 0,
                  padding: 0,
                },
              },
            }}>
              <AnalyticsOrderTimeline 
                list={[
                  {
                    id: '1',
                    title: 'Inbound call from (555) 123-4567',
                    type: 'order1',
                    time: new Date('2024-02-27T10:30:00').getTime(),
                  },
                  {
                    id: '2',
                    title: 'Outbound call to (555) 987-6543',
                    type: 'order2',
                    time: new Date('2024-02-27T09:45:00').getTime(),
                  },
                  {
                    id: '3',
                    title: 'Missed call from (555) 246-8135',
                    type: 'order3',
                    time: new Date('2024-02-27T09:15:00').getTime(),
                  },
                  {
                    id: '4',
                    title: 'Voicemail from (555) 369-1478',
                    type: 'order4',
                    time: new Date('2024-02-27T08:30:00').getTime(),
                  },
                  {
                    id: '5',
                    title: 'Inbound call from (555) 789-0123',
                    type: 'order1',
                    time: new Date('2024-02-27T08:15:00').getTime(),
                  },
                  {
                    id: '6',
                    title: 'Outbound call to (555) 456-7890',
                    type: 'order2',
                    time: new Date('2024-02-27T08:00:00').getTime(),
                  },
                  {
                    id: '7',
                    title: 'Missed call from (555) 234-5678',
                    type: 'order3',
                    time: new Date('2024-02-27T07:45:00').getTime(),
                  },
                  {
                    id: '8',
                    title: 'Voicemail from (555) 901-2345',
                    type: 'order4',
                    time: new Date('2024-02-27T07:30:00').getTime(),
                  },
                ]} 
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12}>
          <Card>
            <Box
              sx={{
                px: 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
                gap: 2,
              }}
            >
              <Typography variant="h6">Recent Calls</Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" width={20} />}
                size="medium"
                sx={{
                  minWidth: 110,
                  boxShadow: (theme) => theme.customShadows.z8,
                  '&:hover': {
                    boxShadow: (theme) => theme.customShadows.z16,
                  },
                }}
              >
                New Call
              </Button>
            </Box>
            <Box sx={{ px: 3, py: 2 }}>
              <AnalyticsRecentCalls />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
