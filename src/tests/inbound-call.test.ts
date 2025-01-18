import { Device, Call } from '@twilio/voice-sdk';
import fetch from 'node-fetch';
import type { Mock } from 'jest-mock';

describe('Inbound Call Tests', () => {
  let device: Device | null = null;
  let token: string;

  beforeAll(async () => {
    // Get token
    const response = await fetch('http://localhost:8000/api/token');
    const data = await response.json() as { token: string };
    token = data.token;
    expect(token).toBeTruthy();
  });

  beforeEach(async () => {
    // Initialize device before each test
    device = new Device(token, {
      logLevel: 1,
      edge: ['wifi', 'cellular', 'ethernet', 'auto'],
      closeProtection: true,
      maxCallSignalingTimeoutMs: 30000
    });
    await device.register();
  });

  afterEach(async () => {
    // Cleanup after each test
    if (device) {
      await device.destroy();
      device = null;
    }
  });

  test('Device initialization', () => {
    expect(device).toBeTruthy();
    expect(device?.state).toBe('registered');
  });

  test('Incoming call handling', (done) => {
    expect.assertions(4);

    if (!device) {
      done(new Error('Device not initialized'));
      return;
    }

    // Set up incoming call handler
    device.on('incoming', async (call: Call) => {
      try {
        expect(call).toBeTruthy();
        expect(call.parameters.From).toBeTruthy();
        expect(call.parameters.Direction).toBe('inbound');

        // Test call acceptance
        await call.accept();
        expect(call.status()).toBe('open');
        await call.disconnect();
        done();
      } catch (error) {
        done(error as Error);
      }
    });
  });

  test('Call rejection', (done) => {
    expect.assertions(3);

    if (!device) {
      done(new Error('Device not initialized'));
      return;
    }

    device.on('incoming', async (call: Call) => {
      try {
        expect(call).toBeTruthy();
        expect(call.parameters.From).toBeTruthy();

        // Test call rejection
        await call.reject();
        expect(call.status()).toBe('closed');
        done();
      } catch (error) {
        done(error as Error);
      }
    });
  });

  test('Call state transitions', (done) => {
    expect.assertions(4);
    const states: string[] = [];

    if (!device) {
      done(new Error('Device not initialized'));
      return;
    }

    device.on('incoming', (call: Call) => {
      states.push('incoming');

      call.on('accept', () => {
        states.push('accepted');
      });

      call.on('disconnect', () => {
        states.push('disconnected');
        expect(states).toEqual(['incoming', 'accepted', 'disconnected']);
        done();
      });

      // Accept the call after a short delay
      setTimeout(async () => {
        try {
          await call.accept();
          expect(call.status()).toBe('open');
          // Disconnect after 1 second
          setTimeout(async () => {
            await call.disconnect();
          }, 1000);
        } catch (error) {
          done(error as Error);
        }
      }, 1000);
    });
  });
}); 