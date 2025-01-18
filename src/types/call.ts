export type CallStatus = 'completed' | 'failed' | 'busy' | 'no-answer' | 'canceled' | 'ringing' | 'in-progress' | 'missed';

export interface Call {
  id: string;
  from: string;
  to: string;
  status: CallStatus;
  duration: number;
  timestamp: string;
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