export type CallStatus = 'completed' | 'failed' | 'busy' | 'no-answer' | 'canceled' | 'ringing' | 'in-progress' | 'missed';

export interface Call {
  id: string;
  customer: string;
  time: string;
  duration: string;
  status: CallStatus;
}

export interface CallSummary {
  total: number;
  completed: number;
  failed: number;
  busy: number;
  noAnswer: number;
  canceled: number;
  inProgress: number;
  ringing: number;
}

export interface StatusConfig {
  label: string;
  value: string;
  icon: string;
  color: string;
} 