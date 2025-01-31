import type { Call } from 'src/sections/overview/calls/types';

export const MOCK_CALLS: Call[] = [
  {
    id: '1',
    customer: '+1234567890',
    time: '10:30 AM',
    duration: '2:00',
    status: 'completed'
  },
  {
    id: '2',
    customer: '+1234567891',
    time: '11:00 AM',
    duration: '0:00',
    status: 'failed'
  },
  // Add more mock calls as needed
]; 