import { StatusConfig } from './types';

export const CARD_HEIGHT = 400;

export const STATUS_ITEMS: StatusConfig[] = [
  {
    label: 'Outbound',
    value: 'outbound',
    icon: 'solar:phone-calling-bold',
    color: 'primary.main',
  },
  {
    label: 'Answered',
    value: 'answered',
    icon: 'eva:checkmark-circle-2-fill',
    color: 'success.main',
  },
  {
    label: 'Missed',
    value: 'missed',
    icon: 'eva:close-circle-fill',
    color: 'error.main',
  },
  {
    label: 'Abandoned',
    value: 'abandoned',
    icon: 'solar:user-cross-bold',
    color: 'text.disabled',
  },
  {
    label: 'Voicemail',
    value: 'voicemail',
    icon: 'solar:inbox-bold',
    color: 'warning.main',
  },
]; 