import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Device } from '@twilio/voice-sdk';
import type { Call } from '@twilio/voice-sdk';

// Base URL for API calls (development)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Base URL for webhooks (ngrok) - use environment variable or fallback
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_BASE_URL || 'https://c28b-149-167-34-119.ngrok-free.app';

// Type guard function with proper typing
function isTwilioDevice(device: any): device is Device {
  return device !== null && 
         typeof device === 'object' && 
         'state' in device && 
         typeof device.state === 'string' &&
         Object.values(Device.State).includes(device.state);
}

// Add Device type to the context interface
interface CallContextType {
  device: Device | null;
  currentCall: Call | null;
  isIncomingCall: boolean;
  incomingCallData: any;
  acceptCall: () => void;
  rejectCall: () => void;
  hasAudioPermission: boolean;
  isCallActive: boolean;
  isMuted: boolean;
  muteCall: () => void;
  unmuteCall: () => void;
  endCall: () => void;
  makeCall: (number: string) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export function CallProvider({ children }: { children: React.ReactNode }) {
  // Properly type the device state
  const [device, setDevice] = useState<Device | null>(null);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [incomingCallData, setIncomingCallData] = useState<any>(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [lastTokenRefresh, setLastTokenRefresh] = useState<number>(0);
  const TOKEN_REFRESH_INTERVAL = 50 * 60 * 1000; // 50 minutes

  // Cleanup function to avoid repetition
  const cleanup = useCallback(() => {
    setTimeout(() => {
      setIsCallActive(false);
      setCurrentCall(null);
      setIsMuted(false);
      setIsIncomingCall(false);
    }, 100);
  }, []); // No dependencies needed as it only uses setState functions

  // Handle incoming calls
  const handleIncomingCall = useCallback((call: Call) => {
    const callPrefix = '[Incoming Call]';
    
    // Show incoming call notification immediately
    setIsIncomingCall(true);
    setIncomingCallData({
      from: call.parameters.From,
      to: call.parameters.To,
      direction: call.parameters.Direction,
      callSid: call.parameters.CallSid,
      timestamp: new Date().toISOString()
    });

    // Clean up existing call if any
    if (currentCall) {
      console.warn(`${callPrefix} Existing call found, cleaning up...`);
      currentCall.disconnect();
      cleanup();
    }
    
    // Set up call event listeners
    call.on('accept', () => {
      console.log(`${callPrefix} Call accepted, status:`, call.status());
      setIsCallActive(true);
      setIsIncomingCall(false);
    });

    call.on('cancel', () => {
      console.log(`${callPrefix} Call cancelled by caller`);
      cleanup();
    });

    call.on('disconnect', () => {
      console.log(`${callPrefix} Call disconnected, final status:`, call.status());
      cleanup();
    });

    call.on('reject', () => {
      console.log(`${callPrefix} Call rejected`);
      cleanup();
    });

    // Set current call immediately
    setCurrentCall(call);
  }, [currentCall, cleanup]);

  const requestAudioPermission = async () => {
    try {
      console.log('Requesting audio permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the tracks after getting permission
      setHasAudioPermission(true);
      console.log('Audio permission granted');
      return true;
    } catch (error) {
      console.error('Error getting audio permission:', error);
      setHasAudioPermission(false);
      return false;
    }
  };

  // Initialize device with optimized incoming call handling
  const initializeTwilioDevice = useCallback(async (): Promise<Device | null> => {
    const logPrefix = '[Device Init]';
    try {
      // Request audio permission first
      const hasPermission = await requestAudioPermission();
      setHasAudioPermission(hasPermission);
      
      if (!hasPermission) {
        console.warn(`${logPrefix} Audio permission denied`);
        return null;
      }

      const response = await fetch(`${API_URL}/api/token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Destroy existing device if it exists
      if (device) {
        await device.destroy();
      }

      // Create and configure the device with enhanced options
      const twilioDevice = new Device(data.token, {
        logLevel: 1,
        closeProtection: true,
        sounds: {
          incoming: '/sounds/incoming.mp3',
          outgoing: '/sounds/outgoing.mp3',
          disconnect: '/sounds/disconnect.mp3'
        },
        edge: ['ashburn', 'sydney', 'dublin', 'frankfurt'],
        maxCallSignalingTimeoutMs: 15000, // Reduced timeout for faster handling
      });

      // Set up device ready handler
      twilioDevice.on('ready', () => {
        setDevice(twilioDevice);
        setIsDeviceReady(true);
      });

      // Handle incoming calls immediately
      twilioDevice.on('incoming', handleIncomingCall);

      // Register the device
      await twilioDevice.register();

      return twilioDevice;
    } catch (error) {
      console.error(`${logPrefix} Error initializing device:`, error);
      setDevice(null);
      return null;
    }
  }, [device, handleIncomingCall]);

  // Pre-initialize device on mount
  useEffect(() => {
    let mounted = true;

    const initializeDevice = async () => {
      if (!device && !isInitializing && mounted) {
        setIsInitializing(true);
        try {
          const newDevice = await initializeTwilioDevice();
          if (mounted && newDevice) {
            setLastTokenRefresh(Date.now());
          }
        } finally {
          if (mounted) {
            setIsInitializing(false);
          }
        }
      }
    };

    initializeDevice();

    return () => {
      mounted = false;
      if (device) {
        device.destroy();
      }
    };
  }, [device, isInitializing, initializeTwilioDevice]);

  // Refresh token periodically
  useEffect(() => {
    const now = Date.now();
    if (device && (now - lastTokenRefresh) > TOKEN_REFRESH_INTERVAL) {
      const refreshToken = async () => {
        const newDevice = await initializeTwilioDevice();
        if (newDevice) {
          setLastTokenRefresh(now);
        }
      };
      refreshToken();
    }
  }, [device, lastTokenRefresh, TOKEN_REFRESH_INTERVAL, initializeTwilioDevice]);

  const acceptCall = useCallback(async () => {
    if (currentCall) {
      try {
        console.log('[Call Accept] Accepting incoming call...');
        console.log('[Call Accept] Current call state:', {
          isCallActive,
          isIncomingCall,
          callSid: currentCall.parameters.CallSid
        });

        // Set up event listeners before accepting the call
        currentCall.on('disconnect', () => {
          console.log('[Call Accept] Call disconnected');
          console.log('[Call Accept] Cleaning up call state');
          setTimeout(() => {
            setIsCallActive(false);
            setCurrentCall(null);
            setIsMuted(false);
            setIsIncomingCall(false);
          }, 100);
        });

        currentCall.on('error', (error) => {
          console.error('[Call Accept] Call error:', error);
          console.log('[Call Accept] Cleaning up call state due to error');
          setTimeout(() => {
            setIsCallActive(false);
            setCurrentCall(null);
            setIsMuted(false);
            setIsIncomingCall(false);
          }, 100);
        });

        // Accept the call
        await currentCall.accept();
        console.log('[Call Accept] Call accepted successfully');
        
        // Set call as active
        setIsCallActive(true);
        setIsIncomingCall(false);
        
        // Monitor call status
        const statusCheckInterval = setInterval(() => {
          if (currentCall) {
            const status = currentCall.status();
            console.log('[Call Status Check]', {
              status,
              isCallActive,
              callSid: currentCall.parameters.CallSid
            });
            
            if (!['connecting', 'open', 'ringing'].includes(status)) {
              clearInterval(statusCheckInterval);
              setIsCallActive(false);
              setCurrentCall(null);
              setIsMuted(false);
            }
          } else {
            clearInterval(statusCheckInterval);
          }
        }, 1000);

        return () => {
          clearInterval(statusCheckInterval);
        };
      } catch (error) {
        console.error('[Call Accept] Error accepting call:', error);
        setTimeout(() => {
          setIsIncomingCall(false);
          setCurrentCall(null);
          setIsCallActive(false);
        }, 100);
      }
    }
    return undefined; // Explicit return for async function
  }, [currentCall, isCallActive, isIncomingCall, setIsCallActive, setCurrentCall, setIsMuted, setIsIncomingCall]);

  const rejectCall = useCallback(async () => {
    if (currentCall) {
      try {
        console.log('Rejecting incoming call...');
        await currentCall.reject();
        setIsIncomingCall(false);
        setCurrentCall(null);
      } catch (error) {
        console.error('Error rejecting call:', error);
      }
    }
    return undefined; // Explicit return for async function
  }, [currentCall, setIsIncomingCall, setCurrentCall]);

  const muteCall = useCallback(() => {
    if (currentCall) {
      try {
        currentCall.mute(true);
        setIsMuted(true);
      } catch (error) {
        console.error('Error muting call:', error);
      }
    }
  }, [currentCall, setIsMuted]);

  const unmuteCall = useCallback(() => {
    if (currentCall) {
      try {
        currentCall.mute(false);
        setIsMuted(false);
      } catch (error) {
        console.error('Error unmuting call:', error);
      }
    }
  }, [currentCall, setIsMuted]);

  const endCall = useCallback(() => {
    if (currentCall) {
      try {
        console.log('[Call End] Ending call...', {
          callSid: currentCall.parameters.CallSid,
          currentStatus: currentCall.status()
        });
        
        // Add disconnect listener before disconnecting
        currentCall.on('disconnect', () => {
          console.log('[Call End] Call disconnected successfully');
          console.log('[Call End] Cleaning up call state');
          setIsCallActive(false);
          setCurrentCall(null);
          setIsMuted(false);
        });

        currentCall.disconnect();
        console.log('[Call End] Disconnect command sent');
      } catch (error) {
        console.error('[Call End] Error ending call:', error);
        // In case of error, force the states to be cleaned up
        setIsCallActive(false);
        setCurrentCall(null);
        setIsMuted(false);
      }
    } else {
      console.warn('[Call End] No current call to end');
    }
  }, [currentCall, setIsCallActive, setCurrentCall, setIsMuted]);

  const makeCall = useCallback(async (number: string) => {
    const logPrefix = '[Make Call]';
    
    try {
      // Start UI feedback immediately
      setIsCallActive(true); // Show calling state immediately
      
      // Format number
      const normalizedNumber = number.replace(/[^\d+]/g, '');
      const formattedNumber = normalizedNumber.startsWith('+') ? 
        normalizedNumber : 
        `+1${normalizedNumber}`;

      console.log(`${logPrefix} Processing call to:`, formattedNumber);

      let currentDevice = device;
      
      // Quick device check and initialization
      if (!currentDevice || currentDevice.state !== Device.State.Registered) {
        currentDevice = await initializeTwilioDevice();
        if (!currentDevice) {
          throw new Error('Failed to initialize device');
        }
      }

      // Clean up any existing call
      if (currentCall) {
        currentCall.disconnect();
        cleanup();
      }

      const params = {
        To: formattedNumber,
        From: import.meta.env.VITE_TWILIO_PHONE_NUMBER || '+16573857999'
      };
      
      // Start the call
      const call = await currentDevice.connect({ params });
      setCurrentCall(call);
      
      // Set up event listeners
      call.on('ringing', () => {
        console.log(`${logPrefix} Call is ringing`);
      });
      
      call.on('accept', () => {
        console.log(`${logPrefix} Call accepted`);
      });

      call.on('disconnect', () => {
        console.log(`${logPrefix} Call disconnected`);
        cleanup();
      });

      call.on('error', (error: Error) => {
        console.error(`${logPrefix} Call error:`, error);
        cleanup();
      });

    } catch (error) {
      console.error(`${logPrefix} Error making call:`, error);
      cleanup();
      throw error;
    }
  }, [device, currentCall, initializeTwilioDevice, cleanup]);

  const contextValue = useMemo(() => ({
    device,
    currentCall,
    isIncomingCall,
    incomingCallData,
    acceptCall,
    rejectCall,
    hasAudioPermission,
    isCallActive,
    isMuted,
    muteCall,
    unmuteCall,
    endCall,
    makeCall,
  }), [
    device,
    currentCall,
    isIncomingCall,
    incomingCallData,
    acceptCall,
    rejectCall,
    hasAudioPermission,
    isCallActive,
    isMuted,
    muteCall,
    unmuteCall,
    endCall,
    makeCall
  ]);

  return (
    <CallContext.Provider value={contextValue}>
      {children}
    </CallContext.Provider>
  );
}

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
}; 