import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactApexChart from 'react-apexcharts';

// ----------------------------------------------------------------------

interface WeeklyCallMetricsProps {
  title?: string;
  subheader?: string;
  data?: {
    inbound: number[];
    outbound: number[];
  };
  sx?: object;
}

export default function AnalyticsWeeklyCallMetrics({ 
  title = 'Weekly Call Metrics',
  subheader = '(+43%) than last week',
  data,
  sx,
  ...other 
}: WeeklyCallMetricsProps) {
  const chartData = {
    series: [
      {
        name: 'Inbound',
        data: data?.inbound || [35, 42, 38, 45, 40, 32, 28],
      },
      {
        name: 'Outbound',
        data: data?.outbound || [28, 32, 40, 38, 35, 25, 20],
      },
    ],
    options: {
      chart: {
        stacked: false,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 4,
        },
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: '#919EAB',
            fontSize: '13px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#919EAB',
            fontSize: '13px',
          },
        },
      },
      grid: {
        borderColor: '#919EAB1F',
        strokeDashArray: 3,
        xaxis: {
          lines: { show: false },
        },
      },
      colors: ['#1939B7', '#91A7EE'],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value: number) => `${value} calls`,
        },
      },
      legend: {
        show: true,
        position: "top" as const,
        horizontalAlign: "right" as const,
        labels: {
          colors: '#919EAB',
        },
        itemMargin: {
          horizontal: 8,
        },
      },
    },
  };

  return (
    <Card sx={{ height: '100%', p: 2, ...sx }} {...other}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">{title}</Typography>
        {subheader && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {subheader}
          </Typography>
        )}
      </Box>

      <Box sx={{ height: 320 }}>
        <ReactApexChart
          type="bar"
          series={chartData.series}
          options={chartData.options}
          width="100%"
          height="100%"
        />
      </Box>
    </Card>
  );
} 