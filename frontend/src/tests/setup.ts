import '@testing-library/jest-dom';
import { Device } from '@twilio/voice-sdk';
import type { Mock } from 'jest-mock';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

const mockDevice = {
  register: jest.fn().mockResolvedValue(undefined),
  destroy: jest.fn().mockResolvedValue(undefined),
  on: jest.fn(),
  state: 'registered'
} as unknown as Device;

const mockCall = {
  accept: jest.fn().mockResolvedValue(undefined),
  reject: jest.fn().mockResolvedValue(undefined),
  disconnect: jest.fn().mockResolvedValue(undefined),
  on: jest.fn(),
  status: jest.fn().mockReturnValue('open'),
  parameters: {
    From: '+1234567890',
    Direction: 'inbound'
  }
};

// Mock Twilio Device
jest.mock('@twilio/voice-sdk', () => ({
  Device: jest.fn().mockImplementation(() => mockDevice),
  Call: jest.fn().mockImplementation(() => mockCall)
}));

// Mock fetch
jest.mock('node-fetch', () => {
  const mockFetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ 
        token: 'mock-token',
        expires: new Date(Date.now() + 3600000).toISOString(),
        identity: 'user'
      })
    })
  );
  return mockFetch;
}); 