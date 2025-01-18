// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export type TwilioPhoneNumber = {
  phoneNumber: string;
  region: string;
  capabilities: string[];
  sid: string;
};

export type TwilioValidationResponse = {
  valid: boolean;
  message?: string;
  accountName?: string;
};

export const twilioService = {
  validateCredentials: async (accountSid: string, authToken: string): Promise<TwilioValidationResponse> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/twilio/validate`, {
        accountSid,
        authToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error with response
        if (error.response) {
          return {
            valid: false,
            message: error.response.data.message || 'Failed to validate credentials'
          };
        }
        // Handle network errors
        if (error.request) {
          return {
            valid: false,
            message: 'Network error: Unable to reach validation service. Please ensure the server is running.'
          };
        }
      }
      // Handle other errors
      return {
        valid: false,
        message: 'An unexpected error occurred during validation'
      };
    }
  },

  getPhoneNumbers: async (accountSid: string, authToken: string): Promise<TwilioPhoneNumber[]> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/twilio/phone-numbers`, {
        accountSid,
        authToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error('[Twilio Service] Failed to fetch phone numbers:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch phone numbers');
      }
      throw new Error('Failed to fetch phone numbers');
    }
  },

  configureWebhooks: async (accountSid: string, authToken: string, phoneNumberSid: string): Promise<void> => {
    try {
      await axios.post(`${BASE_URL}/api/twilio/configure-webhooks`, {
        accountSid,
        authToken,
        phoneNumberSid,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      });
      console.log('[Twilio Service] Successfully configured webhooks for:', phoneNumberSid);
    } catch (error) {
      console.error('[Twilio Service] Failed to configure webhooks:', error);
      throw new Error('Failed to configure webhooks');
    }
  },
}; 