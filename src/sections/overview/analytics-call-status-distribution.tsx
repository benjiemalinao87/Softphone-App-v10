import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactApexChart from 'react-apexcharts';

// ----------------------------------------------------------------------

interface CallStatusDistributionProps {
  title?: string;
  subheader?: string;
  data?: {
    status: string;
    count: number;
  }[];
  sx?: object;
}

export default function AnalyticsCallStatusDistribution({ 
  title = 'Call Status Distribution',
  subheader = 'Current status breakdown',
  data,
  sx,
  ...other 
}: CallStatusDistributionProps) {
  const chartData = {
    series: data?.map((item) => item.count) || [1250, 850, 650, 2400, 230, 480, 780, 360],
    options: {
      labels: data?.map((item) => item.status) || [
        'Queued',
        'Ringing',
        'In Progress',
        'Completed',
        'Busy',
        'Failed',
        'No Answer',
        'Canceled'
      ],
      legend: {
        show: true,
        position: "bottom" as const,
        fontSize: '13px',
        offsetY: 10,
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value} calls`,
        },
      },
      colors: [
        '#FFB547', // Queued - Orange
        '#54D62C', // Ringing - Green
        '#00B8D9', // In Progress - Blue
        '#36B37E', // Completed - Success Green
        '#FF4842', // Busy - Red
        '#FF0000', // Failed - Dark Red
        '#919EAB', // No Answer - Gray
        '#637381', // Canceled - Dark Gray
      ],
      stroke: {
        show: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '0%',
          },
        },
      },
      dataLabels: {
        enabled: true,
        dropShadow: { enabled: false },
        style: {
          fontSize: '13px',
        },
        formatter: (value: number) => `${Math.round(value)}%`,
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

      <Box sx={{ height: 320, display: 'flex', alignItems: 'center' }}>
        <ReactApexChart
          type="pie"
          series={chartData.series}
          options={chartData.options}
          width="100%"
          height="100%"
        />
      </Box>
    </Card>
  );
} 